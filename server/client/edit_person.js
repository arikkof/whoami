function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');

  if (name) {
    const nameInput = document.getElementById('name');
    nameInput.value = name;

    // Fetch the existing person data and pre-fill the form fields with the data
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/names/${name}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
        const nameData = data[name][0]; // Accessing the object within the specified name array

        const ageInput = document.getElementById('age');
        const genderInput = document.getElementById('gender');
        const nationalizeInput = document.getElementById('nat');
        
        ageInput.value = nameData.Agify.age;
        genderInput.value = nameData.Genderize.gender;
        nationalizeInput.value = nameData.Nationalize.country[0].country_id;    
      } else {
        console.error('Error:', xhr.status);
      }
    };
    xhr.onerror = function() {
      console.error('Request failed');
    };
    xhr.send();
  }

  const editForm = document.getElementById('editForm');
  editForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Extract the updated data from the form inputs
    const updatedData = {
      age: document.getElementById('age').value,
      gender: document.getElementById('gender').value,
      nationalize: document.getElementById('nat').value
    };

    // Perform the PUT request to update the person's data
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `/names/${name}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log('Data updated successfully');
        // Perform any necessary actions after successful data update
      } else {
        console.error('Data update failed');
        // Perform any necessary actions in case of update failure
      }
    };
    xhr.onerror = function() {
      console.error('Request failed');
    };
    xhr.send(JSON.stringify(updatedData));
  });
};
