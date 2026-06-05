// Section 06 — JavaScript + the DOM
// Build a searchable, filterable grid of recipes.

const recipes = [
  {
    title: "Spaghetti Carbonara",
    category: "Dinner",
    description: "Classic Roman pasta with eggs, cheese, and pancetta.",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3",
    chef: "Anna",
    minutes: 25,
    cuisine: "Italian",
  },
  {
    title: "Chicken Tikka Masala",
    category: "Dinner",
    description: "Creamy, spiced tomato curry that's a weeknight favorite.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
    chef: "Raj",
    minutes: 40,
    cuisine: "Indian",
  },
  {
    title: "Chocolate Chip Cookies",
    category: "Dessert",
    description: "Crisp edges, chewy middle. The recipe everyone steals.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
    chef: "Maya",
    minutes: 30,
    cuisine: "Baking",
  },
  {
    title: "Fluffy Pancakes",
    category: "Breakfast",
    description: "Tall, light, golden. Serve with butter and real syrup.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8",
    chef: "Sam",
    minutes: 15,
    cuisine: "American",
  },
  {
    title: "Caesar Salad",
    category: "Lunch",
    description: "Crunchy romaine, sharp dressing, crisp croutons.",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
    chef: "Lu",
    minutes: 10,
    cuisine: "Classic",
  },
  {
    title: "Margherita Pizza",
    category: "Dinner",
    description: "Three toppings, perfect crust. Don't overthink it.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    chef: "Marco",
    minutes: 45,
    cuisine: "Italian",
  },
  {
    title: "Avocado Toast",
    category: "Breakfast",
    description: "Smashed avocado, lemon, chili, and good bread.",
    image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2",
    chef: "Kai",
    minutes: 5,
    cuisine: "Brunch",
  },
  {
    title: "Tiramisu",
    category: "Dessert",
    description: "Coffee-soaked ladyfingers and mascarpone cream.",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9",
    chef: "Sofia",
    minutes: 60,
    cuisine: "Italian",
  },
];


// ----------------------------------------------------------------
// TODO 1: Write renderRecipes(list)
// - find the .recipe-grid element
// - clear it with innerHTML = ""
// - for each recipe in list, create an <article class="recipe-card">
//   with this structure:
//     <article class="recipe-card" style="--i: 0">
//       <div class="card-image-wrap">
//         <img src="..." alt="..." />
//       </div>
//       <div class="card-body">
//         <span class="category">Dinner</span>
//         <h3>Title</h3>
//         <p class="meta">by Chef Anna · 25 min · Italian</p>
//         <p>description</p>
//         <a href="#">View recipe →</a>
//       </div>
//     </article>
// - pass the loop INDEX as the --i CSS variable for staggered fade-in
// - append each to the grid
// - if list is empty, show <p class="empty">No recipes found.</p>
//   (the CSS :has() rule already styles this nicely!)
// ----------------------------------------------------------------

function renderRecipes(list) {
  // your code here
}


// ----------------------------------------------------------------
// TODO 2: Initial render — call renderRecipes(recipes)
// ----------------------------------------------------------------



// ----------------------------------------------------------------
// TODO 3 & 5: Track current state — searchQuery and activeCategory.
// Write applyFilters() that uses BOTH to filter `recipes`,
// then calls renderRecipes(filtered).
// ----------------------------------------------------------------

let searchQuery = "";
let activeCategory = "all";

function applyFilters() {
  // your code here
}


// ----------------------------------------------------------------
// TODO 4: Wire up the search input (#search).
// On 'input' event:
//   - set searchQuery to event.target.value (lowercase)
//   - call applyFilters()
// ----------------------------------------------------------------



// ----------------------------------------------------------------
// TODO 5: Wire up the category buttons (.filter-btn).
// For each button, on 'click':
//   - set activeCategory to event.target.dataset.category
//   - remove .active from all .filter-btn buttons
//   - add .active to the clicked button
//   - call applyFilters()
// ----------------------------------------------------------------

