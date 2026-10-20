"""Verifica estructura y rutas locales. Ejecutar: python tests/check_structure.py"""
from html.parser import HTMLParser
from pathlib import Path
import re
ROOT = Path(__file__).resolve().parents[1]
VOID = set("area base br col embed hr img input link meta param source track wbr".split())
class Checker(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids=set(); self.refs=[]; self.sections=[]; self.tabs=[]; self.stack=[]; self.errors=[]; self.commands=set()
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if "id" in a:
            if a["id"] in self.ids: self.errors.append("ID duplicado: "+a["id"])
            self.ids.add(a["id"])
        if tag=="section" and "view" in a.get("class","").split(): self.sections.append(a.get("id"))
        if "data-tab" in a:self.tabs.append(a["data-tab"])
        if any(k.startswith("on") for k in a):self.errors.append("Evento incrustado en HTML: "+tag)
        if "data-command" in a:self.commands.add(a["data-command"])
        for key in ("src","href"):
            if key in a:self.refs.append((tag,a[key]))
        if tag not in VOID:self.stack.append(tag)
        if tag=="img" and "alt" not in a:self.errors.append("Imagen sin alt")
    def handle_endtag(self,tag):
        if tag in VOID:return
        if not self.stack or self.stack[-1]!=tag:self.errors.append("Etiqueta fuera de orden: "+tag)
        else:self.stack.pop()
c=Checker();html=(ROOT/"index.html").read_text(encoding="utf-8-sig");c.feed(html)
assert not c.errors,c.errors
assert not c.stack,c.stack
assert len(c.sections)==7 and c.sections==c.tabs,(c.sections,c.tabs)
count=0
for tag,ref in c.refs:
    if ref.startswith("#"):assert ref[1:] in c.ids,ref
    elif re.match(r"^https?://",ref):assert tag=="a","Dependencia remota: "+ref
    else:
        assert not ref.startswith(("/", "\\")),ref
        resolved=(ROOT/ref).resolve()
        assert resolved.is_relative_to(ROOT),ref
        assert resolved.is_file(),"Archivo ausente: "+ref
        count+=1
js=(ROOT/"js/app.js").read_text(encoding="utf-8-sig")
for m in re.finditer(r"\$\('([\w-]+)'\)",js):
    # IDs creados dinámicamente por app.js quedan incluidos en su HTML literal.
    assert m[1] in c.ids or re.search(r'id=["\']'+re.escape(m[1])+r'["\']',js),"ID sin definición: "+m[1]
for command in c.commands:
    assert command=="openImport" or re.search(r"(?:async )?function "+command+r"\(",js),command
assert "type=\"module\"" not in html,"Los módulos no cargan con file:// en todos los navegadores"
assert "eval(" not in js
assert len(re.findall(r"<script\b",html))==4
print("OK 7 pestañas, HTML balanceado, IDs únicos, eventos externos y "+str(count)+" rutas locales existentes.")
print("OK comandos de interfaz y referencias a controles definidos; sin dependencias de red.")
