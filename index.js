function init() {
  //put any page initialization/handlebars initialization here
  handlebarsSetup();
  initForm();
}

function handlebarsSetup () {
  Handlebars.registerHelper('displayIngredient',function(ingredient) {
    return new Handlebars.SafeString('<li name="ingredientsList">' + ingredient + '</li>')
  })
  Handlebars.registerPartial('recipeFormPartial', document.getElementById('recipe-form-partial').innerHTML)
  Handlebars.registerPartial('recipeDetailsPartial', document.getElementById('recipe-details-partial').innerHTML)
}


function initForm () {
  const formTemplate = document.getElementById('recipe-form-template').innerHTML
  const template = Handlebars.compile(formTemplate)
  document.getElementsByTagName('main')[0].innerHTML = template({'submitAction': 'createRecipe()'})
}

function createRecipe () {
  let recipe = recipeData()
    const recipeTemplate = document.getElementById('recipe-template').innerHTML
    const template = Handlebars.compile(recipeTemplate)
    document.getElementById('main').innerHTML = template(recipe)
  }

  function updateRecipe () {
    let recipe= recipeData();
    let recipeTemplate = document.getElementById('recipe-template').innerHTML
    let template = Handlebars.compile(recipeTemplate)
    document.getElementById('main').innerHTML = template(recipe)
  }

  function recipeData(){
  const ingredientFields = document.getElementsByName('ingredients')
  let ingredients = []
  for(let i = 0; i < ingredientFields.length; i++){ 
    if(ingredientFields[i].value !== "") {
    ingredients.push(ingredientFields[i].value)
  }
  }
  const name = document.getElementById("name").value
  const description = document.getElementById('description').value
  const recipe = {name, ingredients, description}
  return recipe
}

function displayEditForm() {
  let name = document.getElementById("nameDisplay").innerText
  let description = document.getElementById("recipeDescription").innerText
  let ingredientsNodes = document.getElementsByName("ingredientsList")
  let ingredients = []
  for(let i=0;i<ingredientsNodes.length;i++) {
    ingredients.push(ingredientsNodes[i].innerText)
  }
  let recipe = {name, description, ingredients, submitAction: 'createRecipe()'}
  let recipeFormTemplate = document.getElementById("recipe-form-template").innerHTML
  let template = Handlebars.compile(recipeFormTemplate)
  document.getElementById("main").innerHTML = template(recipe)
}

document.addEventListener("DOMContentLoaded", function(event) {
  init()
})
