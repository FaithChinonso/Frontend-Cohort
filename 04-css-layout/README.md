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

## Your turn

Open `starter/`. You'll find:

- `index.html` — the homepage skeleton. **6 recipe cards already in the HTML.** Each card has class `recipe-card` with an image, title, description, and category tag.
- `recipe.html` — same recipe page from Section 03
- `styles.css` — the CSS from Section 03 is already there. Add new styles below the comment.

**Build this:**

1. Make the header use flexbox: logo on the left, nav on the right, vertically centered.
2. Style the recipe cards container as a grid: `repeat(auto-fit, minmax(280px, 1fr))` with a 1.5rem gap.
3. Style each `.recipe-card`:
   - White background, rounded corners, a subtle border
   - The image fills the card width with `width: 100%`
   - Padding around the text
   - Add a `transition` and on `:hover` slightly lift the card (`transform: translateY(-4px)` and a box-shadow)
4. Style the category tag (`.category`) — a small colored pill at the top of each card.
5. Add a media query at the bottom: when screen width is 768px or less, make the header stack vertically and center its items.

When done, resize the browser window from wide to narrow — the grid should reflow automatically.

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

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Hover */
button:hover { background: blue; cursor: pointer; }

/* Smooth changes */
button { transition: all 0.2s ease; }

/* Mobile */
@media (max-width: 768px) {
  /* phone-only styles here */
}
```

---

**Previous:** [03 — CSS Basics](../03-css-basics/) | **Next:** [05 — JavaScript Basics](../05-js-basics/)
