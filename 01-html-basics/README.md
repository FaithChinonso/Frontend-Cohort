# Section 01 — HTML Basics

**Goal:** Build a single recipe page for "Tasty Bites" using only HTML.

By the end of this lesson you'll have a webpage that shows a recipe with a title, photo, ingredients, and steps.

---

## 1. What is HTML?

**HTML** stands for **HyperText Markup Language**. It's the language used to describe the structure of every webpage on the internet.

Think of HTML like the skeleton of a body. It doesn't decide colors or fonts (that's CSS) and it doesn't make things move (that's JavaScript). It just says: *"here is a heading, here is a paragraph, here is a picture."*

### Tags

HTML is made of **tags**. A tag looks like this:

```html
<p>Hello world</p>
```

- `<p>` is the **opening tag**
- `</p>` is the **closing tag** (note the slash `/`)
- `Hello world` is the **content** between them

The `p` here stands for "paragraph." Every tag has a name that tells the browser what kind of thing it is.

---

## 2. The skeleton of every HTML page

Every HTML file starts the same way. Here it is:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My Page</title>
  </head>
  <body>
    <!-- everything you see on the page goes here -->
  </body>
</html>
```

Let's break it down:

- `<!DOCTYPE html>` — tells the browser "this is HTML5" (the modern version). Always put this first.
- `<html>` — wraps the whole document.
- `<head>` — info **about** the page (the title, the language, links to stylesheets). Things in `<head>` are not visible on the page itself.
- `<title>` — the text that shows in the browser tab.
- `<body>` — everything the user actually sees.

The thing wrapped in `<!-- ... -->` is a **comment**. Comments are notes for you, the developer. The browser ignores them.

---

## 3. The most important tags

Here are the tags you'll use every single day:

### Headings — `<h1>` through `<h6>`

```html
<h1>This is the biggest heading</h1>
<h2>This is smaller</h2>
<h3>Even smaller</h3>
```

`h1` is the most important heading on the page (use it once, for the main title). `h2` is for sections, `h3` for sub-sections, and so on down to `h6`.

### Paragraph — `<p>`

```html
<p>This is a paragraph of text. It can be as long as you want.</p>
```

### Link — `<a>`

A link goes to another page or website. The address goes in the `href` **attribute**:

```html
<a href="https://google.com">Click here to go to Google</a>
```

### Image — `<img>`

```html
<img src="recipe.jpg" alt="A bowl of pasta" />
```

Notice two things:
- `<img>` has no closing tag. It's "self-closing." A few tags work like this.
- `alt` is text shown if the image fails to load, and read aloud to people who can't see. **Always include `alt`.**

### Line break — `<br>`

Forces a line break. Use sparingly — usually paragraphs are better.

```html
<p>Line one<br>Line two</p>
```

### Strong and emphasis — `<strong>` and `<em>`

```html
<p>This is <strong>very important</strong> and this is <em>emphasized</em>.</p>
```

`<strong>` shows as **bold**. `<em>` shows as *italic*.

---

## 4. Attributes

An **attribute** gives extra info to a tag. They go inside the opening tag, like this:

```html
<a href="about.html">About us</a>
```

Here `href` is the attribute, and `"about.html"` is its value. You'll meet many attributes: `src`, `alt`, `href`, `id`, `class`, etc.

---

## 5. Nesting

Tags can go inside other tags. This is called **nesting**:

```html
<p>I love <strong>chocolate cake</strong> more than anything.</p>
```

Always close tags in the reverse order you opened them. **Wrong:**

```html
<p>Hello <strong>world</p></strong>  <!-- bad! -->
```

**Right:**

```html
<p>Hello <strong>world</strong></p>
```

---

## 6. How to view your HTML

1. Open the `starter/` folder.
2. Find `index.html`.
3. **Double-click it.** It opens in your browser.
4. Make changes in VS Code, save, then **refresh the browser** (Ctrl+R or F5).

That's the whole loop: edit → save → refresh.

---

## Your turn

Open `starter/index.html`. You'll see a half-built recipe page with `TODO` comments.

Complete the page so it shows:

1. The title "Spaghetti Carbonara" as a big heading
2. A short paragraph describing the dish
3. An image (you can use any image URL, or use `https://images.unsplash.com/photo-1612874742237-6526221588e3` for a placeholder)
4. A sub-heading "Ingredients"
5. Three paragraphs listing some ingredients (we'll learn proper lists in the next section)
6. A sub-heading "Steps"
7. Three paragraphs with the steps
8. A link at the bottom that says "Back to all recipes" pointing to `index.html` (it won't go anywhere yet — that's fine)

When you're done, compare with `solution/index.html`.

---

## Cheat sheet

| Tag | What it's for |
|-----|---------------|
| `<h1>`–`<h6>` | Headings |
| `<p>` | Paragraph |
| `<a href="...">` | Link |
| `<img src="..." alt="...">` | Image |
| `<strong>` | Bold / important |
| `<em>` | Italic / emphasis |
| `<br>` | Line break |
| `<!-- ... -->` | Comment (ignored by browser) |

---

**Next:** [02 — HTML Semantic + Forms](../02-html-semantic-forms/)
