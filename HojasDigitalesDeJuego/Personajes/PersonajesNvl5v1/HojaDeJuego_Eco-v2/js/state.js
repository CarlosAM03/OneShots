'use strict';
/* Esquema 2, validación estricta y persistencia aislada de otros personajes. */
(function(E) {
 const KEY='eco-apeiron-digital-v2', LEGACY_KEY='eco-apeiron-digital-v1';
 const now=()=>new Date().toISOString();
 const base=()=>({version:2,updated:now(),maxHp:45,hp:45,tempHp:0,ki:3,slots:3,inspiration:1,hitDice:5,arrows:null,deathSuccess:0,deathFail:0,conditions:[],exhaustion:0,reactionAvailable:true,concentration:'',position:'',tableNotes:'',inventory:'Arco ligero\nCimitarra ígnea\nMartillo de guerra\nEquipo de exploración',canonNotes:'',logs:[]});
 function validate(d) {
   if(!d||typeof d!=='object'||Array.isArray(d))throw Error('Estado inválido.');
   if(d.version!==2)throw Error('Versión de estado no compatible.');
   const nums={maxHp:[1,9999],hp:[0,d.maxHp],tempHp:[0,999],ki:[0,3],slots:[0,3],inspiration:[0,1],hitDice:[0,5],deathSuccess:[0,3],deathFail:[0,3],exhaustion:[0,6]};
   for(const [k,[min,max]] of Object.entries(nums))if(!Number.isInteger(d[k])||d[k]<min||d[k]>max)throw Error('Valor fuera de rango: '+k);
   if(d.arrows!==null&&(!Number.isInteger(d.arrows)||d.arrows<0||d.arrows>9999))throw Error('Munición inválida.');
   if(typeof d.reactionAvailable!=='boolean')throw Error('Reacción inválida.');
   if(!Array.isArray(d.conditions)||new Set(d.conditions).size!==d.conditions.length||d.conditions.some(c=>!E.config.CONDITIONS.includes(c)))throw Error('Condiciones inválidas.');
   for(const k of ['updated','concentration','position','tableNotes','inventory','canonNotes'])if(typeof d[k]!=='string'||d[k].length>100000)throw Error('Texto inválido: '+k);
   if(!Number.isFinite(Date.parse(d.updated)))throw Error('Fecha de actualización inválida.');
   if(!Array.isArray(d.logs)||d.logs.length>5000)throw Error('Bitácora inválida o demasiado extensa.');
   const ids=new Set();
   for(const row of d.logs) {
     if(!row||typeof row!=='object'||Array.isArray(row))throw Error('Entrada de bitácora inválida.');
     for(const k of ['id','date','session','type','title','body'])if(typeof row[k]!=='string'||row[k].length>100000)throw Error('Campo inválido de bitácora: '+k);
     if(!/^[a-zA-Z0-9_-]{1,100}$/.test(row.id)||ids.has(row.id))throw Error('ID de bitácora inválido o duplicado.');
     if(!/^\d{4}-\d{2}-\d{2}$/.test(row.date)||(!Number.isFinite(Date.parse(row.date))||new Date(row.date).toISOString().slice(0,10)!==row.date))throw Error('Fecha de entrada inválida.');
     ids.add(row.id);
   }
   const clean=base();
   // Lista blanca: no se propagan propiedades importadas ni __proto__.
   for(const k of Object.keys(clean))clean[k]=k==='logs'?d[k].map(row=>Object.fromEntries(['id','date','session','type','title','body'].map(k=>[k,row[k]]))):k==='conditions'?[...d[k]]:d[k];
   return clean;
 }
 const envelope=s=>({schema:'eco-character-sheet',schemaVersion:2,characterId:'eco-apeiron',campaign:'Apeiron',edition:'5e-2014',exportedAt:now(),state:validate(s)});
 function parse(text) {
   const d=JSON.parse(text);
   if(d?.schema!=='eco-character-sheet'||d.schemaVersion!==2)throw Error('No es un respaldo v2 compatible.');
   if(d.characterId!=='eco-apeiron'||d.campaign!=='Apeiron'||d.edition!=='5e-2014')throw Error('El respaldo no pertenece a Eco de Apeiron (2014).');
   return validate(d.state);
 }
 function migrateLegacy(d) {
   if(!d||d.version!==1||!Array.isArray(d.logs)||typeof d.hp!=='number'||typeof d.inventory!=='string')throw Error('No se reconoce el esquema del prototipo de Eco.');
   const b=base();
   for(const k of Object.keys(b))if(k!=='version'&&Object.hasOwn(d,k))b[k]=d[k];
   b.version=2;
   if(d.conditions?.includes('Exhausta'))b.exhaustion=1;
   b.logs=b.logs.map(x=>({...x,id:String(x.id)}));
   return validate(b);
 }
 let storage=null,baseline=null,locked=false;
 const status={available:false,message:'',corruptRaw:null};
 function load() {
   try {
     storage=window.localStorage;
     const probe=KEY+'-probe';storage.setItem(probe,'1');storage.removeItem(probe);
     baseline=storage.getItem(KEY);
     status.available=true;
     if(baseline) {
       try { const s=parse(baseline);status.message='Estado recuperado del navegador.';return s; }
       catch(e){locked=true;status.corruptRaw=baseline;status.message='Datos guardados no válidos. Se conserva el original; exporta una copia de recuperación o importa un respaldo. '+e.message;return base();}
     }
     status.message='Estado inicial transcrito del prototipo. Aún no hay una sesión guardada de v2.';
     return base();
   }catch(e) {storage=null;status.available=false;status.message='Almacenamiento local bloqueado o lleno. Esta sesión vive en memoria: exporta JSON antes de cerrar.';return base();}
 }
 function save(s,replace=false) {
   validate(s);
   s.updated=now();
   if(!storage)return false;
   try {
     const disk=storage.getItem(KEY);
     if(!replace&&(locked||disk!==baseline)) {
       locked=true;status.message='Hay datos distintos en otra pestaña o un estado inválido conservado. Exporta tu sesión antes de importar un respaldo o recargar.';return false;
     }
     storage.setItem(KEY,JSON.stringify(envelope(s)));
     baseline=storage.getItem(KEY);locked=false;status.corruptRaw=null;
     status.available=true;status.message='Guardado local: '+new Date(s.updated).toLocaleString('es-MX');return true;
   }catch(e){status.available=false;status.message='No se pudo guardar: almacenamiento lleno o bloqueado. Exporta JSON antes de cerrar.';return false;}
 }
 function legacy() {try{return storage?.getItem(LEGACY_KEY)||null;}catch{return null;}}
 function markConflict(){locked=true;status.message='Se detectaron cambios desde otra pestaña. Exporta esta sesión y recarga para recuperar la versión guardada.';}
 E.store={KEY,base,validate,envelope,parse,migrateLegacy,load,save,status,legacy,markConflict,isLocked:()=>locked};
})(Eco);
