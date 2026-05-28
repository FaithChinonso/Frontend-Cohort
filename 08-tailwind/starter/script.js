// Same logic as Section 06 — but YOU need to add Tailwind classes
// to the card template (innerHTML) below.

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
    grid.innerHTML = `<p class="text-center text-gray-500 col-span-full py-8">No recipes found.</p>`;
    return;
  }

  list.forEach((recipe) => {
    const card = document.createElement("article");

    // TODO: Add Tailwind classes to the article wrapper:
    //   bg-white rounded-xl overflow-hidden shadow
    //   hover:-translate-y-1 hover:shadow-xl transition
    card.className = "recipe-card";

    // TODO: Add Tailwind classes inside the template below:
    //   img — w-full h-44 object-cover
    //   wrapper div — p-5 space-y-2
    //   .category — inline-block bg-green-700 text-white text-xs px-2 py-0.5 rounded-full uppercase tracking-wide
    //   h3 — text-lg font-bold
    //   p — text-stone-600 text-sm
    //   a — text-red-600 font-bold no-underline hover:underline
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <div>
        <span class="category">${recipe.category}</span>
        <h3>${recipe.title}</h3>
        <p>${recipe.description}</p>
        <a href="#">View recipe →</a>
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
