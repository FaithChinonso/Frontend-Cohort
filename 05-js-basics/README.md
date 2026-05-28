# Section 05 — JavaScript Basics

**Goal:** Learn the JavaScript language — variables, functions, conditions, arrays, loops. **We won't touch the webpage yet** (that comes in Section 06). For now we'll experiment in a single HTML file and write our output to the screen.

---

## 1. What is JavaScript?

**JavaScript** (JS) is the programming language of the web. It runs inside the browser and makes pages **interactive** — buttons that do things, forms that validate, content that updates without reloading.

HTML = structure. CSS = looks. JavaScript = behavior.

---

## 2. Where does JS go?

Same options as CSS:

```html
<!-- External file (use this) -->
<script src="script.js"></script>

<!-- Inline -->
<script>
  console.log("Hello!");
</script>
```

Put the `<script>` tag right before `</body>`, so the HTML loads first.

### `console.log` — your best friend

```js
console.log("Hello world");
console.log(42);
console.log("The answer is", 42);
```

`console.log` prints to the **browser console**. To see the console:

1. Open your HTML in the browser
2. Right-click anywhere → **Inspect**
3. Click the **Console** tab

Every JS programmer uses `console.log` constantly to check their work.

---

## 3. Variables — storing data

A **variable** is a labeled box where you store a value.

```js
let recipeName = "Carbonara";
let servings = 4;
let isVegetarian = false;
```

- `let` creates a variable. The name comes next, then `=`, then the value.
- Strings (text) are wrapped in quotes: `"like this"` or `'like this'`.
- Numbers don't need quotes.
- `true` and `false` are special values called **booleans**.

You can change a `let` variable later:

```js
let count = 5;
count = 10;       // now count is 10
```

### `const` — for things that never change

```js
const PI = 3.14159;
const MAX_SERVINGS = 12;
```

`const` works exactly like `let`, but the value cannot be reassigned. **Prefer `const`** unless you know the value will change. It makes your code safer.

### Naming rules

- Start with a letter, `_`, or `$`. No spaces, no starting with a digit.
- Convention: use **camelCase** — `recipeName`, `cookingTime`, `totalCalories`.
- Be descriptive. `x` is a bad name. `userEmail` is good.

---

## 4. The basic data types

```js
// String — text
let title = "Spaghetti Carbonara";

// Number — integers and decimals (no separate types)
let servings = 4;
let pricePerServing = 3.50;

// Boolean — true or false
let isPublished = true;

// null — "intentionally nothing"
let notes = null;

// undefined — "this hasn't been set yet"
let category;     // undefined
```

---

## 5. Math and string operations

```js
// Math
2 + 3       // 5
10 - 4      // 6
3 * 7       // 21
20 / 4      // 5
17 % 5      // 2  (the REMAINDER after division)

// Strings — joining ("concatenation")
"Hello, " + "world"           // "Hello, world"

// Template literals — much better for joining
let name = "Carbonara";
`Today's recipe: ${name}`      // "Today's recipe: Carbonara"
```

Those backticks `` ` `` (not regular quotes) let you embed variables with `${...}`. Use them whenever you build a string from variables.

---

## 6. Comparisons and conditions

### Comparisons return booleans

```js
5 > 3        // true
5 < 3        // false
5 === 5      // true  (equality)
5 !== 3      // true  (not equal)
5 >= 5       // true
```

**Always use `===` (three equals), not `==`.** The two-equals version does weird type conversions you don't want.

### `if` / `else` — making decisions

```js
let servings = 4;

if (servings > 6) {
  console.log("Big batch!");
} else if (servings > 2) {
  console.log("Normal size");
} else {
  console.log("Just for one");
}
```

The condition in `( )` must be a boolean (or evaluate to one).

### Logical operators

```js
&&   // AND — both must be true
||   // OR — at least one must be true
!    // NOT — flips true to false

if (isPublished && servings > 0) { ... }
if (category === "lunch" || category === "dinner") { ... }
```

---

## 7. Functions — reusable blocks of code

A **function** is a named recipe (fitting!) for doing something. You define it once, then **call** it whenever you need it.

```js
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet("Maria");     // logs: Hello, Maria!
greet("Sam");       // logs: Hello, Sam!
```

- `function` — the keyword
- `greet` — the function's name
- `(name)` — the **parameter** (input the function expects)
- The code in `{ }` is the function's **body**
- `greet("Maria")` is **calling** the function with the value `"Maria"`

### Returning a value

A function can give back a result with `return`:

```js
function double(n) {
  return n * 2;
}

let result = double(5);   // result is 10
console.log(double(7));    // logs 10... wait, 14!
```

A function that doesn't `return` something returns `undefined`.

### Arrow functions — the modern shortcut

You'll see both styles in real code:

```js
// Classic
function add(a, b) {
  return a + b;
}

// Arrow function — same thing
const add = (a, b) => {
  return a + b;
};

// Arrow function shorthand (if just returning one expression)
const add = (a, b) => a + b;
```

Arrow functions are everywhere in modern JS. We'll use both styles.

---

## 8. Arrays — lists of things

An **array** is an ordered list of values.

```js
const recipes = ["Carbonara", "Cookies", "Pizza"];
const servings = [4, 12, 8];
const mixed = ["Carbonara", 4, true];   // arrays can hold any types
```

### Accessing items by index

Arrays are **zero-indexed** — counting starts at 0, not 1.

```js
recipes[0]     // "Carbonara"
recipes[1]     // "Cookies"
recipes[2]     // "Pizza"
recipes.length // 3
```

### Adding and removing

```js
recipes.push("Salad");     // adds to the END
recipes.pop();             // removes the LAST item
recipes.unshift("Soup");   // adds to the FRONT
recipes.shift();           // removes the FIRST item
```

### Looping over an array

```js
const recipes = ["Carbonara", "Cookies", "Pizza"];

// for...of — the easiest way
for (const recipe of recipes) {
  console.log(recipe);
}

// .forEach — same idea
recipes.forEach((recipe) => {
  console.log(recipe);
});
```

### Useful array methods

```js
const numbers = [1, 2, 3, 4, 5];

// .filter — keep only items that match a condition
const evens = numbers.filter((n) => n % 2 === 0);   // [2, 4]

// .map — transform each item
const doubled = numbers.map((n) => n * 2);          // [2, 4, 6, 8, 10]

// .find — get the first item that matches
const first = numbers.find((n) => n > 3);           // 4

// .includes — does the array contain this?
numbers.includes(3);     // true
```

`filter` and `map` are the workhorses of real-world JavaScript. Get comfortable with them.

---

## 9. Objects — labeled data

An **object** stores key/value pairs. Perfect for representing things (like a recipe).

```js
const recipe = {
  title: "Spaghetti Carbonara",
  servings: 4,
  category: "Dinner",
  isVegetarian: false,
  ingredients: ["pasta", "eggs", "cheese", "pancetta"],
};

console.log(recipe.title);          // "Spaghetti Carbonara"
console.log(recipe.ingredients[0]); // "pasta"

recipe.servings = 6;                // change a value
recipe.author = "Maria";            // add a new key
```

You can put objects inside arrays — this is how real apps store data:

```js
const recipes = [
  { title: "Carbonara", category: "Dinner", time: 20 },
  { title: "Cookies", category: "Dessert", time: 30 },
  { title: "Pizza", category: "Dinner", time: 45 },
];
```

Looping over a list of objects is exactly what we'll do in Section 06 to render recipe cards.

---

## 10. Loops

We saw `for...of` above. Two other loop styles:

```js
// Classic for loop — when you need an index counter
for (let i = 0; i < 5; i++) {
  console.log(i);   // 0, 1, 2, 3, 4
}

// while loop — keep going as long as a condition is true
let count = 0;
while (count < 3) {
  console.log(count);
  count++;
}
```

`i++` means "add 1 to i." `i--` subtracts 1.

In practice, `forEach` / `map` / `filter` cover most needs — you'll rarely write a classic `for` loop in modern JS.

---

## Your turn

Open `starter/`. You'll find `index.html` and `script.js`. The HTML loads the JS, opens the console for you (`console.log` works), and shows results on the page too.

In `script.js`, complete the TODOs:

1. Create a `const` called `recipes` — an array of 4 recipe objects. Each object has: `title` (string), `category` (string — "Breakfast", "Lunch", "Dinner", or "Dessert"), `minutes` (number), `isVegetarian` (boolean).
2. Write a function `printRecipe(recipe)` that returns a formatted string like `"Carbonara (Dinner, 20 min, not vegetarian)"`.
3. Use `.forEach` to log every recipe using `printRecipe`.
4. Use `.filter` to get all recipes that take **30 minutes or less**. Store them in `quickRecipes`. Log how many you found.
5. Use `.map` to get an array of just the titles. Store it in `titles`. Log it.
6. Use `.find` to find the first vegetarian recipe. Log its title (or "none" if not found).
7. Write a function `recipesByCategory(category)` that returns recipes whose category matches. Call it with `"Dinner"` and log the result.

Open the browser console (F12 → Console tab) to see your output.

---

## Cheat sheet

```js
// Variables
const name = "value";    // can't be reassigned
let count = 0;           // can be reassigned

// Strings
`Hello ${name}, you have ${count} items`

// Conditions
if (x > 5) { ... } else if (x > 0) { ... } else { ... }
// && (and), || (or), ! (not)
// ===, !==, <, >, <=, >=

// Functions
function add(a, b) { return a + b; }
const add = (a, b) => a + b;

// Arrays
const arr = [1, 2, 3];
arr[0]; arr.length; arr.push(x); arr.pop();
arr.filter(x => x > 0);
arr.map(x => x * 2);
arr.find(x => x === target);
arr.forEach(x => console.log(x));

// Objects
const obj = { key: "value", num: 42 };
obj.key; obj.num = 100;

// Loops
for (const x of arr) { ... }
for (let i = 0; i < 5; i++) { ... }
```

---

**Previous:** [04 — CSS Layout](../04-css-layout/) | **Next:** [06 — JS + DOM](../06-js-dom/)
