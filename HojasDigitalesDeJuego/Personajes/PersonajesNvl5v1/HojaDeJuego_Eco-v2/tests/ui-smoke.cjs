'use strict';
/* Prueba de arranque e integración con un DOM mínimo en memoria, sin navegador.
   Ejecutar: node tests/ui-smoke.cjs. No verifica layout ni APIs reales del navegador. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const nodes=new Map(),documentEvents={},windowEvents={},storageMap=new Map();
const attrs=text=>Object.fromEntries([...text.matchAll(/([\w-]+)(?:="([^"]*)")?/g)].map(m=>[m[1],m[2]??'']));
class Element {
 constructor(tag,a={}){
  this.tagName=tag;this.id=a.id;this.value=a.value??'';this.checked=Object.hasOwn(a,'checked');this.disabled=Object.hasOwn(a,'disabled');this.hidden=false;this.open=false;
  this.dataset=Object.fromEntries(Object.entries(a).filter(([k])=>k.startsWith('data-')).map(([k,v])=>[k.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase()),v]));
  const classes=new Set((a.class||'').split(' '));
  this.classList={toggle:(key,on)=>on?classes.add(key):classes.delete(key),add:key=>classes.add(key),remove:key=>classes.delete(key),contains:key=>classes.has(key)};
  this.events={};this.attributes=a;this._html='';this.textContent='';
 }
 addEventListener(name,fn,options={}){(this.events[name]??=[]).push({fn,once:options.once});}
 fire(name,event){for(const item of [...(this.events[name]||[])]){item.fn(event);if(item.once)this.events[name]=this.events[name].filter(x=>x!==item);}}
 set innerHTML(s){this._html=s;parse(s);if(this.tagName==='select'&&s.includes('<option'))this.value=s.match(/<option[^>]*value="([^"]*)"/)?.[1]??'';}
 get innerHTML(){return this._html;}
 setAttribute(k,v){this.attributes[k]=v;}
 insertAdjacentHTML(_position,s){parse(s);}
 closest(selector){if(selector==='[data-command]')return this.dataset.command?this:null;if(selector==='[data-adjust]')return this.dataset.adjust?this:null;if(selector==='[data-delete-log]')return this.dataset.deleteLog?this:null;return checks;}
 focus(){}
 click(){}
 append(){}
 remove(){}
 showModal(){this.open=true;}
 close(value='cancel'){this.returnValue=value;this.open=false;this.fire('close',{});}
}
function parse(s){for(const m of s.matchAll(/<([a-z][a-z0-9]*)\b([^>]*)>/gi)){const a=attrs(m[2]);if(a.id)nodes.set(a.id,new Element(m[1],a));}}
parse(html);
for(const m of html.matchAll(/<select\b([^>]*)>([\s\S]*?)<\/select>/gi)){
 const a=attrs(m[1]),select=nodes.get(a.id);
 if(select)select.value=m[2].match(/<option[^>]*value="([^"]*)"/)?.[1]??m[2].match(/<option[^>]*>([^<]*)/)?.[1]??'';
}
const checks=new Element('div');
const tabs=[...html.matchAll(/<button class="tab[^"]*"[^>]*data-tab="([^"]+)"/g)].map(m=>new Element('button',{'data-tab':m[1]}));
const panels=['ficha','lore','reglas','simulador','sesion','bitacora','oficialidad'].map(id=>nodes.get(id));
const tabContainer=new Element('nav'),combat=Array.from({length:6},()=>new Element('b'));
const document={
 getElementById:id=>nodes.get(id)||null,
 querySelectorAll:selector=>selector==='.tab'?tabs:selector==='.view'?panels:selector==='#combatStats .statbox b'?combat:[],
 querySelector:selector=>selector==='.tabs'?tabContainer:selector.startsWith('.tab[data-tab=')?tabs.find(t=>selector.includes('"'+t.dataset.tab+'"')):null,
 addEventListener:(name,fn)=>(documentEvents[name]??=[]).push(fn),
 createElement:tag=>new Element(tag),body:new Element('body')
};
const sandbox={console,Date,JSON,Math,Map,Set,Object,Number,String,Array,document,Blob,URL,crypto:require('node:crypto').webcrypto,navigator:{},matchMedia:()=>({matches:false}),setTimeout:()=>0,clearTimeout:()=>{}};
sandbox.window=sandbox;sandbox.scrollTo=()=>{};
sandbox.localStorage={getItem:k=>storageMap.get(k)??null,setItem:(k,v)=>storageMap.set(k,v),removeItem:k=>storageMap.delete(k)};
sandbox.addEventListener=(name,fn)=>(windowEvents[name]??=[]).push(fn);
vm.createContext(sandbox);
for(const file of ['character','rules','state','app'])vm.runInContext(fs.readFileSync(path.join(root,'js',file+'.js'),'utf8'),sandbox,{filename:file+'.js'});
const E=sandbox.Eco,$=id=>nodes.get(id);
function command(name,value){const target=new Element('button',{'data-command':name,'data-value':value});for(const fn of documentEvents.click)fn({target});}
function inputField(id,value){const target=$(id);target.value=value;target.dataset.field=id;for(const fn of documentEvents.input)fn({target});}
const tick=async()=>{await Promise.resolve();await Promise.resolve();await Promise.resolve();};
(async()=>{
 assert.equal(E.app.getSimulation().valid,true);
 assert.equal(E.app.getSimulation().damageAverage,5.5);
 assert.equal(combat[0].textContent,15);assert.equal(combat[4].textContent,13);
 assert.ok($('spellTable').innerHTML.includes('Spare the Dying'));
 assert.ok($('weaponTable').innerHTML.includes('1d8+4 cortante + 1d4 fuego'));
 for(const id of ['ficha','lore','reglas','simulador','sesion','bitacora','oficialidad']){command('go',id);assert.equal($(id).hidden,false);assert.equal(panels.filter(p=>!p.hidden).length,1);}
 inputField('inventory','Poción de mesa\nFlechas según conteo');assert.ok(E.app.getState().inventory.includes('Poción'));
 inputField('canonNotes','Vínculo registrado <script>alert(1)</script>');assert.ok(E.app.getState().canonNotes.includes('<script>'));
 $('logDate').value='2026-10-18';$('logTitle').value='<img src=x onerror=alert(1)>';$('logBody').value='Texto de prueba';$('logSession').value='Sesión 1';$('logType').value='Exploración';
 command('addLog');assert.equal(E.app.getState().logs.length,1);assert.ok($('logs').innerHTML.includes('&lt;img'));assert.ok(!$('logs').innerHTML.includes('<img src=x'));
 const resource=$('resource-arrows');resource.value='5';resource.dataset.resource='arrows';$('resources').fire('change',{target:resource});
 command('preset','bow');assert.equal(E.app.getSimulation().valid,true);assert.ok(E.app.getSimulation().warnings.some(w=>w.includes('Alcance largo')));
 command('applyTurn');assert.equal($('confirmDialog').open,true);$('confirmDialog').close('cancel');await tick();assert.equal(E.app.getState().arrows,5);
 command('applyTurn');$('confirmDialog').close('ok');await tick();assert.equal(E.app.getState().arrows,4);
 command('preset','max');assert.equal(E.app.getSimulation().valid,true);
 command('applyTurn');assert.equal($('confirmedBoosts').value,'0');$('confirmedBoosts').value='0';$('confirmDialog').close('ok');await tick();assert.equal(E.app.getState().ki,1);
 const before=E.app.getState().logs.length;
 command('wipeAll');$('confirmDialog').close('cancel');await tick();assert.equal(E.app.getState().logs.length,before);
 assert.equal(E.store.parse(storageMap.get(E.store.KEY)).ki,1);
 const reloadContext={...sandbox,Eco:undefined};reloadContext.window=reloadContext;vm.createContext(reloadContext);
 for(const file of ['character','rules','state'])vm.runInContext(fs.readFileSync(path.join(root,'js',file+'.js'),'utf8'),reloadContext);
 assert.equal(reloadContext.Eco.store.load().ki,1);
 console.log('OK arranque de los 4 scripts, 7 pestañas y tablas desde configuración.');
 console.log('OK edición de inventario/lore, bitácora escapada, guardado y recarga.');
 console.log('OK cancelación y confirmación de turno, flechas y Ki condicional; cancelación de borrado.');
 console.log('DOM simulado: no sustituye pruebas visuales ni compatibilidad de navegador.');
})().catch(e=>{console.error(e);process.exitCode=1;});
