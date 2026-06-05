# Section 04 — CSS Layout (Flexbox, Grid, Responsive)

**Goal:** Build the Tasty Bites **homepage** — a responsive grid of recipe cards that rearranges on mobile.

This is the section where your site starts to look like a real website.

---

## 1. Display: block vs inline

Every element has a default **display** type:

- **Block** elements take up the full width of their parent and start on a new line. Examples: `<div>`, `<p>`, `<h1>`, `<section>`.
- **Inline** elements only take up as much width as their content, and sit next to each other on the same line. Examples: `<span>`, `<a>`, `<strong>`.

You can change it:

```css
.menu-item {
  display: block;     /* force inline element to act like a block */
}

.tag {
  display: inline-block;   /* like inline, but you can set width/height */
}
```

But the two most powerful display types — and the ones you'll use constantly — are **flex** and **grid**.

---

## 2. Flexbox — arranging things in a row or column

Flexbox makes it easy to lay out children of a container in a row or column.

```html
<div class="row">
  <div>Item A</div>
  <div>Item B</div>
  <div>Item C</div>
</div>
```

```css
.row {
  display: flex;       /* THIS turns it into a flex container */
  gap: 1rem;           /* space between items */
}
```

That's it. The three children are now side-by-side instead of stacked.

### Useful flex properties (on the container)

```css
.row {
  display: flex;

  flex-direction: row;        /* row (default) | column */
  justify-content: center;    /* horizontal alignment */
  align-items: center;        /* vertical alignment */
  gap: 1rem;                  /* space between items */
  flex-wrap: wrap;            /* let items wrap to next line if too wide */
}
```

**`justify-content`** options (along the main axis — left/right by default):
- `flex-start` (default) — pushes items to the start
- `flex-end` — pushes items to the end
- `center` — centers them
- `space-between` — first and last stick to the edges, equal gaps between
- `space-around` — equal space around each item

**`align-items`** options (perpendicular axis — up/down by default):
- `stretch` (default) — items stretch to fill height
- `flex-start`, `flex-end`, `center` — same idea

### Useful flex properties (on the items)

```css
.row > div {
  flex: 1;       /* grow to fill available space */
}
```

`flex: 1` is a trick to make all items equal width. Try it.

### Real example: header with logo on the left, nav on the right

```html
<header>
  <h1>Tasty Bites</h1>
  <nav>...</nav>
</header>
```

```css
header {
  display: flex;
  justify-content: space-between;   /* logo left, nav right */
  align-items: center;
  padding: 1rem;
}
```

---

## 3. CSS Grid — arranging things in rows AND columns

Grid is for 2D layouts — when you want a real grid of items, like cards in a gallery.

```html
<div class="grid">
  <div>Recipe 1</div>
  <div>Recipe 2</div>
  <div>Recipe 3</div>
  <div>Recipe 4</div>
  <div>Recipe 5</div>
  <div>Recipe 6</div>
</div>
```

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;   /* 3 equal columns */
  gap: 1rem;
}
```

`1fr` means "1 fraction of available space." So `1fr 1fr 1fr` = three equal columns. You could also write `2fr 1fr` for one column twice as wide as the other.

### The killer feature: auto-fit

You usually don't want to hardcode "3 columns." You want "as many columns as fit, at least 250px wide each."

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

This single line gives you a responsive grid for free. On a wide screen you get 4 columns; on a narrow screen the items wrap to 1 column. **Memorize this snippet.**

---

## 4. Responsive design — phones vs desktops

A **responsive** site looks good on any screen size. There are two big tools:

### Use relative units

Avoid fixed widths like `width: 800px`. Use:
- `max-width` instead of `width` — caps the size but lets it shrink
- `%` and `rem` instead of `px` for spacing

### Media queries

A **media query** applies CSS only when the screen matches certain conditions.

```css
.card {
  font-size: 1rem;
}

/* Only on screens 768px wide or smaller */
@media (max-width: 768px) {
  .card {
    font-size: 0.875rem;
  }
}
```

`@media (max-width: 768px)` means "if the screen is 768px wide or less" — i.e. tablet and phone.

Common breakpoints:
- `768px` — phone vs tablet
- `1024px` — tablet vs desktop

Example: stack the header items vertically on mobile.

```css
header {
  display: flex;
  justify-content: space-between;
}

@media (max-width: 768px) {
  header {
    flex-direction: column;   /* stack instead of side-by-side */
    text-align: center;
  }
}
```

### How to test mobile

In Chrome/Edge, right-click the page → **Inspect** → click the phone/tablet icon at the top of the DevTools panel. You can now resize the viewport or pick a device preset.

---

## 5. Pseudo-classes — `:hover`, `:focus`

Style an element when the user interacts with it.

```css
button {
  background: #c8553d;
  color: white;
}

button:hover {
  background: #a23c2a;       /* darker when mouse hovers */
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}
```

`cursor: pointer` makes the mouse change to a hand when hovering, which signals "clickable."

---

## 6. Transitions — smooth animations

Make hover effects glide instead of snap:

```css
button {
  background: #c8553d;
  transition: background 0.2s ease;
}

button:hover {
  background: #a23c2a;
}
```

The `transition` says: *"when the `background` property changes, animate it over 0.2 seconds."*

---

## 7. `aspect-ratio` — never wrestle with image sizes again

Recipe cards look broken when one image is square and the next is wide — heights jump around, the grid feels uneven. The fix is one property:

```css
.recipe-card img {
  width: 100%;
  aspect-ratio: 4 / 5;    /* always tall portrait */
  object-fit: cover;       /* crop to fill, don't squish */
}
```

`aspect-ratio` locks the shape regardless of the actual image dimensions. `object-fit: cover` makes the image fill that box, cropping any excess instead of stretching. **Every modern image on the web uses this combo.**

### Bonus: image zoom on hover

A small but luxurious touch. Wrap the image in a div, hide the overflow, and scale the image up on card hover:

```html
<article class="recipe-card">
  <div class="card-image-wrap">
    <img src="..." />
  </div>
  <div class="card-body">...</div>
</article>
```

```css
.card-image-wrap {
  overflow: hidden;        /* clip the scaled image to the wrapper */
}

.card-image-wrap img {
  transition: transform 0.45s ease;
}

.recipe-card:hover .card-image-wrap img {
  transform: scale(1.05);  /* gentle zoom — not too much */
}
```

The image grows, the wrapper crops the overflow, and the card feels alive.

---

## 8. Magazine asymmetry — one card spans two columns

Real magazines don't make every card the same size. The featured story gets more space. CSS Grid lets us do this with one rule:

```css
.recipe-card--featured {
  grid-column: span 2;     /* this card takes up two columns */
}
```

```html
<article class="recipe-card recipe-card--featured">...</article>
<article class="recipe-card">...</article>
<article class="recipe-card">...</article>
```

The featured card stays double-wide on desktop and **automatically falls back** to a single column on mobile because `minmax()` decides there's no room for two columns. No media query needed — the grid handles it.

---

## 9. Two more selectors you'll love — `:is()` and `color-mix()`

### `:is()` — avoid repeating yourself

When you want the same rule to apply to multiple selectors:

```css
/* Old way — repetitive */
h1, h2, h3 {
  font-family: 'DM Serif Display', serif;
}

article h1, article h2, article h3 {
  margin-top: 1.5rem;
}

/* With :is() — cleaner */
:is(article, section) :is(h1, h2, h3) {
  margin-top: 1.5rem;
}
```

`:is(a, b, c)` matches any of `a`, `b`, or `c`. It's just shorthand, but on a big stylesheet it adds up.

### `color-mix()` — tint a color without inventing a new variable

Need a "20% terracotta on cream" background for a soft category pill? Don't add another palette variable — mix them:

```css
.category {
  background: color-mix(in srgb, var(--terracotta) 12%, transparent);
  color: var(--terracotta);
}
```

This takes 12% of your terracotta and mixes it with transparent (giving a subtle wash). Change `--terracotta` once and every tinted pill updates automatically. **Hugely useful for hover states, disabled buttons, and soft accents.**

---

## 10. Staggered animations — cards fade in one after another

A signature touch on premium sites — cards don't all pop in at once, they cascade:

```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.recipe-card {
  opacity: 0;
  animation: fade-up 0.6s ease forwards;
  animation-delay: calc(var(--i, 0) * 80ms);
}
```

Then set `--i` per card in the HTML:

```html
<article class="recipe-card" style="--i: 0">...</article>
<article class="recipe-card" style="--i: 1">...</article>
<article class="recipe-card" style="--i: 2">...</article>
```

Card 0 fades in immediately, card 1 after 80ms, card 2 after 160ms. Small detail, big "wow."

---

## Your turn

Open `starter/`. You'll find:

- `index.html` — the homepage skeleton with **6 recipe cards** already in the HTML. The first card has `recipe-card--featured` for the asymmetric layout. Each card has an image wrapped in `.card-image-wrap`, a `.meta` byline row, and a `.category` pill.
- `recipe.html` — the recipe page from Section 03
- `styles.css` — Section 03 tokens already at the top. Build everything else.

**Build this:**

1. Make the header a flex container — logo left, nav right, vertically centered.
2. Style `.intro` — centered text, a small-caps eyebrow line above the heading.
3. Style `.recipe-grid` as a grid using `repeat(auto-fill, minmax(min(100%, 18rem), 1fr))` and a `clamp()` gap.
4. Make `.recipe-card--featured` span 2 columns (it'll automatically collapse on mobile).
5. Style each `.recipe-card` — paper background, rounded corners, espresso-tinted soft shadow, a `transition` for lift+shadow, and hover lift (`translateY(-4px)`).
6. Style `.card-image-wrap` — `overflow: hidden`, rounded top corners. Inside, the `img` gets `aspect-ratio: 4/5`, `object-fit: cover`, and a transition.
7. On `.recipe-card:hover .card-image-wrap img`, apply `transform: scale(1.05)` for the zoom effect.
8. Style `.category` as a small pill using `color-mix()` for the soft terracotta background.
9. Style `.meta` (the byline) — Cormorant Garamond italic, smaller, muted espresso.
10. Add the **staggered fade-in** keyframe + use `--i` on each card. The HTML already passes `style="--i: 0"`, `style="--i: 1"`, etc.
11. Add a media query at 640px that stacks the header vertically.

Resize from wide to narrow — the grid should reflow, the featured card should drop to single-width, and the header should stack.

Compare with `solution/`.

---

## Cheat sheet

```css
/* Flexbox */
.container {
  display: flex;
  flex-direction: row;          /* or column */
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Grid — modern responsive */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));
  gap: clamp(1rem, 2vw, 2rem);
}

/* Featured card spans 2 cols (collapses on mobile via minmax) */
.card--featured { grid-column: span 2; }

/* Image polish */
.card-image-wrap { overflow: hidden; }
.card-image-wrap img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  transition: transform 0.45s ease;
}
.card:hover .card-image-wrap img { transform: scale(1.05); }

/* Tinted pill via color-mix() */
.pill {
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  color: var(--accent);
}

/* Staggered fade-in */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.card {
  animation: fade-up 0.6s ease forwards;
  animation-delay: calc(var(--i, 0) * 80ms);
}

/* Hover */
button:hover { background: blue; cursor: pointer; }

/* Smooth changes */
button { transition: all 0.2s ease; }

/* Mobile */
@media (max-width: 640px) {
  /* phone-only styles here */
}
```

---

**Previous:** [03 — CSS Basics](../03-css-basics/) | **Next:** [05 — JavaScript Basics](../05-js-basics/)
