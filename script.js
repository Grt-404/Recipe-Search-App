document.querySelector("button").addEventListener("click", async () => {
    const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    let input = document.querySelector("#search");
    let append = input.value;
    const final = `https://www.themealdb.com/api/json/v1/1/search.php?s=${append}`

    let promise = () => {
        return fetch(final);
    };

    let getRecipe = async () => {
        let response = await promise();
        let data = await response.json();
        return data;
    };
    let area = document.querySelector("#area");
    let instructions = document.querySelector("#recipie");
    let list = document.querySelector("#list");

    area.innerHTML = "";
    list.innerHTML = "";
    instructions.innerHTML = "";

    let data = await getRecipe();
    let meal = data.meals[0];

    let country = meal.strMeal;
    area.innerHTML = `<p>${country}</p>`;

    (async () => {
        for (let i = 1; i <= 20; i++) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== "") {
                let el = document.createElement("li");
                el.innerText = `${ingredient} - ${measure}`;
                document.querySelector("#list").append(el);
            }
        }
    })();

    let recipe = meal.strInstructions;
    instructions.innerHTML = `<p>${recipe}</p>`;
});
