const main = document.querySelector("main");
const select = document.querySelector("select");
const downloadBtn = document.querySelector("button");

const dataResults = [];

// Load API into page
async function loadAPI() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();

  for (let i = 0; i < Object.keys(data.message).length; i++) {
    loadList(Object.keys(data.message)[i]);
  }

  loadRandom();
}

// Generates a list of Breed and Sub-Breeds from the API
async function loadList(breed) {
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/list`);
  const data = await response.json();

  if (data.message.length === 0) {
    createDropDown(breed);
  } else if (data.message.length !== 0) {
    for (i = 0; i < data.message.length; i++) {
      createDropDown(`${data.message[i]} ${breed}`);
    }
  }
}

// Loads filtered breeds
async function loadBreed(breed) {
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/12`);
  const data = await response.json();

  main.textContent = "";

  for (i = 0; i < data.message.length; i++) {
    createCard(data.message[i], breed);
    dataResults.push({ 
      breed: breed, 
      subBreed: "N/A", 
      url: data.message[i] });
  }
}

// Loads filtered sub-breeds
async function loadSubBreed(breed, subBreed) {
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random/12`);
  const data = await response.json();

  main.textContent = "";

  for (i = 0; i < data.message.length; i++) {
    createCard(data.message[i], `${subBreed} ${breed}`);
    dataResults.push({
      breed: breed,
      subBreed: subBreed,
      url: data.message[i],
    });
  }
}

// Loads random images of dogs on page load
async function loadRandom() {
  const response = await fetch("https://dog.ceo/api/breeds/image/random/12");
  const data = await response.json();

  for (i = 0; i < data.message.length; i++) {
    createCard(data.message[i], `Random Images`);
  }
}

// Creates a drop down list of breed and sub-breeds
function createDropDown(breed) {
  const option = document.createElement("option");

  option.textContent = breed;

  select.add(option);
}

// Creates card images of dogs
function createCard(image, breed) {
  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.classList.add("cardImage");
  img.src = image;

  const fullTitle = `${breed}`;

  const title = document.createElement("p");
  title.classList.add("cardTitle");
  title.textContent = fullTitle;

  main.appendChild(card);
  card.appendChild(img);
  card.appendChild(title);
}

// Event Listeners
function eventListener() {
  select.onchange = function () {
    if (select.value.split(" ").length === 2) {
      const subBreed = select.value.split(" ");

      loadSubBreed(subBreed[1], subBreed[0]);
    } else if (select.value.split(" ").length === 1) {
      loadBreed(select.value);
    }
  };

  downloadBtn.onclick = function () {
    if (dataResults.length === 0) {
      alert("CSV Data is empty, please select a dog breed to store data");
    } else {
      downloadCSV(json2csv.parse(dataResults));
    }
  };
}

// Downloads CSV file
function downloadCSV(csvData) {
  const download = document.createElement("a");

  download.setAttribute("href", `data:text/csv;charset=utf-8,${csvData}`);
  download.setAttribute("download", "dogAPI-list.csv");
  download.style.display = "none";

  document.body.appendChild(download);
  download.click();
  document.body.removeChild(download);
}

loadAPI();
eventListener();
