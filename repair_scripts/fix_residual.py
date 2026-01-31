import os

files = ['help.html', 'team.html']

for f in files:
    if os.path.exists(f):
        with open(f, 'rb') as file:
            content = file.read()
        
        original = content
        
        # Detected pattern: C3 83 E2 80 9C should become C3 93 (O with accent uppercase)
        content = content.replace(b'\xc3\x83\xe2\x80\x9c', b'\xc3\x93')
        
        # Also fix inverted question mark if corrupted (C2 BF is correct)
        # But detected \xc2\xbf which is already correct
        
        if content != original:
            with open(f, 'wb') as file:
                file.write(content)
            print(f'[OK] {f}: Reparado')
        else:
            print(f'[--] {f}: Sin cambios')
    else:
        print(f'[!!] {f}: No encontrado')
