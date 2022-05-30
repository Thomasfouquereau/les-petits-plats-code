// import { recipes } from '../../data/recipes.js';
const cardContainer = document.querySelector('.cardRecette');

/**
 * creation des cards
 */

 export function factoryCard(recipeArray) {
    cardContainer.innerHTML = "";
    recipeArray.forEach(element => {

        /**
         * creation de la card
         */

        const card1 = document.createElement('div');
        card1.classList.add('card');

        /**
         * Création de l image de la card
         */

        function getImg() {
            const img = document.createElement('p');
            img.classList.add('img');
            card1.appendChild(img);
        }
        getImg();

        /**
         * Création du nom de la card
         */

        function getNameRecette() {
            const nomRecette = element.name;
            const nomDom = document.createElement('h2');
            nomDom.classList.add('nomRecette');
            nomDom.textContent = nomRecette;
            card1.appendChild(nomDom);
        }
        getNameRecette()

        /**
         * Création du temps de préparation de la card
         */

        function getTimeRecette() {
            const time = element.time;
            const timeIcon = `assets/time.svg`;
            const icontimeDom = document.createElement('img');
            icontimeDom.classList.add('timeIcon');
            icontimeDom.setAttribute('src', timeIcon);
            const timeDom = document.createElement('p');
            timeDom.classList.add('time');
            timeDom.textContent = time + ' min';
            timeDom.appendChild(icontimeDom);
            card1.appendChild(timeDom);
        }
        getTimeRecette()

        /**
         * Création de la liste d'ingrédients de la card
         */

        function getIngredientsRecette() {
            const ingredientGroup = document.createElement('div');
            ingredientGroup.classList.add('ingredientGroup');
            const ingredientsRecette = element.ingredients;
                ingredientsRecette.forEach(ingredient => {
                    const ingredientsDom = document.createElement('div');
                    ingredientsDom.classList.add('ingredientCard');
                    const ingredientName = document.createElement('p');
                    ingredientName.classList.add('ingredientName');
                    const ingredientQuantity = document.createElement('p');
                    const ingredientUnit = document.createElement('p');
                    ingredientUnit.classList.add('ingredientQuantity');
                    ingredientName.textContent = ingredient.ingredient + ' : ';
                    ingredientQuantity.textContent = ingredient.quantity;
                    ingredientUnit.textContent = ingredient.unit;
                    ingredientsDom.classList.add('cardRecette');
                    ingredientsDom.appendChild(ingredientName);
                    ingredientsDom.appendChild(ingredientQuantity);
                    ingredientsDom.appendChild(ingredientUnit);
                    ingredientsDom.classList.add('cardRecette');
                    ingredientGroup.appendChild(ingredientsDom);
            });
            card1.appendChild(ingredientGroup);
        }
        getIngredientsRecette()

        /**
         * Création de la description de la card
         */

        function getDescriptionRecette() {
            const descriptionRecette = element.description;
            const descriptionDom = document.createElement('p');
            descriptionDom.classList.add('description');
            descriptionDom.textContent = descriptionRecette;
            card1.appendChild(descriptionDom);
        }

        getDescriptionRecette()

        cardContainer.appendChild(card1);
    });

}
// factoryCard(recipes);