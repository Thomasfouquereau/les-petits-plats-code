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
 export function openClose() {
 
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
 
 }