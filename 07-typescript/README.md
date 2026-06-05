# Section 07 — TypeScript

**Goal:** Convert our recipe app to **TypeScript** — JavaScript with types. You'll see how TS catches mistakes before they ever reach the browser.

---

## 1. What is TypeScript?

**TypeScript (TS)** is JavaScript with an extra layer: **types**.

Think of types as labels you put on your variables that say *"this is supposed to be a string"* or *"this object must have a `title` and a `category`."* TypeScript checks those labels as you code and yells at you if you break them.

**Why?** Because JavaScript is too forgiving:

```js
// Plain JavaScript — runs fine, but is buggy:
function greet(name) {
  return "Hello, " + name.toUpperCase();
}

greet(42);     // CRASH at runtime: 42.toUpperCase is not a function
```

```ts
// TypeScript — catches the mistake BEFORE you run it:
function greet(name: string) {
  return "Hello, " + name.toUpperCase();
}

greet(42);     // Error: Argument of type 'number' is not assignable to 'string'
```

TS doesn't change what your code does at runtime — when it compiles, types are stripped away and you get plain JavaScript. The benefit is **all the bugs it catches while you're writing**.

---

## 2. Setting up TypeScript

For this section we'll use **Node.js** + the official TypeScript compiler. Install Node first if you haven't:

1. Go to [nodejs.org](https://nodejs.org/) and install the **LTS** version
2. Open a terminal in the `starter/` folder
3. Run these commands:

```bash
npm init -y
npm install --save-dev typescript
npx tsc --init
```

This creates a `tsconfig.json` (TypeScript's settings file). For this section, the defaults are fine.

### How to compile

```bash
npx tsc            # compiles all .ts files once
npx tsc --watch    # recompiles every time you save (USE THIS)
```

It reads `script.ts` and produces `script.js` — that's what the browser actually loads.

> **Don't want to set up Node?** You can also paste your code into the [TypeScript Playground](https://www.typescriptlang.org/play) — a browser-based editor that compiles TS live. Great for learning.

---

## 3. The basic types

```ts
// Primitives — same as JS, with type annotations
let title: string = "Carbonara";
let minutes: number = 20;
let isVegetarian: boolean = false;

// Arrays
let tags: string[] = ["italian", "pasta"];
let numbers: number[] = [1, 2, 3];

// Optional — anything-goes (try not to use this — defeats the point of TS)
let mystery: any = "could be anything";
```

### Type inference

TypeScript is smart — it can often figure out the type itself, so you don't always need to annotate:

```ts
let title = "Carbonara";   // TS knows this is a string. No need to write `: string`.

title = 42;     // Error — TS infers from the initial value
```

Only annotate when TS can't figure it out — usually on function parameters and complex data.

---

## 4. Function types

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

- `(a: number, b: number)` — parameter types
- `: number` after the parentheses — the return type
- Often you can drop the return type and let TS infer it

Arrow function version:

```ts
const add = (a: number, b: number): number => a + b;
```

If a function returns nothing, its return type is `void`:

```ts
function logMessage(msg: string): void {
  console.log(msg);
}
```

---

## 5. Object types and interfaces

This is the most important part for our app — describing the shape of a recipe.

```ts
// Inline object type
function printRecipe(recipe: { title: string; minutes: number }) {
  console.log(recipe.title);
}
```

Cleaner — use an **interface**:

```ts
interface Recipe {
  title: string;
  category: string;
  description: string;
  image: string;
  minutes: number;
  isVegetarian: boolean;
}

function printRecipe(recipe: Recipe): void {
  console.log(recipe.title);
}

const r: Recipe = {
  title: "Carbonara",
  category: "Dinner",
  description: "...",
  image: "...",
  minutes: 20,
  isVegetarian: false,
};
```

If you forget a property when creating a `Recipe`, TS errors immediately. If you typo `recipe.titel`, TS errors immediately.

### Optional properties

Add a `?` after the name:

```ts
interface Recipe {
  title: string;
  notes?: string;     // optional — can be there or not
}
```

### Arrays of interfaces

```ts
const recipes: Recipe[] = [
  { title: "Carbonara", /* ... */ },
  { title: "Cookies", /* ... */ },
];
```

---

## 6. Union types — "this OR that"

What if a value can be one of a fixed set?

```ts
type Category = "Breakfast" | "Lunch" | "Dinner" | "Dessert";

interface Recipe {
  title: string;
  category: Category;     // must be one of those four strings
}

const r: Recipe = {
  title: "Carbonara",
  category: "Lunchh",     // typo! TS catches it.
};
```

This is incredibly useful — you can no longer pass a typo into a function expecting a category.

### `type` vs `interface`

- `interface` — for describing shapes of objects
- `type` — for unions, primitives, or anything else
- They're interchangeable for object shapes; use whichever your team prefers. **In this course we use `interface` for objects and `type` for unions.**

---

## 7. The DOM and TypeScript

When you do `document.querySelector(".something")`, TypeScript doesn't know what kind of element that selector will return — it could be a `<div>`, an `<input>`, anything. So it returns the generic `Element | null`.

Two things to handle:

### 1. It could be `null`

If TS thinks the result might be `null`, you need to check or assert:

```ts
const search = document.querySelector("#search");
search.value;     // Error — search could be null
```

Fix by checking first:

```ts
const search = document.querySelector("#search");
if (search) {
  // inside this block, TS knows search is not null
}
```

Or use the **non-null assertion** `!` — "I'm sure this won't be null":

```ts
const search = document.querySelector("#search")!;     // I promise it exists
```

Use `!` only when you're absolutely certain the element is in the HTML.

### 2. Telling TS what kind of element

For specific element types (like reading `.value` on an input), use a **type assertion** with `as`:

```ts
const search = document.querySelector("#search") as HTMLInputElement;
console.log(search.value);     // ok — TS knows it's an input
```

Common DOM types: `HTMLInputElement`, `HTMLButtonElement`, `HTMLDivElement`, `HTMLAnchorElement`, `Element`, `HTMLElement`.

### Event types

```ts
search.addEventListener("input", (event: Event) => {
  const target = event.target as HTMLInputElement;
  console.log(target.value);
});
```

---

## 8. Putting it together — quick example

```ts
type Category = "Breakfast" | "Lunch" | "Dinner" | "Dessert";

interface Recipe {
  title: string;
  category: Category;
  minutes: number;
  isVegetarian: boolean;
}

const recipes: Recipe[] = [
  { title: "Carbonara", category: "Dinner", minutes: 20, isVegetarian: false },
  { title: "Pancakes", category: "Breakfast", minutes: 15, isVegetarian: true },
];

function quickRecipes(list: Recipe[], maxMinutes: number): Recipe[] {
  return list.filter((r) => r.minutes <= maxMinutes);
}

const fast = quickRecipes(recipes, 20);
console.log(fast);
```

If you try to add `{ title: "X", category: "Lunchh", ... }` — TS catches the typo.
If you call `quickRecipes("not an array", 20)` — TS catches it.
If you typo `r.minuts` inside the filter — TS catches it.

---

## Your turn

Open `starter/`. You'll find the Section 06 app, but the JS has been renamed to **`script.ts`**.

A `tsconfig.json` and `package.json` are pre-configured so you can just run:

```bash
npm install
npm run build
```

Or for live recompiling as you save:

```bash
npm run watch
```

The HTML loads `script.js` — TypeScript compiles `script.ts` → `script.js` automatically.

**Tasks:**

1. Add a `type Category = ...` for the 4 category strings.
2. Add an `interface Recipe { ... }` describing the recipe shape — `title`, `category` (Category), `description`, `image`, `chef`, `minutes`, `cuisine`, `isVegetarian`.
3. Type the `recipes` array as `Recipe[]`.
4. Annotate the parameters and return types of `renderRecipes`, `applyFilters`.
5. Fix the DOM queries — use `as HTMLInputElement` for `#search`, type the buttons collection.
6. Annotate the event listener parameters.
7. **Add a new function** `recipeStats(list: Recipe[]): { total: number; avgMinutes: number; vegetarianCount: number }` that returns simple stats and `console.log` the result on page load. Notice how TypeScript helps you build this — try misspelling a property and watch the editor light up.

Run `npm run build`, refresh the browser, and the app should still work identically — just safer underneath.

Compare with `solution/`.

---

## Cheat sheet

```ts
// Primitives
let s: string = "hi";
let n: number = 42;
let b: boolean = true;
let arr: string[] = ["a", "b"];

// Functions
function add(a: number, b: number): number { return a + b; }
const add = (a: number, b: number): number => a + b;

// Interface
interface Recipe {
  title: string;
  minutes: number;
  notes?: string;     // optional
}

// Union types
type Category = "Breakfast" | "Lunch" | "Dinner";

// Array of interfaces
const recipes: Recipe[] = [...];

// DOM
const input = document.querySelector("#search") as HTMLInputElement;
const buttons = document.querySelectorAll(".btn") as NodeListOf<HTMLButtonElement>;

input.addEventListener("input", (event: Event) => {
  const target = event.target as HTMLInputElement;
  ...
});
```

---

**Previous:** [06 — JS + DOM](../06-js-dom/) | **Next:** [08 — Tailwind CSS](../08-tailwind/)
