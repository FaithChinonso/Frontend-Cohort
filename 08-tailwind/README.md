# Section 08 — Tailwind CSS

**Goal:** Rebuild the look of Tasty Bites using **Tailwind CSS** — a different approach to styling that's faster once you learn it. By the end, the styles in our HTML will tell a complete visual story without a separate `.css` file.

---

## 1. What is Tailwind?

Look at this familiar approach:

```html
<button class="primary-btn">Subscribe</button>
```

```css
.primary-btn {
  background: #c8553d;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: bold;
}
```

You write a class name, then a separate CSS rule. Now look at the Tailwind version:

```html
<button class="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">
  Subscribe
</button>
```

**No CSS file.** Each class is a tiny pre-made utility — `bg-red-600` sets background to red-600, `px-4` adds horizontal padding, `rounded-lg` rounds the corners. You compose styles directly in the HTML.

### Why this is fast

- No naming things (`primary-btn`, `card-header-wrapper-thing`...)
- No jumping between HTML and CSS files
- Consistent spacing/colors — everything is on a scale (`p-1, p-2, p-3, p-4`...) so designs look unified by default
- Unused styles get stripped automatically — final CSS is tiny

### The objection (and the answer)

"But that's so much stuff in the HTML!" Yes, it is. After a week of using it, that stops feeling weird and you'll wonder how you ever lived without it. Big teams (GitHub, Shopify, Netflix, OpenAI) use Tailwind for exactly this reason.

---

## 2. Adding Tailwind to a project

The easiest way for learning — use the **Tailwind CDN**. Just add this one line in your `<head>`:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

That's it. Tailwind now works on the page. No build step, no installation.

> **For real projects** you'd install Tailwind properly via npm — it produces a smaller, faster CSS file. We'll use the CDN for learning. The Tailwind docs explain the full setup when you're ready: [tailwindcss.com/docs/installation](https://tailwindcss.com/docs/installation).

---

## 3. The core idea: utility classes

Each Tailwind class does one tiny thing. You stack them.

```html
<div class="bg-white p-6 rounded-lg shadow-md">
  Hello
</div>
```

This `<div>` has:
- `bg-white` — white background
- `p-6` — padding of `1.5rem` on all sides
- `rounded-lg` — large rounded corners
- `shadow-md` — medium drop shadow

You don't need to memorize them all — once you know the naming pattern, you can guess most of them.

---

## 4. The naming patterns

### Spacing — `p`, `m`, `px`, `py`, `mt`, `mb`, etc.

Tailwind has a **spacing scale**: `0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24...` (each step is `0.25rem` = 4px).

```html
<div class="p-4">       <!-- padding 1rem (16px) all sides -->
<div class="px-6 py-3"> <!-- horizontal 1.5rem, vertical 0.75rem -->
<div class="mt-8 mb-4"> <!-- margin-top 2rem, margin-bottom 1rem -->
<div class="gap-4">     <!-- gap (for flex/grid) 1rem -->
```

| Prefix | What it sets |
|--------|--------------|
| `p-` | padding (all sides) |
| `px-` / `py-` | padding horizontal / vertical |
| `pt-` / `pb-` / `pl-` / `pr-` | padding top/bottom/left/right |
| `m-`, `mx-`, `my-`, `mt-`, ... | margin (same pattern) |
| `gap-` | gap between flex/grid children |

### Colors — `bg-`, `text-`, `border-`

Tailwind ships a built-in color palette. Each color comes in shades from 50 (lightest) to 950 (darkest).

```html
<div class="bg-red-500 text-white">       <!-- red background, white text -->
<div class="bg-slate-100 text-slate-800"> <!-- light grey bg, dark slate text -->
<div class="border border-gray-200">       <!-- 1px gray border -->
```

Color names: `slate`, `gray`, `zinc`, `neutral`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`.

For our recipe site we'll use a custom-feeling combo: `bg-amber-50` for the page, `bg-red-600` for accent, `text-stone-800` for body text.

### Text and fonts

```html
<p class="text-sm">small</p>
<p class="text-base">default</p>
<p class="text-lg">a bit bigger</p>
<p class="text-2xl">heading</p>
<p class="text-4xl">big heading</p>

<p class="font-bold">bold</p>
<p class="font-semibold">half bold</p>
<p class="italic">italic</p>
<p class="uppercase tracking-wide">A LITTLE SPACED OUT</p>

<p class="text-center">centered</p>
<p class="text-left">left</p>
```

### Sizes — width and height

```html
<img class="w-full h-48 object-cover">    <!-- full width, fixed height, image cropped -->
<div class="max-w-4xl mx-auto">           <!-- max-width with horizontal auto margin (centering) -->
<div class="h-screen">                     <!-- full viewport height -->
```

### Borders and rounding

```html
<div class="border border-gray-300 rounded-lg">
<div class="border-2 border-red-500 rounded-full">
<div class="rounded-md">                  <!-- small radius -->
<div class="rounded-xl">                  <!-- bigger -->
```

### Shadows

```html
<div class="shadow">       <!-- subtle -->
<div class="shadow-md">    <!-- more -->
<div class="shadow-xl">    <!-- big -->
```

### Flexbox and grid

The CSS concepts from Section 04 — just with shorter names:

```html
<header class="flex justify-between items-center">
  ...
</header>

<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  ...
</section>
```

| Tailwind | Equivalent CSS |
|----------|----------------|
| `flex` | `display: flex` |
| `flex-col` | `flex-direction: column` |
| `justify-between` | `justify-content: space-between` |
| `items-center` | `align-items: center` |
| `gap-4` | `gap: 1rem` |
| `grid` | `display: grid` |
| `grid-cols-3` | 3 equal columns |

---

## 5. Hover, focus, active — prefixes

To style on hover, **prefix** the class with `hover:`:

```html
<button class="bg-red-600 hover:bg-red-700 text-white">
  Click me
</button>
```

When the mouse is over the button, `bg-red-700` overrides `bg-red-600`. Same for `focus:`, `active:`, `disabled:`.

```html
<input class="border focus:border-red-500 focus:outline-none">
```

---

## 6. Responsive — prefixes for screen size

Tailwind is **mobile-first**: unprefixed classes apply to all screens. Prefixes apply *from that breakpoint up*.

| Prefix | Min width | Typical device |
|--------|-----------|----------------|
| (none) | 0 | phones |
| `sm:` | 640px | landscape phones |
| `md:` | 768px | tablets |
| `lg:` | 1024px | laptops |
| `xl:` | 1280px | desktops |

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- 1 column on phones, 2 on tablets, 3 on laptops -->
</div>

<header class="flex flex-col md:flex-row">
  <!-- stack on mobile, side-by-side on tablet+ -->
</header>
```

You won't write a single `@media` query — these prefixes handle it all.

---

## 7. Tips for not going crazy

### Use the docs

[tailwindcss.com/docs](https://tailwindcss.com/docs) has a search bar. Type "padding," "shadow," "grid" — get the full list. **Use it constantly.** You don't need to memorize.

### Use the VS Code extension

Install **Tailwind CSS IntelliSense** in VS Code. It autocompletes class names and shows the actual CSS each one produces when you hover. This is a huge productivity boost.

### Group related classes

There's no rule, but a readable order is:
1. Layout (`flex`, `grid`, `block`)
2. Size (`w-`, `h-`, `max-w-`)
3. Spacing (`p-`, `m-`)
4. Typography (`text-`, `font-`)
5. Color (`bg-`, `text-color`, `border-color`)
6. Effects (`rounded`, `shadow`)
7. States (`hover:`, `focus:`)

```html
<button class="flex items-center w-full px-4 py-2 text-white font-bold bg-red-600 rounded-lg hover:bg-red-700">
```

---

## Your turn

Open `starter/`. You'll find a copy of the recipe app from Section 06 — same `index.html`, same `script.js`, but **`styles.css` is empty** and the HTML elements have **no class attributes** beyond the structural ones JS needs (`recipe-grid`, `filter-btn`, `category`).

The page also loads Tailwind from the CDN.

**Your job:** style everything using only Tailwind utility classes in the HTML. The look should match what we had before (or improve on it — go wild).

Specifically:

1. **Body**: light background (e.g. `bg-amber-50`), font family, text color.
2. **Header**: red background, white text, flex with logo left and nav right. Stacks vertically on mobile.
3. **Nav links**: bold, hover underline.
4. **Main**: max width (~`max-w-6xl`), centered (`mx-auto`), padding.
5. **Intro section**: centered text, big heading.
6. **Search input**: white background, rounded full, padding, border. On focus, change border color.
7. **Filter buttons**: pill shape, gray border, on hover change border color, on `.active` (still set by JS) — use a special class. *Hint: you'll need a tiny bit of custom CSS in `styles.css` for the `.active` state since Tailwind doesn't know about JS-toggled classes by default, OR use Tailwind's "data attribute" technique. For this exercise, the simplest is to put active styles in `styles.css`.*
8. **Recipe grid**: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`.
9. **Recipe card**: white background, rounded, shadow, overflow hidden. On `hover:` lift with `hover:-translate-y-1` and `hover:shadow-xl` (add `transition`).
10. **Card body**: padding, spacing between elements.
11. **Category pill**: small, green background, white text, rounded full, uppercase.
12. **Footer**: centered, gray text, small.

Update `script.js` if needed so the cards it generates use Tailwind classes too (you'll need to change the `innerHTML` template).

Compare with `solution/`.

---

## Cheat sheet — the classes you'll use most

```
LAYOUT       flex  grid  block  hidden  flex-col  flex-row
SIZE         w-full  h-48  max-w-4xl  min-h-screen
SPACING      p-4  px-6 py-3  m-2  mx-auto  gap-4
TEXT         text-sm text-base text-lg text-2xl text-4xl
             font-bold font-semibold italic uppercase tracking-wide
             text-center text-left
COLORS       bg-white bg-red-600 bg-amber-50
             text-white text-stone-800 text-gray-500
             border-gray-200
BORDERS      border  border-2  rounded  rounded-lg  rounded-full
EFFECTS      shadow  shadow-md  shadow-xl  transition  duration-200
FLEX         items-center  justify-between  justify-center
GRID         grid-cols-1  md:grid-cols-3  gap-6
HOVER        hover:bg-red-700  hover:-translate-y-1  hover:underline
FOCUS        focus:outline-none  focus:border-red-500
RESPONSIVE   sm:  md:  lg:  xl:
```

---

## Where to go next

Congrats — you've finished the course. You now know how to:
- Structure pages with semantic HTML
- Style them with vanilla CSS and Tailwind
- Make them interactive with JavaScript
- Add type safety with TypeScript

**What to learn next**, in roughly increasing depth:
- **Git + GitHub** — version control, the way professionals share code
- **A JS framework** — React or Svelte. You already know components-in-spirit (cards) and state (the search query). A framework formalizes that.
- **A backend** — Node.js + Express, or Python + FastAPI. So far our data lives in a file; with a backend it lives in a database.
- **Deploying** — get your site on the real internet. Netlify, Vercel, or GitHub Pages all have free tiers.

Keep building. The only way to get good is to ship things.

---

**Previous:** [07 — TypeScript](../07-typescript/) | **Back to:** [Course home](../README.md)
