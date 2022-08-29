const loadMeal = (search) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    fetch (url)
    .then (res => res.json())
    .then (data => displayMeal( data.meals ))
}

const displayMeal = meals => {
    const cardGroup = document.getElementById('card-group');
    cardGroup.innerHTML = '';
    meals.forEach(meal => {
        const div = document.createElement('col');
        div.innerHTML = `
        <div class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
        </div>
        
        <!-- Button trigger modal -->
            <button type="button" onclick="modalOpen(${meal.idMeal})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
            </button>
      </div>
        `
        cardGroup.appendChild(div);
    });
}

const searchFood = food => {
    const searchFieldvalue = document.getElementById('search-field');
    const searchField = searchFieldvalue.value;
    searchFieldvalue.value = '';
    // console.log( searchField );
    loadMeal(searchField);

}

const modalOpen = modals => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${modals}`
    fetch(url)
    .then (res => res.json())
    .then (data => displayModal( data.meals ))
}

const displayModal = openModal => {
    console.log( openModal );
    const exploreModal = document.getElementById('explore-modal');
        exploreModal.innerHTML = `
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${openModal[0].strMeal}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="card">
            <img src="${openModal[0].strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">Food type: ${openModal[0].strCategory}</h5>
            <p class="card-text"><span class="fs-4">About Food:</span> ${openModal[0].strInstructions}</p>
            </div>
        </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
        `
}

loadMeal('fish');