'use strict';
/* Ejecutar con: node tests/run.cjs. No requiere paquetes ni red. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
function context(options={}){
 const map=new Map(),localStorage={
  getItem:k=>map.get(k)??null,
  setItem:(k,v)=>{if(options.blocked)throw Error('Storage blocked');map.set(k,v);},
  removeItem:k=>map.delete(k)
 };
 const c=vm.createContext({console,Date,JSON,Math,Map,Set,Object,Number,String,Array,window:{localStorage}});
 c.window.window=c.window;c.Eco={};c.window.Eco=c.Eco;
 for(const f of ['character','rules','state']){
  if(f==='character'){vm.runInContext(fs.readFileSync(path.join(root,'js',f+'.js'),'utf8'),c);c.Eco=c.window.Eco;}
  else vm.runInContext(fs.readFileSync(path.join(root,'js',f+'.js'),'utf8'),c);
 }
 return {E:c.Eco,map,storage:localStorage,c};
}
const {E}=context();
const plan=patch=>Object.assign({action:'unarmed',bonus:'none',distance:5,movement:0,approach:0,allyRange:30,boost:0,fangs:false,terrain:1,context:'combat',reaction:'none',targetInt:null,targetHeard:true,components:true,bardCure:false,hostileNear:false,stand:false,monkReady:true},patch);
const state=patch=>Object.assign(E.store.base(),patch);
const sim=(p={},s={})=>E.rules.simulate(state(s),plan(p));
let passed=0;
function test(name,fn){try{fn();passed++;console.log('OK '+name);}catch(e){console.error('FAIL '+name);throw e;}}
test('Identidad y valores de Eco transcritos',()=>{assert.equal(E.config.character.id,'eco-apeiron');assert.equal(E.config.AB.Des[0],16);assert.equal(E.config.character.level,5);});
test('No hay Ataque Extra en Monje 3',()=>assert.equal(sim().attacks,1));
test('Cimitarra y Artes Marciales conserva excepción registrada',()=>{const r=sim({action:'scimitar',bonus:'martial'});assert.equal(r.valid,true);assert.equal(r.damageAverage,16.5);});
test('Ráfaga permite tres golpes y cuesta un Ki',()=>{const r=sim({bonus:'flurry'});assert.equal(r.attacks,3);assert.equal(r.costs.ki,1);assert.equal(r.damageAverage,16.5);});
test('Conjuro no activa Ráfaga',()=>assert.equal(sim({action:'firebolt',bonus:'flurry'}).valid,false));
test('Arco no activa Artes Marciales',()=>assert.equal(sim({action:'bow',bonus:'martial'},{arrows:5}).valid,false));
test('Martillo no activa Artes Marciales',()=>assert.equal(sim({action:'hammer1',bonus:'martial'}).valid,false));
test('Artes Marciales exige condiciones de equipo',()=>assert.equal(sim({monkReady:false}).valid,false));
test('Arco a 120 pies es válido con advertencia de alcance largo',()=>{const r=sim({action:'bow',distance:120},{arrows:4});assert.equal(r.valid,true);assert.ok(r.warnings.some(x=>x.includes('Alcance largo')));});
test('Arco a 320 pies válido',()=>assert.equal(sim({action:'bow',distance:320},{arrows:1}).valid,true));
test('Arco a 321 pies inválido',()=>assert.equal(sim({action:'bow',distance:321},{arrows:1}).valid,false));
test('Arco no inventa munición desconocida',()=>assert.equal(sim({action:'bow'}).valid,false));
test('Arco sin flechas no puede aplicarse',()=>assert.equal(sim({action:'bow'},{arrows:0}).valid,false));
test('Aplicar arco descuenta una flecha',()=>assert.equal(E.rules.apply(state({arrows:2}),plan({action:'bow'})).state.arrows,1));
test('Toque fuera de alcance es inválido',()=>assert.equal(sim({action:'cure',distance:15}).valid,false));
test('Tasha respeta 30 pies',()=>assert.equal(sim({action:'tasha',distance:31}).valid,false));
test('Tasha no afecta Inteligencia 4',()=>assert.equal(sim({action:'tasha',targetInt:4}).valid,false));
test('Vicious Mockery exige oír',()=>assert.equal(sim({action:'mockery',targetHeard:false}).valid,false));
test('Inspiración respeta alcance de aliado independiente',()=>assert.equal(sim({bonus:'inspire',allyRange:61}).valid,false));
test('Inspiración exige oír',()=>assert.equal(sim({bonus:'inspire',targetHeard:false}).valid,false));
test('Conjuros exigen componentes',()=>assert.equal(sim({action:'firebolt',components:false}).valid,false));
test('Curación desconocida no inventa promedio',()=>{const r=sim({action:'cure'});assert.equal(r.damageAverage,null);assert.equal(r.healingAverage,null);});
test('Curación de Bardo confirmada tiene promedio 5,5 y no es daño',()=>{const r=sim({action:'cure',bardCure:true});assert.equal(r.damageAverage,null);assert.equal(r.healingAverage,5.5);});
test('Fire Bolt escala a 2d10 al nivel total 5',()=>assert.equal(sim({action:'firebolt'}).damageAverage,11));
test('Acercamiento real habilita toque',()=>assert.equal(sim({action:'cure',distance:30,movement:25,approach:25}).valid,true));
test('Acercamiento no puede superar recorrido',()=>assert.equal(sim({distance:30,movement:0,approach:25}).valid,false));
test('Movimiento no supera presupuesto',()=>assert.equal(sim({movement:41}).valid,false));
test('Correr más Paso del Viento permite 120 pies',()=>{const r=sim({action:'dash',bonus:'stepdash',movement:120});assert.equal(r.valid,true);assert.equal(r.moveMax,120);});
test('Terreno difícil duplica coste',()=>assert.equal(sim({movement:21,terrain:2}).valid,false));
test('Agarrada impide desplazamiento',()=>assert.equal(sim({movement:1},{conditions:['Agarrada']}).valid,false));
test('Derribada paga media velocidad al levantarse',()=>{assert.equal(sim({stand:true,movement:20},{conditions:['Derribada']}).valid,true);assert.equal(sim({stand:true,movement:21},{conditions:['Derribada']}).valid,false);});
test('Arrastrarse en terreno difícil cuesta triple',()=>assert.equal(sim({movement:10,terrain:2},{conditions:['Derribada']}).movementCost,30));
test('Agotamiento 2 reduce velocidad',()=>assert.equal(sim({}, {exhaustion:2}).moveMax,20));
test('Incapacitación impide aplicar acciones',()=>{for(const c of ['Incapacitada','Paralizada','Petrificada','Aturdida','Inconsciente'])assert.equal(sim({}, {conditions:[c]}).valid,false);});
test('Cero PG impide actuar',()=>assert.equal(sim({}, {hp:0}).valid,false));
test('Ki insuficiente impide Ráfaga',()=>assert.equal(sim({bonus:'flurry'},{ki:0}).valid,false));
test('Colmillos llega a 15 pies en acción',()=>assert.equal(sim({fangs:true,distance:15}).valid,true));
test('Perfil heredado mantiene golpes adicionales a 5 pies',()=>assert.equal(sim({fangs:true,bonus:'flurry',distance:15}).valid,false));
test('Potenciación exige Colmillos',()=>assert.equal(sim({boost:1}).valid,false));
test('Potenciación no acertada no consume Ki condicional',()=>{const r=E.rules.apply(state(),plan({fangs:true,boost:1}),{boostHits:0});assert.equal(r.state.ki,2);assert.equal(r.spentKi,1);});
test('Potenciación acertada descuenta Ki adicional',()=>assert.equal(E.rules.apply(state(),plan({fangs:true,boost:1}),{boostHits:1}).state.ki,1));
test('Máximo ígneo combina tres ataques y tres Ki',()=>{const r=sim({fangs:true,bonus:'flurry',boost:1});assert.equal(r.valid,true);assert.equal(r.damageAverage,22);assert.equal(E.rules.apply(state(),plan({fangs:true,bonus:'flurry',boost:1}),{boostHits:1}).state.ki,0);});
test('No se puede confirmar más impactos de los planeados',()=>assert.throws(()=>E.rules.apply(state(),plan(),{boostHits:1})));
test('Aplicar vuelve a validar recursos actuales',()=>assert.throws(()=>E.rules.apply(state({ki:0}),plan({bonus:'flurry'}))));
test('Concentración solo se inicia con resolución seleccionada',()=>{assert.equal(E.rules.apply(state({concentration:'Anterior'}),plan({action:'tasha'}),{boostHits:0,concentration:false}).state.concentration,'Anterior');assert.equal(E.rules.apply(state(),plan({action:'tasha'}),{boostHits:0,concentration:true}).state.concentration,"Tasha's Hideous Laughter");});
test('Motor no muta entrada',()=>{const s=state(),before=JSON.stringify(s);E.rules.apply(s,plan({bonus:'flurry'}));assert.equal(JSON.stringify(s),before);});
test('Descanso corto requiere meditación para Ki y no restaura inspiración/espacios',()=>{const s=state({ki:0,slots:0,inspiration:0});const r=E.rules.rest(s,'short',true);assert.equal(r.ki,3);assert.equal(r.slots,0);assert.equal(r.inspiration,0);assert.equal(E.rules.rest(s,'short',false).ki,0);});
test('Descanso largo recupera dos de cinco dados y expira PG temporales',()=>{const s=state({hp:1,ki:0,slots:0,inspiration:0,hitDice:0,tempHp:8,conditions:['Envenenada'],exhaustion:2});const r=E.rules.rest(s,'long',true);assert.equal(r.hitDice,2);assert.equal(r.hp,45);assert.equal(r.tempHp,0);assert.equal(r.slots,3);assert.equal(r.conditions[0],'Envenenada');assert.equal(r.exhaustion,2);});
test('Descanso largo no supera dados máximos',()=>assert.equal(E.rules.rest(state({hitDice:4}),'long',true).hitDice,5));
test('Descanso largo no se automatiza desde 0 PG',()=>assert.throws(()=>E.rules.rest(state({hp:0}),'long',true)));
test('Medias se derivan de fórmulas de dados',()=>{assert.equal(E.rules.averageDice('3d6+2'),12.5);assert.equal(E.rules.averageDice('1d8+4 cortante + 1d4 fuego'),11);assert.equal(E.rules.averageDice('Sin daño'),null);});
test('Esquema v2 hace round trip de todos los datos',()=>{const s=state({tableNotes:'<img src=x onerror=alert(1)>',arrows:20,inventory:'Monedas: sin confirmar',canonNotes:'Nuevo vínculo',conditions:['Cegada'],logs:[{id:'safe-id',date:'2026-10-18',session:'Capítulo 1',type:'Exploración',title:'Hallazgo',body:'Una nota'}]});assert.equal(JSON.stringify(E.store.parse(JSON.stringify(E.store.envelope(s)))),JSON.stringify(s));});
test('Respaldo de otro personaje es rechazado',()=>{const d=E.store.envelope(state());d.characterId='otro';assert.throws(()=>E.store.parse(JSON.stringify(d)));});
test('Esquema futuro es rechazado',()=>{const d=E.store.envelope(state());d.schemaVersion=99;assert.throws(()=>E.store.parse(JSON.stringify(d)));});
test('PG, Ki, condiciones y bitácora malformados son rechazados',()=>{for(const patch of [{hp:-1},{hp:46},{ki:4},{slots:'3'},{conditions:['Inventada']},{logs:'texto'},{exhaustion:7},{maxHp:null}])assert.throws(()=>E.store.validate(state(patch)));});
test('Fechas imposibles en respaldos son rechazadas',()=>assert.throws(()=>E.store.validate(state({logs:[{id:'fecha-id',date:'2026-02-31',session:'',type:'',title:'',body:''}]}))));
test('IDs inyectados en bitácora son rechazados',()=>assert.throws(()=>E.store.validate(state({logs:[{id:"');alert(1)//",date:'2026-10-18',session:'',type:'',title:'',body:''}]}))));
test('Propiedades extra no pasan al estado',()=>{const s=state({evil:'discarded'});assert.equal(Object.hasOwn(E.store.validate(s),'evil'),false);});
test('Migración v1 conserva notas y recursos y no inventa flechas',()=>{const s=state({version:1,hp:12,inventory:'Poción',canonNotes:'Canon heredado'});delete s.arrows;const r=E.store.migrateLegacy(s);assert.equal(r.version,2);assert.equal(r.hp,12);assert.equal(r.inventory,'Poción');assert.equal(r.arrows,null);});
test('Migración no acepta un JSON sin esquema reconocido',()=>assert.throws(()=>E.store.migrateLegacy({hp:10,logs:[]})));
test('Guardado y recarga real con adaptador de almacenamiento',()=>{const {E}=context();E.store.load();const s=E.store.base();s.hp=17;assert.equal(E.store.save(s),true);assert.equal(E.store.load().hp,17);});
test('Almacenamiento bloqueado conserva sesión en memoria',()=>{const {E}=context({blocked:true});const s=E.store.load();assert.equal(s.hp,45);assert.equal(E.store.status.available,false);assert.equal(E.store.save(s),false);});
test('Datos corruptos no se sobreescriben silenciosamente',()=>{const {E,map}=context();map.set(E.store.KEY,'{"roto":true}');const s=E.store.load();assert.equal(E.store.isLocked(),true);assert.equal(E.store.save(s),false);assert.equal(map.get(E.store.KEY),'{"roto":true}');assert.equal(E.store.status.corruptRaw,'{"roto":true}');});
test('Cambios concurrentes no se pisan',()=>{const {E,map}=context();E.store.load();map.set(E.store.KEY,'otra pestaña');assert.equal(E.store.save(E.store.base()),false);assert.equal(map.get(E.store.KEY),'otra pestaña');});
test('Importación explícita puede reemplazar datos corruptos',()=>{const {E,map}=context();map.set(E.store.KEY,'roto');E.store.load();assert.equal(E.store.save(E.store.base(),true),true);assert.equal(E.store.load().hp,45);});
test('Matrices de acciones: todo plan válido queda dentro de recursos',()=>{
 let checked=0;
 for(const [action] of E.config.ACTIONS)for(const [bonus] of E.config.BONUSES)for(const distance of [5,15,80,120,320,321]){
  const p=plan({action,bonus,distance}),s=state({arrows:10}),r=E.rules.simulate(s,p);
  if(r.valid){const next=E.rules.apply(s,p).state;E.store.validate(next);assert.ok(next.ki>=0&&next.slots>=0&&next.inspiration>=0&&next.arrows>=0);}
  checked++;
 }
 assert.equal(checked,882);console.log('  '+checked+' combinaciones comprobadas.');
});
console.log('\n'+passed+' pruebas aprobadas.');
