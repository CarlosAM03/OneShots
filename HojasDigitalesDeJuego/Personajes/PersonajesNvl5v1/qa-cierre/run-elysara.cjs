// Conserva las aserciones históricas; usa Playwright para esperar acciones reales.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{pathToFileURL}=require('node:url');
const {chromium}=require('C:/Users/Carl0/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'../HojaDeJuego_ElysaraVelthaine'),E=require(path.join(root,'engine.js')),out=path.join(__dirname,'regression/ElysaraVelthaine-playwright'),downloads=path.join(out,'downloads');fs.mkdirSync(downloads,{recursive:true});
const checks=[],errors=[],requests=[];
(async()=>{const browser=await chromium.launch({executablePath:'C:/Users/Carl0/AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe',headless:true});
try{const context=await browser.newContext({viewport:{width:1440,height:1100},acceptDownloads:true}),page=await context.newPage(),cdp=await context.newCDPSession(page);page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));page.on('download',async d=>{await d.saveAs(path.join(downloads,d.suggestedFilename()));});
await cdp.send('Page.enable');
const evaluate=expression=>page.evaluate(expression),send=(method,params)=>cdp.send(method,params),tick=()=>page.waitForTimeout(180),click=s=>page.locator(s).click(),fill=(s,v,event='input')=>page.locator(s).evaluate((e,{v,event})=>{e.value=v;e.dispatchEvent(new Event(event,{bubbles:true}));},{v,event}),setCheck=(s,v)=>page.locator(s).setChecked(v);
async function until(fn,message){for(let i=0;i<80;i++){if(await fn())return;await tick();}throw Error(message);}
async function confirm(){await page.locator('#confirm-dialog').waitFor({state:'visible'});await click('#confirm-dialog button[value=ok]');await page.locator('#confirm-dialog').waitFor({state:'hidden'});await tick();}
async function reload(){await page.reload();await page.locator('#apply-turn').waitFor({state:'attached'});}
async function next(){await click('#tab-mesa');await click('#next-turn');await confirm();await click('#tab-simulador');}
async function screenshot(name){await page.screenshot({path:path.join(out,name)});}
async function upload(name,data){await page.locator('#import-file').setInputFiles({name,mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});await page.waitForFunction(()=>document.querySelector('#confirm-dialog').open||document.querySelector('#import-file').files.length===0);}
async function check(name,fn){await fn();checks.push(name);console.log('PASS '+name);}
const saved=()=>evaluate(`JSON.parse(localStorage.getItem(${JSON.stringify(E.KEY)}))`);
await page.goto(pathToFileURL(path.join(root,'index.html')).href);
let original=fs.readFileSync(path.join(root,'qa/browser.test.cjs'),'utf8');
original=original.slice(original.indexOf(" await check('Inicio"),original.indexOf(" fs.writeFileSync(path.join(__dirname,'resultados-navegador.json')"));
// Ejecuta las mismas aserciones con acciones y esperas de Playwright.
const run=new Function('check','click','fill','setCheck','confirm','reload','next','screenshot','upload','saved','evaluate','send','tick','until','fs','path','root','downloads','E','assert','requests','errors','return (async()=>{'+original+'})()');
await run(check,click,fill,setCheck,confirm,reload,next,screenshot,upload,saved,evaluate,send,tick,until,fs,path,root,downloads,E,assert,requests,errors);
}catch(error){console.error(error.stack);process.exitCode=1;}finally{await browser.close();fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({checks,errors},null,2));}console.log(checks.length+' comprobaciones históricas de Elysara.');})();
