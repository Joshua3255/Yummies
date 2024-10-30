import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

/////////////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return; // Guard class
    recipeView.renderSpinner();

    // 1. Loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();

//showRecipe();

//https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=33e58c7b-12b7-4662-b17c-8c5978e7065c
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
