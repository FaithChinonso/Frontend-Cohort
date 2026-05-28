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

### Width and height

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

## 6. Backgrounds and borders

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

## 7. The "cascade" — when rules conflict

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

Open `starter/`. You'll find `recipe.html` (the same page from Section 02) and an empty `styles.css`.

The HTML already has a `<link>` to the CSS file. You only need to edit `styles.css`.

Make the page look good:

1. Add `* { box-sizing: border-box; }` at the top
2. Set a nice font on `body` (try `font-family: 'Georgia', serif;`)
3. Give `body` a soft background color (e.g. `#fdf6ec`) and a darker text color (e.g. `#2a2a2a`)
4. Center the `main` element and limit its width to `720px`. Hint: `margin: 0 auto` centers a block element horizontally.
5. Style the `header` — background color, padding, center the text
6. Style the `nav` links with some spacing and a color
7. Add padding to the `article` and a white background
8. Make the recipe image fill the article width: `width: 100%`
9. Style the headings — bigger, different color
10. Give the lists some padding-left so the bullets show, and increase line-height for readability
11. Style the `footer` — smaller text, centered, with some top margin

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
font-family: Arial, sans-serif;
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

/* Always include this */
* { box-sizing: border-box; }
```

---

**Previous:** [02 — Semantic HTML + Forms](../02-html-semantic-forms/) | **Next:** [04 — CSS Layout](../04-css-layout/)
