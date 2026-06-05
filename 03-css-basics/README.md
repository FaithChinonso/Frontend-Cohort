# Section 03 — CSS Basics

**Goal:** Make Tasty Bites actually look like a website. Add colors, fonts, spacing, and learn the "box model."

---

## 1. What is CSS?

**CSS** stands for **Cascading Style Sheets**. If HTML is the skeleton, CSS is the skin, hair, and clothes. CSS controls how the page **looks**: colors, fonts, sizes, spacing, borders, backgrounds.

A line of CSS looks like this:

```css
h1 {
  color: red;
  font-size: 32px;
}
```

This says: *"find every `<h1>` on the page, and make its text red and 32 pixels tall."*

### The pieces of a CSS rule

```css
h1          <- the SELECTOR (what to style)
{
  color: red;       <- a DECLARATION: property (color) and value (red)
  font-size: 32px;  <- another declaration
}
```

- **Selector**: which elements to style (`h1`, `p`, etc.)
- **Property**: what to change (`color`, `font-size`, `background`)
- **Value**: what to change it to (`red`, `32px`, `#ff0000`)
- Every declaration ends with a **semicolon** `;`

---

## 2. Three ways to add CSS to a page

### Option 1: external file (the right way — use this)

Create a separate file ending in `.css` (e.g. `styles.css`). Link it from the `<head>`:

```html
<head>
  <link rel="stylesheet" href="styles.css" />
</head>
```

This is the best approach: one CSS file can style many HTML pages.

### Option 2: in the `<head>` (okay for tiny experiments)

```html
<head>
  <style>
    h1 { color: red; }
  </style>
</head>
```

### Option 3: inline (avoid — hard to maintain)

```html
<h1 style="color: red;">Hello</h1>
```

**Use Option 1 throughout this course.**

---

## 3. Selectors — choosing what to style

### Element selector

Selects every tag of that type:

```css
p { color: gray; }       /* every <p> */
h1 { color: navy; }      /* every <h1> */
```

### Class selector

A **class** is a label you put on a tag. Then you can target that label.

```html
<p class="warning">Watch out!</p>
<p class="warning">Another warning</p>
<p>Normal text</p>
```

```css
.warning {     /* note the dot . */
  color: red;
  font-weight: bold;
}
```

Only the two paragraphs with `class="warning"` are red. Classes are the most common selector in CSS — you'll use them constantly.

A tag can have multiple classes (separated by spaces):

```html
<p class="warning big">Big warning!</p>
```

### ID selector

An **id** is like a class but it must be **unique** — only one element on the page can have a given id. We use ids less often.

```html
<header id="main-header">...</header>
```

```css
#main-header {     /* note the hash # */
  background: black;
}
```

### Descendant selector

Select elements **inside** other elements:

```css
article p {       /* every <p> inside an <article> */
  line-height: 1.6;
}
```

---

## 4. Common CSS properties

### Color

```css
color: red;                /* text color */
background-color: yellow;  /* background */
```

Colors can be written multiple ways:

```css
color: red;                /* color name */
color: #ff0000;            /* hex code */
color: rgb(255, 0, 0);     /* red/green/blue */
color: rgba(255, 0, 0, 0.5); /* with transparency (0 = invisible, 1 = solid) */
```

Hex is the most common in real code. Online color pickers will give you hex codes.

### Fonts

```css
font-family: Arial, sans-serif;  /* the typeface */
font-size: 18px;                  /* text size */
font-weight: bold;                /* or 400, 700, etc. */
font-style: italic;
line-height: 1.5;                 /* spacing between lines */
text-align: center;               /* or left, right, justify */
```

`font-family` takes a list — the browser tries each one until it finds a font you have installed. Always end with a generic family (`sans-serif`, `serif`, `monospace`).

### Sizes — units

- `px` (pixels) — fixed size. `16px`, `32px`, etc.
- `%` — percent of the parent's size. `50%` of the container.
- `em` — relative to the font size of the element.
- `rem` — relative to the **root** font size (the `<html>` element). **Use `rem` for most spacing/sizing — it scales with the user's settings.**

For now, `px` and `rem` are all you need.

---

## 5. The box model

This is the most important concept in CSS. **Every HTML element is a box.** That box has 4 layers:

```
+-----------------------------------+
|           margin                  |  <- space OUTSIDE the box
|  +-----------------------------+  |
|  |        border               |  |  <- the line around the box
|  |  +-----------------------+  |  |
|  |  |     padding           |  |  |  <- space INSIDE the border
|  |  |  +-----------------+  |  |  |
|  |  |  |    content      |  |  |  |  <- the actual text/image
|  |  |  +-----------------+  |  |  |
|  |  +-----------------------+  |  |
|  +-----------------------------+  |
+-----------------------------------+
```

```css
.card {
  padding: 16px;       /* space inside the border */
  border: 2px solid black;
  margin: 20px;        /* space outside the border */
}
```

### Shorthand

You can set all 4 sides at once or specify each:

```css
margin: 10px;                    /* all 4 sides */
margin: 10px 20px;               /* top/bottom = 10, left/right = 20 */
margin: 10px 20px 5px 0;         /* top, right, bottom, left (clockwise) */

margin-top: 10px;                /* one side */
margin-bottom: 20px;
```

Same shorthand works for `padding` and `border`.

### Width and height — and `clamp()` for the modern flex

Hardcoded sizes work, but real pages need to look good at every screen size. The modern way:

```css
/* OLD: brittle */
h1 { font-size: 48px; }

/* MODERN: fluid — scales smoothly between min and max */
h1 { font-size: clamp(2rem, 4vw + 1rem, 4.5rem); }
```

`clamp(MIN, IDEAL, MAX)` takes three values:
- The smallest the value can ever be (on tiny phones)
- The "ideal" value, often expressed with `vw` (viewport-width units)
- The largest it can ever be (on huge desktops)

The browser smoothly interpolates between them. **Use `clamp()` for headline sizes** — one rule replaces three media queries.

```css
.card {
  width: 300px;
  height: 200px;
}
```

By default, `width` only counts the **content**, not padding/border. To make `width` include padding and border (much more intuitive), add this once at the top of your stylesheet:

```css
* {
  box-sizing: border-box;
}
```

The `*` selector means "every element." This single rule fixes a lot of frustration. **Always include it.**

---

## 6. Custom properties — CSS variables

When you reuse the same color in 20 places and then want to change it, finding and replacing is painful. CSS lets you define **custom properties** (often called CSS variables):

```css
:root {
  --color-bg:     #FAF6EF;
  --color-text:   #2B1D13;
  --color-accent: #C2563A;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
}

a {
  color: var(--color-accent);
}
```

Two rules:
- **Define** with `--name: value;` inside any selector. `:root` (the `<html>` element) is the standard place — they're then available everywhere.
- **Use** with `var(--name)`.

Change `--color-accent` once at the top of the file and every link, button, and pill that uses it updates everywhere. This is how real design systems work.

We'll use these properties for the **Tasty Bites palette** in this section:

```css
:root {
  --cream:      #FAF6EF;  /* warm off-white background */
  --paper:      #F3ECDF;  /* card/surface color */
  --espresso:   #2B1D13;  /* body text (not pure black — looks softer) */
  --terracotta: #C2563A;  /* accent — links, highlights */
  --sage:       #7A8A6B;  /* secondary accent */
  --rule:       #E4D9C5;  /* subtle dividers */
}
```

The same idea works for fonts:

```css
:root {
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-body:    'Inter', system-ui, sans-serif;
}

h1, h2, h3 { font-family: var(--font-display); }
body       { font-family: var(--font-body); }
```

---

## 7. Loading real fonts from Google Fonts

The system fonts (Georgia, Arial) work, but pro sites use carefully chosen typefaces. The easiest source is **Google Fonts** (free, fast).

Add this to your `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;600;700&family=Cormorant+Garamond:ital@1&display=swap"
  rel="stylesheet"
/>
```

Then reference the fonts in your CSS:

```css
body { font-family: 'Inter', sans-serif; }
h1   { font-family: 'DM Serif Display', serif; }
```

The `&display=swap` part tells the browser: *show the fallback font immediately, swap in the real one when it loads* — no blank text while waiting.

---

## 8. Backgrounds and borders

```css
.hero {
  background-color: #f5e6d3;
  background-image: url('hero.jpg');
  background-size: cover;       /* fill the box, crop if needed */
  background-position: center;

  border: 1px solid #ccc;       /* width, style, color */
  border-radius: 8px;            /* rounded corners */
}
```

---

## 9. The "cascade" — when rules conflict

What if two rules try to style the same thing?

```css
p { color: blue; }
.special { color: red; }
```

```html
<p class="special">What color am I?</p>
```

Answer: **red**. More specific selectors win over less specific ones. Roughly:

1. Inline `style="..."` beats everything
2. `#id` beats `.class`
3. `.class` beats `p` (tag name)
4. If two rules have equal specificity, the one **written later** wins

Don't worry about memorizing this — when something doesn't look right, open the browser's DevTools (right-click → Inspect) and you can see which rules are applied.

---

## Your turn

Open `starter/`. The HTML already has the Google Fonts `<link>` ready and the new markup we'll need (a `<p class="meta">` row, a `.hero` wrapper). You'll work in `styles.css`.

We're building a **magazine-style recipe page** — cream background, terracotta accents, big serif title, italic byline.

Make the page look good:

1. Add `* { box-sizing: border-box; }` at the top.
2. Define your **palette** as CSS variables on `:root` (use the Tasty Bites tokens from section 6 above — cream, paper, espresso, terracotta, sage, rule).
3. Define `--font-display`, `--font-body`, and `--font-accent` variables.
4. Style the `body`: cream background, espresso color, Inter font, `line-height: 1.65`.
5. Style the `<header>`: terracotta background, cream text, padding, center the title.
6. Style the `<nav>` links: cream color, no underline, spacing.
7. Center `<main>` with `max-width: 760px` and horizontal padding.
8. Give `<article>` a paper background, generous padding, soft `border-radius`, and a subtle espresso-tinted box shadow (`0 12px 24px -12px rgb(43 29 19 / 0.12)`).
9. Style the recipe title (`article h1`): `font-family: var(--font-display)`, `font-size: clamp(2rem, 4vw + 1rem, 3.25rem)`, terracotta color, balanced line-height.
10. Style `.meta` (the byline row): Cormorant Garamond italic, smaller, muted espresso.
11. Replace the `h2` underline with a `--rule` hairline `border-bottom` and add small-caps eyebrow style (`text-transform: uppercase; letter-spacing: 0.12em; font-size: 0.9rem;`).
12. Make the hero image fill the article width with a slight `border-radius`.
13. **Bonus:** add a drop cap on `.description::first-letter` — float left, large, terracotta, in the display font.
14. Style the `<footer>` — small, centered, muted espresso.

Compare with `solution/styles.css` when you're done.

---

## Cheat sheet

```css
/* Selectors */
h1 { }              /* every h1 */
.classname { }      /* class="classname" */
#idname { }         /* id="idname" */
article p { }       /* p inside article */

/* Common properties */
color: #333;
background-color: #fff;
font-family: 'Inter', sans-serif;
font-size: 1rem;
font-weight: bold;
text-align: center;
line-height: 1.6;

/* Box model */
padding: 1rem;
margin: 1rem auto;
border: 1px solid #ccc;
border-radius: 8px;
width: 100%;
max-width: 720px;

/* CSS variables — define once, reuse everywhere */
:root {
  --accent: #C2563A;
}
a { color: var(--accent); }

/* Fluid sizing — replaces media queries for type */
h1 { font-size: clamp(2rem, 4vw + 1rem, 4.5rem); }

/* Always include this */
* { box-sizing: border-box; }
```

---

**Previous:** [02 — Semantic HTML + Forms](../02-html-semantic-forms/) | **Next:** [04 — CSS Layout](../04-css-layout/)
