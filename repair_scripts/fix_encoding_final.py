#!/usr/bin/env python3
# encoding: ascii
"""
Script de reparacion de encoding UTF-8 para MuzicMania
Creado: 31 Enero 2026
"""

import os
import sys
from pathlib import Path

def remove_bom(content):
    bom = b'\xef\xbb\xbf'
    if content.startswith(bom):
        return content[3:]
    return content

def fix_encoding(file_path):
    try:
        with open(file_path, 'rb') as f:
            raw_content = f.read()
        
        raw_content = remove_bom(raw_content)
        
        # Patrones de bytes a reemplazar (mojibake UTF-8)
        # Formato: (bytes_corruptos, bytes_correctos)
        byte_patterns = [
            # Tildes minusculas: A con tilde + caracter especifico
            (b'\xc3\x83\xc2\xb3', b'\xc3\xb3'),  # o accent
            (b'\xc3\x83\xc2\xad', b'\xc3\xad'),  # i accent
            (b'\xc3\x83\xc2\xa1', b'\xc3\xa1'),  # a accent
            (b'\xc3\x83\xc2\xa9', b'\xc3\xa9'),  # e accent
            (b'\xc3\x83\xc2\xba', b'\xc3\xba'),  # u accent
            (b'\xc3\x83\xc2\xb1', b'\xc3\xb1'),  # n tilde
            # Mayusculas
            (b'\xc3\x83\xc2\x81', b'\xc3\x81'),  # A accent
            (b'\xc3\x83\xc2\x89', b'\xc3\x89'),  # E accent
            (b'\xc3\x83\xc2\x8d', b'\xc3\x8d'),  # I accent
            (b'\xc3\x83\xc2\x93', b'\xc3\x93'),  # O accent
            (b'\xc3\x83\xc2\x9a', b'\xc3\x9a'),  # U accent
            (b'\xc3\x83\xc2\x91', b'\xc3\x91'),  # N tilde
            # Otros
            (b'\xc3\x83\xc2\xbc', b'\xc3\xbc'),  # u umlaut
            (b'\xc3\x83\xc2\x9c', b'\xc3\x9c'),  # U umlaut
            # Signos
            (b'\xc3\x82\xc2\xbf', b'\xc2\xbf'),  # inverted question
            (b'\xc3\x82\xc2\xa1', b'\xc2\xa1'),  # inverted exclamation
            (b'\xc3\x82\xc2\xab', b'\xc2\xab'),  # left guillemet
            (b'\xc3\x82\xc2\xbb', b'\xc2\xbb'),  # right guillemet
            (b'\xc3\x82\xc2\xb0', b'\xc2\xb0'),  # degree
            (b'\xc3\x82\xc2\xa9', b'\xc2\xa9'),  # copyright
            (b'\xc3\x82\xc2\xae', b'\xc2\xae'),  # registered
            (b'\xc3\x82\xc2\xa0', b' '),         # non-breaking space
        ]
        
        # Patrones de texto simple (2 bytes corruptos)
        simple_patterns = [
            (b'\xc3\xb3', b'\xc3\xb3'),  # ya ok - skip
        ]
        
        # Mojibake comun de 2 caracteres visibles
        text_replacements = [
            (b'\xc3\x83\xb3', b'\xc3\xb3'),  # Ao -> o accent
            (b'\xc3\x83\xad', b'\xc3\xad'),  # Ai -> i accent  
            (b'\xc3\x83\xa1', b'\xc3\xa1'),  # Aa -> a accent
            (b'\xc3\x83\xa9', b'\xc3\xa9'),  # Ae -> e accent
            (b'\xc3\x83\xba', b'\xc3\xba'),  # Au -> u accent
            (b'\xc3\x83\xb1', b'\xc3\xb1'),  # An -> n tilde
            (b'\xc3\x83\x81', b'\xc3\x81'),  # AA -> A accent
            (b'\xc3\x83\x89', b'\xc3\x89'),  # AE -> E accent
            (b'\xc3\x83\x8d', b'\xc3\x8d'),  # AI -> I accent
            (b'\xc3\x83\x93', b'\xc3\x93'),  # AO -> O accent
            (b'\xc3\x83\x9a', b'\xc3\x9a'),  # AU -> U accent
            (b'\xc3\x83\x91', b'\xc3\x91'),  # AN -> N tilde
        ]
        
        original = raw_content
        
        # Aplicar patrones de bytes
        for corrupted, correct in byte_patterns:
            raw_content = raw_content.replace(corrupted, correct)
        
        for corrupted, correct in text_replacements:
            raw_content = raw_content.replace(corrupted, correct)
        
        if raw_content != original:
            with open(file_path, 'wb') as f:
                f.write(raw_content)
            return True, "Reparado"
        else:
            return False, "Sin cambios"
            
    except Exception as e:
        return False, str(e)

def main():
    script_dir = Path(__file__).parent
    project_dir = script_dir.parent
    
    html_files = [
        '404.html', 'about.html', 'changelog.html', 'contactanos.html',
        'directrices.html', 'faq.html', 'game.html', 'help.html',
        'index.html', 'leaderboard.html', 'policy.html', 'profile.html',
        'rules.html', 'soporte.html', 'stats.html', 'team.html', 'terms.html'
    ]
    
    print("=" * 50)
    print("REPARADOR DE ENCODING UTF-8 - MuzicMania")
    print("=" * 50)
    
    repaired = 0
    
    for filename in html_files:
        file_path = project_dir / filename
        if file_path.exists():
            success, msg = fix_encoding(file_path)
            status = "[OK]" if success else "[--]"
            print(f"{status} {filename}: {msg}")
            if success:
                repaired += 1
        else:
            print(f"[!!] {filename}: No encontrado")
    
    print("-" * 50)
    print(f"RESUMEN: {repaired}/{len(html_files)} archivos reparados")
    
    return repaired

if __name__ == "__main__":
    main()
