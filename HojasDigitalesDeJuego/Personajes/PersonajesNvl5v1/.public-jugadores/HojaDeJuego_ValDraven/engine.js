(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ValCore=api;})(typeof window!=='undefined'?window:globalThis,function(){
  'use strict';
  const ID='val-draven-5e2014-level5', VERSION=1;
  const CFG={level:5,prof:3,dex:2,con:2,cha:4,speed:30,slotLevel:3,maxSlots:2,maxHD:5};
  const CONDITIONS=['Cegada','Hechizada','Ensordecida','Asustada','Agarrada','Incapacitada','Invisible','Paralizada','Petrificada','Envenenada','Tumbada','Apresada','Aturdida','Inconsciente'];
  const ACTIONS={
    luto:{name:'Atacar con Luto',attacks:2,die:8,bonus:CFG.dex,hit:CFG.dex+CFG.prof,range:5,type:'perforante',weapon:'Luto'},
    dagger:{name:'Daga · cuerpo a cuerpo',attacks:1,die:4,bonus:CFG.dex,hit:CFG.dex+CFG.prof,range:5,type:'perforante',weapon:'Daga'},
    throw:{name:'Arrojar una daga',attacks:1,die:4,bonus:CFG.dex,hit:CFG.dex+CFG.prof,range:60,normalRange:20,type:'perforante',weapon:'Daga'},
    blast:{name:'Descarga sobrenatural',attacks:2,die:10,bonus:CFG.cha,hit:CFG.cha+CFG.prof,range:120,type:'fuerza',spell:true,cantrip:true,components:'VS'},
    fireball:{name:'Bola de fuego',spell:true,cost:1,range:150,components:'VSM'},
    darkness:{name:'Oscuridad',spell:true,cost:1,range:60,concentration:'darkness',components:'VM'},
    agathys:{name:'Armadura de Agathys',spell:true,cost:1,self:true,components:'VSM'},
    disguise:{name:'Disfrazarse · invocación',spell:true,self:true,components:'VS'},
    prestidigitation:{name:'Prestidigitación',spell:true,cantrip:true,range:10,components:'VS'},
    hand:{name:'Mano de mago',spell:true,cantrip:true,range:30,components:'VS'},
    pact:{name:'Invocar a Luto (no ataca)',self:true},
    dodge:{name:'Esquivar',self:true},dash:{name:'Correr',self:true},disengage:{name:'Retirarse',self:true},
    help:{name:'Ayudar en un ataque',range:5},hide:{name:'Esconderse',self:true},ready:{name:'Preparar una acción no mágica',self:true},none:{name:'Sin acción',self:true}
  };
  const BONUSES={none:{name:'Sin acción adicional'},hex:{name:'Lanzar Maleficio',spell:true,cost:1,concentration:'hex',range:90,components:'VSM'},transfer:{name:'Trasladar Maleficio activo',range:90},misty:{name:'Paso brumoso',spell:true,cost:1,components:'V'},offhand:{name:'Segunda daga · cuerpo a cuerpo',range:5},offthrow:{name:'Segunda daga · arrojada',range:60}};
  const REACTIONS={none:'No usar reacción',reserve:'Reservar Contrahechizo (sin gasto)',counter:'Contrahechizo · desencadenante ocurrido',opportunity:'Oportunidad con Luto · desencadenante ocurrido'};
  const clone=o=>JSON.parse(JSON.stringify(o));
  function defaultState(data){return {schemaVersion:VERSION,characterId:ID,updatedAt:new Date().toISOString(),campaign:'',hpMax:38,hp:null,temp:null,tempSource:'none',hd:null,slots:null,concentration:'none',hexTarget:'',pendingConcentrationDC:null,agathysActive:false,reactionAvailable:true,turnApplied:false,conditions:[],exhaustion:0,deathSuccess:0,deathFail:0,notes:'',lore:'',position:'',round:1,lastLongRest:null,inventory:(data?.inventory||[]).map((x,i)=>({id:'item-'+i,name:x[0],qty:x[1],notes:x[2],icon:x[3],kind:'Poseído · hoja'})),logs:[]};}
  function validateState(x){
    const fail=msg=>{throw new Error('Respaldo no válido: '+msg);};
    if(!x||typeof x!=='object'||Array.isArray(x)||x.schemaVersion!==VERSION||x.characterId!==ID)fail('versión o personaje diferente.');
    const r={schemaVersion:VERSION,characterId:ID};
    const str=(v,k,max=20000)=>{if(typeof v!=='string'||v.length>max)fail(k);return v;};
    const int=(v,k,lo,hi,nullable=false)=>{if(nullable&&v===null)return null;if(!Number.isInteger(v)||v<lo||v>hi)fail(k);return v;};
    const bool=(v,k)=>{if(typeof v!=='boolean')fail(k);return v;};
    const en=(v,k,a)=>{if(!a.includes(v))fail(k);return v;};
    const date=(v,k,nullable=false)=>{if(nullable&&v===null)return null;str(v,k,40);if(!/^\d{4}-\d{2}-\d{2}T/.test(v)||!Number.isFinite(Date.parse(v)))fail(k);return v;};
    r.updatedAt=date(x.updatedAt,'fecha');r.campaign=str(x.campaign,'campaña',160);r.hpMax=int(x.hpMax,'máximo de PG',1,1000);r.hp=int(x.hp,'PG',0,r.hpMax,true);r.temp=int(x.temp,'PG temporales',0,1000,true);r.hd=int(x.hd,'dados de golpe',0,CFG.maxHD,true);r.slots=int(x.slots,'espacios',0,CFG.maxSlots,true);
    r.tempSource=en(x.tempSource,'origen de PG temporales',['none','manual','agathys','blessing']);r.concentration=en(x.concentration,'concentración',['none','hex','darkness']);r.hexTarget=str(x.hexTarget,'objetivo',200);r.pendingConcentrationDC=int(x.pendingConcentrationDC,'prueba de concentración pendiente',10,50000,true);r.agathysActive=bool(x.agathysActive,'Agathys');r.reactionAvailable=bool(x.reactionAvailable,'reacción');r.turnApplied=bool(x.turnApplied,'turno');
    if(r.agathysActive&&(r.tempSource!=='agathys'||!r.temp||r.temp>5*CFG.slotLevel))fail('PG de Agathys incoherentes.');
    if(!Array.isArray(x.conditions)||x.conditions.length>CONDITIONS.length||new Set(x.conditions).size!==x.conditions.length||!x.conditions.every(c=>CONDITIONS.includes(c)))fail('condiciones');r.conditions=[...x.conditions];
    r.exhaustion=int(x.exhaustion,'agotamiento',0,6);r.deathSuccess=int(x.deathSuccess,'éxitos de muerte',0,3);r.deathFail=int(x.deathFail,'fallos de muerte',0,3);r.notes=str(x.notes,'notas',50000);r.lore=str(x.lore,'lore',100000);r.position=str(x.position,'posición',1000);r.round=int(x.round,'turno',1,999999);r.lastLongRest=date(x.lastLongRest,'último descanso',true);
    if(!Array.isArray(x.inventory)||x.inventory.length>500)fail('inventario');
    r.inventory=x.inventory.map(i=>({id:str(i.id,'ID de objeto',100),name:str(i.name,'nombre de objeto',200),qty:int(i.qty,'cantidad',0,99999),notes:str(i.notes,'notas del objeto',5000),icon:en(i.icon,'icono',['armor','sword','dagger','focus','bag','book','amulet']),kind:en(i.kind,'procedencia',['Poseído · hoja','Poseído · añadido','Personalizado','Referencia · no poseído'])}));
    if(new Set(r.inventory.map(i=>i.id)).size!==r.inventory.length)fail('IDs de inventario duplicados');
    if(!Array.isArray(x.logs)||x.logs.length>3000)fail('bitácora');
    r.logs=x.logs.map(l=>({id:str(l.id,'ID de entrada',100),date:str(l.date,'fecha de entrada',10),session:str(l.session,'sesión',120),type:en(l.type,'tipo de entrada',['Combate','Exploración','Relación','Descubrimiento','Recompensa','Decisión del DM','Otro']),title:str(l.title,'título',200),body:str(l.body,'contenido',30000),continuity:str(l.continuity,'continuidad',10000)}));
    if(r.logs.some(l=>!/^\d{4}-\d{2}-\d{2}$/.test(l.date)||!Number.isFinite(Date.parse(l.date))||new Date(l.date).toISOString().slice(0,10)!==l.date)||new Set(r.logs.map(l=>l.id)).size!==r.logs.length)fail('fechas o IDs de bitácora');
    if(r.concentration!=='none'&&(r.hp===0||r.conditions.some(c=>['Incapacitada','Paralizada','Petrificada','Aturdida','Inconsciente'].includes(c))||r.exhaustion>=6||r.deathFail>=3))fail('concentración incompatible con el estado registrado');
    return r;
  }
  function effectiveConditions(s){return [...new Set([...s.conditions,...(s.hp===0?['Inconsciente']:[])])];}
  function simulate(s,i){
    const errors=[],warnings=[],details=[];const a=ACTIONS[i.action],b=BONUSES[i.bonus];
    const result={errors,warnings,details,valid:false,cost:0,reserved:0,attacks:0,average:null,damage:'Sin daño directo',distance:0,speed:0,moveCost:0,concentration:s.concentration,hex:false,action:a?.name,bonus:b?.name,reaction:REACTIONS[i.reaction]};
    if(!a||!b||!REACTIONS[i.reaction]){errors.push('Selecciona opciones de turno válidas.');return result;}
    const nums=['distance','move','teleport','reactionDistance','enemySpellLevel'];
    for(const n of nums)if(typeof i[n]!=='number'||!Number.isFinite(i[n])||i[n]<0||i[n]>10000){errors.push('Introduce distancias y nivel válidos.');return result;}
    const c=effectiveConditions(s),incap=c.some(v=>['Incapacitada','Paralizada','Petrificada','Aturdida','Inconsciente'].includes(v))||s.exhaustion>=6||s.deathFail>=3;
    if(incap&&(i.action!=='none'||i.bonus!=='none'||['counter','opportunity','reserve'].includes(i.reaction)))errors.push('El estado actual impide acciones, acciones adicionales y reacciones.');
    if(s.pendingConcentrationDC!==null)errors.push('Resuelve la prueba de concentración pendiente en Mesa antes de aplicar otro turno.');
    if(s.turnApplied)errors.push('Este turno ya fue aplicado. Inicia el siguiente turno en Mesa para volver a aplicar.');
    if(s.hp===null||s.temp===null)errors.push('Registra PG actuales y PG temporales en Mesa antes de aplicar un turno.');
    let speed=CFG.speed;if(s.exhaustion>=2)speed/=2;
    if(c.some(v=>['Agarrada','Apresada','Paralizada','Petrificada','Aturdida','Inconsciente'].includes(v))||s.exhaustion>=5)speed=0;
    let multiplier=1+(i.difficult?1:0)+(c.includes('Tumbada')&&!i.stand?1:0);
    let moveCost=i.move*multiplier+(i.stand&&c.includes('Tumbada')?speed/2:0);
    if(i.stand&&c.includes('Tumbada')&&speed===0)errors.push('No puedes levantarte con velocidad 0.');
    const budget=speed*(i.action==='dash'?2:1);result.speed=budget;result.moveCost=moveCost;
    if(moveCost>budget)errors.push('El movimiento cuesta '+moveCost+' pies; solo dispones de '+budget+'.');
    let distance=i.direction==='away'?i.distance+i.move:i.direction==='lateral'?i.distance:Math.max(0,i.distance-i.move);
    if(i.bonus==='misty'){
      if(i.teleport>CFG.speed)errors.push('Paso brumoso permite teleportarse como máximo 30 pies.');
      if(!i.destinationVisible)errors.push('Paso brumoso exige un destino visible y desocupado.');
      distance=i.teleportDirection==='away'?distance+i.teleport:Math.max(0,distance-i.teleport);
      details.push('Teleportación '+i.teleport+' pies; se resuelve antes de la acción y no cuesta movimiento.');
    }
    result.distance=distance;
    if(!a.self&&distance>a.range)errors.push(a.name+': alcance '+a.range+' pies; distancia final '+distance+'.');
    if(b.range&&distance>b.range)errors.push(b.name+': alcance '+b.range+' pies.');
    if(i.action==='throw'&&distance>a.normalRange)warnings.push('Daga a alcance largo: desventaja (más de 20 pies, hasta 60).');
    if(a.weapon){
      const item=s.inventory.find(x=>x.name.toLowerCase()===a.weapon.toLowerCase()&&x.kind!=='Referencia · no poseído'&&x.qty>0);
      if(!item)errors.push('No hay '+a.weapon+' disponible en el inventario poseído. Si cambiaste su nombre, restáuralo para usar este ataque.');
      if(i.action==='luto'&&!i.weaponReady)errors.push('Luto debe estar en mano. Invocarlo consume una acción y no permite atacar con él en la misma acción.');
    }
    const twoWeapons=['offhand','offthrow'].includes(i.bonus);
    if(twoWeapons){
      if(!['dagger','throw'].includes(i.action))errors.push('Dos armas exige la acción Atacar con una daga ligera; Luto no es ligera y un conjuro no habilita este ataque.');
      if(!i.offhandReady)errors.push('Confirma que sostienes una daga en cada mano al hacer los ataques.');
      const qty=s.inventory.filter(x=>x.name==='Daga'&&x.kind!=='Referencia · no poseído').reduce((n,x)=>n+x.qty,0);
      if(qty<2)errors.push('Necesitas dos dagas disponibles, una en cada mano.');
      if(i.bonus==='offthrow'&&distance>20)warnings.push('La segunda daga arrojada tiene desventaja más allá de 20 pies.');
      details.push('Segunda daga: ataque adicional 1d20 + 5; 1d4 perforante SIN sumar Destreza al daño. Se resuelve después de la acción.');
    }
    if(b.spell&&a.spell&&!a.cantrip)errors.push('Regla 2014: tras un conjuro de acción adicional solo puedes lanzar un truco de una acción en ese turno.');
    if(i.action==='help'&&!i.helpPossible)errors.push('Ayudar en un ataque requiere poder distraer al enemigo y un aliado que aproveche la ayuda.');
    if(i.action==='hide'&&!i.hidePossible)errors.push('El DM debe confirmar que puedes esconderte en esta situación.');
    if(i.action==='ready'&&!String(i.context||'').trim())errors.push('Describe qué acción no mágica preparas y su desencadenante.');
    if(i.action==='ready'&&i.reaction!=='none')errors.push('Preparar usa tu reacción al activarse: elige Sin reacción para no reservar otra reacción simultánea.');
    if(i.action==='ready'&&!s.reactionAvailable)errors.push('No tienes reacción disponible para ejecutar la acción preparada antes del próximo turno.');
    if(i.action==='ready')warnings.push('Se prepara una acción no mágica. Fuera de tu turno Luto solo hace un ataque. El desencadenante se confirma en mesa.');
    if(c.includes('Cegada')&&(['hex','transfer','misty'].includes(i.bonus)||i.reaction==='counter'||i.reaction==='opportunity'))errors.push('Cegada: no puedes cumplir el requisito de ver de esta capacidad.');
    if(c.includes('Hechizada')&&(a.attacks||i.action==='fireball'||i.bonus==='hex')&&!i.charmSafe)errors.push('Confirma con el DM que el objetivo del ataque o efecto dañino no es tu encantador.');
    if(c.includes('Asustada')&&(i.move>0||i.bonus==='misty')&&!i.fearSafe)errors.push('Confirma con el DM que este movimiento no te acerca voluntariamente a la fuente del miedo.');
    if(!i.pathClear&&!a.self)errors.push('El objetivo tiene cobertura total o no hay trayectoria válida. Resuelve la cobertura antes de aplicar.');
    const spells=[a,b,...(i.reaction==='counter'?[{components:'S'}]:[])];
    if(spells.some(v=>v.components?.includes('V'))&&!i.canSpeak)errors.push('Un conjuro elegido exige componentes verbales: debes poder hablar.');
    if(spells.some(v=>/[SM]/.test(v.components||''))&&!i.components)errors.push('Faltan una mano libre o los componentes/foco exigidos. Luto no es un foco confirmado.');
    if(['hex','transfer'].includes(i.bonus)&&!i.visible)errors.push('Maleficio requiere ver al objetivo.');
    if(['hex','transfer'].includes(i.bonus)&&!String(i.target||'').trim())errors.push('Escribe el objetivo de Maleficio para poder seguirlo.');
    if(i.bonus==='transfer'&&(s.concentration!=='hex'||!i.previousTargetZero))errors.push('Para trasladar Maleficio debes mantenerlo y su objetivo anterior debe haber caído a 0 PG en un turno anterior.');
    result.concentration=a.concentration||b.concentration||s.concentration;
    result.hex=(result.concentration==='hex')&&(i.bonus==='hex'||i.bonus==='transfer'||i.hexOnTarget);
    if((a.concentration||b.concentration)&&s.concentration!=='none')warnings.push('El nuevo lanzamiento termina la concentración anterior, incluso si vuelves a lanzar Maleficio.');
    if(i.hexOnTarget&&s.concentration!=='hex'&&i.bonus!=='hex'&&i.bonus!=='transfer')warnings.push('Maleficio no está activo: no se suma daño necrótico.');
    result.cost=(a.cost||0)+(b.cost||0)+(i.reaction==='counter'?1:0);
    result.reserved=i.reaction==='reserve'?1:0;
    if(result.cost+result.reserved>0){
      if(s.slots===null)errors.push('Registra tus espacios restantes en Mesa.');
      else if(result.cost+result.reserved>s.slots)errors.push('Necesitas '+result.cost+' espacio(s) de consumo y '+result.reserved+' de reserva; quedan '+s.slots+'.');
    }
    if(i.reaction!=='none'&&!s.reactionAvailable)errors.push('Tu reacción ya está gastada hasta tu siguiente turno.');
    if(i.reaction==='counter'){
      if(!i.reactionTrigger)errors.push('Confirma que viste a una criatura lanzar un conjuro.');
      if(i.reactionDistance>60)errors.push('Contrahechizo solo alcanza 60 pies.');
      if(i.reactionTiming==='same'&&b.spell)errors.push('No puedes lanzar Contrahechizo en tu turno tras un conjuro de acción adicional.');
      if(i.enemySpellLevel<1||i.enemySpellLevel>9||!Number.isInteger(i.enemySpellLevel))errors.push('Indica nivel de conjuro enemigo de 1 a 9.');
      details.push(i.enemySpellLevel<=CFG.slotLevel?'Contrahechizo: cancela el lanzamiento de nivel 3 o inferior.':'Contrahechizo: prueba 1d20 + '+CFG.cha+' contra CD '+(10+i.enemySpellLevel)+', sin competencia.');
    }
    if(i.reaction==='reserve')warnings.push('Reacción solo prevista: no se consume espacio ni reacción al aplicar. Registra el gasto cuando ocurra el lanzamiento enemigo.');
    if(i.reaction==='opportunity'){
      if(!i.reactionTrigger||!i.visible)errors.push('Confirma que ves a una criatura salir voluntariamente de tu alcance sin Retirarse.');
      if(i.reactionDistance>5)errors.push('La oportunidad ocurre antes de salir del alcance de 5 pies.');
      if(!i.weaponReady||!s.inventory.some(x=>x.name==='Luto'&&x.qty>0&&x.kind!=='Referencia · no poseído'))errors.push('Luto debe estar disponible y en mano para la oportunidad.');
      details.push('Reacción separada: UN ataque con Luto, 1d20 + 5; 1d8 + 2 perforante (media 6,5 al impactar). Maleficio solo se añade si esa criatura es el objetivo maldito; no se presupone.');
    }
    if(a.attacks){
      result.attacks=a.attacks;result.hit=a.hit;
      result.average=a.attacks*((a.die+1)/2+a.bonus+(result.hex?3.5:0));
      result.damage=a.attacks+' × (1d'+a.die+' + '+a.bonus+' '+a.type+(result.hex?' + 1d6 necrótico':'')+')';
      if(twoWeapons){result.attacks++;result.average+=(4+1)/2+(result.hex?3.5:0);result.damage+='; segunda daga: 1d4 perforante'+(result.hex?' + 1d6 necrótico':'');}
      details.push(a.attacks+' tirada(s) de ataque, cada una 1d20 + '+a.hit+'. Alcance '+a.range+' pies.');
      if(i.action==='blast'&&i.hostileNear)warnings.push('Descarga: desventaja si un hostil que puede verte y no está incapacitado está a 5 pies.');
      if(c.includes('Envenenada')||c.includes('Apresada')||(c.includes('Tumbada')&&!i.stand)||s.exhaustion>=3)warnings.push('Tu estado impone desventaja en ataques; otras ventajas pueden anularla.');
      if(c.includes('Cegada')||!i.visible)warnings.push('Objetivo no visto: normalmente desventaja. Si tampoco te ve, ventaja y desventaja se anulan; confirma posición, cobertura y visibilidad con el DM.');
      if(c.includes('Asustada'))warnings.push('Asustada: no puedes acercarte voluntariamente a la fuente del miedo; si la ves, desventaja en ataques y pruebas. Confirma si este objetivo es esa fuente.');
      if(c.includes('Hechizada'))warnings.push('Hechizada: no puedes atacar al encantador ni dirigirle efectos dañinos. Confirma quién es tu objetivo.');
    } else if(i.action==='fireball'){
      result.average=8*(6+1)/2;result.damage='8d6 de fuego · por criatura que falla DES CD '+(8+CFG.prof+CFG.cha);
      warnings.push('Esfera de radio 20 pies: puede afectar aliados. Sin Maleficio. Salvación exitosa reduce a la mitad del resultado real, redondeada hacia abajo.');
    }
    if(i.action==='agathys')details.push((5*CFG.slotLevel)+' PG temporales de Agathys; '+(5*CFG.slotLevel)+' frío por impacto cuerpo a cuerpo mientras conserves esos PG. Debes elegir si sustituyes los anteriores.');
    if(i.action==='darkness')warnings.push('Oscuridad afecta también a Val: visión en la oscuridad no ve a través de oscuridad mágica. No se asigna ventaja automática.');
    if(i.move>0&&i.action!=='disengage')warnings.push('Moverte fuera del alcance enemigo puede provocar oportunidades. Paso brumoso no las provoca.');
    if(i.action==='dodge'&&speed===0)warnings.push('Con velocidad 0 no obtienes los beneficios de Esquivar.');
    if(c.includes('Hechizada')&&!a.attacks&&i.action==='fireball')warnings.push('No puedes dirigir efectos dañinos al encantador.');
    if(s.exhaustion>=4)warnings.push('Agotamiento 4+: tu máximo efectivo de PG se reduce a la mitad. Mesa conserva el máximo base; aplica el límite efectivo al curar.');
    warnings.push('Promedio condicionado a impactos normales o salvación fallida; sin críticos, probabilidad de impacto, resistencias ni daño real.');
    result.valid=errors.length===0;return result;
  }
  function applyTurn(s,i,replaceTemp=true){const r=simulate(s,i);if(!r.valid)throw new Error(r.errors.join('\n'));const next=clone(s);if(r.cost)next.slots-=r.cost;if(['counter','opportunity'].includes(i.reaction))next.reactionAvailable=false;next.concentration=r.concentration;if(['hex','transfer'].includes(i.bonus))next.hexTarget=i.target.trim();if(next.concentration!=='hex')next.hexTarget='';if(i.action==='agathys'&&replaceTemp){next.temp=5*CFG.slotLevel;next.tempSource='agathys';next.agathysActive=true;}if(i.stand)next.conditions=next.conditions.filter(c=>c!=='Tumbada');const thrown=(i.action==='throw'?1:0)+(i.bonus==='offthrow'?1:0);for(let n=0;n<thrown;n++){const item=next.inventory.find(x=>x.name==='Daga'&&x.qty>0&&x.kind!=='Referencia · no poseído');item.qty--;}next.turnApplied=true;next.updatedAt=new Date().toISOString();return next;}
  function effectiveMax(s){return s.exhaustion>=4?Math.floor(s.hpMax/2):s.hpMax;}
  function receiveDamage(s,n,fire=false,melee=false){if(s.hp===null||s.temp===null)throw new Error('Registra PG y PG temporales primero.');if(s.pendingConcentrationDC!==null)throw new Error('Resuelve la prueba de concentración pendiente antes de aplicar otra fuente de daño.');if(!Number.isInteger(n)||n<0||n>100000)throw new Error('Daño no válido.');const next=clone(s),damage=(fire||s.conditions.includes('Petrificada'))?Math.floor(n/2):n,retaliation=melee&&damage>=0&&n>0&&s.agathysActive&&s.temp>0?5*CFG.slotLevel:0;const absorption=Math.min(s.temp,damage);next.temp-=absorption;const hpDamage=damage-absorption;next.hp=Math.max(0,s.hp-hpDamage);if(next.temp===0){next.agathysActive=false;next.tempSource='none';}if(s.hp===0&&damage>0)next.deathFail=Math.min(3,next.deathFail+1);if(hpDamage>=s.hp+effectiveMax(s))next.deathFail=3;if(next.hp===0){next.concentration='none';next.hexTarget='';}const dc=s.concentration!=='none'&&next.hp>0&&damage>0?Math.max(10,Math.floor(damage/2)):null;next.pendingConcentrationDC=dc;return {state:next,damage,absorption,retaliation,concentrationDC:dc};}
  function longRest(s,now=Date.now(),foodAndWater=true){if(s.hp===null||s.hp<1||s.hd===null||s.deathFail>=3||s.exhaustion>=6)throw new Error('El descanso largo requiere PG iniciales ≥1, dados restantes registrados y no haber muerto.');const next=clone(s);if(next.exhaustion>0&&foodAndWater)next.exhaustion--;next.hp=effectiveMax(next);next.slots=CFG.maxSlots;next.hd=Math.min(CFG.maxHD,next.hd+Math.max(1,Math.floor(CFG.level/2)));next.temp=0;next.tempSource='none';next.agathysActive=false;next.lastLongRest=new Date(now).toISOString();next.concentration='none';next.hexTarget='';next.pendingConcentrationDC=null;next.deathSuccess=0;next.deathFail=0;return next;}
  return {ID,VERSION,CFG,CONDITIONS,ACTIONS,BONUSES,REACTIONS,clone,defaultState,validateState,effectiveConditions,simulate,applyTurn,effectiveMax,receiveDamage,longRest};
});
