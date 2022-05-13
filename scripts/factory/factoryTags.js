import { recipes } from '../../data/recipes.js';

/**
 * creation des tags
 */

 export function getInfoForTags(recipeArray) {
    recipeArray.forEach(element => {

        /**
         * Création des tags d'ingrédients
         */

        function getIngredientsForTags() {
            const ingredientsRecette = element.ingredients;
            ingredientsRecette.forEach(ingredient => {
                const ingredientsForSelection = document.createElement('button');
                ingredientsForSelection.textContent = ingredient.ingredient;
                ingredientsForSelection.classList.add('ingredientForSelection');
                tagsIngredients.appendChild(ingredientsForSelection);
            });
        }


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

        getIngredientsForTags();
        getApplianceForTags();
        getUstensilsForTags();
    });
}
getInfoForTags(recipes);