import re
import glob
import os

directory = os.path.expanduser('~/Bureau/RAJI_Maquettes_Finales/')
files = glob.glob(os.path.join(directory, '*.html'))

replacements = {
    r'\bbg-surface\b': 'bg-canvas',
    r'\btext-on-surface\b': 'text-navy',
    r'\bbg-secondary-container\b': 'bg-gold/20',
    r'\btext-on-secondary-container\b': 'text-navy',
    r'\btext-primary\b': 'text-navy',
    r'\bbg-primary-container\b': 'bg-navy',
    r'\btext-on-primary\b': 'text-canvas',
    r'\btext-text-inverse\b': 'text-canvas',
    r'\bbg-secondary-fixed-dim\b': 'bg-gold',
    r'\btext-on-secondary-fixed\b': 'text-navy',
    r'\bbg-secondary-fixed\b': 'bg-gold/80',
    r'\btext-secondary-fixed\b': 'text-gold',
    r'\bborder-text-inverse/10\b': 'border-canvas/10',
    r'\bbg-surface/10\b': 'bg-canvas/10',
    r'\bbg-primary-fixed/20\b': 'bg-navy/20',
    r'\btext-on-surface-variant\b': 'text-secondary',
    r'\bhover:text-on-surface\b': 'hover:text-navy',
    r'\bfont-body-md\b': 'font-sans text-base',
    r'\bfont-headline-lg\b': 'font-sans text-3xl',
    r'\bfont-headline-md\b': 'font-sans text-2xl',
    r'\bfont-body-lg\b': 'font-sans text-lg',
    r'\bfont-title-md\b': 'font-sans text-lg font-medium',
    r'\bfont-label-md\b': 'font-sans text-sm font-medium',
}

for filepath in files:
    try:
        with open(filepath, 'r') as f:
            content = f.read()

        for old, new in replacements.items():
            content = re.sub(old, new, content)

        content = re.sub(r'<a\s+class="([^"]*)"', lambda m: '<a class="' + m.group(1) + ' min-h-[44px] min-w-[44px] inline-flex items-center"' if 'min-h-[44px]' not in m.group(1) else m.group(0), content)
        content = re.sub(r'<button\s+class="([^"]*)"', lambda m: '<button class="' + m.group(1) + ' min-h-[44px] min-w-[44px] inline-flex items-center"' if 'min-h-[44px]' not in m.group(1) else m.group(0), content)

        with open(filepath, 'w') as f:
            f.write(content)
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

print(f"Processed {len(files)} files.")
