const recipes = [
  { title: "Spaghetti Carbonara",   category: "Dinner",    description: "Classic Roman pasta with eggs, cheese, and pancetta.", image: "https://images.unsplash.com/photo-1612874742237-6526221588e3" },
  { title: "Chicken Tikka Masala",  category: "Dinner",    description: "Creamy, spiced tomato curry that's a weeknight favorite.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641" },
  { title: "Chocolate Chip Cookies",category: "Dessert",   description: "Crisp edges, chewy middle.", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e" },
  { title: "Fluffy Pancakes",       category: "Breakfast", description: "Tall, light, golden.", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8" },
  { title: "Caesar Salad",          category: "Lunch",     description: "Crunchy romaine, sharp dressing.", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" },
  { title: "Margherita Pizza",      category: "Dinner",    description: "Three toppings, perfect crust.", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" },
  { title: "Avocado Toast",         category: "Breakfast", description: "Smashed avocado, lemon, chili.", image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2" },
  { title: "Tiramisu",              category: "Dessert",   description: "Coffee, mascarpone, magic.", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9" },
];

let searchQuery = "";
let activeCategory = "all";

function renderRecipes(list) {
  const grid = document.querySelector(".recipe-grid");
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = `<p class="text-center text-stone-500 col-span-full py-8">No recipes found.</p>`;
    return;
  }

  list.forEach((recipe) => {
    const card = document.createElement("article");
    card.className = "recipe-card bg-white rounded-xl overflow-hidden shadow hover:-translate-y-1 hover:shadow-xl transition duration-200";
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-44 object-cover" />
      <div class="p-5 space-y-2">
        <span class="inline-block bg-green-700 text-white text-xs px-2 py-0.5 rounded-full uppercase tracking-wide">${recipe.category}</span>
        <h3 class="text-lg font-bold text-stone-800">${recipe.title}</h3>
        <p class="text-stone-600 text-sm">${recipe.description}</p>
        <a href="#" class="text-red-600 font-bold no-underline hover:underline inline-block">View recipe →</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

function applyFilters() {
  const filtered = recipes.filter((recipe) => {
    const matchesCategory = activeCategory === "all" || recipe.category === activeCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });
  renderRecipes(filtered);
}

renderRecipes(recipes);

const search = document.querySelector("#search");
search.addEventListener("input", (event) => {
  searchQuery = event.target.value.toLowerCase();
  applyFilters();
});

const buttons = document.querySelectorAll(".filter-btn");
buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    activeCategory = event.target.dataset.category;
    buttons.forEach((b) => b.classList.remove("active"));
    event.target.classList.add("active");
    applyFilters();
  });
});
