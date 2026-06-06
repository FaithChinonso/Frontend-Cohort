# Section 02 — Semantic HTML + Lists + Forms

**Goal:** Upgrade the recipe page with proper lists, use **semantic tags** to give the page real structure, and add a "Subscribe to our newsletter" form.

---

## 1. Lists

In Section 01 we used a bunch of `<p>` tags for ingredients. That's wrong — ingredients are a **list**. HTML has tags for that.

### Unordered list — `<ul>`

A bulleted list. Order doesn't matter.

```html
<ul>
  <li>Pasta</li>
  <li>Eggs</li>
  <li>Cheese</li>
</ul>
```

- `<ul>` = unordered list (the container)
- `<li>` = list item (each bullet)

### Ordered list — `<ol>`

A numbered list. Order **does** matter. Perfect for cooking steps.

```html
<ol>
  <li>Boil the pasta</li>
  <li>Fry the pancetta</li>
  <li>Mix everything</li>
</ol>
```

The browser numbers them automatically — you don't write "1.", "2.", "3." yourself.

---

## 2. Semantic HTML

"Semantic" means "having meaning." Look at these two examples:

```html
<!-- Bad: no meaning, just boxes -->
<div>The top of the page</div>
<div>Main content</div>
<div>The footer</div>
```

```html
<!-- Good: tags describe what each part IS -->
<header>The top of the page</header>
<main>Main content</main>
<footer>The footer</footer>
```

Both look identical in the browser. But the second version tells **the browser, search engines, and screen readers for blind users** what each part of the page is for. This matters for accessibility and SEO.

### The semantic tags you should know

| Tag | What it means |
|-----|---------------|
| `<header>` | The top of the page or a section (logo, nav, page title) |
| `<nav>` | A navigation menu (links to other pages) |
| `<main>` | The main content of the page. Only one per page. |
| `<section>` | A themed grouping of content (e.g. "Ingredients section") |
| `<article>` | A self-contained piece of content (a blog post, a recipe) |
| `<aside>` | Content related to but separate from the main content (sidebar) |
| `<footer>` | The bottom of the page or a section |

A real page often looks like this:

```html
<body>
  <header>
    <nav>...links...</nav>
  </header>

  <main>
    <article>
      <h1>Recipe title</h1>
      <section>
        <h2>Ingredients</h2>
        ...
      </section>
      <section>
        <h2>Steps</h2>
        ...
      </section>
    </article>
  </main>

  <footer>...</footer>
</body>
```

### What about `<div>` and `<span>`?

`<div>` and `<span>` are tags with **no meaning**. They're generic containers we use when no semantic tag fits.

- `<div>` is a **block** element (takes up a full line)
- `<span>` is **inline** (only as wide as its content, sits inside a line of text)

Use them when you need to group things for styling but no semantic tag applies. We'll use these a lot in CSS later.

---

## 3. Forms

A **form** is how users send data to a website — searching, signing up, logging in, contacting you.

### The basic form

```html
<form>
  <label for="email">Email address:</label>
  <input type="email" id="email" name="email" />

  <button type="submit">Subscribe</button>
</form>
```

### The pieces

**`<input>`** — a single field the user types into. The `type` attribute controls what kind:

| Type | What it is |
|------|------------|
| `text` | Plain text |
| `email` | Email address (browser checks format) |
| `password` | Hides characters as dots |
| `number` | Numbers only |
| `checkbox` | A tickbox |
| `radio` | Pick one option from many |
| `submit` | A button that sends the form |

**`<label>`** — describes what an input is for. The `for` attribute should match the input's `id`. This makes the label clickable and helps screen readers.

**`<textarea>`** — like `<input>` but for multi-line text (a message, a review).

```html
<label for="msg">Your message:</label>
<textarea id="msg" name="message" rows="4"></textarea>
```

**`<select>`** — a dropdown menu.

```html
<label for="category">Category:</label>
<select id="category" name="category">
  <option value="breakfast">Breakfast</option>
  <option value="lunch">Lunch</option>
  <option value="dinner">Dinner</option>
</select>
```

**`<button>`** — a clickable button. `type="submit"` sends the form.

### Useful input attributes

- `placeholder="hint text"` — grey hint shown before the user types
- `required` — the form won't submit if this is empty
- `value="default"` — pre-fills the field

```html
<input type="email" id="email" name="email" placeholder="you@example.com" required />
```

### Grouping each field

In the solution you'll see each label + input pair wrapped in a plain `<div>`:

```html
<div>
  <label for="name">Your name:</label>
  <input type="text" id="name" name="name" required />
</div>
```

The `<div>` groups the two together as one "row." It has no meaning of its own — it's just a container that makes the form easier to lay out later with CSS.

---

## 4. Recipe cards

Our homepage needs to show a list of recipes. We *could* use a plain `<ul>` of links, but real recipe sites show **cards** — a little box per recipe with an image, a title, and a short blurb.

Each card is an `<article>` (a self-contained piece of content). Inside it we put an image and some text:

```html
<article class="recipe-card">
  <div class="card-image-wrap">
    <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641" alt="Tikka masala" />
  </div>
  <div class="card-body">
    <span class="category">Dinner</span>
    <h3>Chicken Tikka Masala</h3>
    <p class="meta">by Chef Raj · 40 min · Indian</p>
    <p>Creamy, spiced tomato curry that's a weeknight favorite.</p>
    <a href="recipe.html">View recipe →</a>
  </div>
</article>
```

Notice the **classes** (`recipe-card`, `card-image-wrap`, `category`, `meta`). They don't do anything yet — they're just labels we attach now so that in **Section 04 (CSS Layout)** we can find these elements and style them into a real grid of cards.

A page lists many recipes, so we wrap several cards in one container:

```html
<section class="recipe-grid">
  <article class="recipe-card recipe-card--featured">...</article>  <!-- the big one -->
  <article class="recipe-card">...</article>
  <article class="recipe-card">...</article>
  <!-- ...and so on -->
</section>
```

The first card has an **extra class**, `recipe-card--featured`. A tag can have more than one class (separated by a space). Later, CSS uses that extra label to make the featured card bigger than the rest.

> **Heads up:** until we add CSS in Section 04, these cards will just stack on top of each other in a tall column — no grid, no styling. That's completely normal. HTML builds the *structure*; CSS makes it *look* like a grid.

---

## 5. Multi-page sites

Real websites have multiple pages. To link them, you just create more HTML files and link with `<a>`:

```
my-site/
  index.html      <- homepage
  about.html      <- about page
  contact.html    <- contact page
```

```html
<a href="about.html">About us</a>
```

In this section, we'll build **two pages**:
1. `index.html` — the homepage: an intro, a grid of recipe **cards**, and a subscribe form
2. `recipe.html` — the detailed Carbonara recipe from Section 01, but improved

---

## Your turn

Open `starter/`. You'll find two files: `index.html` and `recipe.html`. Each has TODO comments.

**For `recipe.html`:**
- Wrap the page in proper `<header>`, `<main>`, `<article>`, `<section>`, `<footer>` tags
- Replace the ingredient `<p>` tags with a `<ul>`
- Replace the step `<p>` tags with an `<ol>`
- Add a `<nav>` in the header linking back to `index.html`

**For `index.html`:**
- Add a `<header>` with a site title and navigation
- Add a `<main>` containing:
  - An intro band: a `<section class="intro">` with an eyebrow line, an `<h2>`, and a short paragraph
  - A `<section class="recipe-grid">` with **6 recipe cards** (see section 4 above). Make the first card the featured one (`class="recipe-card recipe-card--featured"`). Build one card, then copy it 5 more times and change the image, title, category, and blurb.
  - A subscribe form with: a name input (required), an email input (required), a category dropdown (Breakfast/Lunch/Dinner), and a submit button
- Add a `<footer>` with copyright text. Tip: write the © symbol with `&copy;` — that's an HTML *entity*, a special code for a character that's hard to type. (`&amp;` gives `&`, `&lt;` gives `<`, and so on.)

Don't worry that the cards look plain and stacked — we style them into a grid in Section 04.

Compare with `solution/` when you're done.

---

## Cheat sheet

| Tag | What it's for |
|-----|---------------|
| `<ul>`, `<ol>`, `<li>` | Lists |
| `<header>`, `<footer>` | Top and bottom of page/section |
| `<nav>` | Navigation links |
| `<main>` | Main page content (only one!) |
| `<section>` | A themed group of content |
| `<article>` | A self-contained piece (blog post, recipe) |
| `<div>`, `<span>` | Generic containers with no meaning |
| `<form>` | Wraps a form |
| `<input type="...">` | A form field |
| `<label for="id">` | A label for an input |
| `<textarea>` | Multi-line text field |
| `<select>`, `<option>` | Dropdown menu |
| `<button>` | A clickable button |

---

**Previous:** [01 — HTML Basics](../01-html-basics/) | **Next:** [03 — CSS Basics](../03-css-basics/)
