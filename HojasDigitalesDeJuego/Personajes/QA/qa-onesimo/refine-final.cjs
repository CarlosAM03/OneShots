const fs=require('node:fs'),path=require('node:path'),root=path.resolve(__dirname,'../HojaDeJuego_Onesimo');
function edit(file,pairs,base=root){let s=fs.readFileSync(path.join(base,file),'utf8');for(const[a,b]of pairs){if(!s.includes(a))throw new Error('Replacement missing: '+file+' '+a.slice(0,100));s=s.replace(a,b);}fs.writeFileSync(path.join(base,file),s);}
edit('engine.js',[
 [" if(r.fog.bondActive&&r.fog.status!=='active')fail('vínculo activo sin compañero activo en esta configuración');\n",''],
 ["n.fog.status='absent';n.fog.bondActive=false;n.fog.remainingMinutes=0;", "n.fog.status='absent';n.fog.remainingMinutes=0;"],
 ["n.fog.status='absent';n.fog.bondActive=false;n.fog.remainingMinutes=0;", "n.fog.status='absent';n.fog.remainingMinutes=0;"]
]);
edit('app.js',[
 ["if(status!=='active'&&bond)throw new Error('Para registrar vínculo activo, registra primero a Fogini como invocado; si vuestra regla permite otra cosa, anótala como pendiente del DM.');",''],
 ["Fogini desapareció a 0 PG; vínculo finalizado en el registro.","Fogini desapareció a 0 PG. El vínculo sigue como estaba registrado: confirma con el DM si continúa o finaliza y actualízalo manualmente."],
 ["El paso de al menos la duración del efecto termina la invocación y el vínculo. No cura a Fogini.","La duración de una hora termina la invocación durante el descanso; el vínculo se conserva como registro manual hasta que confirmes su final con el DM. No cura a Fogini."],
 ["No restaura sus PG.</div>","No restaura sus PG ni decide automáticamente si el vínculo continúa.</div>"],
 ["El descanso largo recupera usos, no cura al compañero automáticamente. Finalizar no devuelve usos.","El descanso largo recupera usos, no cura al compañero automáticamente. El vínculo se registra por separado: su persistencia al desaparecer Fogini no está especificada. Finalizar no devuelve usos."],
 ["Resistencia al fuego de Onésimo',state.fog.bondActive?'Activa por vínculo':'No registrada activa'", "Resistencia al fuego de Onésimo',state.fog.bondActive?'Vínculo registrado activo':'No registrada activa'"],
 ["Fogini, sus PG de aparición", "Fogini, sus PG de aparición"]
].filter(([a,b])=>a!==b));
fs.appendFileSync(path.join(root,'style.css'),'\n.hero-portrait img{position:absolute;width:230%;height:auto;max-width:none;left:-38%;top:-8%;object-fit:initial;transform:none;border-radius:0}\n');
edit('mechanics.test.cjs',[
 ["assert.equal(n.fog.bondActive,false);assert.equal(n.fog.uses,2);", "assert.equal(n.fog.bondActive,true);assert.equal(n.fog.uses,2);"],
 ["test('Estado inicial y JSON sin recursos son válidos',()=>assert.deepEqual(C.validate(JSON.parse(JSON.stringify(C.initial(D)))),C.initial(D)));", "test('Estado inicial y JSON sin recursos son válidos',()=>{const s=C.initial(D);assert.deepEqual(C.validate(JSON.parse(JSON.stringify(s))),s);});"]
],__dirname);
edit('browser-test.cjs',[
 ["assert.equal(s.fog.bondActive,false);assert.equal(s.fog.uses,2);", "assert.equal(s.fog.bondActive,true);assert.equal(s.fog.uses,2);"],
 ["assert.equal(s.fog.bondActive,false);});", "assert.equal(s.fog.bondActive,true);});"]
],__dirname);
console.log('Vínculo separado de la presencia; encuadre del retrato ajustado.');
