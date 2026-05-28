console.log("script.js loaded");

const recipes = [
  { title: "Carbonara",     category: "Dinner",    minutes: 20, isVegetarian: false },
  { title: "Pancakes",      category: "Breakfast", minutes: 15, isVegetarian: true  },
  { title: "Caesar Salad",  category: "Lunch",     minutes: 10, isVegetarian: false },
  { title: "Choc Cookies",  category: "Dessert",   minutes: 45, isVegetarian: true  },
];

function printRecipe(recipe) {
  const veg = recipe.isVegetarian ? "vegetarian" : "not vegetarian";
  return `${recipe.title} (${recipe.category}, ${recipe.minutes} min, ${veg})`;
}

recipes.forEach((r) => console.log(printRecipe(r)));

const quickRecipes = recipes.filter((r) => r.minutes <= 30);
console.log(`Found ${quickRecipes.length} quick recipes`);

const titles = recipes.map((r) => r.title);
console.log("Titles:", titles);

const firstVeggie = recipes.find((r) => r.isVegetarian);
console.log("First vegetarian:", firstVeggie ? firstVeggie.title : "none");

function recipesByCategory(category) {
  return recipes.filter((r) => r.category === category);
}

console.log("Dinners:", recipesByCategory("Dinner"));
