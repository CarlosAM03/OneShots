const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright-core');const fs=require('node:fs');const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:process.env.TEST_BROWSER||'C:/Users/Carl0/AppData/Local/Programs/Opera/136.0.6008.80/opera.exe',ignoreDefaultArgs:['--mute-audio']});
const report={browser:await browser.version(),tests:[]};
try{for(const name of ['Deathsleep_Banda_Sonora_Panel_DM.html','Deathsleep_Escaleta_Integral_DM.html']){
 const page=await browser.newPage();const cab=name.includes('Banda');const status=cab?'#playStatus':'#playingTrack';const play=cab?'[data-control="play"]':'#play';const pause=cab?'[data-control="pause"]':'#pauseMusic';const stop=cab?'[data-control="stop"]':'#stop';const events=[];const errors=[];
 page.on('console',m=>{if(m.text().includes('Deathsleep'))events.push(m.text())});page.on('pageerror',e=>errors.push(e.message));
 const result={name};report.tests.push(result);
 await page.goto((process.env.DEATHSLEEP_URL||'http://127.0.0.1:8765/')+name);await page.locator(play).click();
 await page.waitForFunction(sel=>document.querySelector(sel).textContent.startsWith('Reproduciendo:'),status,{timeout:35000});
 const frame=page.frames().find(f=>f.url().includes('youtube.com/embed/'));
 const media=()=>frame.locator('video').evaluate(v=>({currentTime:v.currentTime,paused:v.paused,muted:v.muted,volume:v.volume,audioDecodedBytes:v.webkitAudioDecodedByteCount,readyState:v.readyState}));
 result.marketplaceStart=await media();await page.waitForTimeout(2500);result.marketplaceAfter=await media();assert(result.marketplaceAfter.currentTime>result.marketplaceStart.currentTime);assert(!result.marketplaceAfter.paused);assert(!result.marketplaceAfter.muted);assert(result.marketplaceAfter.volume>0);assert(result.marketplaceAfter.audioDecodedBytes>0);assert.equal(await page.locator('iframe').count(),1);
 await page.locator(pause).click();await page.waitForFunction(sel=>document.querySelector(sel).textContent.startsWith('Pausado:'),status);result.paused=await media();assert(result.paused.paused);
 await page.locator(pause).click();await page.waitForFunction(sel=>document.querySelector(sel).textContent.startsWith('Reproduciendo:'),status);
 await page.evaluate(()=>{window.__musicFrame=document.querySelector('iframe');window.__loads=0;window.__musicFrame.addEventListener('load',()=>window.__loads++);});
 const before=await media();await page.locator(cab?'[data-control="next"]':'#next').click();await page.locator(cab?'[data-act="2"]':'[data-tab="2"]').click();await page.waitForTimeout(1200);
 result.sceneChange={sameIframe:await page.evaluate(()=>window.__musicFrame===document.querySelector('iframe')),loads:await page.evaluate(()=>window.__loads),before,after:await media()};assert(result.sceneChange.sameIframe);assert.equal(result.sceneChange.loads,0);assert(result.sceneChange.after.currentTime>before.currentTime);
 // Selección de la segunda escena y cambio explícito de pista.
 await page.evaluate(cab=>cab?choose(2):showScene(2),cab);await page.locator(play).click();await page.waitForFunction(sel=>document.querySelector(sel).textContent.startsWith('Reproduciendo:')&&!document.querySelector(sel).textContent.includes('Marketplace'),status,{timeout:35000});result.secondTrack=await page.locator(status).innerText();assert.equal(await page.locator('iframe').count(),1);
 await page.locator(stop).click();assert.equal(await page.locator('iframe').count(),0);result.stopped=await page.locator(status).innerText();
 // Prueba real de restricción, sin cambiar la biblioteca guardada.
 result.restrictionAttempts=[];
 for(const id of ['Sagg08DrO5U','rYEDA3JcQqw','kJQP7kiw5Fk']){
 await page.evaluate(id=>music.play({videoId:id,title:'Prueba temporal de restricción'}),id);
 await page.waitForFunction(sel=>/^(Reproduciendo:|Error de YouTube)/.test(document.querySelector(sel).textContent),status,{timeout:30000}).catch(()=>{});
 const message=await page.locator(status).innerText();result.restrictionAttempts.push({id,message});if(/Error de YouTube (101|150)/.test(message)){result.restrictionLink=await page.locator(status+' a').getAttribute('href');assert.equal(result.restrictionLink,'https://www.youtube.com/watch?v='+id);break;}
 }
 result.events=events;result.pageErrors=errors;assert.equal(errors.length,0);await page.locator(stop).click();await page.close();console.log(JSON.stringify(result,null,2));
 }}finally{fs.writeFileSync('pruebas_reproductor/resultado.json',JSON.stringify(report,null,2));await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
