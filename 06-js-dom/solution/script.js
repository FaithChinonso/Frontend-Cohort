const recipes = [
  {
    title: "Spaghetti Carbonara",
    category: "Dinner",
    description: "Classic Roman pasta with eggs, cheese, and pancetta.",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3",
  },
  {
    title: "Chicken Tikka Masala",
    category: "Dinner",
    description: "Creamy, spiced tomato curry that's a weeknight favorite.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
  },
  {
    title: "Chocolate Chip Cookies",
    category: "Dessert",
    description: "Crisp edges, chewy middle. The recipe everyone steals.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
  },
  {
    title: "Fluffy Pancakes",
    category: "Breakfast",
    description: "Tall, light, golden. Serve with butter and real syrup.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8",
  },
  {
    title: "Caesar Salad",
    category: "Lunch",
    description: "Crunchy romaine, sharp dressing, crisp croutons.",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
  },
  {
    title: "Margherita Pizza",
    category: "Dinner",
    description: "Three toppings, perfect crust. Don't overthink it.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  },
  {
    title: "Avocado Toast",
    category: "Breakfast",
    description: "Smashed avocado, lemon, chili, and good bread.",
    image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2",
  },
  {
    title: "Tiramisu",
    category: "Dessert",
    description: "Coffee-soaked ladyfingers and mascarpone cream.",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9",
  },
];

let searchQuery = "";
let activeCategory = "all";

function renderRecipes(list) {
  const grid = document.querySelector(".recipe-grid");
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = `<p class="empty">No recipes found.</p>`;
    return;
  }

  list.forEach((recipe) => {
    const card = document.createElement("article");
    card.className = "recipe-card";
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <div class="card-body">
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
    const matchesCategory =
      activeCategory === "all" || recipe.category === activeCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });
  renderRecipes(filtered);
}

// Initial render
renderRecipes(recipes);

// Search
const search = document.querySelector("#search");
search.addEventListener("input", (event) => {
  searchQuery = event.target.value.toLowerCase();
  applyFilters();
});

// Category buttons
const buttons = document.querySelectorAll(".filter-btn");
buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    activeCategory = event.target.dataset.category;
    buttons.forEach((b) => b.classList.remove("active"));
    event.target.classList.add("active");
    applyFilters();
  });
});
