from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
from pypdf import PdfReader
import hashlib,json
root=Path(__file__).resolve().parent.parent
workspace=root.parents[2]
sources=workspace/'El Dragon Verde'/'IniciarOneShot'
items=[];thumbs=[]
names=['ElarysaAvatar.png','ElarysaLibro.png','ElarysaSpell.png','ValDravenAvatar.png','ValDravenMaleficio.png','ValDravenMoonLight.png','OnesimoAvatar1.png','OnesimoFight.png','OnesimoYFugini.png']
for name in names:
    paths=list(sources.rglob(name))
    for p in paths:
        im=Image.open(p);sha=hashlib.sha256(p.read_bytes()).hexdigest()
        copies=[]
        for c in root.rglob(name):
            if 'qa-' not in str(c):copies.append(str(c.relative_to(root)))
        items.append(dict(name=name,source=str(p),format=im.format,width=im.width,height=im.height,bytes=p.stat().st_size,sha256=sha,existing_copies=copies))
        tile=Image.new('RGB',(300,420),'#171820');tile.paste(ImageOps.contain(im.convert('RGB'),(280,370)),(10,10));ImageDraw.Draw(tile).text((8,390),name,fill='white');thumbs.append(tile)
sheet=Image.new('RGB',(900,420*((len(thumbs)+2)//3)),'#171820')
for i,im in enumerate(thumbs):sheet.paste(im,((i%3)*300,(i//3)*420))
sheet.save(root/'qa-cierre'/'contacto-assets.jpg')
(root/'qa-cierre'/'inventario-multimedia.json').write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf8')
for pdf in (sources/'00-Volumenes').glob('*.pdf'):
    reader=PdfReader(pdf)
    text='\n'.join(f'\n=== PAGINA {i+1} ===\n'+(p.extract_text() or '') for i,p in enumerate(reader.pages))
    (root/'qa-cierre'/(pdf.stem+'.txt')).write_text(text,encoding='utf8')
    print(pdf.name,len(reader.pages),'paginas')
print('Inventario:',len(items),'recursos; contacto-assets.jpg')
