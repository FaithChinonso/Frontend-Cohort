// Section 07 — TypeScript version of the recipe app.
//
// SETUP
//   1. Open a terminal in this folder.
//   2. Run: npm install
//   3. Run: npm run watch   (recompiles on every save)
//   4. Open index.html in your browser.

// ----------------------------------------------------------------
// TODO 1: Add a union type for Category
// type Category = "Breakfast" | "Lunch" | "Dinner" | "Dessert";
// ----------------------------------------------------------------



// ----------------------------------------------------------------
// TODO 2: Add an interface Recipe with these fields:
//   title: string;
//   category: Category;
//   description: string;
//   image: string;
//   chef: string;
//   minutes: number;
//   cuisine: string;
//   isVegetarian: boolean;   (you can add it to the data too)
// ----------------------------------------------------------------



// ----------------------------------------------------------------
// TODO 3: Type the recipes array as Recipe[]
// ----------------------------------------------------------------

const recipes = [
  { title: "Spaghetti Carbonara",   category: "Dinner",    description: "Classic Roman pasta.",          image: "https://images.unsplash.com/photo-1612874742237-6526221588e3", chef: "Anna",  minutes: 25, cuisine: "Italian",  isVegetarian: false },
  { title: "Chicken Tikka Masala",  category: "Dinner",    description: "Creamy, spiced tomato curry.",  image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641", chef: "Raj",   minutes: 40, cuisine: "Indian",   isVegetarian: false },
  { title: "Chocolate Chip Cookies",category: "Dessert",   description: "Crisp edges, chewy middle.",    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e", chef: "Maya",  minutes: 30, cuisine: "Baking",   isVegetarian: true  },
  { title: "Fluffy Pancakes",       category: "Breakfast", description: "Tall, light, golden.",          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8", chef: "Sam",   minutes: 15, cuisine: "American", isVegetarian: true  },
  { title: "Caesar Salad",          category: "Lunch",     description: "Crunchy romaine, sharp dressing.", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe", chef: "Lu",    minutes: 10, cuisine: "Classic",  isVegetarian: false },
  { title: "Margherita Pizza",      category: "Dinner",    description: "Three toppings, perfect crust.",   image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38", chef: "Marco", minutes: 45, cuisine: "Italian",  isVegetarian: true  },
  { title: "Avocado Toast",         category: "Breakfast", description: "Smashed avocado, lemon, chili.",   image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2", chef: "Kai",   minutes: 5,  cuisine: "Brunch",   isVegetarian: true  },
  { title: "Tiramisu",              category: "Dessert",   description: "Coffee, mascarpone, magic.",       image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9", chef: "Sofia", minutes: 60, cuisine: "Italian",  isVegetarian: true  },
];

let searchQuery = "";
let activeCategory = "all";


// ----------------------------------------------------------------
// TODO 4: Annotate renderRecipes — parameter and return type.
// Update the innerHTML template to match the editorial markup:
//   <article class="recipe-card" style="--i: 0">
//     <div class="card-image-wrap"><img .../></div>
//     <div class="card-body">
//       <span class="category">...</span>
//       <h3>...</h3>
//       <p class="meta">by Chef X · N min · Cuisine</p>
//       <p>description</p>
//       <a href="#">View recipe →</a>
//     </div>
//   </article>
// ----------------------------------------------------------------

function renderRecipes(list) {
  const grid = document.querySelector(".recipe-grid");
  if (!grid) return;
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = `<p class="empty">No recipes found.</p>`;
    return;
  }

  list.forEach((recipe, i) => {
    const card = document.createElement("article");
    card.className = "recipe-card";
    card.style.setProperty("--i", String(i));
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


// ----------------------------------------------------------------
// TODO 4: Annotate applyFilters too.
// ----------------------------------------------------------------

function applyFilters() {
  const filtered = recipes.filter((recipe) => {
    const matchesCategory = activeCategory === "all" || recipe.category === activeCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });
  renderRecipes(filtered);
}


// ----------------------------------------------------------------
// TODO 5: Type the DOM queries. Use:
//   const search = document.querySelector("#search") as HTMLInputElement;
//   const buttons = document.querySelectorAll(".filter-btn") as NodeListOf<HTMLButtonElement>;
// ----------------------------------------------------------------

renderRecipes(recipes);

const search = document.querySelector("#search");

// TODO 6: Annotate the event parameters (use Event)
search?.addEventListener("input", (event) => {
  const target = event.target;
  searchQuery = target.value.toLowerCase();   // this line will need a type assertion
  applyFilters();
});

const buttons = document.querySelectorAll(".filter-btn");
buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const target = event.target;
    activeCategory = target.dataset.category;
    buttons.forEach((b) => b.classList.remove("active"));
    target.classList.add("active");
    applyFilters();
  });
});


// ----------------------------------------------------------------
// TODO 7: Write a function recipeStats(list: Recipe[]) that returns
// { total: number; avgMinutes: number; vegetarianCount: number }.
// Then console.log(recipeStats(recipes)) at the end.
// ----------------------------------------------------------------
