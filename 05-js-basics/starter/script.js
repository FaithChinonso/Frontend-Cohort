/* ════════════════════════════════════════════════════════════════════════════
   SECTION 05 — JavaScript Basics
   ════════════════════════════════════════════════════════════════════════════

   TEACHER'S GUIDE
   ───────────────
   Each task below follows the same shape:

     ▸ CONCEPT       — what's being taught and why
     ▸ EXAMPLE       — a tiny isolated demo of the idea
     ▸ YOUR TASK     — what the student writes
     ▸ TEACHING NOTES — things to call out at the projector
     ▸ SOLUTION       — sealed in a /* ... *​/ block; uncomment to reveal

   Open the browser console (F12 → Console) to see output.
   Save → refresh the browser to see each change.
   ════════════════════════════════════════════════════════════════════════════ */

console.log("script.js loaded — check this tab for your output.");



/* ╔══════════════════════════════════════════════════════════════════════════╗
   ║  TASK 1 — Arrays of objects                                              ║
   ╚══════════════════════════════════════════════════════════════════════════╝

   ▸ CONCEPT
     • An OBJECT is a bag of labeled values:  { key: value, key: value }
     • An ARRAY is an ordered list:           [ thing, thing, thing ]
     • Putting objects inside an array is how we represent collections —
       a list of recipes, users, products, etc.
     • Once stored, you can read values back with dot notation:
           array[index].propertyName

   ▸ EXAMPLE
       const book = { title: "Dune", pages: 412, isAvailable: true };
       const books = [
         { title: "Dune",       pages: 412 },
         { title: "Foundation", pages: 244 },
       ];
       books[0].title;     // "Dune"
       books[1].pages;     // 244

   ▸ YOUR TASK
     Create a `const` called `recipes` — an array of FOUR recipe objects.
     Each object needs:
       • title         (string)
       • category      (string — "Breakfast" | "Lunch" | "Dinner" | "Dessert")
       • minutes       (number)
       • isVegetarian  (boolean: true or false)

   ▸ TEACHING NOTES
     • Demo `console.log(recipes)` and expand the array in DevTools.
     • Point out that string values need quotes, numbers don't, booleans don't.
     • Mention `const` means "I won't reassign this" — though you CAN mutate
       what's inside (push/pop). We'll see `let` in Task 4 when state changes.
*/

// ── write your code here ──



/* SOLUTION (uncomment to reveal)

const recipes = [
  { title: "Carbonara",     category: "Dinner",    minutes: 20, isVegetarian: false },
  { title: "Pancakes",      category: "Breakfast", minutes: 15, isVegetarian: true  },
  { title: "Caesar Salad",  category: "Lunch",     minutes: 10, isVegetarian: false },
  { title: "Choc Cookies",  category: "Dessert",   minutes: 45, isVegetarian: true  },
];

*/



/* ╔══════════════════════════════════════════════════════════════════════════╗
   ║  TASK 2 — Functions with parameters and return values                    ║
   ╚══════════════════════════════════════════════════════════════════════════╝

   ▸ CONCEPT
     • A function is a named, reusable block of code.
     • It can ACCEPT input (called parameters) and RETURN output.
     • Functions let us write a piece of logic once and use it many times.

   ▸ EXAMPLE
       function greet(name) {                       // `name` is the parameter
         return `Hello, ${name}!`;                  // backticks = template literal
       }
       greet("Ada");      // "Hello, Ada!"
       greet("Lin");      // "Hello, Lin!"

       // Ternary operator — a compact if/else that returns a value:
       const age = 17;
       const status = age >= 18 ? "adult" : "minor";    // "minor"

   ▸ YOUR TASK
     Write a function `printRecipe(recipe)` that takes ONE recipe object
     and returns a formatted string. Expected output:

       printRecipe(recipes[0])
       // "Carbonara (Dinner, 20 min, not vegetarian)"

     Use a template literal (backticks) and a ternary for the veggie text:
         recipe.isVegetarian ? "vegetarian" : "not vegetarian"

   ▸ TEACHING NOTES
     • Show the difference between `return "..."` and `console.log("...")`.
       Return GIVES BACK a value. Log PRINTS. Easy mix-up for beginners.
     • Demo: call `printRecipe(recipes[0])` and `console.log(...)` it.
     • Mention `${ }` only works inside backticks, not single/double quotes.
*/

// ── write your code here ──



/* SOLUTION (uncomment to reveal)

function printRecipe(recipe) {
  const veg = recipe.isVegetarian ? "vegetarian" : "not vegetarian";
  return `${recipe.title} (${recipe.category}, ${recipe.minutes} min, ${veg})`;
}

console.log(printRecipe(recipes[0]));

*/



/* ╔══════════════════════════════════════════════════════════════════════════╗
   ║  TASK 3 — forEach: doing something with every item                       ║
   ╚══════════════════════════════════════════════════════════════════════════╝

   ▸ CONCEPT
     • `.forEach()` runs a function ONCE for every item in an array.
     • It's the cleanest way to loop. No counters, no `i++`, no off-by-one bugs.
     • The function you pass in is called the CALLBACK.

   ▸ EXAMPLE
       const colors = ["red", "green", "blue"];

       colors.forEach((color) => {
         console.log("I love " + color);
       });
       // I love red
       // I love green
       // I love blue

       // The callback can also receive the index:
       colors.forEach((color, i) => console.log(i + ": " + color));
       // 0: red
       // 1: green
       // 2: blue

   ▸ YOUR TASK
     Use `recipes.forEach(...)` to log `printRecipe(r)` for EVERY recipe.
     (Use Task 2's function inside the loop.)

   ▸ TEACHING NOTES
     • Point out the arrow function: `(r) => { ... }`. Show that it's just
       a shorter `function(r) { ... }`.
     • Open the browser console to show all four lines appear in order.
     • forEach is for SIDE EFFECTS (logging, updating the page).
       For TRANSFORMATIONS, we use `.map()` (Task 5).
*/

// ── write your code here ──



/* SOLUTION (uncomment to reveal)

recipes.forEach((r) => console.log(printRecipe(r)));

*/



/* ╔══════════════════════════════════════════════════════════════════════════╗
   ║  TASK 4 — filter: keeping items that match a condition                   ║
   ╚══════════════════════════════════════════════════════════════════════════╝

   ▸ CONCEPT
     • `.filter()` returns a NEW array containing only items where the
       callback returned `true`.
     • The original array isn't changed — `filter` is non-destructive.
     • This is the heart of search and filter features on every website.

   ▸ EXAMPLE
       const numbers = [1, 2, 3, 4, 5, 6];

       const evens = numbers.filter((n) => n % 2 === 0);
       // [2, 4, 6]

       const big = numbers.filter((n) => n > 3);
       // [4, 5, 6]

       const words = ["cat", "dog", "fish", "rabbit"];
       const short = words.filter((w) => w.length <= 3);
       // ["cat", "dog"]

   ▸ YOUR TASK
     Use `.filter` to find recipes that take 30 minutes or less.
     Store the result in a new variable called `quickRecipes`.
     Then log its length: "Found X quick recipes".

   ▸ TEACHING NOTES
     • Stress that the original `recipes` array is unchanged.
       (`console.log(recipes.length)` still shows 4 after filtering.)
     • `r.minutes <= 30` is the part students will reuse for search later.
     • In the next sections we use `.filter` to power the live search bar.
*/

// ── write your code here ──



/* SOLUTION (uncomment to reveal)

const quickRecipes = recipes.filter((r) => r.minutes <= 30);
console.log(`Found ${quickRecipes.length} quick recipes`);

*/



/* ╔══════════════════════════════════════════════════════════════════════════╗
   ║  TASK 5 — map: transforming every item                                   ║
   ╚══════════════════════════════════════════════════════════════════════════╝

   ▸ CONCEPT
     • `.map()` returns a NEW array where every item has been TRANSFORMED.
     • Same length as the original. Different shape.
     • Use it when you need a list of just-one-piece — just the titles, just
       the prices, just the IDs.

   ▸ EXAMPLE
       const prices = [10, 20, 30];
       const doubled = prices.map((p) => p * 2);
       // [20, 40, 60]

       const users = [
         { name: "Ada", age: 30 },
         { name: "Lin", age: 25 },
       ];
       const names = users.map((u) => u.name);
       // ["Ada", "Lin"]

   ▸ YOUR TASK
     Use `.map` to build an array of just the recipe TITLES.
     Store it in `titles` and log it.

   ▸ TEACHING NOTES
     • Contrast with `.filter`:
         filter — keeps a subset of items, same shape
         map    — keeps every item, different shape
     • A common pattern: `.filter(...).map(...)` chained together.
       Quickly demo: `recipes.filter(r => r.isVegetarian).map(r => r.title)`
*/

// ── write your code here ──



/* SOLUTION (uncomment to reveal)

const titles = recipes.map((r) => r.title);
console.log("Titles:", titles);

*/



/* ╔══════════════════════════════════════════════════════════════════════════╗
   ║  TASK 6 — find: the FIRST item that matches                              ║
   ╚══════════════════════════════════════════════════════════════════════════╝

   ▸ CONCEPT
     • `.find()` returns the FIRST item that matches — or `undefined` if
       nothing matches.
     • Use it when you want ONE thing, not a list.
     • Combine it with a truthy check: `if (result) { ... }`.

   ▸ EXAMPLE
       const users = [
         { id: 1, name: "Ada"  },
         { id: 2, name: "Lin"  },
         { id: 3, name: "Owen" },
       ];

       const lin = users.find((u) => u.name === "Lin");
       // { id: 2, name: "Lin" }

       const missing = users.find((u) => u.name === "Nobody");
       // undefined

   ▸ YOUR TASK
     Use `.find` to get the first vegetarian recipe.
     Log its title, or the string "none" if nothing matched.
     Hint: use a ternary —
         firstVeggie ? firstVeggie.title : "none"

   ▸ TEACHING NOTES
     • Highlight `undefined` — that's what `find` returns on no match.
     • Show what happens if you forget to check: `undefined.title` crashes.
     • The ternary `result ? result.title : "none"` is a defensive pattern
       you'll see in every codebase.
*/

// ── write your code here ──



/* SOLUTION (uncomment to reveal)

const firstVeggie = recipes.find((r) => r.isVegetarian);
console.log("First vegetarian:", firstVeggie ? firstVeggie.title : "none");

*/



/* ╔══════════════════════════════════════════════════════════════════════════╗
   ║  TASK 7 — A function that uses an array method inside                    ║
   ╚══════════════════════════════════════════════════════════════════════════╝

   ▸ CONCEPT
     • Putting `.filter` inside a function turns it into a REUSABLE search.
     • The function takes the criteria as a parameter so we can call it
       again with different values: "Dinner", "Breakfast", "Dessert".
     • This is the same idea behind every search and filter feature you've
       ever clicked on a website.

   ▸ EXAMPLE
       function usersOlderThan(minAge) {
         return users.filter((u) => u.age > minAge);
       }
       usersOlderThan(18);    // all adults
       usersOlderThan(65);    // all seniors

   ▸ YOUR TASK
     Write `recipesByCategory(category)` that returns every recipe whose
     `.category` matches the argument. Call it with "Dinner" and log
     the result.

   ▸ TEACHING NOTES
     • This is the bridge to Section 06: the same pattern, but driven by
       user clicks on category buttons instead of a hardcoded string.
     • Mention `===` (triple equals) — strict equality. Always prefer it
       over `==`. Quick demo: `"5" == 5` (true) vs `"5" === 5` (false).
*/

// ── write your code here ──



/* SOLUTION (uncomment to reveal)

function recipesByCategory(category) {
  return recipes.filter((r) => r.category === category);
}

console.log("Dinners:", recipesByCategory("Dinner"));

*/



/* ════════════════════════════════════════════════════════════════════════════
   END OF SECTION 05

   By now your students should be comfortable with:
     • Variables (const, let)
     • Objects and arrays
     • Functions, parameters, return values, arrow functions
     • Template literals — `${...}`
     • Ternary operator — condition ? a : b
     • Array methods — forEach, filter, map, find
     • Strict equality — ===

   Next: Section 06 — JS + the DOM. We'll take this same data and make
   it appear on the page, then add a working search and filter.
   ════════════════════════════════════════════════════════════════════════════ */
