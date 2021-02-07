function searchFood (event) {
    event.preventDefault();
    let keyword = document.getElementById('search').value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
        .then(res => res.json())
        .then(result => setItem(result))
        .catch(err=>console.log(err))
}

function setItem(results) {
    let row = document.getElementById('item');
    let item = '';
    results.meals ? results.meals.map(result => {
       item += `<div class="col-md-3" id="item" onclick="itemDetails(${result.idMeal})">
                    <figure class="figure">
                    <img src="${result.strMealThumb}" class="figure-img img-fluid rounded" alt="...">
                    <figcaption class="figure-caption">${result.strMeal}</figcaption>
                    </figure>
                </div> `      
    }) :  item = `<div class="alert alert-danger" role="alert">
                                You have to search only meal!
                            </div>`;

    if(item !== undefined) {
        row.innerHTML = item;
    }
}

function itemDetails(id) {
    console.log(id);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(result => singleItem(result))
}

function singleItem(result) {
    console.log(result);
    let singleItem = document.getElementById('details');

    singleItem.innerHTML = `
    <div>
        <figure class="figure">
             <img style="width: 400px" src="${result.meals[0].strMealThumb}" class="rounded" alt="...">
            <h2>${result.meals[0].strMeal}</h2>
        </figure>
        <div>
            <h6>
                Ingredients
            </h6>
            <ul class="list-group">
                <li class="list-group-item disabled" aria-disabled="true">${result.meals[0].strMeasure1} ${result.meals[0].strIngredient1}</li>
                <li class="list-group-item disabled" aria-disabled="true">${result.meals[0].strMeasure2} ${result.meals[0].strIngredient2}</li>
                <li class="list-group-item disabled" aria-disabled="true">${result.meals[0].strMeasure3} ${result.meals[0].strIngredient3}</li>
                <li class="list-group-item disabled" aria-disabled="true">${result.meals[0].strMeasure4} ${result.meals[0].strIngredient4}</li>
                <li class="list-group-item disabled" aria-disabled="true">${result.meals[0].strMeasure5} ${result.meals[0].strIngredient5}</li>
                <li class="list-group-item disabled" aria-disabled="true">${result.meals[0].strMeasure6} ${result.meals[0].strIngredient6}</li>
                <li class="list-group-item disabled" aria-disabled="true">${result.meals[0].strMeasure7} ${result.meals[0].strIngredient7}</li>
                <li class="list-group-item disabled" aria-disabled="true">${result.meals[0].strMeasure8} ${result.meals[0].strIngredient8}</li>
            </ul>
        </div>
    </div>`;  
}
