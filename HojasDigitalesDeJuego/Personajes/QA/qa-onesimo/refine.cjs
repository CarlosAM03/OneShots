const fs=require('node:fs'),path=require('node:path'),root=path.resolve(__dirname,'../HojaDeJuego_Onesimo');
function edit(file,pairs){let s=fs.readFileSync(path.join(root,file),'utf8');for(const[a,b]of pairs){if(!s.includes(a))throw new Error('Replacement missing: '+a.slice(0,100));s=s.replace(a,b);}fs.writeFileSync(path.join(root,file),s);}
edit('engine.js',[
 ["inventory:clone(data?.inventory||[]),logs:[],fog:","inventory:clone(data?.inventory||[]),logs:[],logDraft:{date:'',session:'',type:'Exploración',title:'',body:'',continuity:''},fog:"],
 ["if(r.pendingConcentrationDC!==null&&r.concentration==='none')", "if(!x.logDraft||typeof x.logDraft!=='object')fail('borrador');r.logDraft={date:str(x.logDraft.date,'fecha borrador',10),session:str(x.logDraft.session,'sesión borrador',120),type:en(x.logDraft.type,'tipo borrador',['Combate','Exploración','Relación','Descubrimiento','Recompensa','Decisión del DM','Otro']),title:str(x.logDraft.title,'título borrador',200),body:str(x.logDraft.body,'contenido borrador',30000),continuity:str(x.logDraft.continuity,'continuidad borrador',10000)};\n+ if(r.pendingConcentrationDC!==null&&r.concentration==='none')"],
 ["const v=speed(c,CFG.speed,s.exhaustion),standCost=i.stand&&c.includes('Tumbado')?v/2:0;", "const v=speed(c,CFG.speed,s.exhaustion),standCost=i.stand&&c.includes('Tumbado')?Math.floor(v/2):0;"],
 ["if(c.includes('Hechizado')&&(isAttack||i.bonus==='mark')", "if(c.includes('Asustado')&&isAttack)warnings.push('Asustado: desventaja en ataques si ves la fuente del miedo; confirma si hay línea de visión.');\n+ if(c.includes('Hechizado')&&(isAttack||i.bonus==='mark')"],
 ["n.fog.bondActive=!!i.summonBond;", "n.fog.bondActive=!!i.summonBond;"],
 ["if(r.fog.status==='active'&&(r.fog.hp===0||r.fog.remainingMinutes===0))", "if(r.fog.bondActive&&r.fog.status!=='active')fail('vínculo activo sin compañero activo en esta configuración');\n+ if(r.fog.status==='active'&&(r.fog.hp===null||r.fog.hp===0||r.fog.remainingMinutes===0))"]
].filter(([a,b])=>a!==b));
edit('app.js',[
 ["No afecta a Val Draven, Eco u otros personajes.","No afecta a otros personajes."],
 ["const damage", "const damage"]
].filter(([a,b])=>a!==b));
for(const file of [path.join(root,'style.css'),path.join(__dirname,'extra.css')]){let s=fs.readFileSync(file,'utf8');s=s.replaceAll('repeat(3,minmax(0,1fr)))}','repeat(3,minmax(0,1fr))}');fs.writeFileSync(file,s);}
console.log('Esquema de borrador, validación y ajustes CSS completados.');
