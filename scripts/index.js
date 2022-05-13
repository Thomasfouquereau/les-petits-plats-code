import { recipes } from '../data/recipes.js';
// import { factoryCard } from '../scripts/factory/factoryCard.js';
// import { getInfoForTags } from '../scripts/factory/factoryTags.js';

const cardContainer = document.querySelector('.cardRecette');
const tagsIngredients = document.querySelector('.ingredientsSelection');
const tagsAppareils = document.querySelector('.appareilsSelection');
const tagsUstensiles = document.querySelector('.ustensilesSelection');

//cree un tableau vide et lui donner les info de chaque recette puis suprimer ceux qui ne correspondent pas au filtre de recherche

/**
 * creation des tags
 */

function getInfoForTags(recipeArray) {

    function generateIngList(recipeArray) {
        let ingList = [];
        recipeArray.forEach((recipe) => {
            recipe.ingredients.forEach(ingredientObj => {
                ingList.push(ingredientObj.ingredient)
            })
        });
        return [...new Set(ingList)].sort();
    }

    const result = generateIngList(recipes);

    console.log(result);

    /**
        * Création des tags d'ingrédients
        */

    function getIngredientsForTags(result) {
        const ingredientsForSelection = document.createElement('button');
        ingredientsForSelection.textContent = result;
        ingredientsForSelection.classList.add('ingredientForSelection');
        tagsIngredients.appendChild(ingredientsForSelection);
        console.log(ingredientsForSelection)
    }

    recipeArray.forEach(element => {

        /**
         * Création des tags d'appareils
         */

        function getApplianceForTags() {
            const applianceRecette = element.appliance;
            const applianceForSelection = document.createElement('button');
            applianceForSelection.textContent = applianceRecette;
            applianceForSelection.classList.add('applianceForSelection');
            tagsAppareils.appendChild(applianceForSelection);
        }


        /**
         * Création des tags d'ustensiles
         */

        function getUstensilsForTags() {
            const ustensilsRecette = element.ustensils;
            ustensilsRecette.forEach(ustensils => {
                const ustensilsForSelection = document.createElement('button');
                ustensilsForSelection.textContent = ustensils;
                ustensilsForSelection.classList.add('ustensilsForSelection');
                tagsUstensiles.appendChild(ustensilsForSelection);
            });
        }


        getApplianceForTags();
        getUstensilsForTags();
    });
    getIngredientsForTags(result);
}

const buttonForTagAppliance = document.querySelector('.applianceForSelection');//asnyc??
console.log(buttonForTagAppliance)

// buttonForTagAppliance.addEventListener('click', () => {
//     const tagAppliance = buttonForTagAppliance.textContent;
//     console.log(tagAppliance)
// });


/**
 * ouvre et ferme les tags
 */

const rechercheIngredient = document.querySelector('.ingredients');
const rechercheAppareils = document.querySelector('.appareils');
const rechercheUstensiles = document.querySelector('.ustensiles');
const ingredientList = document.querySelector('.ingredientsSelection');
const barreDeRechercheIngredients = document.querySelector('.barreDeRechercheIngredients');
const barreDeRechercheAppareils = document.querySelector('.barreDeRechercheAppareils');
const barreDeRechercheUstensiles = document.querySelector('.barreDeRechercheUstensiles');
const appareilsSelection = document.querySelector('.appareilsSelection');
const ustensilesSelection = document.querySelector('.ustensilesSelection');


/**
 * ouvre et ferme les tags ingredients
 */

rechercheIngredient.addEventListener('click', () => {
    ingredientList.style.display = 'block';
    barreDeRechercheIngredients.style.display = 'block';
    barreDeRechercheAppareils.style.display = 'none';
    barreDeRechercheUstensiles.style.display = 'none';
    appareilsSelection.style.display = 'none';
    ustensilesSelection.style.display = 'none';
});

/**
 * ouvre et ferme les tags appareils
 */

rechercheAppareils.addEventListener('click', () => {
    ingredientList.style.display = 'none';
    barreDeRechercheIngredients.style.display = 'none';
    barreDeRechercheAppareils.style.display = 'block';
    barreDeRechercheUstensiles.style.display = 'none';
    appareilsSelection.style.display = 'block';
    ustensilesSelection.style.display = 'none';
});

/**
 * ouvre et ferme les tags ustensiles
 */

rechercheUstensiles.addEventListener('click', () => {
    ingredientList.style.display = 'none';
    barreDeRechercheIngredients.style.display = 'none';
    barreDeRechercheAppareils.style.display = 'none';
    barreDeRechercheUstensiles.style.display = 'block';
    appareilsSelection.style.display = 'none';
    ustensilesSelection.style.display = 'block';
});

function generateNameList(recipeArray) {
    let nameList = [];
    recipeArray.forEach((recipe) => {
        nameList.push(recipe.name)
    });
    return nameList;
}

const nameList = generateNameList(recipes);
const barreDeRecherche = document.querySelector('.barreDeRecherche');
const buttonLoupe = document.querySelector('.buttonLoupe');

const filtreTexte = (arr, requete) => {
    return arr.filter(el => el.toLowerCase().indexOf(requete.toLowerCase()) !== -1);
}

buttonLoupe.addEventListener('click', () => {
    const resultat = filtreTexte(nameList, barreDeRecherche.value);
    console.log(resultat);
});

/**
 * creation des cards
 */

function factoryCard(recipeArray) {
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

factoryCard(recipes);
getInfoForTags(recipes);