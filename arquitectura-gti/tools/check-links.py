"""Revisa enlaces locales rotos en el prototipo. Uso: python3 tools/check-links.py
Incluye los enlaces de los HTML y las rutas que generan js/layout.js y docs/herramientas.html."""
import os, re, sys, glob
from urllib.parse import unquote
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
ids = {}
def ids_of(f):
    if f not in ids:
        ids[f] = set(re.findall(r'\bid="([^"]+)"', open(f, encoding='utf-8').read())) if f.endswith('.html') and os.path.exists(f) else set()
    return ids[f]
bad = []
def check(src, base, h):
    if re.match(r'^(https?:|mailto:|tel:|javascript:|data:)', h) or h.startswith(("'", '" +')) or '{' in h: return
    if h == '#': bad.append((src, h, 'enlace vacío')); return
    path, _, frag = h.partition('#'); path = path.split('?')[0]
    target = os.path.normpath(os.path.join(base, unquote(path))) if path else src
    if not os.path.exists(target): bad.append((src, h, 'no existe')); return
    if frag and target.endswith('.html') and frag not in ids_of(target): bad.append((src, h, 'ancla inexistente'))
pages = [f for f in glob.glob('**/*.html', recursive=True) if not f.startswith('exports')]
for f in pages:
    s = open(f, encoding='utf-8').read()
    for h in re.findall(r'(?:href|src)="([^"]*)"', s): check(f, os.path.dirname(f), h)
    if f == 'docs/herramientas.html':  # rutas del catálogo TOOLS
        for h in re.findall(r'"(\.\./[^"]+|[a-z]+\.html[^"]*)"', s): check(f, 'docs', h)
        for h in re.findall(r'C \+ "([^"]+)"', s): check(f, 'assets/capturas', h)
lay = open('js/layout.js', encoding='utf-8').read()
for h in re.findall(r'(?:url: |href\()"([^"]+\.html[^"]*)"', lay): check('js/layout.js', '.', h)
data = open('js/sitemap-data.js', encoding='utf-8').read()
for h in re.findall(r'url: "([^"]+)"', data): check('js/sitemap-data.js', '.', h)
for b in bad: print('%-34s %-55s %s' % b)
print(len(bad), 'enlaces con problemas')
sys.exit(1 if bad else 0)
