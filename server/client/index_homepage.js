
const ACCEPT_TYPE_JSON = "application/json";
const ACCEPT_TYPE_XML = "application/xml";
const ACCEPT_TYPE = ACCEPT_TYPE_JSON;

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

let resultData=[];
document.getElementById("search-button").addEventListener("click", () => update_to_results());

function update_to_results(){
  
  const nameInput = document.getElementById("name");
  const name = nameInput.value; // Get the value from the input field

  document.getElementById("center").style.display = "none"; // Hide the center section
  document.getElementById("results").style.display = "block"; // Show the results section
  document.getElementById("chartdiv").style.display ="block";

  // Make an HTTP GET request to the /api endpoint
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api?name=" + name);
  xhr.setRequestHeader('Accept', ACCEPT_TYPE);
  xhr.send();

  xhr.onload = function() {
    if (xhr.status === 200) {
      if(xhr.getResponseHeader('content-type') === "application/xml; charset=utf-8") {
        console.log("Sorry cannot parse XML in browser.");
        return;
      }
      const data = JSON.parse(xhr.responseText);
      // Handle the JSON response
      const resultsDiv = document.getElementById('results');
      const name = Object.keys(data)[0];
      resultData = data[name];

      // Create an HTML representation of the data

      
      const label1 = document.createElement('label');
      label1.className = 'resultsData';
      label1.textContent = 'Name: ' + name;
      resultsDiv.appendChild(label1);

      const label2 = document.createElement('label');
      label2.className = 'resultsData';
      label2.textContent = 'Age: ' + resultData.Agify.age;
      resultsDiv.appendChild(label2);

      const label3 = document.createElement('label');
      label3.className = 'resultsData';
      label3.textContent = 'Gender: ' + resultData.Genderize.gender;
      resultsDiv.appendChild(label3);
      
      //createHiddenLabelsNationality(resultsDiv,resultData);

      
      // Reset the input field value
      nameInput.value = "";
      
      // Add event listener to go back button in the results section
      const backButton = document.createElement("button");
      backButton.textContent = "Go Back";
      backButton.className = "resultsButtons";
      backButton.addEventListener("click", () => {
        resultsDiv.innerHTML ="";
        resultsDiv.style.display = "none"; // Hide the results section
        document.getElementById("center").style.display = "block"; // Show the center section
        document.getElementById("chartdiv").style.display ="none";
      });

    const saveButton = document.createElement("button");
    saveButton.className = "resultsButtons";
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", function(){ sendData(name); });



     resultsDiv.appendChild(backButton);
     resultsDiv.appendChild(saveButton);

     createChart(resultData);

    } else {
      console.log("Request failed. Status: " + xhr.status);
    }
  };

  xhr.onerror = function() {
    console.log("Request failed. Network error.");
  };
}



function sendData(name) {
  const addToHistoryXHR = new XMLHttpRequest();
  const savedPerson = resultData;

  addToHistoryXHR.open("POST", "/names/"+name);
  addToHistoryXHR.setRequestHeader("Content-Type", "application/json");
  addToHistoryXHR.onload = function () {
      if (addToHistoryXHR.status === 200) {
        alert(`\"${name}\" was successfully saved!`);
        console.log(savedPerson);
      } else {
        alert(`\"${name}\" was could not be saved!`)
        console.error("Failed to add person");
      }
    };
    addToHistoryXHR.send(JSON.stringify(savedPerson));
}
/*
function createHiddenLabelsNationality(whereToAdd,apiData){
  for(let i=0;i<5;i++){
      //NATIONALITIES
      const nationalitylabel1_country = document.createElement('label');
      nationalitylabel1_country.className = 'nationalities';
      nationalitylabel1_country.id = 'country'+i+'_id';
      nationalitylabel1_country.textContent = apiData.Nationalize.country[i].country_id;
      whereToAdd.appendChild(nationalitylabel1_country);

      const nationalitylabel1_probability = document.createElement('label');
      nationalitylabel1_probability.className = 'nationalities';
      nationalitylabel1_probability.id = 'country'+i+'_probability';
      nationalitylabel1_probability.textContent = apiData.Nationalize.country[i].probability;
      whereToAdd.appendChild(nationalitylabel1_probability);
  }
}*/