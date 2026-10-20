const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');const root=path.resolve(__dirname,'..');
const all=[];function walk(dir){for(const x of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,x.name);if(x.isDirectory())walk(p);else all.push(p);}}walk(root);
const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),css=fs.readFileSync(path.join(root,'style.css'),'utf8'),app=fs.readFileSync(path.join(root,'app.js'),'utf8');
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){assert.ok(!/^https?:/.test(match[1]));assert.ok(fs.existsSync(path.join(root,match[1])),match[1]);}
for(const match of css.matchAll(/url\('([^']+)'\)/g))assert.ok(fs.existsSync(path.join(root,match[1])),match[1]);
assert.ok(!/\b(?:fetch|XMLHttpRequest|WebSocket)\s*\(/.test(app));
const manifest=all.filter(p=>!p.endsWith('manifest-sha256.json')).map(p=>({path:path.relative(root,p).replace(/\\/g,'/'),bytes:fs.statSync(p).size,sha256:crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')}));
fs.writeFileSync(path.join(__dirname,'manifest-sha256.json'),JSON.stringify(manifest,null,2));console.log(manifest.length+' archivos verificados; rutas locales y sin API de red.');
