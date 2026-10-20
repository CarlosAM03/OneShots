'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('C:/Users/Carl0/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),phase=process.argv[2]||'after',out=path.join(__dirname,phase);
fs.mkdirSync(out,{recursive:true});
const sheets=['Eco-v2','Elarion','ElysaraVelthaine','Onesimo','ValDraven'];
const sizes=[320,360,375,390,414,430,600,650,768,800,1024,1100,1440].map(width=>({width,height:width===1440?1000:844})).concat({width:844,height:390});
const result={phase,checks:[],errors:[],missing:[],overflow:[],small:[]};
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg'})[path.extname(file)]||'application/octet-stream');res.end(data);});});
async function measure(page,name,section,size){
 const data=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,bad:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height&&(r.right>innerWidth+1||r.left< -1)&&!e.closest('.tabs,.table-wrap,.tablewrap,.portrait,.hero-portrait,.world');}).slice(0,12).map(e=>({tag:e.tagName,id:e.id,cls:e.className,width:Math.round(e.getBoundingClientRect().width)})),small:[...document.querySelectorAll('button,input:not([type=checkbox]):not([type=hidden]),select,textarea,summary')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height&&(r.height<43.9||r.width<43.9)}).map(e=>({id:e.id,cls:e.className,text:e.textContent.trim().slice(0,40)}))}));
 result.checks.push({name,section,...size,scroll:data.scroll});
 if(data.scroll>size.width) result.overflow.push({name,section,...size,...data});
 if(size.width===320&&data.small.length)result.small.push({name,section,controls:data.small});
}
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port;const browser=await chromium.launch({executablePath:'C:/Users/Carl0/AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe',headless:true});
 try{for(const name of ['portal',...sheets]){const context=await browser.newContext({hasTouch:true,reducedMotion:'reduce'}),page=await context.newPage();page.on('pageerror',e=>result.errors.push({name,error:e.message}));page.on('response',r=>{if(r.status()>=400)result.missing.push({name,url:r.url(),status:r.status()});});
 await page.goto(url+'/'+(name==='portal'?'index.html':'HojaDeJuego_'+name+'/index.html'));await page.waitForTimeout(120);
 for(const size of sizes){await page.setViewportSize(size);
 if(name==='portal'){await page.locator('#backButton').isVisible().then(async v=>{if(v)await page.locator('#backButton').click();});await measure(page,name,'intro',size);await page.locator('#startButton').click();await page.locator('#selection').waitFor({state:'visible'});await measure(page,name,'selection',size);}
 else {const tabs=page.locator('.tabs button');for(let i=0;i<await tabs.count();i++){const tab=tabs.nth(i);await tab.click();await page.evaluate(()=>{document.querySelectorAll('details').forEach(d=>{if(d.getBoundingClientRect().width)d.open=true;});});await measure(page,name,await tab.textContent(),size);}}
 if([390,1440].includes(size.width)){if(name!=='portal')await page.locator('.tabs button').first().click();await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:path.join(out,name+'-'+size.width+'.png'),fullPage:true});await page.screenshot({path:path.join(out,name+'-top-'+size.width+'.png')});if(name!=='portal'){await page.locator('.tabs button').nth(3).click();await page.evaluate(()=>scrollTo(0,500));await page.screenshot({path:path.join(out,name+'-sim-'+size.width+'.png'),fullPage:true});await page.screenshot({path:path.join(out,name+'-sim-top-'+size.width+'.png')});}}
 }
 await context.close();console.log(name+' audited');}
 }finally{await browser.close();server.close();fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(result,null,2));}
 console.log(JSON.stringify({checks:result.checks.length,errors:result.errors,missing:result.missing,overflow:result.overflow.length,small:result.small.length},null,2));if(result.overflow.length||result.errors.length||result.missing.length)process.exitCode=1;
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});


