function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  
window.onload = function () {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status === 200) {
        const results = JSON.parse(xhr.responseText);
  
        const search_history = document.getElementById("search_history_list");
        const list_header = document.createElement("tr");

        const name_header = document.createElement("td");
        name_header.textContent = "Name";

        const edit_header = document.createElement("td");
        edit_header.textContent = "edit";

        const delete_header = document.createElement("td");
        delete_header.textContent = "delete";

        list_header.appendChild(name_header);
        list_header.appendChild(edit_header);
        list_header.appendChild(delete_header);

        search_history.appendChild(list_header);

        if (Object.keys(results).length === 0) {
          console.log("No data");
        } else {
          for (const [name] of Object.entries(results)) {
            const listItem = document.createElement("tr");
  
            const nameCell = document.createElement("td");
            nameCell.textContent = name;
  
            const editCell = document.createElement("td");
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.addEventListener("click",  function(){ edit_person(name); });
            editCell.appendChild(editButton);
  
            const deleteCell = document.createElement("td");
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click",  function(){ delete_person(name); });
            deleteCell.appendChild(deleteButton);
  
            listItem.appendChild(nameCell);
            listItem.appendChild(editCell);
            listItem.appendChild(deleteCell);
  
            search_history.appendChild(listItem);
          }
        }
      }
    };
  
    xhr.open("GET", "/names");
    xhr.send();
  };

  function delete_person(name) {
    fetch(`/names/${encodeURIComponent(name)}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        console.log("Person deleted:", name);
    
        // Refresh the page or update the UI as needed
        location.reload(); // Reloads the page to reflect the updated data
      } else {
        console.log("Failed to delete person:", name);
      }
    })
    .catch(error => {
      console.log("Error deleting person:", error);
    });
  }
  
  
  
  function edit_person(name){
    window.location.href = `/edit_person.html?name=${encodeURIComponent(name)}`;
  }

  