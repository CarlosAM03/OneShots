from pathlib import Path
from PIL import Image
import json,shutil
root=Path(__file__).resolve().parent.parent
items=json.loads((root/'qa-cierre/inventario-multimedia.json').read_text(encoding='utf8'))
destinations={'Elarysa':'HojaDeJuego_ElysaraVelthaine','ValDraven':'HojaDeJuego_ValDraven','Onesimo':'HojaDeJuego_Onesimo'}
for item in items:
    if item['name']=='OnesimoYFugini.png':continue
    folder=next(v for k,v in destinations.items() if item['name'].startswith(k))
    dest=root/folder/'assets/imagen'/item['name'];src=Path(item['source'])
    if not dest.exists():shutil.copy2(src,dest)
    assert dest.read_bytes()==src.read_bytes()
    im=Image.open(dest).convert('RGB');im.thumbnail((900,900))
    webp=dest.with_suffix('.webp');im.save(webp,'WEBP',quality=88,method=6)
    item.update(webp=str(webp.relative_to(root)),webp_bytes=webp.stat().st_size,usage={'ElarysaAvatar.png':'selector y encabezado','ElarysaLibro.png':'lore','ElarysaSpell.png':'referencias visuales existentes','ValDravenAvatar.png':'selector y encabezado','ValDravenMoonLight.png':'lore','ValDravenMaleficio.png':'lore','OnesimoAvatar1.png':'lore','OnesimoFight.png':'banner del simulador'}[item['name']])
(root/'qa-cierre/inventario-multimedia.json').write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf8')
def edit(file,old,new):
    p=root/file;s=p.read_text(encoding='utf8')
    if old not in s:
        assert new in s,(file,old)
        return
    p.write_text(s.replace(old,new),encoding='utf8')
edit('index.html',"portrait: './HojaDeJuego_ElysaraVelthaine/assets/imagen/01-ElysaraNvl-5.png'","portrait: './HojaDeJuego_ElysaraVelthaine/assets/imagen/ElarysaAvatar.webp'")
edit('index.html',"portrait: './HojaDeJuego_ValDraven/assets/imagen/val-draven-referencia.png',\n        imageFocus: 'sheet-focus'","portrait: './HojaDeJuego_ValDraven/assets/imagen/ValDravenAvatar.webp'")
edit('index.html',"portrait: './HojaDeJuego_Elarion/assets/imagen/9-manifestaciónDeathsleep-Bosque de Neverwinter.png'","portrait: './assets/imagen/elarion-bloqueado.png'")
shutil.copy2(root/'HojaDeJuego_Elarion/assets/imagen/9-manifestaciónDeathsleep-Bosque de Neverwinter.png',root/'assets/imagen/elarion-bloqueado.png')
edit('HojaDeJuego_ValDraven/index.html','<figure class="portrait"><img src="assets/imagen/val-draven-referencia.png"','<figure class="portrait artwork-portrait"><img width="900" height="900" fetchpriority="high" src="assets/imagen/ValDravenAvatar.webp"')
edit('HojaDeJuego_ValDraven/app.js',"${card('Retrato de personaje',`<div class=\"lore-lines\">", "${card('Retrato de personaje',`<img class=\"lore-illustration\" src=\"assets/imagen/ValDravenMoonLight.webp\" width=\"900\" height=\"900\" loading=\"lazy\" alt=\"Val Draven de cuernos oscuros y cabello negro bajo una luna carmesí\"><div class=\"lore-lines\">")
edit('HojaDeJuego_ValDraven/app.js',"${card('Identidad y límites conocidos',`<div class=\"key-values\">", "${card('Identidad y límites conocidos',`<img class=\"lore-illustration\" src=\"assets/imagen/ValDravenMaleficio.webp\" width=\"900\" height=\"900\" loading=\"lazy\" alt=\"Val Draven rodeada de magia carmesí, con su vestimenta oscura y arma característica\"><div class=\"key-values\">")
edit('HojaDeJuego_ElysaraVelthaine/app.js','<div class="art-panel" role="img" aria-label="Elysara, ilustración original proporcionada">','<div class="art-panel new-art" role="img" aria-label="Elysara de cabello claro y orejas feéricas con su libro bajo la luz violeta">')
edit('HojaDeJuego_ElysaraVelthaine/app.js',"${cardHead('Las láminas originales','MATERIAL PROPORCIONADO')}<div class=\"originals\">", "${cardHead('Las láminas originales','MATERIAL PROPORCIONADO')}<figure class=\"new-illustration\"><img src=\"assets/imagen/ElarysaSpell.webp\" width=\"900\" height=\"900\" loading=\"lazy\" alt=\"Elysara conjura magia violeta junto a su grimorio bajo una luna creciente\"><figcaption>Ilustración complementaria proporcionada de Elysara.</figcaption></figure><div class=\"originals\">")
edit('HojaDeJuego_Onesimo/app.js','<img class="miniart" src="assets/imagen/onesimo-fogini.png" alt="Ilustración completa aportada de Onésimo y Fogini">','<img class="miniart" src="assets/imagen/OnesimoAvatar1.webp" width="900" height="900" loading="lazy" alt="Onésimo con su arco junto a Fogini entre ruinas y fuego">')
edit('HojaDeJuego_Onesimo/app.js',"banner('Onésimo · El arquero y la llama'", "banner('Onésimo · El arquero y la llama'")
# El banner del simulador admite ya una imagen como tercer argumento.
p=root/'HojaDeJuego_Onesimo/app.js';s=p.read_text(encoding='utf8');start=s.index('function renderSimulador()');end=s.index('function ',start+10);chunk=s[start:end];import re
chunk,n=re.subn(r"(banner\('[^']*','[^']*')\)",r"\1,'OnesimoFight.webp')",chunk,count=1);assert n==1
s=s[:start]+chunk+s[end:];p.write_text(s,encoding='utf8')
for file,css in {
'HojaDeJuego_ElysaraVelthaine/style.css':'.portrait{background-image:url("assets/imagen/ElarysaAvatar.webp");background-size:cover;background-position:center 24%}.art-panel.new-art{background-image:url("assets/imagen/ElarysaLibro.webp");background-size:cover;background-position:center}.new-illustration{margin:0 0 20px}.new-illustration img{display:block;width:100%;max-width:450px;height:auto;border-radius:8px}.new-illustration figcaption{font-size:13px;color:var(--muted)}',
'HojaDeJuego_ValDraven/style.css':'.portrait.artwork-portrait img{position:static;width:100%;height:100%;max-width:100%;object-fit:cover;object-position:center 24%}.lore-illustration{display:block;width:100%;height:auto;max-height:440px;object-fit:contain;border-radius:7px;margin-bottom:20px}'
}.items():
    with (root/file).open('a',encoding='utf8') as f:f.write('\n/* Ilustraciones proporcionadas: sin cambios de identidad ni mecánicas. */\n'+css+'\n')
print('Integradas 8 ilustraciones; PNG originales conservados y derivados WebP locales.')
