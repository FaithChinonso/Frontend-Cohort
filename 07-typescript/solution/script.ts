// Section 07 — TypeScript solution

type Category = "Breakfast" | "Lunch" | "Dinner" | "Dessert";

interface Recipe {
  title: string;
  category: Category;
  description: string;
  image: string;
  minutes: number;
  isVegetarian: boolean;
}

const recipes: Recipe[] = [
  { title: "Spaghetti Carbonara",   category: "Dinner",    description: "Classic Roman pasta.",          image: "https://images.unsplash.com/photo-1612874742237-6526221588e3", minutes: 20, isVegetarian: false },
  { title: "Chicken Tikka Masala",  category: "Dinner",    description: "Creamy, spiced tomato curry.",  image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641", minutes: 40, isVegetarian: false },
  { title: "Chocolate Chip Cookies",category: "Dessert",   description: "Crisp edges, chewy middle.",    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e", minutes: 30, isVegetarian: true  },
  { title: "Fluffy Pancakes",       category: "Breakfast", description: "Tall, light, golden.",          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8", minutes: 15, isVegetarian: true  },
  { title: "Caesar Salad",          category: "Lunch",     description: "Crunchy romaine, sharp dressing.", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe", minutes: 10, isVegetarian: false },
  { title: "Margherita Pizza",      category: "Dinner",    description: "Three toppings, perfect crust.",   image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38", minutes: 45, isVegetarian: true  },
  { title: "Avocado Toast",         category: "Breakfast", description: "Smashed avocado, lemon, chili.",   image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2", minutes: 5,  isVegetarian: true  },
  { title: "Tiramisu",              category: "Dessert",   description: "Coffee, mascarpone, magic.",       image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9", minutes: 60, isVegetarian: true  },
];

let searchQuery: string = "";
let activeCategory: Category | "all" = "all";

function renderRecipes(list: Recipe[]): void {
  const grid = document.querySelector(".recipe-grid");
  if (!grid) return;
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

function applyFilters(): void {
  const filtered = recipes.filter((recipe) => {
    const matchesCategory = activeCategory === "all" || recipe.category === activeCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });
  renderRecipes(filtered);
}

interface Stats {
  total: number;
  avgMinutes: number;
  vegetarianCount: number;
}

function recipeStats(list: Recipe[]): Stats {
  const total = list.length;
  const sumMinutes = list.reduce((sum, r) => sum + r.minutes, 0);
  const avgMinutes = total === 0 ? 0 : Math.round(sumMinutes / total);
  const vegetarianCount = list.filter((r) => r.isVegetarian).length;
  return { total, avgMinutes, vegetarianCount };
}

console.log(recipeStats(recipes));

renderRecipes(recipes);

const search = document.querySelector("#search") as HTMLInputElement;
search.addEventListener("input", (event: Event) => {
  const target = event.target as HTMLInputElement;
  searchQuery = target.value.toLowerCase();
  applyFilters();
});

const buttons = document.querySelectorAll(".filter-btn") as NodeListOf<HTMLButtonElement>;
buttons.forEach((btn) => {
  btn.addEventListener("click", (event: Event) => {
    const target = event.target as HTMLButtonElement;
    const cat = target.dataset.category;
    if (!cat) return;
    activeCategory = cat as Category | "all";
    buttons.forEach((b) => b.classList.remove("active"));
    target.classList.add("active");
    applyFilters();
  });
});
