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

The items fill the columns automatically — left to right, then they wrap to the next row. You don't position each one by hand.

### Making one item bigger

You can tell a single item to span more than one column:

```css
.featured {
  grid-column: span 2;   /* this item takes up 2 columns instead of 1 */
}
```

### Going to one column on mobile

Three columns are too cramped on a phone. We fix that with a **media query** (next section) that switches the grid to a single column:

```css
@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;   /* one column — everything stacks */
  }
}
```

That's the whole plan for our homepage: three columns on desktop, one column on phones.

> **Going further (optional):** there's a one-line trick — `repeat(auto-fit, minmax(250px, 1fr))` — that makes "as many columns as fit" without a media query. It's powerful but the syntax is dense, so we're sticking with explicit columns for now.

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
  transition: transform 0.4s ease;
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

On desktop the featured card stays double-wide. On mobile, our grid switches to a single column (see the media query in section 4), so we also reset the featured card back to one column there:

```css
@media (max-width: 640px) {
  .recipe-card--featured {
    grid-column: auto;   /* back to a normal single-column card on phones */
  }
}
```

### A soft tinted pill

The category label sits on a faint terracotta background. We get that "faint" look with `rgba()` — the same red/green/blue as terracotta but at low opacity:

```css
.category {
  background: rgba(194, 86, 58, 0.12);   /* terracotta at 12% — a soft wash */
  color: var(--terracotta);
}
```

---

## Your turn

This section is **all CSS** — you won't write any new HTML. The homepage markup is the same one **you built back in Section 02** (the grid of recipe cards), and the recipe page is the one from Section 03. Here we just style them.

Open `starter/`. You'll find:

- `index.html` — the homepage you built in Section 02: **6 recipe cards** in a `.recipe-grid`. The first card has `recipe-card--featured` for the asymmetric layout. Each card has an image wrapped in `.card-image-wrap`, a `.meta` byline row, and a `.category` pill. Right now it's unstyled (the cards just stack) — your CSS turns it into a grid.
- `recipe.html` — the recipe page from Section 03
- `styles.css` — Section 03 tokens already at the top. Build everything else.

**Build this:**

1. Make the header a flex container — logo left, nav right, vertically centered.
2. Style `.intro` — centered text, a small-caps eyebrow line above the heading.
3. Style `.recipe-grid` as a grid with three equal columns: `grid-template-columns: 1fr 1fr 1fr` and `gap: 1.5rem`.
4. Make `.recipe-card--featured` span 2 columns with `grid-column: span 2`.
5. Style each `.recipe-card` — paper background, rounded corners, espresso-tinted soft shadow, a `transition` for lift+shadow, and hover lift (`translateY(-4px)`).
6. Style `.card-image-wrap` — `overflow: hidden`. Inside, the `img` gets `aspect-ratio: 4/5`, `object-fit: cover`, and a transition.
7. On `.recipe-card:hover .card-image-wrap img`, apply `transform: scale(1.05)` for the zoom effect.
8. Style `.category` as a small pill with a soft terracotta background: `background: rgba(194, 86, 58, 0.12)`.
9. Style `.meta` (the byline) — Cormorant Garamond italic, smaller, muted espresso.
10. Add a media query at 640px that: stacks the header vertically, switches the grid to one column (`grid-template-columns: 1fr`), and resets the featured card (`grid-column: auto`).

Resize from wide to narrow — the grid should drop to a single column, the featured card should become full-width, and the header should stack.

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

/* Grid — three equal columns */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;   /* 1fr = 1 equal share */
  gap: 1.5rem;
}

/* Make one item span 2 columns */
.card--featured { grid-column: span 2; }

/* Image polish */
.card-image-wrap { overflow: hidden; }
.card-image-wrap img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.card:hover .card-image-wrap img { transform: scale(1.05); }

/* Soft tinted pill (terracotta at 12%) */
.pill {
  background: rgba(194, 86, 58, 0.12);
  color: var(--accent);
}

/* Hover */
button:hover { background: blue; cursor: pointer; }

/* Smooth changes */
button { transition: all 0.2s ease; }

/* Mobile — one column on phones */
@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
}
```

---

**Previous:** [03 — CSS Basics](../03-css-basics/) | **Next:** [05 — JavaScript Basics](../05-js-basics/)
