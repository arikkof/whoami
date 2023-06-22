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

  // Make an HTTP GET request to the /search endpoint
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api?name=" + name);
  xhr.send();

  xhr.onload = function() {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);

      // Handle the JSON response
      const resultsDiv = document.getElementById('results');
      const name = Object.keys(data)[0];
      resultData = data[name];

      // Create an HTML representation of the data
      const html = `
        <label>Name: ${name}</label><br>
        <label>Age: ${resultData.Agify.age}</label><br>
        <label>Gender: ${resultData.Genderize.gender}</label><br>
        <label>Nationality: ${resultData.Nationalize.country[0].country_id}</label><br>
      `;

      // Insert the HTML into the resultsDiv
      resultsDiv.innerHTML = html;
const box = document.createElement("ul")
      // Reset the input field value
      nameInput.value = "";
      
      // Add event listener to go back button in the results section
      const backButton = document.createElement("button");
      backButton.textContent = "Go Back";
      backButton.addEventListener("click", () => {
        resultsDiv.style.display = "none"; // Hide the results section
        document.getElementById("center").style.display = "block"; // Show the center section
      });

    const saveButton = document.createElement("button");
     saveButton.textContent = "Save";
     saveButton.addEventListener("click", function(){ sendData(name); });

     resultsDiv.appendChild(backButton);
     resultsDiv.appendChild(saveButton);

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
        console.log("person added successfully");
        console.log(savedPerson);
      } else {
        console.error("Failed to add person");
      }
    };
    addToHistoryXHR.send(JSON.stringify(savedPerson));
}