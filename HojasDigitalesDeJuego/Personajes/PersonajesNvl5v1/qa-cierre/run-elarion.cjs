// Ejecuta las pruebas históricas sin sobrescribir sus capturas, respaldos o informes.
const fs=require('node:fs'),path=require('node:path'),Module=require('node:module');
const character='Elarion',root=path.resolve(__dirname,'..','HojaDeJuego_'+character),file=path.join(root,'qa/browser.test.cjs');
const output=path.join(__dirname,'regression',character);fs.mkdirSync(output,{recursive:true});
let source=fs.readFileSync(file,'utf8').replaceAll('path.join(__dirname,','path.join(output,').replace("path.resolve(root,'../../qa-elysara')","path.join(output,'scratch')");
source='const output='+JSON.stringify(output)+';\n'+source;
const mod=new Module(file,module);mod.filename=file;mod.paths=Module._nodeModulePaths(path.dirname(file));mod._compile(source,file);
