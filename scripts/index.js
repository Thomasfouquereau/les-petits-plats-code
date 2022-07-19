/**
 * importe les recettes depuis le fichier recipes.js
 */
import { recipes } from '../data/recipes.js';
/**
 * crée les cards des recettes
 */
import { factoryCard } from '../scripts/factory/factoryCard.js';
/**
 * ouvre et ferme les tags
 */
import { openClose } from './utils/closeOpen.js';
import { INGREDIENTS, APPLIANCE, USTENSILS } from "./utils/const.js";

/**
 * @param {Array} recipeArray cree un array des recettes
 */
let tagList = [];
let resultat= [...recipes]

const barreDeRecherche = document.querySelector('.barreDeRecherche');

/**
 * 
 * @param {*} arr tabelau de tags
 * @param {*} requete input de la barre de recherche
 * @returns le rsultat de la recherche dans les tags
 */

const filtreTexte = (arr, requete) => {
    return arr.filter(el => el.toLowerCase().indexOf(requete.toLowerCase()) !== -1);
}

/**
 * 
 * @param {*} recipeArr tableau de recettes
 * @param {*} requete input de la barre de recherche
 * @returns le resultat de la recherche en fonction du titre, de la description et des ingredients
 */

const filtreTexte2 = (recipeArr, requete) => {
    return recipeArr.filter(recipe => recipe.name.toLowerCase().includes(requete.toLowerCase()) || recipe.description.toLowerCase().includes(requete.toLowerCase()) || recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(requete.toLowerCase())));
}

/**
 * function de recherche 
 * @param {*} recherche input de barre de recherche
 */

function recherche(recherche) {
    recherche.addEventListener('input', () => {
        if (recherche.value.length >= 3) {
            resultat = filtreTexte2(recipes, recherche.value);
            // tagList.push({ type: 'resultat', value: recherche.value })
            factoryCard(resultat);
            getInfoForTags(resultat)
            console.log(tagList);
            if (resultat.length === 0) {
                alert('Aucun résultat');
            }
            return resultat
        } if (recherche.value.length <= 2) {
            // let myIndex = tagList.findIndex((tag) => tag.value === recherche.value);
            // if (myIndex !== -1) {
            //     tagList.splice(myIndex, 1);
            // }
            resultat = [...recipes]
            factoryCard(resultat);
            getInfoForTags(resultat)
        }
    });
}

recherche(barreDeRecherche);

/**
 * 
 * @param {*} recipeArray  tableau de recettes
 * @returns un tableau de tags ingredient sans doublons et trié et normalisé
 */

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

/**
 * 
 * @param {*} recipeArray tableau de recettes
 * @returns un tableau de tags appliance sans doublons et trié et normalisé
 */

function generateAppareils(recipeArray) {
    let appareils = [];
    recipeArray.forEach((recipe) => {
        appareils.push(recipe.appliance.toLowerCase())
    });
    return [...new Set(appareils)];
}

const appareils = generateAppareils(recipes);

const barreDeRechercheAppareils = document.querySelector('.barreDeRechercheAppareils');
const rechercheAppareils = document.querySelector('.appareils');

/**
 * 
 * @param {*} recipeArray tableau de recettes
 * @returns un tableau de tags ustensils sans doublons et trié et normalisé
 */

function generateUstensils(recipeArray) {
    let ustensils = [];
    recipeArray.forEach((recipe) => {
        recipe.ustensils.forEach(ustensil => {
            ustensils.push(ustensil.toLowerCase())
        });
    });
    return [...new Set(ustensils)].sort();
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

function getInfoForTags(recipeList) {
    //console.log("test") 
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
                ustensileList.push(ustensileObj.toLowerCase())
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
            ingredientsForSelection.addEventListener('click', (e) => {
                e.preventDefault()
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
                closeTagModal.addEventListener('click', (e) => {
                    e.preventDefault()
                    console.log(e);

                    let myIndex = tagList.findIndex((tag) => tag.value === ing);
                    if (myIndex !== -1) {
                        tagList.splice(myIndex, 1);
                    }
                    console.log(tagList)

                    e.target.parentNode.parentNode.remove()

                    // let filteredRecipes = [...recipes];
                    let filteredRecipes = [...resultat]
                    tagList.forEach((tagObj) => {
                        filteredRecipes = filterByTag(tagObj, filteredRecipes)
                    })

                    factoryCard(filteredRecipes);
                    getInfoForTags(filteredRecipes);
                });
            });
            const filtreTagIng = (recipeArr) => {
                return recipeArr.filter(recipe => recipe.ingredients.some(ingredient => ingredient.ingredient === ing));
            }

            ingredientsForSelection.addEventListener('click', (e) => {
                e.preventDefault()
                const result = filtreTagIng(recipeList, ing);
                tagList.push({ type: 'ingredients', value: ing })
                console.log(tagList);
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
                closeTagModal.addEventListener('click', (e) => {
                    e.preventDefault()
                    console.log(e)

                    let myIndex = tagList.findIndex((tag) => tag.value === app);
                    if (myIndex !== -1) {
                        tagList.splice(myIndex, 1);
                    }
                    console.log(tagList)

                    e.target.parentNode.parentNode.remove()

                    let filteredRecipes = [...resultat];
                    tagList.forEach((tagObj) => {
                        filteredRecipes = filterByTag(tagObj, filteredRecipes)
                    })

                    factoryCard(filteredRecipes);
                    getInfoForTags(filteredRecipes);
                });

            });
            const filtreTagApp = (recipeArr, requete) => {
                return recipeArr.filter(recipe => recipe.appliance.includes(requete));
            }
            applianceForSelection.addEventListener('click', () => {
                tagList.push({ type: 'appliance', value: app })
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
                closeTagModal.addEventListener('click', (e) => {
                    e.preventDefault()
                    console.log(e)

                    let myIndex = tagList.findIndex((tag) => tag.value === ustensils);
                    if (myIndex !== -1) {
                        tagList.splice(myIndex, 1);
                    }
                    console.log(tagList)

                    e.target.parentNode.parentNode.remove()

                    let filteredRecipes = [...resultat];
                    tagList.forEach((tagObj) => {
                        filteredRecipes = filterByTag(tagObj, filteredRecipes)
                    })

                    factoryCard(filteredRecipes);
                    getInfoForTags(filteredRecipes);
                });
            });


            const filtreTagUst = (recipeArr) => {
                return recipeArr.filter(recipe => recipe.ustensils.some(ust => ust.toLowerCase() === ustensils.toLowerCase()));
            }

            ustensilsForSelection.addEventListener('click', () => {
                tagList.push({ type: 'ustensils', value: ustensils })
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

    /**
     * recherche par ingredients
     */

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

    /**
     * recherche par appareils
     */

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

    /**
     * recherche par ustensiles
     */

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





getInfoForTags(resultat);

/**
 * 
 * @param {*} tagObj tag selectionné
 * @param {*} recipeArr tableau de recettes
 * @returns filtre les recettes par tag
 */

function filterByTag(tagObj, recipeArr) {

    let result = 0;

    switch (tagObj.type) {
        case INGREDIENTS:
            result = recipeArr.filter(recipe => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tagObj.value.toLowerCase()))
            break;
        case APPLIANCE:
            result = recipeArr.filter(recipe => recipe.appliance.toLowerCase() === tagObj.value.toLowerCase())
            break;
        case USTENSILS:
            result = recipeArr.filter(recipe => recipe.ustensils.some(ust => ust.toLowerCase() === tagObj.value.toLowerCase()))
            break;
        default:
            break;
    }
    return result
}

// console.log(filterByTag({type: "ingredients", value: "Poulet"}, recipes)) 