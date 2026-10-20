'use strict';
/* Adaptador de interfaz: toda regla calculable reside en rules.js. */
(function(E){
 const C=E.config,$=id=>document.getElementById(id);
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let state=E.store.load(),lastSim=null,toastTimer;
 const today=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');};
 const uid=()=>globalThis.crypto?.randomUUID?.()||Date.now()+'-'+Math.random().toString(36).slice(2);
 function toast(message){$('toast').textContent=message;$('toast').classList.remove('hidden');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.add('hidden'),6500);}
 function status(){
   $('storageStatus').textContent=E.store.status.message;
   $('storageStatus').classList.toggle('warning',!E.store.status.available||E.store.isLocked());
   $('saveStatus').textContent=E.store.status.message;
 }
 function save(replace=false){const ok=E.store.save(state,replace);status();return ok;}
 async function ask(title,message,extra='',read=()=>({})){
   const d=$('confirmDialog');if(d.open)return null;
   $('confirmTitle').textContent=title;$('confirmMessage').textContent=message;$('confirmExtra').innerHTML=extra;d.returnValue='cancel';
   return new Promise(resolve=>{
     d.addEventListener('close',()=>resolve(d.returnValue==='ok'?read():null),{once:true});d.showModal();
   });
 }
 function autoLog(title,body){state.logs.unshift({id:uid(),date:today(),session:'Administración',type:'Descanso / recursos',title,body});}
 function refresh(){renderSession();renderLogs();simulate();status();}
 function go(id){
   if(!document.querySelector('.tab[data-tab="'+id+'"]'))return;
   document.querySelectorAll('.tab').forEach(x=>{const on=x.dataset.tab===id;x.classList.toggle('active',on);x.setAttribute('aria-selected',String(on));x.tabIndex=on?0:-1;});
   document.querySelectorAll('.view').forEach(x=>{x.classList.toggle('active',x.id===id);x.hidden=x.id!==id;});
   window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 }
 function cap(k){const r=C.resources.find(x=>x[0]===k);return r?.[2]==='maxHp'?state.maxHp:r?.[2]??999;}
 function adjust(k,d){if(!C.resources.some(x=>x[0]===k))return;if(state[k]===null){toast('Registra primero una cantidad confirmada.');return;}setResource(k,state[k]+d);}
 function setResource(k,v){
   if(!C.resources.some(x=>x[0]===k))return;
   if(k==='arrows'&&v===''){state.arrows=null;save();renderResources();simulate();return;}
   const n=Number(v);
   if(v===''||!Number.isInteger(n)||n<0||n>cap(k)){toast('Usa un entero entre 0 y '+cap(k)+'.');renderResources();return;}
   state[k]=n;
   if(k==='hp'&&n>0){state.deathSuccess=0;state.deathFail=0;}
   if(k==='hp'&&n===0)state.concentration='';
   save();renderResources();simulate();
 }
 function setMaxHp(v){
   const n=Number(v);if(!Number.isInteger(n)||n<1||n>9999){toast('Máximo de PG inválido.');renderResources();return;}
   state.maxHp=n;state.hp=Math.min(state.hp,n);save();renderResources();simulate();
 }
 function renderResources(){
   $('resources').innerHTML=C.resources.map(([k,label])=>{
     const max=cap(k),v=state[k],unknown=v===null;
     return '<div class="resource"><div style="flex:1"><label for="resource-'+k+'"><b>'+label+'</b></label> <span class="muted">'+(unknown?'Sin confirmar':v+(max<999?' / '+max:''))+'</span>'+
     (max<999?'<div class="meter"><div style="width:'+100*(v||0)/max+'%"></div></div>':'')+'</div><div class="stack"><button class="btn" data-adjust="'+k+'" data-delta="-1" aria-label="Reducir '+label+'" '+(unknown||v===0?'disabled':'')+'>−</button><input id="resource-'+k+'" type="number" min="0" max="'+max+'" data-resource="'+k+'" value="'+(v??'')+'" placeholder="?" aria-label="'+label+'"><button class="btn" data-adjust="'+k+'" data-delta="1" aria-label="Aumentar '+label+'" '+(unknown||v===max?'disabled':'')+'>+</button></div></div>';
   }).join('')+'<div class="field" style="margin-top:15px"><label for="maxHp">PG máximos efectivos (45 estimados en el prototipo)</label><input id="maxHp" type="number" min="1" max="9999" value="'+state.maxHp+'"></div>';
   $('fichaResources').innerHTML=C.resources.slice(0,7).map(([k,label])=>'<div class="kv"><span>'+label+'</span><strong>'+(state[k]===null?'Sin confirmar':state[k]+(cap(k)<999?' / '+cap(k):''))+'</strong></div>').join('')+'<p class="help-text">Máximo de PG pendiente de confirmación. Consulta las condiciones en Mesa.</p>';
   $('reactionStatus').textContent='Reacción '+(state.reactionAvailable?'disponible':'ya utilizada')+'. Concentración: '+(state.concentration||'ninguna')+'.';
 }
 const textFields=['concentration','position','tableNotes','inventory','canonNotes'];
 function setField(k,v){if(!textFields.includes(k))return;if(v.length>100000){toast('Texto demasiado largo; máximo 100 000 caracteres.');return;}state[k]=v;save();if(k==='concentration'){renderResources();simulate();}}
 function setCanon(v){setField('canonNotes',v);}
 function renderSession(){
   renderResources();
   $('conditions').innerHTML=C.CONDITIONS.filter(c=>c!=='Exhausta').map(c=>'<label><input type="checkbox" data-condition="'+esc(c)+'" '+(state.conditions.includes(c)?'checked':'')+'>'+esc(c)+'</label>').join('');
   textFields.forEach(k=>$(k).value=state[k]);$('exhaustion').value=state.exhaustion;
 }
 function toggleCondition(c,on){
   if(!C.CONDITIONS.includes(c))return;
   state.conditions=on?[...new Set([...state.conditions,c])]:state.conditions.filter(x=>x!==c);
   if(E.rules.blocked(state))state.concentration='';
   save();renderResources();simulate();
 }
 function setExhaustion(v){
   const n=Number(v);if(!Number.isInteger(n)||n<0||n>6){toast('Agotamiento debe ser 0–6.');$('exhaustion').value=state.exhaustion;return;}
   state.exhaustion=n;
   state.conditions=state.conditions.filter(c=>c!=='Exhausta');if(n)state.conditions.push('Exhausta');
   if(E.rules.blocked(state))state.concentration='';
   save();simulate();
 }
 function plan(){
   const num=id=>$(id).value===''?NaN:Number($(id).value);
   return {action:$('action').value,bonus:$('bonus').value,distance:num('range'),movement:num('move'),approach:num('approach'),allyRange:num('allyRange'),boost:num('boost'),fangs:$('fangs').checked,terrain:num('terrain'),context:$('context').value,reaction:$('reaction').value,targetInt:$('targetInt').value===''?null:num('targetInt'),targetHeard:$('targetHeard').checked,components:$('components').checked,bardCure:$('bardCure').checked,hostileNear:$('hostileNear').checked,stand:$('stand').checked,monkReady:$('monkReady').checked};
 }
 function simulate(){
   const p=plan(),r=E.rules.simulate(state,p);lastSim=r;
   const pairs=[['Acción y acción adicional',r.description],['Ataques de arma / desarmados',r.attacks],['Recursos fijos','Ki '+r.costs.ki+' · espacios '+r.costs.slots+' · inspiración '+r.costs.inspiration+' · flechas '+r.costs.arrows],['Ki condicional planeado',r.conditionalKi+' (solo al impactar)'],['Movimiento',r.movementCost+' / '+r.moveMax+' pies de coste'],['Distancia final al objetivo',r.distance+' pies'],['Alcance principal',r.reach?r.reach+(p.action==='bow'?' / 320 largo':'')+' pies':'Según situación']];
   $('simulation').innerHTML='<div class="'+(r.valid?'good':'bad')+'"><b>'+(r.valid?'✓ Plan válido con las condiciones y límites indicados':'✕ Plan inválido; no se puede aplicar')+'</b></div>'+pairs.map(([k,v])=>'<div class="kv"><span>'+esc(k)+'</span><strong>'+esc(v)+'</strong></div>').join('')+'<h3 style="margin-top:16px">Dados y efectos</h3>'+r.effects.map(e=>'<p>'+esc(e)+'</p>').join('')+
   (r.damageAverage!==null?'<p><b>Promedio de daño si todo impacta / fallan las salvaciones:</b> '+r.damageAverage.toLocaleString('es-MX')+'. Incluye las potenciaciones planeadas. No es daño esperado ni infligido.</p>':'<p>Sin promedio de daño aplicable.</p>')+
   (r.healingAverage!==null?'<p><b>Promedio de curación:</b> '+r.healingAverage.toLocaleString('es-MX')+'; no se añade automáticamente a ningún personaje.</p>':'')+
   r.errors.map(e=>'<p class="bad">'+esc(e)+'</p>').join('')+'<details><summary>Condiciones y límites del resultado ('+r.warnings.length+')</summary>'+r.warnings.map(e=>'<p class="mutedline">'+esc(e)+'</p>').join('')+'</details>';
   $('applyTurn').disabled=!r.valid;
 }
 function preset(key){
   const v=C.presets[key];if(!v)return;
   $('action').value=v[0];$('bonus').value=v[1];$('fangs').checked=v[2];$('boost').value=v[3];$('range').value=v[4];
   $('move').value=0;$('approach').value=0;$('terrain').value=1;$('stand').checked=false;$('reaction').value='none';simulate();
 }
 async function applyTurn(){
   const p=plan(),r=E.rules.simulate(state,p);if(!r.valid){simulate();return;}
   let extra='';
   if(r.conditionalKi)extra+='<div class="field"><label for="confirmedBoosts">Impactos acertados que decides potenciar ahora</label><input id="confirmedBoosts" type="number" min="0" max="'+r.conditionalKi+'" value="0"></div>';
   if(p.action==='tasha')extra+='<label class="stack"><input id="beginConcentration" style="width:auto" type="checkbox"> Comenzar concentración (reemplaza la actual)</label>';
   const needsTarget=p.action==='tasha'&&p.targetInt===null;
   if(needsTarget)extra+='<label class="stack"><input id="targetConfirmed" style="width:auto" type="checkbox"> Confirmo que el objetivo tiene Inteligencia mayor que 4</label>';
   const result=await ask('Aplicar turno',r.description+'\nSe gastarán '+r.costs.ki+' Ki fijos, '+r.costs.slots+' espacios, '+r.costs.inspiration+' inspiración y '+r.costs.arrows+' flechas. Confirma componentes, alcance, objetivo válido y las condiciones de mesa indicadas. El daño permanece teórico.',extra,()=>({boostHits:r.conditionalKi?Number($('confirmedBoosts').value):0,concentration:!!$('beginConcentration')?.checked,targetConfirmed:!!$('targetConfirmed')?.checked}));
   if(!result)return;
   if(needsTarget&&!result.targetConfirmed){toast('Confirma la Inteligencia del objetivo antes de aplicar Tasha.');return;}
   try {
     const applied=E.rules.apply(state,p,result);state=applied.state;
     autoLog('Turno aplicado',r.description+'; gasto real: '+applied.spentKi+' Ki, '+r.costs.slots+' espacios, '+r.costs.inspiration+' inspiración, '+r.costs.arrows+' flechas. Impactos potenciados: '+result.boostHits+'. Daño no registrado como infligido.');
     save();refresh();toast('Turno registrado.');
   }catch(e){toast(e.message);simulate();}
 }
 async function shortRest(){await doRest('short');}
 async function longRest(){await doRest('long');}
 async function doRest(kind){
   const long=kind==='long';
   const answer=await ask(long?'Descanso largo':'Descanso corto',long?'Confirma descanso válido de al menos 8 horas, al menos 1 PG al iniciarlo y ningún otro descanso largo en las últimas 24 horas. Recupera PG, espacios, inspiración y 2 dados de golpe. Los PG temporales expiran. Condiciones se conservan.':'Confirma al menos 1 hora de descanso. Recupera Ki si hubo meditación. Registra por separado los dados de golpe y la curación resuelta.',
   '<label class="stack"><input id="meditated" style="width:auto" type="checkbox" checked> Eco meditó al menos 30 minutos</label>'+(long?'<label class="stack"><input id="nourished" style="width:auto" type="checkbox"> Comió y bebió lo suficiente: reducir agotamiento en 1</label>':''),()=>({meditated:$('meditated').checked,nourished:!!$('nourished')?.checked}));
   if(!answer)return;
   try{
     state=E.rules.rest(state,kind,answer.meditated);
     if(long&&answer.nourished) {state.exhaustion=Math.max(0,state.exhaustion-1);if(!state.exhaustion)state.conditions=state.conditions.filter(c=>c!=='Exhausta');}
     autoLog(long?'Descanso largo':'Descanso corto',(answer.meditated?'Ki restaurado. ':'Sin recuperación de Ki. ')+(long?'PG, espacios e inspiración recuperados; hasta 2 dados d8 recuperados. Revisar máximo efectivo si cambió el agotamiento.':'Curación mediante dados y Canción de Descanso se registra por separado.'));
     save();refresh();
   }catch(e){toast(e.message);}
 }
 async function spendHitDice(){
   const count=Number($('restDice').value),heal=Number($('restHealing').value);
   if(!Number.isInteger(count)||count<1||count>state.hitDice||!Number.isInteger(heal)||heal<0||heal>count*8+6){toast('Revisa dados disponibles y curación: máximo '+(count*8+6)+' con Canción 1d6 y Constitución +0.');return;}
   if(!await ask('Gastar dados de golpe','¿Registrar '+count+'d8 gastados y '+heal+' PG de curación ya resueltos durante descanso corto? Canción solo una vez por descanso.'))return;
   state.hitDice-=count;state.hp=Math.min(state.maxHp,state.hp+heal);
   if(state.hp>0){state.deathSuccess=0;state.deathFail=0;}
   autoLog('Dados de golpe',count+'d8 gastados; curación registrada '+heal+'.');save();refresh();
 }
 async function changeHp(kind){
   const amount=Number($('hpAmount').value);
   if(!Number.isInteger(amount)||amount<1||amount>99999){toast('Introduce una cantidad entera positiva.');return;}
   if(!await ask(kind==='damage'?'Registrar daño':'Registrar curación','¿Aplicar '+amount+' puntos '+(kind==='damage'?'de daño ya resuelto?':'de curación ya resuelta?')))return;
   if(kind==='damage'){
     const absorbed=Math.min(state.tempHp,amount);state.tempHp-=absorbed;state.hp=Math.max(0,state.hp-(amount-absorbed));
     if(state.concentration)toast('Resuelve salvación de concentración en mesa; CD máxima entre 10 y la mitad del daño (redondeada abajo).');
     if(state.hp===0)state.concentration='';
   }else {state.hp=Math.min(state.maxHp,state.hp+amount);if(state.hp>0){state.deathSuccess=0;state.deathFail=0;}}
   autoLog(kind==='damage'?'Daño recibido':'Curación recibida',amount+' puntos registrados. Revisa condiciones, muerte instantánea y salvaciones si corresponde.');save();refresh();
 }
 async function startTurn(){
   if(!await ask('Comenzar turno','¿Recuperar la reacción al comenzar un nuevo turno de Eco?'))return;
   state.reactionAvailable=true;save();renderResources();simulate();
 }
 async function resolveReaction(kind){
   if(!state.reactionAvailable||E.rules.blocked(state)){toast('Reacción no disponible.');return;}
   if(kind==='return'&&state.ki<1){toast('No queda Ki para devolver el proyectil.');return;}
   const message=kind==='opportunity'?'Confirma que un enemigo visible sale de tu alcance sin Destrabarse ni otra excepción. Resuelve un ataque cuerpo a cuerpo en mesa.':kind==='return'?'Confirma impacto de arma a distancia, reducción a 0 con 1d10+6, proyectil atrapado y mano libre. Se gastará 1 Ki. Ataque +6, daño 1d4+3, alcance 20/60.':'Confirma impacto de arma a distancia. Reduce su daño en 1d10+6; sin gasto de Ki. Para devolverlo ahora, cancela y elige Devolver proyectil.';
   if(!await ask('Resolver reacción',message))return;
   state.reactionAvailable=false;if(kind==='return')state.ki--;
   autoLog('Reacción resuelta',message);save();refresh();
 }
 async function endConcentration(){
   if(!state.concentration)return;
   if(!await ask('Terminar concentración','¿Dejar de concentrarte en '+state.concentration+'?'))return;
   state.concentration='';save();refresh();
 }
 async function resetResources(){
   if(!await ask('Restablecer recursos','¿Poner PG, Ki, espacios, inspiración y dados a máximos? Es un ajuste manual, no un descanso. No cambia inventario, munición, notas ni condiciones.'))return;
   Object.assign(state,{hp:state.maxHp,tempHp:0,ki:3,slots:3,inspiration:1,hitDice:5,deathSuccess:0,deathFail:0});autoLog('Recursos ajustados','Restablecimiento manual a máximos.');save();refresh();
 }
 function addLog(){
   const title=$('logTitle').value.trim(),body=$('logBody').value.trim();
   if(!title&&!body){toast('Escribe un título o contenido.');return;}
   const date=$('logDate').value;if(!/^\d{4}-\d{2}-\d{2}$/.test(date)){toast('Selecciona la fecha del registro.');return;}
   const row={id:uid(),date,session:$('logSession').value.trim()||'Sin nombre',type:$('logType').value,title:title||'Registro sin título',body};
   try{E.store.validate({...state,logs:[row,...state.logs]});}catch(e){toast(e.message);return;}
   state.logs.unshift(row);$('logTitle').value='';$('logBody').value='';save();renderLogs();
 }
 function renderLogs(){
   const q=$('logSearch').value.toLocaleLowerCase('es');
   const items=state.logs.filter(x=>[x.title,x.body,x.session,x.date,x.type].join(' ').toLocaleLowerCase('es').includes(q));
   $('logs').innerHTML=items.length?items.map(x=>'<article class="entry"><time>'+esc(x.date)+' · '+esc(x.session)+' · '+esc(x.type)+'</time><h3>'+esc(x.title)+'</h3><p>'+esc(x.body)+'</p><button class="btn danger" data-delete-log="'+esc(x.id)+'">Eliminar</button></article>').join(''):'<p class="mutedline">No hay entradas para mostrar.</p>';
 }
 async function deleteLog(id){
   if(!state.logs.some(x=>x.id===id))return;
   if(!await ask('Eliminar entrada','¿Eliminar esta entrada de bitácora?'))return;
   state.logs=state.logs.filter(x=>x.id!==id);save();renderLogs();
 }
 function download(name,content,type){
   const url=URL.createObjectURL(new Blob([content],{type})),a=document.createElement('a');
   a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 function exportJson(){download('Eco_Apeiron_respaldo_'+today()+'.json',JSON.stringify(E.store.envelope(state),null,2),'application/json;charset=utf-8');}
 function exportText(){download('Eco_Apeiron_bitacora_'+today()+'.txt',state.logs.map(x=>'['+x.date+'] '+x.session+' · '+x.type+'\n'+x.title+'\n'+x.body+'\n').join('\n---\n'),'text/plain;charset=utf-8');}
 function exportRecovery(){if(E.store.status.corruptRaw)download('Eco_Apeiron_datos_sin_modificar_'+today()+'.txt',E.store.status.corruptRaw,'text/plain;charset=utf-8');}
 async function replaceState(candidate,legacy=false){
   const answer=await ask(legacy?'Migrar respaldo del prototipo':'Importar respaldo de Eco','Se reemplazarán los recursos, notas, inventario y bitácora actuales ('+state.logs.length+' entradas) por el respaldo ('+candidate.logs.length+' entradas). Exporta primero si necesitas conservarlos.'+(legacy?'\nEl formato antiguo no identifica al personaje: escribe ECO para confirmar que corresponde a Eco de Apeiron.':''),legacy?'<div class="field"><label for="legacyOwner">Confirmación de personaje</label><input id="legacyOwner" autocomplete="off"></div>':'',()=>({owner:$('legacyOwner')?.value}));
   if(!answer)return;
   if(legacy&&answer.owner!=='ECO'){toast('No se importó: falta confirmar ECO.');return;}
   state=E.store.validate(candidate);save(true);refresh();toast('Respaldo importado.');
 }
 async function importJson(event){
   const file=event.target.files[0];event.target.value='';if(!file)return;
   if(file.size>10*1024*1024){toast('El respaldo supera 10 MB.');return;}
   try{
     const text=await file.text(),data=JSON.parse(text);
     const legacy=data?.version===1&&!data.schema;
     await replaceState(legacy?E.store.migrateLegacy(data):E.store.parse(text),legacy);
   }catch(e){toast('No se pudo importar: '+e.message);}
 }
 async function migrateStored(){
   const raw=E.store.legacy();if(!raw){toast('No se encontraron datos del prototipo en este origen del navegador. Puedes importar su JSON.');return;}
   try{await replaceState(E.store.migrateLegacy(JSON.parse(raw)),true);}catch(e){toast(e.message);}
 }
 function snapshot(){
   return 'ECO · APEIRON · D&D 5e 2014\nMonje 3 / Bardo 2 · Nivel 5 · CA 15 · Iniciativa +4 · Velocidad base 40 pies\nActualizado: '+state.updated+'\nPG '+state.hp+'/'+state.maxHp+'; temporales '+state.tempHp+'; Ki '+state.ki+'/3; espacios '+state.slots+'/3; inspiración '+state.inspiration+'/1; dados d8 '+state.hitDice+'/5; flechas '+(state.arrows??'sin confirmar')+'.\nCondiciones: '+(state.conditions.join(', ')||'ninguna')+'; agotamiento '+state.exhaustion+'; reacción '+(state.reactionAvailable?'disponible':'utilizada')+'.\nConcentración: '+(state.concentration||'ninguna')+'\nPosición: '+state.position+'\nInventario:\n'+state.inventory+'\nNotas:\n'+state.tableNotes+'\nLore:\n'+state.canonNotes+'\nÚltimas entradas:\n'+state.logs.slice(0,15).map(x=>x.date+' ['+x.session+'] '+x.title+': '+x.body).join('\n\n');
 }
 async function copy(text){
   try{if(!navigator.clipboard?.writeText)throw Error('Portapapeles no disponible');await navigator.clipboard.writeText(text);toast('Copiado.');}
   catch{
     await ask('Copia manual','Selecciona el texto y cópialo con Ctrl+C o el menú del dispositivo.','<textarea id="manualCopy" rows="12" readonly aria-label="Texto para copiar">'+esc(text)+'</textarea>');
   }
 }
 function copySnapshot(){return copy(snapshot());}
 function copySimulation(){return copy(lastSim?lastSim.description+'\n'+lastSim.effects.join('\n')+'\n'+lastSim.errors.concat(lastSim.warnings).join('\n'):'');}
 function copyLogTemplate(){return copy('SESIÓN:\nFECHA:\nLUGAR:\nPARTICIPANTES:\nOBJETIVO:\nCRONOLOGÍA:\nCOMBATES:\nRELACIONES:\nHALLAZGOS:\nRECURSOS:\nDECISIONES DEL DM:\nEVOLUCIÓN DE ECO:\nPENDIENTES:');}
 async function wipeAll(){
   if(!await ask('Restablecer todos los datos','Se reemplazará SOLO el estado de Eco v2 en este navegador por el estado inicial del prototipo. Se perderán tus entradas, inventario y notas actuales. Exporta JSON antes si deseas conservarlos.'))return;
   state=E.store.base();save(true);refresh();
 }
 function init(){
   $('abilities').innerHTML=Object.entries(C.AB).map(([k,[v,m]])=>'<div class="statbox"><b>'+v+'</b><span>'+k+' · '+(m>=0?'+':'')+m+'</span></div>').join('');
   const magicFor=s=>Object.values(C.magic).find(m=>m.name===s[0]);
   $('spellTable').innerHTML=C.SPELLS.map((s,i)=>'<tr><td><b>'+esc(s[0])+'</b></td><td>'+esc(s[1])+'</td><td>'+esc(s[2])+'</td><td>'+esc(s[3])+'<br><small>'+esc(magicFor(s).components)+' · '+esc(magicFor(s).duration)+'</small></td></tr>').join('');
   $('spellDetails').innerHTML=C.SPELLS.map((s,i)=>'<details><summary>'+esc(s[0])+' · '+esc(s[1])+' · '+esc(s[2])+'</summary><p>Acción · '+esc(magicFor(s).components)+' · '+esc(magicFor(s).duration)+'.</p><p><b>Efecto:</b> '+esc(s[3])+'. '+esc(s[4])+'</p></details>').join('');
   $('weaponTable').innerHTML=Object.entries(C.weapons).map(([id,w])=>{
     const icons={unarmed:'eco/EcoManoLimpia.png',scimitar:'inventario/ScimitarraIgnea.png',bow:'inventario/ArcoCorto.png',hammer1:'inventario/Mazo.png',hammer2:'inventario/Mazo.png'};
     return '<tr><td><span class="item-ident"><img src="./assets/icono/'+icons[id]+'" alt="" aria-hidden="true" width="54" height="54"><span>'+esc(w.name)+'</span></span></td><td>+'+w.attack+'</td><td>'+esc(w.formula)+(id==='scimitar'?'':' '+w.type)+'</td><td>'+w.reach+(w.longReach?'/'+w.longReach:'')+' pies'+(w.monk?'<br>Arma de monje según ficha':'')+(w.note?'<br><small>'+esc(w.note)+'</small>':'')+'</td></tr>';
   }).join('');
   const combat=C.character,values=[combat.ac,'+'+combat.initiative,combat.speed,'+'+combat.proficiency,combat.kiDC,combat.bardDC];
   document.querySelectorAll('#combatStats .statbox b').forEach((node,i)=>node.textContent=values[i]);
   $('action').innerHTML=C.ACTIONS.map(([v,t])=>'<option value="'+v+'">'+esc(t)+'</option>').join('');
   $('bonus').innerHTML=C.BONUSES.map(([v,t])=>'<option value="'+v+'">'+esc(t)+'</option>').join('');
   $('components').closest('.checks').insertAdjacentHTML('beforeend','<label><input id="monkReady" type="checkbox" checked> Cumplo Artes Marciales en los golpes desarmados (sin armadura, escudo ni arma ajena a monje)</label>');
   ['action','bonus','range','context','move','reaction','fangs','boost','approach','allyRange','terrain','targetInt','targetHeard','components','bardCure','hostileNear','stand','monkReady'].forEach(id=>$(id).addEventListener('input',simulate));
   $('importFile').addEventListener('change',importJson);$('logDate').value=today();
   const tabs=[...document.querySelectorAll('.tab')];document.querySelector('.tabs').setAttribute('role','tablist');
   tabs.forEach((x,i)=>{
     x.id='tab-'+x.dataset.tab;x.setAttribute('role','tab');x.setAttribute('aria-controls',x.dataset.tab);
     const panel=$(x.dataset.tab);panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',x.id);panel.tabIndex=0;
     x.addEventListener('click',()=>go(x.dataset.tab));x.addEventListener('keydown',e=>{
       let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;
       if(next!==undefined){e.preventDefault();go(tabs[next].dataset.tab);tabs[next].focus();}
     });
   });
   $('resources').addEventListener('click',e=>{const b=e.target.closest('[data-adjust]');if(b)adjust(b.dataset.adjust,Number(b.dataset.delta));});
   $('resources').addEventListener('change',e=>{if(e.target.dataset.resource)setResource(e.target.dataset.resource,e.target.value);if(e.target.id==='maxHp')setMaxHp(e.target.value);});
   $('conditions').addEventListener('change',e=>toggleCondition(e.target.dataset.condition,e.target.checked));
   $('logs').addEventListener('click',e=>{const b=e.target.closest('[data-delete-log]');if(b)deleteLog(b.dataset.deleteLog);});
   $('saveStatus').insertAdjacentHTML('afterend','<div class="stack"><button id="migrateStored" class="btn">Migrar datos del prototipo</button><button id="exportRecovery" class="btn">Exportar datos guardados sin modificar</button></div>');
   $('migrateStored').addEventListener('click',migrateStored);$('exportRecovery').addEventListener('click',exportRecovery);$('exportRecovery').hidden=!E.store.status.corruptRaw;
   window.addEventListener('storage',e=>{if(e.key===E.store.KEY||e.key===null){E.store.markConflict();status();}});
   window.addEventListener('beforeunload',e=>{if(!E.store.status.available||E.store.isLocked()){e.preventDefault();e.returnValue='';}});
   document.addEventListener('click',event=>{
     const button=event.target.closest('[data-command]');
     if(button&&commands[button.dataset.command])commands[button.dataset.command](button.dataset.value);
   });
   document.addEventListener('input',event=>{
     if(event.target.dataset.field)setField(event.target.dataset.field,event.target.value);
     if(event.target.dataset.inputCommand==='renderLogs')renderLogs();
   });
   document.addEventListener('change',event=>{
     if(event.target.dataset.changeCommand==='setExhaustion')setExhaustion(event.target.value);
   });
   refresh();go('ficha');
 }
 const commands={go,preset,applyTurn,shortRest,longRest,spendHitDice,changeHp,startTurn,resolveReaction,endConcentration,resetResources,addLog,exportJson,exportText,copySnapshot,copySimulation,copyLogTemplate,wipeAll,openImport:()=>$('importFile').click()};
 E.app={getState:()=>JSON.parse(JSON.stringify(state)),getPlan:plan,getSimulation:()=>lastSim,refresh};
 init();
})(Eco);
