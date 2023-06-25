
import { Root, Legend } from '@amcharts/amcharts5';
import { XYChart, ValueAxis, AxisRendererY, CategoryAxis, AxisRendererX, ColumnSeries, XYCursor } from '@amcharts/amcharts5/xy';

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

  // Make an HTTP GET request to the /api endpoint
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

      const label4 = document.createElement('label');
      label4.className = 'resultsData';
      label4.textContent = 'Nationality: ' + resultData.Nationalize.country[0].country_id;
      resultsDiv.appendChild(label4);

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
      });

    const saveButton = document.createElement("button");
    saveButton.className = "resultsButtons";
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", function(){ sendData(name); });

    createChart(resultData);


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
        alert(`\"${name}\" was successfully saved!`);
        console.log(savedPerson);
      } else {
        alert(`\"${name}\" was could not be saved!`)
        console.error("Failed to add person");
      }
    };
    addToHistoryXHR.send(JSON.stringify(savedPerson));
}

function createChart(apiData){
  var root = Root.new("chartdiv"); 
  var chart = root.container.children.push( 
  XYChart.new(root, {
    panY: false,
    layout: root.verticalLayout
    }) 
  );

  var data = [{ 
    category: apiData.Nationalize.country[0].country_id, 
    value1: apiData.Nationalize.country[0].probability
  }, { 
    category: apiData.Nationalize.country[1].country_id, 
    value1: apiData.Nationalize.country[1].probability
  }, { 
    category: apiData.Nationalize.country[2].country_id, 
    value1: apiData.Nationalize.country[2].probability
  }, { 
    category: apiData.Nationalize.country[3].country_id, 
    value1: apiData.Nationalize.country[3].probability
  }, { 
    category: apiData.Nationalize.country[4].country_id, 
    value1: apiData.Nationalize.country[4].probability   
  }];

  var yAxis = chart.yAxes.push( 
    ValueAxis.new(root, { 
      renderer: AxisRendererY.new(root, {}) 
    }) 
  );

  var xAxis = chart.xAxes.push(
    CategoryAxis.new(root, {
      renderer: AxisRendererX.new(root, {}),
      categoryField: "category"
    })
  );
  xAxis.data.setAll(data);

  var series1 = chart.series.push( 
    ColumnSeries.new(root, { 
      name: "Nationality", 
      xAxis: xAxis, 
      yAxis: yAxis, 
      valueYField: "value1", 
      categoryXField: "category" 
    }) 
  );
  series1.data.setAll(data);

  var legend = chart.children.push(Legend.new(root, {})); 
  legend.data.setAll(chart.series.values);

  // Add cursor
  chart.set("cursor", XYCursor.new(root, {}));

}