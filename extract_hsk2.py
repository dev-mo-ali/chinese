import sys
from pypdf import PdfReader

src = r'd:/PROJECTS/chinese/assets/data/HSK 2 Standard Course-OCR.pdf'
dst = r'd:/PROJECTS/chinese/assets/data/hsk2_ocr.txt'

reader = PdfReader(src)
total = len(reader.pages)
print(f'Pages: {total}', flush=True)

with open(dst, 'w', encoding='utf-8') as f:
    for i, page in enumerate(reader.pages):
        try:
            txt = page.extract_text() or ''
        except Exception as e:
            txt = f'[error: {e}]'
        f.write(f'\n===== PAGE {i+1} =====\n')
        f.write(txt)
        f.flush()
        if (i + 1) % 10 == 0:
            print(f'  ...{i+1}/{total}', flush=True)

print('Done.', flush=True)
