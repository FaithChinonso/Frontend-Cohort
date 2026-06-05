// Same logic as Section 06. Your job: add Tailwind classes to the card template
// so it matches the editorial look.

const recipes = [
  { title: "Spaghetti Carbonara",   category: "Dinner",    description: "Classic Roman pasta with eggs, cheese, and pancetta.",     image: "https://images.unsplash.com/photo-1612874742237-6526221588e3", chef: "Anna",  minutes: 25, cuisine: "Italian"  },
  { title: "Chicken Tikka Masala",  category: "Dinner",    description: "Creamy, spiced tomato curry that's a weeknight favorite.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641", chef: "Raj",   minutes: 40, cuisine: "Indian"   },
  { title: "Chocolate Chip Cookies",category: "Dessert",   description: "Crisp edges, chewy middle.",                               image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e", chef: "Maya",  minutes: 30, cuisine: "Baking"   },
  { title: "Fluffy Pancakes",       category: "Breakfast", description: "Tall, light, golden.",                                     image: "https://images.unsplash.com/photo-1525351484163-7529414344d8", chef: "Sam",   minutes: 15, cuisine: "American" },
  { title: "Caesar Salad",          category: "Lunch",     description: "Crunchy romaine, sharp dressing.",                         image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe", chef: "Lu",    minutes: 10, cuisine: "Classic"  },
  { title: "Margherita Pizza",      category: "Dinner",    description: "Three toppings, perfect crust.",                           image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38", chef: "Marco", minutes: 45, cuisine: "Italian"  },
  { title: "Avocado Toast",         category: "Breakfast", description: "Smashed avocado, lemon, chili.",                           image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2", chef: "Kai",   minutes: 5,  cuisine: "Brunch"   },
  { title: "Tiramisu",              category: "Dessert",   description: "Coffee, mascarpone, magic.",                               image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9", chef: "Sofia", minutes: 60, cuisine: "Italian"  },
];

let searchQuery = "";
let activeCategory = "all";

function renderRecipes(list) {
  const grid = document.querySelector(".recipe-grid");
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = `<p class="font-accent italic text-espresso/60 text-center col-span-full py-10">No recipes found.</p>`;
    return;
  }

  list.forEach((recipe, i) => {
    const card = document.createElement("article");

    // TODO 9: Add Tailwind classes to the card. Suggested:
    //   "group bg-paper rounded-xl overflow-hidden shadow hover:-translate-y-1 hover:shadow-xl transition duration-300"
    // Also: make the FIRST card (i === 0) span 2 columns with " sm:col-span-2"
    card.className = "recipe-card";

    // TODO 10-13: Add Tailwind classes inside the template below:
    //   image wrapper:  "overflow-hidden bg-rule"
    //   img:            "w-full aspect-[4/5] object-cover block transition duration-500 group-hover:scale-105"
    //   card-body:      "p-5 space-y-2"
    //   .category:      "inline-block bg-terracotta/10 text-terracotta text-xs uppercase tracking-widest px-2.5 py-1 rounded-full font-semibold"
    //   h3:             "font-display text-xl text-espresso text-balance"
    //   .meta:          "font-accent italic text-espresso/60 text-sm"
    //   description p:  "text-espresso/75 text-sm"
    //   a:              "text-terracotta font-semibold no-underline hover:underline inline-block text-sm"
    card.innerHTML = `
      <div class="card-image-wrap">
        <img src="${recipe.image}" alt="${recipe.title}" />
      </div>
      <div>
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
