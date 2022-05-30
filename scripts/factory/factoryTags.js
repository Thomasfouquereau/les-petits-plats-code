const tagsIngredients = document.querySelector('.ingredientsSelection');
const tagsAppareils = document.querySelector('.appareilsSelection');
const tagsUstensiles = document.querySelector('.ustensilesSelection');
const tag = document.querySelector('.tag');

/**
 * creation des tags
 */

export function getInfoForTags(recipeList) {

    function generateIngList(recipeArray) {
        let ingList = [];
        recipeArray.forEach((recipe) => {
            recipe.ingredients.forEach(ingredientObj => {
                ingList.push(ingredientObj.ingredient)
            })
        });
        return [...new Set(ingList)].sort();
    }

    const resultIngredient = generateIngList(recipeList);

    function generateAppList(recipeArray) {
        let appList = [];
        recipeArray.forEach((recipe) => {
            appList.push(recipe.appliance)
        });
        return [...new Set(appList)].sort();
    }

    const resultAppliance = generateAppList(recipeList);

    function generateUstensileList(recipeArray) {
        let ustensileList = [];
        recipeArray.forEach((recipe) => {
            recipe.ustensils.forEach(ustensileObj => {
                ustensileList.push(ustensileObj)
            })
        });
        return [...new Set(ustensileList)].sort();
    }

    const resultUstensile = generateUstensileList(recipeList);


    /**
    * Création des tags d'ingrédients
    */

    function getIngredientsForTags(result) {
        tagsIngredients.innerHTML = ""
        result.forEach((ing) => {
            const ingredientsForSelection = document.createElement('button');
            ingredientsForSelection.textContent = ing;
            ingredientsForSelection.classList.add('ingredientForSelection');
            tagsIngredients.appendChild(ingredientsForSelection);
            ingredientsForSelection.addEventListener('click', () => {
                console.log(ing);
                const tagModal = document.createElement('div');
                tagModal.classList.add('tagModal');
                const titleTagModal = document.createElement('h3');
                titleTagModal.classList.add('titleTagModal');
                titleTagModal.textContent = ing;
                tagModal.appendChild(titleTagModal);
                const closeTagModal = document.createElement('button');
                const closeIcon = document.createElement('img');
                closeIcon.setAttribute('src', '../assets/Vector close.svg');
                closeTagModal.appendChild(closeIcon);
                closeTagModal.classList.add('closeTagModal');
                tagModal.appendChild(closeTagModal);
                tag.appendChild(tagModal);
                closeTagModal.addEventListener('click', () => {
                    document.querySelector('.tagModal').remove();
                });
            });
        })
    }

    /**
     * Création des tags d'appareils
     */

    function getApplianceForTags(app) {
        tagsAppareils.innerHTML = ""
        app.forEach((app) => {
            const applianceForSelection = document.createElement('button');
            applianceForSelection.textContent = app;
            applianceForSelection.classList.add('applianceForSelection');
            tagsAppareils.appendChild(applianceForSelection);
            applianceForSelection.addEventListener('click', () => {
                console.log(app);
                const tagModal = document.createElement('div');
                tagModal.classList.add('tagModal1');
                const titleTagModal = document.createElement('h3');
                titleTagModal.classList.add('titleTagModal');
                titleTagModal.textContent = app;
                tagModal.appendChild(titleTagModal);
                const closeTagModal = document.createElement('button');
                const closeIcon = document.createElement('img');
                closeIcon.setAttribute('src', '../assets/Vector close.svg');
                closeTagModal.appendChild(closeIcon);
                closeTagModal.classList.add('closeTagModal');
                tagModal.appendChild(closeTagModal);
                tag.appendChild(tagModal);
                closeTagModal.addEventListener('click', () => {
                    document.querySelector('.tagModal1').remove();
                });

            });
            const filtreTexte2 = (recipeArr, requete) => {
                return recipeArr.filter(recipe => recipe.appliance.includes(requete));
            }
            applianceForSelection.addEventListener('click', () => {
                const result = filtreTexte2(recipeList, app);
                getInfoForTags(result);
                console.log(result)
            });
        })
    }

    /** 
     * Création des tags d'ustensiles
     */

    function getUstensilsForTags(ust) {
        tagsUstensiles.innerHTML = ""
        ust.forEach((ustensils) => {
            const ustensilsForSelection = document.createElement('button');
            ustensilsForSelection.textContent = ustensils;
            ustensilsForSelection.classList.add('ustensilsForSelection');
            tagsUstensiles.appendChild(ustensilsForSelection);
            ustensilsForSelection.addEventListener('click', () => {
                console.log(ustensils);
                const tagModal = document.createElement('div');
                tagModal.classList.add('tagModal2');
                const titleTagModal = document.createElement('h3');
                titleTagModal.classList.add('titleTagModal');
                titleTagModal.textContent = ustensils;
                tagModal.appendChild(titleTagModal);
                const closeTagModal = document.createElement('button');
                const closeIcon = document.createElement('img');
                closeIcon.setAttribute('src', '../assets/Vector close.svg');
                closeTagModal.appendChild(closeIcon);
                closeTagModal.classList.add('closeTagModal');
                tagModal.appendChild(closeTagModal);
                tag.appendChild(tagModal);
                closeTagModal.addEventListener('click', () => {
                    document.querySelector('.tagModal2').remove();
                });
            });
        })

    }
    getUstensilsForTags(resultUstensile);
    getApplianceForTags(resultAppliance);
    getIngredientsForTags(resultIngredient);
}