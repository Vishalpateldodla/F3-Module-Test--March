// API endpoint
const apiEndpoint = "https://api.nasa.gov/planetary/apod";
// Replace this with your own API key obtained from NASA
const apiKey = "FphSTaafGg7S8nidtZbyojZm9jFLNjF7fmoynXRg";

// Get the HTML elements
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const currentImageContainer = document.getElementById("current-image-container");
const searchHistoryList = document.getElementById("search-history");

// Add event listener for form submission
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const date = searchInput.value;
  getImageOfTheDay(date);
});

// Function to fetch the current image of the day and display it in the UI
function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  getImageOfTheDay(currentDate);
}

// Function to fetch the image of the day for the selected date and display it in the UI
function getImageOfTheDay(date) {
  const url = `${apiEndpoint}?date=${date}&api_key=${apiKey}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayImage(data, date);
      saveSearch(date);
      addSearchToHistory();
    })
    .catch((error) => {
      console.log(error);
    });
}

// Function to display the image data in the UI
function displayImage(data, searchedDate) {
  currentImageContainer.innerHTML = `
  <h3 style="color: white; background-color: black; padding: 10px; margin: 0px">Searched Date: ${searchedDate}</h3>
    
    <img style="width:100%; height: 600px; display: flex ; color: white; background-color: black; margin: 0px padding: 0px;" src="${data.url}" alt="${data.title}">
    <h2 style="color: white; background-color: black; padding: 10px; margin: 0px">${data.title}</h2>
    <p style="color: white; background-color: black; padding: 10px; margin: 0px">${data.explanation}</p>
  `;
}

// Function to save the search date to local storage
function saveSearch(date) {
  const searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));
}

// Function to add the search date to the search history list in the UI
function addSearchToHistory() {
  const searches = JSON.parse(localStorage.getItem("searches")) || [];
  searchHistoryList.innerHTML = "";
  for (let i = 0; i < searches.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = searches[i];
    listItem.addEventListener("click", () => {
      getImageOfTheDay(searches[i]);
    });
    searchHistoryList.appendChild(listItem);
  }
}

// Display the current image of the day when the page loads
getCurrentImageOfTheDay();
// Display the search history list when the page loads
addSearchToHistory();
