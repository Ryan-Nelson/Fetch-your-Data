/*
    Code to add food to the DOM
*/
const listEl = document.querySelector(".foodlist")


const foodFactory = food => {
    return `
        <article>
            <h1> ${food.name} </h1>
            <section>
                ${food.ethnicity}
            </section>
            <section>
                ${food.type}
            </section>
            <section>
                ${food.ingredients}
            </section>
        </article>
    `
}

const addFoodToDom = foodHTML => listEl.innerHTML += foodHTML

fetch("http://localhost:8088/food")
    .then(response => response.json())

    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())

                .then(productInfo => {


                    food.ingredients = productInfo.product.ingredients
                    .map(i => {
                        return `<li>${i.text}</li>`
                    })
                    .join("")


                    // food.ingredients = productInfo.product.ingredients.reduce((p, c) => {
                    //     return `${p}<li>${c.text}</li>`
                    // }, "")

                    // Produce HTML representation
                    const foodAsHTML = foodFactory(food)

                    // Add representaiton to DOM
                    addFoodToDom(foodAsHTML)

                })
            })
        })


