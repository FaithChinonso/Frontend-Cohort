# Reference Sheets

Printable companion guides for the Tasty Bites course. Open the PDF and print it, or hand it out as a digital handout.

## What's here

- **[HTML-Reference.pdf](HTML-Reference.pdf)** — beginner's HTML reference covering everything from Lessons 01 + 02, plus practical tips and a complete tag cheat sheet. ~28 pages.

  Source: [html-reference.html](html-reference.html) — fully styled with the Tasty Bites editorial design language.

## How to regenerate the PDF

If you edit the HTML source, regenerate the PDF with headless Edge or Chrome:

```bash
# Edge (built into Windows)
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" \
  --headless=new \
  --disable-gpu \
  --print-to-pdf-no-header \
  --print-to-pdf="C:\path\to\reference\HTML-Reference.pdf" \
  --virtual-time-budget=15000 \
  "file:///C:/path/to/reference/html-reference.html"
```

Chrome works the same way — swap the path to `chrome.exe`. The `--virtual-time-budget=15000` flag gives web fonts (DM Serif Display, Inter, Cormorant Garamond) time to load before the snapshot.

## Reading order

These references are companions to the lessons, not replacements. Recommended use:

1. Walk through the lesson (`01-html-basics/`, `02-html-semantic-forms/`)
2. Do the "Your turn" exercises in `starter/`
3. Keep this PDF open as a lookup
4. Print the cheat sheet (Chapter 13) and stick it on the wall
