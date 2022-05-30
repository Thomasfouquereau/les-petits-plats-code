import { recipes } from '../data/recipes.js';
import { factoryCard } from '../scripts/factory/factoryCard.js';
//import { getInfoForTags } from '../scripts/factory/factoryTags.js';
import { openClose } from './utils/closeOpen.js';

let tagList = [
    {
        value: "ail",
        type: "ing"
    },
    {
        value: "four",
        type: "app"
    }
];

const barreDeRecherche = document.querySelector('.barreDeRecherche');

const filtreTexte = (arr, requete) => {
    return arr.filter(el => el.toLowerCase().indexOf(requete.toLowerCase()) !== -1);
}

const filtreTexte2 = (recipeArr, requete) => {
    return recipeArr.filter(recipe => recipe.name.toLowerCase().includes(requete.toLowerCase()) || recipe.description.toLowerCase().includes(requete.toLowerCase()));
}

function recherche(recherche) {
    recherche.addEventListener('input', () => {
        if (recherche.value.length >= 3) {
            const resultat = filtreTexte2(recipes, recherche.value);
            factoryCard(resultat);
            getInfoForTags(resultat)
            console.log(resultat);
            if (resultat.length === 0) {
                alert('Aucun résultat');
            }
            return resultat
        } 
    });
}

recherche(barreDeRecherche);

function generateTags(recipeArray) {
    let tags = [];
    recipeArray.forEach((recipe) => {
        recipe.ingredients.forEach(tag => {
            tags.push(tag.ingredient)
        })
    });
    return [...new Set(tags)];
}

const tags = generateTags(recipes);

const barreDeRechercheIngredient = document.querySelector('.barreDeRechercheIngredients');
const rechercheIngredient = document.querySelector('.ingredients');



function generateAppareils(recipeArray) {
    let appareils = [];
    recipeArray.forEach((recipe) => {
        appareils.push(recipe.appliance)
    });
    return [...new Set(appareils)];
}

const appareils = generateAppareils(recipes);

const barreDeRechercheAppareils = document.querySelector('.barreDeRechercheAppareils');
const rechercheAppareils = document.querySelector('.appareils');





function generateUstensils(recipeArray) {
    let ustensils = [];
    recipeArray.forEach((recipe) => {
        recipe.ustensils.forEach(ustensil => {
            ustensils.push(ustensil)
        });
    });
    return [...new Set(ustensils)];
}

const ustensils = generateUstensils(recipes);

const barreDeRechercheUstensils = document.querySelector('.barreDeRechercheUstensiles');
const rechercheUstensils = document.querySelector('.ustensiles');



openClose()
factoryCard(recipes);




const tagsIngredients = document.querySelector('.ingredientsSelection');
const tagsAppareils = document.querySelector('.appareilsSelection');
const tagsUstensiles = document.querySelector('.ustensilesSelection');
const tag = document.querySelector('.tag');

/**
 * creation des tags
 */

export function getInfoForTags(recipeList) {
    console.log("test") 
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
                    factoryCard(recipes);
                    getInfoForTags(recipes);
                });
            });
            const filtreTagIng = (recipeArr) => {
                return recipeArr.filter(recipe => recipe.ingredients.some(ingredient => ingredient.ingredient === ing));
            }

            ingredientsForSelection.addEventListener('click', () => {
                const result = filtreTagIng(recipeList, ing);
                factoryCard(result);
                getInfoForTags(result);
                console.log(result)
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
                    factoryCard(recipes);
                    getInfoForTags(recipes);
                });

                tagList.push({type: "app", value: app })


            });
            const filtreTagApp = (recipeArr, requete) => {
                return recipeArr.filter(recipe => recipe.appliance.includes(requete));
            }
            applianceForSelection.addEventListener('click', () => {
                const result = filtreTagApp(recipeList, app);
                factoryCard(result);
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
                    factoryCard(recipes);
                    getInfoForTags(recipes);
                });
            });
            

            const filtreTagUst = (recipeArr, requete) => {
                return recipeArr.filter(recipe => recipe.ustensils.includes(requete));
            }

            ustensilsForSelection.addEventListener('click', () => {
                const result = filtreTagUst(recipeList, ustensils);
                factoryCard(result);
                getInfoForTags(result);
                console.log(result)
            });
        })

    }
    getUstensilsForTags(resultUstensile);
    getApplianceForTags(resultAppliance);
    getIngredientsForTags(resultIngredient);

    rechercheIngredient.addEventListener('click', () => {
        barreDeRechercheIngredient.style.display = 'block';
        barreDeRechercheIngredient.addEventListener('input', () => {
            if (barreDeRechercheIngredient.value.length >= 3) {
                const resultatIngredient = filtreTexte(tags, barreDeRechercheIngredient.value);
                getIngredientsForTags(resultatIngredient)
                console.log(resultatIngredient);
                return resultatIngredient
            }
        });
    });

    rechercheAppareils.addEventListener('click', () => {
        barreDeRechercheAppareils.style.display = 'block';
        barreDeRechercheAppareils.addEventListener('input', () => {
            if (barreDeRechercheAppareils.value.length >= 3) {
                const resultatAppareils = filtreTexte(appareils, barreDeRechercheAppareils.value);
                getApplianceForTags(resultatAppareils)
                console.log(resultatAppareils);
                return resultatAppareils
            }
        });
    });

    rechercheUstensils.addEventListener('click', () => {
        barreDeRechercheUstensils.style.display = 'block';
        barreDeRechercheUstensils.addEventListener('input', () => {
            if (barreDeRechercheUstensils.value.length >= 3) {
                const resultatUstensils = filtreTexte(ustensils, barreDeRechercheUstensils.value);
                getUstensilsForTags(resultatUstensils)
                console.log(resultatUstensils);
                return resultatUstensils
            }
        });
    });
}





getInfoForTags(recipes);
