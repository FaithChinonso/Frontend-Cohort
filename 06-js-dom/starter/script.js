/* ════════════════════════════════════════════════════════════════════════════
   SECTION 06 — JavaScript + the DOM
   ════════════════════════════════════════════════════════════════════════════

   THE GOAL
   ────────
   In Section 05 we lived inside the console. Now we make the page itself
   change in response to data and user input. By the end of this section
   the homepage will:

     • Render recipe cards from a JS array (no hardcoded HTML)
     • Filter cards live as the user types in the search box
     • Filter cards when the user clicks a category button

   TEACHER'S GUIDE
   ───────────────
   Each task follows the same shape as Section 05:

     ▸ CONCEPT       — what's being taught and why
     ▸ EXAMPLE       — a tiny isolated demo
     ▸ YOUR TASK     — what the student writes
     ▸ TEACHING NOTES — things to call out at the projector
     ▸ SOLUTION       — sealed in /* ... *​/ blocks; uncomment to reveal

   Open the browser console (F12) AND keep the page visible — students
   need to see both as they code.
   ════════════════════════════════════════════════════════════════════════════ */

console.log("script.js loaded — let's make the page do something.");



/* ────────────────────────────────────────────────────────────────────────────
   THE DATA
   ────────────────────────────────────────────────────────────────────────────
   Same shape as Section 05, but richer — extra fields the cards will display.
   Don't change this. Students just consume it.
   ──────────────────────────────────────────────────────────────────────────── */

const recipes = [
  { title: "Spaghetti Carbonara",   category: "Dinner",    description: "Classic Roman pasta with eggs, cheese, and pancetta.",     image: "https://images.unsplash.com/photo-1612874742237-6526221588e3", chef: "Anna",  minutes: 25, cuisine: "Italian"  },
  { title: "Chicken Tikka Masala",  category: "Dinner",    description: "Creamy, spiced tomato curry that's a weeknight favorite.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641", chef: "Raj",   minutes: 40, cuisine: "Indian"   },
  { title: "Chocolate Chip Cookies",category: "Dessert",   description: "Crisp edges, chewy middle. The recipe everyone steals.",   image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e", chef: "Maya",  minutes: 30, cuisine: "Baking"   },
  { title: "Fluffy Pancakes",       category: "Breakfast", description: "Tall, light, golden. Serve with butter and real syrup.",   image: "https://images.unsplash.com/photo-1525351484163-7529414344d8", chef: "Sam",   minutes: 15, cuisine: "American" },
  { title: "Caesar Salad",          category: "Lunch",     description: "Crunchy romaine, sharp dressing, crisp croutons.",         image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe", chef: "Lu",    minutes: 10, cuisine: "Classic"  },
  { title: "Margherita Pizza",      category: "Dinner",    description: "Three toppings, perfect crust. Don't overthink it.",       image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38", chef: "Marco", minutes: 45, cuisine: "Italian"  },
  { title: "Avocado Toast",         category: "Breakfast", description: "Smashed avocado, lemon, chili, and good bread.",           image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2", chef: "Kai",   minutes: 5,  cuisine: "Brunch"   },
  { title: "Tiramisu",              category: "Dessert",   description: "Coffee-soaked ladyfingers and mascarpone cream.",          image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9", chef: "Sofia", minutes: 60, cuisine: "Italian"  },
];



/* ────────────────────────────────────────────────────────────────────────────
   THE STATE
   ────────────────────────────────────────────────────────────────────────────
   Two `let` variables that change as the user interacts.
     • searchQuery   — what the user has typed in the search box (lowercase)
     • activeCategory — the currently selected category ("all", "Dinner", ...)

   Whenever EITHER changes, we re-render the grid with whatever survives
   the filter. This pattern — STATE → RENDER → reacting to events — is
   the foundation of every modern web app.
   ──────────────────────────────────────────────────────────────────────────── */

let searchQuery = "";
let activeCategory = "all";



/* ╔══════════════════════════════════════════════════════════════════════════╗
   ║  TASK 1 — Write renderRecipes(list)                                      ║
   ╚══════════════════════════════════════════════════════════════════════════╝

   ▸ CONCEPT
     • The DOM (Document Object Model) is the live tree of every element on
       the page. JavaScript can find, create, change, and remove pieces of it.
     • `document.querySelector(".x")` finds the first element matching ".x".
     • `element.innerHTML = "..."` replaces its inner HTML.
     • `document.createElement("article")` creates a new tag in memory.
     • `parent.appendChild(child)` adds an element to the page.

   ▸ EXAMPLE
       // Find an existing element
       const heading = document.querySelector("h1");
       heading.textContent = "New text";

       // Create one from scratch and add it
       const p = document.createElement("p");
       p.textContent = "Hello!";
       document.body.appendChild(p);

       // Set HTML inside (powerful — and what we'll use)
       const div = document.createElement("div");
       div.innerHTML = `<strong>${someValue}</strong>`;

   ▸ YOUR TASK
     Write `renderRecipes(list)` that:
       1. Finds the `<section class="recipe-grid">` element
       2. Clears it by setting `innerHTML = ""`
       3. If `list` is empty, show:
            `<p class="empty">No recipes found.</p>`
          (CSS handles the styling.)
       4. Otherwise, for each recipe, create an `<article>` with this
          structure (CSS already targets these classes):

            <article class="recipe-card" style="--i: 0">
              <div class="card-image-wrap">
                <img src="..." alt="..." />
              </div>
              <div class="card-body">
                <span class="category">Dinner</span>
                <h3>Title</h3>
                <p class="meta">by Chef Anna · 25 min · Italian</p>
                <p>description</p>
                <a href="#">View recipe →</a>
              </div>
            </article>

       5. Pass the loop INDEX as the `--i` CSS variable so the staggered
          fade-in animation works (`card.style.setProperty("--i", i)`).
       6. Append each card to the grid.

   ▸ TEACHING NOTES
     • Open DevTools → Elements panel and watch the cards appear when the
       function runs. Magical moment for students.
     • Stress that `innerHTML = ""` is how we "throw away" old cards before
       drawing the new filtered set. Without it, cards stack up.
     • Backticks ` ` (template literals) make multi-line HTML strings way
       cleaner than string concatenation. Show what concatenation looks like
       and let them be glad they don't have to write it.
     • XSS warning: using `innerHTML` with USER input is dangerous. We're
       building from our OWN data, so it's safe.
*/

function renderRecipes(list) {
  // ── write your code here ──

}



/* SOLUTION (uncomment to reveal)

function renderRecipes(list) {
  const grid = document.querySelector(".recipe-grid");
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = `<p class="empty">No recipes found. Try a different search?</p>`;
    return;
  }

  list.forEach((recipe, i) => {
    const card = document.createElement("article");
    card.className = "recipe-card";
    card.style.setProperty("--i", i);
    card.innerHTML = `
      <div class="card-image-wrap">
        <img src="${recipe.image}" alt="${recipe.title}" />
      </div>
      <div class="card-body">
        <span class="category">${recipe.category}</span>
        <h3>${recipe.title}</h3>
        <p class="meta">by Chef ${recipe.chef} · ${recipe.minutes} min · ${recipe.cuisine}</p>
        <p>${recipe.description}</p>
        <a href="#">View recipe →</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

*/



/* ╔══════════════════════════════════════════════════════════════════════════╗
   ║  TASK 2 — Initial render                                                 ║
   ╚══════════════════════════════════════════════════════════════════════════╝

   ▸ CONCEPT
     • Defining a function doesn't run it. We have to CALL it.
     • At page load, before the user does anything, we want all 8 recipes
       on screen. So we call `renderRecipes(recipes)` once at the top.

   ▸ EXAMPLE
       function sayHi() { console.log("hi"); }
       // nothing printed yet — function is defined but not called

       sayHi();       // NOW it prints

   ▸ YOUR TASK
     Call `renderRecipes(recipes)` once so the page shows every recipe
     when it first loads.

   ▸ TEACHING NOTES
     • Save → refresh the browser. Cards should appear with the staggered
       fade-in animation.
     • Demonstrate what happens if you forget this line: blank page.
*/

// ── write your code here ──



/* SOLUTION (uncomment to reveal)

renderRecipes(recipes);

*/



/* ╔══════════════════════════════════════════════════════════════════════════╗
   ║  TASK 3 — applyFilters(): one function that combines search + category   ║
   ╚══════════════════════════════════════════════════════════════════════════╝

   ▸ CONCEPT
     • Both the search box AND the filter buttons should narrow the cards.
     • Instead of writing the filter logic twice, we write it ONCE in
       `applyFilters()` and call it from both places.
     • It reads the two state variables (`searchQuery`, `activeCategory`),
       filters `recipes`, and hands the result to `renderRecipes`.

   ▸ EXAMPLE
       // A filter that combines two conditions:
       const items = [{ tag: "red", size: 5 }, { tag: "blue", size: 3 }];
       const minSize = 4;
       const tag = "red";
       const found = items.filter((it) =>
         it.tag === tag && it.size >= minSize
       );
       // [{ tag: "red", size: 5 }]

   ▸ YOUR TASK
     Write `applyFilters()` that:
       1. Filters `recipes` keeping only items that:
          • match the active category (or `activeCategory === "all"`)
          • AND have a title that includes `searchQuery` (case-insensitive)
       2. Calls `renderRecipes(filtered)`.

   ▸ TEACHING NOTES
     • Use `.toLowerCase()` on `recipe.title` before `.includes(searchQuery)`
       — students often forget and wonder why "carb" doesn't match "Carbonara".
     • The combined `&&` filter is the "both must be true" pattern. Walk
       through what each piece returns: a boolean. The whole expression =
       a boolean. `filter` keeps the row when it's true.
*/

function applyFilters() {
  // ── write your code here ──

}



/* SOLUTION (uncomment to reveal)

function applyFilters() {
  const filtered = recipes.filter((recipe) => {
    const matchesCategory =
      activeCategory === "all" || recipe.category === activeCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });
  renderRecipes(filtered);
}

*/



/* ╔══════════════════════════════════════════════════════════════════════════╗
   ║  TASK 4 — Wire up the search input                                       ║
   ╚══════════════════════════════════════════════════════════════════════════╝

   ▸ CONCEPT
     • EVENT LISTENERS let us react to user actions: typing, clicking,
       hovering, submitting.
     • Pattern: `element.addEventListener("eventName", callback)`.
     • The callback receives an EVENT object. `event.target` is the element
       the user interacted with. `event.target.value` is what's inside it
       (for inputs).

   ▸ EXAMPLE
       const input = document.querySelector("#name");

       input.addEventListener("input", (event) => {
         console.log("user typed:", event.target.value);
       });

       // Other events you'll meet:
       // "click", "submit", "change", "mouseenter", "keydown"

   ▸ YOUR TASK
     Find the `<input id="search">` element. On every "input" event:
       1. Update `searchQuery` to the input's value, lowercased.
          (Lowercasing once here means we don't have to lowercase elsewhere.)
       2. Call `applyFilters()` — the page re-renders with the matches.

   ▸ TEACHING NOTES
     • Demo: type "carb" → only Carbonara shows. Backspace → everything back.
     • "input" fires on every keystroke. "change" only fires on blur.
       Almost always use "input" for live search/feedback.
     • Open the Network tab to show that this is all client-side — no
       server requests, no reload. That's the magic of JS in the browser.
*/

// ── write your code here ──



/* SOLUTION (uncomment to reveal)

const search = document.querySelector("#search");

search.addEventListener("input", (event) => {
  searchQuery = event.target.value.toLowerCase();
  applyFilters();
});

*/



/* ╔══════════════════════════════════════════════════════════════════════════╗
   ║  TASK 5 — Wire up the category buttons                                   ║
   ╚══════════════════════════════════════════════════════════════════════════╝

   ▸ CONCEPT
     • `querySelectorAll(".x")` returns ALL matching elements as a list.
     • We `forEach` over the list and attach a click listener to each.
     • `data-*` attributes on HTML are how we stash custom data on an
       element. We read them in JS via `element.dataset.theName`.
       In our HTML each button has `data-category="Dinner"` etc.
     • To toggle a class: `element.classList.add("active")` /
       `element.classList.remove("active")` / `.toggle("active")`.

   ▸ EXAMPLE
       <button data-color="red">Red</button>
       <button data-color="blue">Blue</button>

       const buttons = document.querySelectorAll("button");
       buttons.forEach((btn) => {
         btn.addEventListener("click", (event) => {
           console.log(event.target.dataset.color);    // "red" or "blue"
         });
       });

   ▸ YOUR TASK
     Wire up every `.filter-btn`. On click:
       1. Update `activeCategory` to `event.target.dataset.category`.
       2. Remove the `.active` class from EVERY filter button.
       3. Add `.active` to the button that was clicked.
       4. Call `applyFilters()`.

   ▸ TEACHING NOTES
     • Step 2 + 3 are the "deselect all, then select this one" pattern
       that's used everywhere — tabs, radio buttons, segmented controls.
     • Demo combining search + filter: type "tikka" + click "Dinner".
       Then clear search → both Dinner items return.
     • If you click "All", `activeCategory` becomes "all" — handled by the
       `=== "all"` short-circuit inside `applyFilters`.
*/

// ── write your code here ──



/* SOLUTION (uncomment to reveal)

const buttons = document.querySelectorAll(".filter-btn");

buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    activeCategory = event.target.dataset.category;
    buttons.forEach((b) => b.classList.remove("active"));
    event.target.classList.add("active");
    applyFilters();
  });
});

*/



/* ════════════════════════════════════════════════════════════════════════════
   END OF SECTION 06

   By now your students should be comfortable with:
     • Finding elements — querySelector, querySelectorAll
     • Creating elements — createElement, innerHTML, appendChild
     • The render pattern — clear + rebuild from data
     • Reacting to user input — addEventListener, event.target
     • Toggling classes — classList.add / remove
     • Storing tiny bits of data on HTML with data-* attributes
     • Combining state variables to drive ONE render function

   The MENTAL MODEL to leave them with:

       DATA  →  function (filter)  →  RENDER (paint DOM)
                          ↑
                    EVENTS update state, then re-run the filter

   This shape — state → render → events update state → re-render —
   is exactly how React, Vue, and Svelte work under the hood. We've
   just built a tiny version by hand. They are not toy frameworks
   doing magic; they automate the same dance we did here.

   Next: Section 07 — TypeScript. We'll add type safety to this same
   code without changing its behavior.
   ════════════════════════════════════════════════════════════════════════════ */
