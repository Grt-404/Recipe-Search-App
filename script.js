document.querySelector("#submitBtn").addEventListener("click", async () => {
  const input = document.querySelector("#search").value.trim();

  if (!input) return alert("Please enter a dish name!");

  const finalURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;

  try {
    const response = await fetch(finalURL);
    const data = await response.json();

    if (!data.meals) {
      document.querySelector("#area").innerHTML = "❌ No recipe found.";
      document.querySelector("#list").innerHTML = "";
      document.querySelector("#instructions").innerHTML = "";
      return;
    }

    const meal = data.meals[0];

    document.querySelector("#area").innerHTML = `${meal.strMeal}`;

    // Ingredients
    const list = document.querySelector("#list");
    list.innerHTML = "";
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim()) {
        const li = document.createElement("li");
        li.textContent = `${ingredient} - ${measure}`;
        list.appendChild(li);
      }
    }

    // Instructions
    document.querySelector("#instructions").textContent = meal.strInstructions;
  } catch (err) {
    console.error("Error fetching recipe:", err);
    alert("Something went wrong. Try again.");
  }
});
