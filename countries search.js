let searchInputEl = document.getElementById("searchInput");
let resultCountriesEl = document.getElementById("resultCountries");
let loadingEl = document.getElementById("spinner");

let searchInputValue = "";
let countriesList = []

function createAndAppendCountry(country) {
    //1.
    let countryEl = document.createElement("div");
    countryEl.classList.add("country-card", "d-flex", "flex-row", "col-11", "col-md-5", "mr-auto", "ml-auto");
    resultCountriesEl.appendChild(countryEl);
    //2.
    let countryFlagEl = document.createElement("img");
    countryFlagEl.src = country.flag;
    countryFlagEl.classList.add("country-flag", "mt-auto", "mb-auto");
    countryEl.appendChild(countryFlagEl);
    //3.
    let countryInfoEl = document.createElement("div");
    countryInfoEl.classList.add("d-flex", "flex-column", "ml-4");
    countryEl.appendChild(countryInfoEl);
    //4.
    let countryNameEl = document.createElement("p");
    countryNameEl.classList.add("country-name");
    countryNameEl.textContent = country.name;
    countryInfoEl.appendChild(countryNameEl);
    //5.
    let countryPopulationEl = document.createElement("p");
    countryPopulationEl.classList.add("country-population");
    countryPopulationEl.textContent = country.population;
    countryInfoEl.appendChild(countryPopulationEl);
}

function displayResults() {
    for (let country of countriesList) {
        let countryName = country.name;
        if (countryName.toLowerCase().includes(searchInputValue.toLowerCase())) {
            createAndAppendCountry(country);
        }
    }
}

function onStatusSearchInput(event) {
    searchInputValue = searchInputEl.value;

    resultCountriesEl.textContent = "";

    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    };
    loadingEl.classList.toggle("d-none");
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            loadingEl.classList.toggle("d-none");
            countriesList = jsonData;
            displayResults();
        });
}
onStatusSearchInput();
searchInputEl.addEventListener("keyup", onStatusSearchInput);