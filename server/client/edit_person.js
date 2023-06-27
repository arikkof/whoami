function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  
}
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";

}

function setPerson(data) {
  const nameInput = document.getElementById('name');
  nameInput.value = person_name;
  const nameData = data[person_name][0]; // Accessing the object within the specified name array
  const ageInput = document.getElementById('age');
  const genderInput = document.getElementById('gender');
  const nationalizeInput = document.getElementById('nat');
  ageInput.value = nameData.Agify.age;
  genderInput.value = nameData.Genderize.gender;
  nationalizeInput.value = nameData.Nationalize.country[0].country_name;
}
function getPerson() {
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const nationalize = document.getElementById('nat').value;
  const updatedData = {
    Agify: {
      age: age,
      count: 4,
    },
    Genderize: {
      count: 4,
      gender: gender,
      probability: 1
    },
    Nationalize: {
      country: [
        { country_id: nationalize, probability: 0.248, country_name: nationalize  },
        { country_id: 'DZ', probability: 0.245 },
        { country_id: 'SQ', probability: 0.184 },
        { country_id: 'GR', probability: 0.173 },
        { country_id: 'CL', probability: 0.079 }
      ]
    }
  };
  return updatedData;
}
function putPerson() {
  const data = getPerson();
  const xhr = new XMLHttpRequest()
  xhr.onload = function() {
    if (xhr.status == 200 || xhr.status === 204) {
      location.href = 'index.html'
    } else {
      alert("Saving of person data failed. Status code was " + response.status)
    }
  }
  xhr.open("PUT", "/names/" + person_name)
  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.send(JSON.stringify(data))
}
// patchPerson takes property, which is to be changed (age, gender or country)
function patchPerson(property){
  const xhr = new XMLHttpRequest()
  xhr.onload = function() {
    if (xhr.status == 200 || xhr.status === 204) {
      alert(xhr.responseText);
    } else {
      alert("Changing of person data failed. Status code was " + response.status)
    }
  }
  // retrieve value from corresponding html input element
  let value = null;
  if(property==='age'){
    value = document.getElementById('age').value;
  }
  if(property==='gender'){
    value = document.getElementById('gender').value;
  }
  if(property==='country'){
    value = document.getElementById('nat').value;
  }
  // send out http request containing name, property and new value
  const url = "/names/" + person_name + "/" + property  + "/" + value;
  xhr.open("PATCH", url)
  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.send()
}
const urlParams = new URLSearchParams(window.location.search);
const person_name = urlParams.get('name');
const xhr = new XMLHttpRequest();
xhr.open("GET", "/names/" + person_name);
xhr.onload = function() {
  if (xhr.status === 200) {
    setPerson(JSON.parse(xhr.responseText));
  } else {
    alert("Loading of person data failed. Status was " + xhr.status + " - " + xhr.statusText);
  } 
}
xhr.send()