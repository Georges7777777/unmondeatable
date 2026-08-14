#!/usr/bin/env python3
"""Assemble every source file into one standalone HTML."""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(HERE), 'un-monde-a-table.html')
JS = ['geo.js', 'i18n.js', 'lexicon.js', 'wiki.js', 'd1.js', 'd2.js', 'd3.js', 'd4.js',
      'd5.js', 'd6.js', 'd7.js', 'd8.js', 'd9.js', 'd10.js', 'd11.js', 'd12.js',
      'd13.js', 'd14.js', 'd15.js', 'd16.js', 'd17.js', 'd18.js',
      'd19.js', 'd20.js', 'd21.js', 'd22.js', 'd23.js', 'd24.js', 'd25.js', 'd26.js',
      'd27.js', 'd28.js', 'd29.js', 'd30.js', 'd31.js',
      'illus.js', 'photos.js', 'atlas.js', 'globe.js', 'app.js']

def read(f):
    return open(os.path.join(HERE, f), encoding='utf-8').read()

shell = read('shell.html')
css = read('styles.css')
js = '\n'.join('/* ===== %s ===== */\n%s' % (f, read(f)) for f in JS)

html = shell.replace('/*CSS*/', css).replace('/*JS*/', js)
open(OUT, 'w', encoding='utf-8').write(html)
print('%s — %.0f KB' % (OUT, os.path.getsize(OUT) / 1024))
