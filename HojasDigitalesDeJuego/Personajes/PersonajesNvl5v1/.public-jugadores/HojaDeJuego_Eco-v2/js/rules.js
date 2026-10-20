'use strict';
/* Motor puro: no toca DOM, almacenamiento ni estado recibido. */
(function (E) {
  const C = E.config;
  const int = (v, min, max) => Number.isInteger(v) && v >= min && v <= max;
  const blocked = s => s.hp === 0 || s.exhaustion >= 6 || s.conditions.some(c =>
    ['Incapacitada','Paralizada','Petrificada','Aturdida','Inconsciente'].includes(c));
  function averageDice(formula) {
    const terms=[...formula.matchAll(/(\d+)d(\d+)|([+-]\s*\d+)\b/g)];
    if(!terms.some(t=>t[1]))return null;
    return terms.reduce((sum,t)=>sum+(t[1]?Number(t[1])*(Number(t[2])+1)/2:Number(t[3].replace(/\s/g,''))),0);
  }
  function simulate(s, p) {
    const errors=[], warnings=[], effects=[], costs={ki:0,slots:0,inspiration:0,arrows:0};
    const a=p.action,b=p.bonus,w=C.weapons[a],m=C.magic[a];
    const attack=!!w, bonusHits=b==='flurry'?2:b==='martial'?1:0;
    if (!C.ACTIONS.some(x=>x[0]===a)||!C.BONUSES.some(x=>x[0]===b)) errors.push('Selección de acción desconocida.');
    for (const [key,max] of [['distance',10000],['movement',10000],['approach',10000],['allyRange',10000],['boost',1]]) {
      if (!int(p[key],0,max)) errors.push('Valor inválido en '+({distance:'distancia',movement:'movimiento',approach:'acercamiento',allyRange:'distancia al aliado',boost:'potenciaciones'}[key])+'. Debe ser un entero no negativo.');
    }
    if (![1,2].includes(p.terrain)) errors.push('Terreno inválido.');
    if (p.targetInt!==null&&!int(p.targetInt,0,30)) errors.push('Inteligencia del objetivo inválida.');
    if (blocked(s)) errors.push('Eco no puede actuar: está incapacitada, a 0 PG o tiene agotamiento 6.');
    if (b==='martial' && !w?.monk) errors.push('Artes Marciales exige Atacar con desarmado o arma de monje; la cimitarra es excepción registrada de Eco.');
    if (b==='flurry' && !attack) errors.push('Ráfaga exige la acción Atacar; lanzar un conjuro no la activa.');
    if (b==='flurry') costs.ki++;
    if (['patient','stepdash','stepdisengage'].includes(b)) costs.ki++;
    if (b==='inspire') {
      costs.inspiration++;
      if (p.allyRange>60) errors.push('El aliado de Inspiración debe estar a 60 pies o menos y ser otra criatura.');
      if (!p.targetHeard) errors.push('El aliado debe poder oír a Eco para recibir Inspiración.');
      warnings.push('Inspiración: 1d6 para otra criatura; no es un conjuro y no requiere concentración.');
    }
    if (p.fangs) {
      costs.ki++;
      if (!attack) errors.push('Colmillos solo se activa con la acción Atacar.');
      warnings.push('Perfil heredado: Colmillos modifica solo el golpe desarmado de la acción; los adicionales permanecen a 5 pies y contundentes. Discrepancia pendiente con el DM.');
    }
    if (p.boost && (!p.fangs||a!=='unarmed')) errors.push('Potenciar exige Colmillos y un golpe desarmado de la acción Atacar; máximo 1 en el perfil heredado.');
    if ((a==='unarmed'||bonusHits)&&!p.monkReady) errors.push('El dado 1d4 y Destreza requieren cumplir Artes Marciales: sin armadura, escudo ni armas ajenas a monje durante esos golpes.');
    if (bonusHits&&w&&!w.monk) warnings.push('Antes de los golpes desarmados, deja de empuñar el arma ajena a monje; resuelve la interacción con el DM.');
    if (w?.note) warnings.push(w.note);
    const conditions=s.conditions;
    let speed=C.character.speed;
    if (s.exhaustion>=2) speed/=2;
    if (s.exhaustion>=5 || conditions.some(c=>['Agarrada','Restringida'].includes(c))) speed=0;
    const moveMax=speed*(1+(a==='dash'?1:0)+(b==='stepdash'?1:0));
    let movementCost=p.movement*p.terrain;
    if (conditions.includes('Derribada')) {
      if (p.stand) {
        if (!speed) errors.push('Con velocidad 0 no puedes levantarte.');
        movementCost+=speed/2;
      } else {
        movementCost+=p.movement; // Arrastrarse: +1 pie por pie, además del terreno difícil.
        warnings.push('Eco sigue derribada: arrastrarse cuesta movimiento adicional; sus ataques tienen desventaja.');
      }
    }
    if (p.approach>p.movement) errors.push('El acercamiento no puede superar la distancia recorrida.');
    if (p.approach>p.distance) errors.push('El acercamiento no puede superar la distancia inicial al objetivo.');
    if (movementCost>moveMax) errors.push('El movimiento cuesta '+movementCost+' pies y solo hay '+moveMax+' disponibles.');
    const distance=Math.max(0,p.distance-p.approach);
    let reach=w?(a==='unarmed'&&p.fangs?15:w.reach):m?.range;
    if ((w||m) && distance>(w?.longReach||reach)) errors.push('Objetivo fuera del alcance de la acción tras el movimiento: '+distance+' pies.');
    if (w?.longReach&&distance>reach&&distance<=w.longReach) warnings.push('Alcance largo del arco (80/320): ataque con desventaja.');
    if ((a==='bow'||m?.kind==='attack')&&p.hostileNear) warnings.push('Enemigo hostil a 5 pies: normalmente desventaja en ataques a distancia.');
    if (bonusHits&&distance>5) errors.push('Los golpes adicionales requieren objetivo a 5 pies en el perfil heredado. El plan usa un único objetivo y una distancia final.');
    if (a==='bow') {
      costs.arrows=1;
      if (s.arrows===null) errors.push('Cantidad de flechas desconocida. Registra las existencias en Mesa y recursos.');
    }
    if (m) {
      costs.slots=m.slot||0;
      if (!p.components) errors.push('No están disponibles los componentes o manos necesarios para el conjuro.');
      if (m.origin==='pending') warnings.push('Acceso, atributo y CD/ataque de este conjuro pendientes del DM. No se asigna un bonificador inventado.');
      if (m.origin==='bard') warnings.push(m.kind==='save'?'Salvación de '+m.save+'; CD 12 si se lanza como Bardo.':'Ataque de conjuro de Bardo +4.');
      if (a==='mockery'&&!p.targetHeard) errors.push('Vicious Mockery exige que el objetivo pueda oír a Eco.');
      if (a==='tasha') {
        if (p.targetInt!==null&&p.targetInt<=4) errors.push('Tasha no afecta a criaturas de Inteligencia 4 o menor.');
        if (p.targetInt===null) warnings.push('Inteligencia del objetivo desconocida: confirma que supera 4 antes de aplicar.');
        warnings.push('Tasha requiere ver al objetivo; una salvación fallida inicia el efecto y la concentración.');
        if (s.concentration) warnings.push('Si comienza la nueva concentración, reemplaza: '+s.concentration+'.');
      }
      if (['cure','spare'].includes(a)) warnings.push('Toque real necesario, no basta estar cerca. Confirma criatura válida en mesa.');
      
    }
    for (const k of Object.keys(costs)) if (s[k]!==null&&costs[k]>s[k]) errors.push('Recurso insuficiente: '+k+' (necesita '+costs[k]+', disponible '+s[k]+').');
    if (costs.ki+p.boost>s.ki) errors.push('Ki insuficiente para activación y todas las potenciaciones planeadas. Reduce las planeadas si solo deseas activar.');
    if (p.boost) warnings.push('Cada potenciación es condicional: se descontará solo el número de impactos confirmado al aplicar.');
    let damageAverage=null,healingAverage=null;
    if (w) {
      effects.push((a==='unarmed'?w.formula+' '+(p.fangs?'fuego':w.type):w.formula+(a==='scimitar'?'':' '+w.type))+' · ataque +'+w.attack);
      damageAverage=averageDice(w.formula);
      if (p.boost) { effects.push('1d10 fuego por impacto potenciado ('+p.boost+' planeado)');damageAverage+=p.boost*5.5; }
      for(let n=0;n<bonusHits;n++) effects.push(C.weapons.unarmed.formula+' contundente · golpe adicional · ataque +'+C.weapons.unarmed.attack);
      damageAverage+=bonusHits*averageDice(C.weapons.unarmed.formula);
    } else if (m) {
      effects.push(m.dice);
      damageAverage=m.kind==='heal'?null:averageDice(m.dice);
      if (a==='cure') {
        healingAverage=p.bardCure?averageDice('1d8+'+C.AB.Car[1]):null;
        if (p.bardCure) effects[0]='1d8+1 curación (origen Bardo confirmado para este plan)';
        else warnings.push('Curación: falta confirmar atributo de lanzamiento. No se calcula promedio hasta confirmar Bardo.');
      }
    } else effects.push('Acción táctica; resolución en mesa, sin daño directo calculado.');
    if (a==='ready') warnings.push('Preparar usa tu acción; ejecutar la acción preparada consume reacción. Preparar un conjuro también exige su espacio y concentración: este plan solo prepara acciones no mágicas.');
    if (p.reaction!=='none') warnings.push('Reacción prevista, aún sin consumir. Disponibilidad actual: '+(s.reactionAvailable?'sí':'no')+'. Registra el desencadenante en Mesa.');
    if (['Cegada','Envenenada','Restringida','Asustada'].some(c=>conditions.includes(c))||s.exhaustion>=3) warnings.push('Condiciones/agotamiento pueden imponer desventaja en ataques. Resuelve visibilidad y fuente de miedo en mesa.');
    if (s.exhaustion>=1) warnings.push('Agotamiento 2014: desventaja en pruebas de característica; nivel 3 añade ataques y salvaciones; nivel 4 reduce máximo de PG a la mitad (ajusta máximo efectivo manualmente).');
    if (p.context==='stealth') warnings.push('Ocultación, sorpresa, cobertura y visión requieren resolución del DM.');
    if (p.context==='social') warnings.push('Aprendiz de Todo: +1 solo a pruebas sin competencia.');
    if (conditions.includes('Hechizada')) warnings.push('Si el objetivo es quien hechizó a Eco, no puede atacarlo ni dirigirle efectos dañinos. Confirma identidad del objetivo en mesa.');
    warnings.push('Plan de un objetivo: el movimiento se realiza antes de las acciones. El modelo supone velocidad registrada sin armadura/escudo. No calcula probabilidad de impacto, críticos, resistencias ni daño infligido.');
    return {valid:!errors.length,errors,warnings,effects,costs,conditionalKi:p.boost,attacks:w?1+bonusHits:0,moveMax,movementCost,distance,reach:reach||null,damageAverage,healingAverage,action:a,bonus:b,description:(C.ACTIONS.find(x=>x[0]===a)?.[1]||a)+' + '+(C.BONUSES.find(x=>x[0]===b)?.[1]||b)};
  }
  function apply(s,plan,resolution={boostHits:0,concentration:false}) {
    const result=simulate(s,plan);
    if (!result.valid) throw Error(result.errors.join('\n'));
    if (!int(resolution.boostHits,0,result.conditionalKi)) throw Error('Número de impactos potenciados inválido.');
    const next=JSON.parse(JSON.stringify(s));
    for(const [key,cost] of Object.entries(result.costs)) if(cost) next[key]-=cost;
    next.ki-=resolution.boostHits;
    if(next.ki<0) throw Error('Ki insuficiente.');
    if(plan.action==='tasha'&&resolution.concentration) next.concentration=C.magic.tasha.name;
    return {state:next,result,spentKi:result.costs.ki+resolution.boostHits};
  }
  function rest(s,kind,meditated) {
    const n=JSON.parse(JSON.stringify(s));
    if(meditated)n.ki=3;
    if(kind==='long') {
      if(s.hp===0) throw Error('Un descanso largo requiere al menos 1 PG al comenzar; confirma la situación en mesa.');
      n.hp=n.maxHp;n.tempHp=0;n.slots=3;n.inspiration=1;n.hitDice=Math.min(5,n.hitDice+2);
      n.deathSuccess=0;n.deathFail=0;
      // Condiciones y agotamiento se ajustan tras verificar alimento/bebida; no se limpian indiscriminadamente.
      n.concentration='';n.reactionAvailable=true;
    }
    return n;
  }
  E.rules={simulate,apply,rest,blocked,averageDice};
})(Eco);
