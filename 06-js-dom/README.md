# Section 06 — JavaScript + The DOM

**Goal:** Make Tasty Bites *interactive*. The homepage will now:
- **Render recipe cards from a JavaScript array** (not hardcoded HTML)
- Let users **search** by typing in a search box
- Let users **filter** by clicking category buttons

This is where it stops being a static page and starts being a *web app*.

> **Styles:** This section uses the same editorial design system from Section 04 — cream/paper palette, DM Serif Display, Cormorant Garamond italic for the byline, terracotta accents, image zoom on hover. We won't introduce new CSS concepts here (we're focused on JS), but the cards JS renders need to match the same `.card-image-wrap` + `.meta` markup pattern. A small CSS bonus at the end shows `:has()` for styling the empty state.

---

## 1. What is the DOM?

When the browser loads your HTML, it builds a tree of objects in memory representing every element on the page. That tree is called the **DOM** (Document Object Model).

JavaScript can:
- **Read** the DOM — find elements, read their text or attributes
- **Change** the DOM — modify text, add classes, hide things
- **Add or remove** elements

The DOM is the bridge between your JavaScript and what the user sees.

---

## 2. Finding elements

The two main ways to grab an element:

```js
// By ID — returns one element (or null if not found)
const title = document.getElementById("page-title");

// By any CSS selector — returns one element
const firstCard = document.querySelector(".recipe-card");

// By any CSS selector — returns ALL matching (a list)
const allCards = document.querySelectorAll(".recipe-card");
```

`document.querySelector` and `querySelectorAll` use the **same selectors as CSS**: `"#myId"`, `".myClass"`, `"article p"`, etc. You already know these from Section 03.

```js
document.querySelector("h1")               // first <h1>
document.querySelector(".recipe-card")     // first .recipe-card
document.querySelector("#search")          // element with id="search"
document.querySelectorAll("button")        // all <button>s
```

---

## 3. Reading and changing elements

Once you have an element, you can read and change it:

```js
const title = document.querySelector("h1");

// Read
console.log(title.textContent);       // current text

// Change text
title.textContent = "New title";

// Change HTML inside (be careful — see warning below)
title.innerHTML = "<em>New</em> title";

// Change attributes
const img = document.querySelector("img");
img.src = "new-image.jpg";
img.alt = "New description";

// Change styling via classes (preferred)
title.classList.add("highlighted");
title.classList.remove("highlighted");
title.classList.toggle("hidden");       // adds if missing, removes if present

// Or set styles directly (only for simple cases)
title.style.color = "red";
```

**Warning:** `innerHTML` parses the string as HTML. Never set `innerHTML` to text typed by a user — they could inject malicious code. Use `textContent` for plain text. If you need to build HTML from data you control (like our recipe array), `innerHTML` is fine.

---

## 4. Creating new elements

```js
// 1. Create an empty element
const card = document.createElement("article");

// 2. Set its properties
card.className = "recipe-card";
card.textContent = "Hello";

// 3. Add it to the page
document.querySelector("main").appendChild(card);
```

`appendChild` adds the new element as the **last child** of the parent.

### A common pattern: building from a template string

For complex HTML, building it piece by piece is painful. Use `innerHTML` with a template literal:

```js
const recipe = { title: "Carbonara", category: "Dinner" };

const card = document.createElement("article");
card.className = "recipe-card";
card.innerHTML = `
  <h3>${recipe.title}</h3>
  <span class="category">${recipe.category}</span>
`;

document.querySelector(".recipe-grid").appendChild(card);
```

### Clearing a container before re-rendering

```js
const grid = document.querySelector(".recipe-grid");
grid.innerHTML = "";    // remove everything inside
// then append new cards
```

---

## 5. Events — reacting to the user

An **event** is something that happens — a click, a keystroke, a form submit. You react by attaching an **event listener**.

```js
const btn = document.querySelector("button");

btn.addEventListener("click", () => {
  console.log("Button was clicked!");
});
```

The pattern is always:

```js
element.addEventListener("eventName", callbackFunction);
```

Where `callbackFunction` is the function to run when the event happens.

### Common event names

| Event | When it fires |
|-------|---------------|
| `click` | The element is clicked |
| `input` | The user types in an input/textarea |
| `change` | A select dropdown's value changes |
| `submit` | A form is submitted |
| `keydown` / `keyup` | A key is pressed / released |
| `mouseenter` / `mouseleave` | Mouse enters/leaves the element |

### The event object

The callback receives an **event object** with details:

```js
input.addEventListener("input", (event) => {
  console.log(event.target.value);    // what the user typed
});

form.addEventListener("submit", (event) => {
  event.preventDefault();              // STOP the page from reloading
  // ... handle the form
});
```

`event.preventDefault()` is critical for forms — without it, the browser reloads the page when the form is submitted.

---

## 6. The full pattern: data → render → react

This is the structure of nearly every interactive feature:

```js
// 1. Your data (the "state")
const recipes = [ /* ... */ ];

// 2. A function that renders the data to the page
function render(items) {
  const grid = document.querySelector(".recipe-grid");
  grid.innerHTML = "";   // clear

  items.forEach((recipe) => {
    const card = document.createElement("article");
    card.className = "recipe-card";
    card.innerHTML = `
      <h3>${recipe.title}</h3>
      <span class="category">${recipe.category}</span>
    `;
    grid.appendChild(card);
  });
}

// 3. Initial render
render(recipes);

// 4. React to user input → filter → re-render
const search = document.querySelector("#search");
search.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = recipes.filter((r) =>
    r.title.toLowerCase().includes(query)
  );
  render(filtered);
});
```

Read that pattern carefully. **Almost every JS app you'll ever build follows this shape.**

---

## 7. A few small extras you'll need

### Looping with index in `forEach`

```js
recipes.forEach((recipe, index) => {
  console.log(`${index}: ${recipe.title}`);
});
```

### `String.includes` — substring check

```js
"Spaghetti Carbonara".includes("aghet")    // true
"Pizza".toLowerCase().includes("z")        // true
```

### `dataset` — store data on an HTML element

You can stash data on an element using `data-*` attributes:

```html
<button data-category="Dinner">Dinner</button>
```

```js
const btn = document.querySelector("button");
console.log(btn.dataset.category);   // "Dinner"
```

Useful for category buttons — each button stores which category it filters by.

---

## 8. Bonus — `:has()` for styling empty states

A new CSS selector you can use right now: `:has()` lets you style an element **based on its children**.

In our app, the recipe grid is empty when search/filter finds nothing. With `:has()` we can style that case in pure CSS — no extra JS class to toggle:

```css
.recipe-grid:has(.empty) {
  display: block;
  text-align: center;
  padding: 3rem 0;
}
```

This rule only fires when the grid contains an `.empty` child (our "No recipes found." message). Otherwise it stays a grid as normal. `:has()` is supported in every modern browser as of 2025.

---

## Your turn

Open `starter/`. You'll find:
- `index.html` — empty grid (no hardcoded cards!) plus a search input and category buttons
- `styles.css` — styles from Section 04, slightly tweaked for the new controls
- `script.js` — has `recipes` data ready, with TODOs to fill in

**Build this:**

1. Write a `renderRecipes(list)` function that:
   - Finds the `<section class="recipe-grid">` element
   - Clears it (`innerHTML = ""`)
   - For each recipe in `list`, creates a card that matches the editorial markup:

   ```html
   <article class="recipe-card" style="--i: 0">
     <div class="card-image-wrap">
       <img src="..." alt="..." />
     </div>
     <div class="card-body">
       <span class="category">Dinner</span>
       <h3>Recipe title</h3>
       <p class="meta">by Chef Anna · 25 min · Italian</p>
       <p>Short description</p>
       <a href="#">View recipe →</a>
     </div>
   </article>
   ```

   - Pass the loop index as `--i` so the staggered fade-in animation works
   - Appends each card to the grid

2. Call `renderRecipes(recipes)` once to do the initial render.

3. Wire up the **search box** (`#search`). On every `input` event:
   - Get `event.target.value` and lowercase it
   - Filter `recipes` by ones whose title contains the query
   - Call `renderRecipes(filtered)`

4. Wire up the **category buttons**. Each button has a `data-category` attribute. On click:
   - Read `event.target.dataset.category`
   - If it's `"all"`, render all recipes
   - Otherwise filter by that category and render
   - Also: add a `.active` class to the clicked button and remove it from the others (so users can see which filter is selected)

5. **Bonus:** make search and filter work *together* — track the current category and current query in two variables, and have one `applyFilters()` function that uses both.

Compare with `solution/`.

---

## Cheat sheet

```js
// Find elements
document.getElementById("id")
document.querySelector(".class")
document.querySelectorAll(".class")    // returns a list

// Read & change
el.textContent = "new text";
el.innerHTML = "<b>HTML</b>";
el.classList.add("active");
el.classList.remove("active");
el.classList.toggle("active");

// Create elements
const div = document.createElement("div");
div.className = "card";
div.innerHTML = `<h3>${title}</h3>`;
parent.appendChild(div);

// Clear a container
parent.innerHTML = "";

// Events
el.addEventListener("click", (e) => { ... });
el.addEventListener("input", (e) => { ... });
form.addEventListener("submit", (e) => {
  e.preventDefault();
  ...
});

// Data attributes
<button data-category="Dinner">
btn.dataset.category   // "Dinner"
```

---

**Previous:** [05 — JS Basics](../05-js-basics/) | **Next:** [07 — TypeScript](../07-typescript/)
