document.addEventListener('DOMContentLoaded', () => {
  //fetch - get On page load, render a list of already registered dogs in the table.
  //  - The dog should be put on the table as a table row. The HTML might look something like this
  //  - <tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>
  fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(data => displayDogs(data))

  const tableBody = document.getElementById('table-body')

  const displayDogs = (data) => {
    data.forEach((dog) => {
      let dogTr = document.createElement('tr')
      dogTr.dataset.id = dog.id
      dogTr.innerHTML = renderDog(dog)
      tableBody.appendChild(dogTr)
    })
  }

  const renderDog = (dog) => {
    return `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button>Edit</button></td>
    `
  }

  // Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.

  tableBody.addEventListener('click', e => {
    if( e.target.innerText === "Edit") {
      let nameInput = document.querySelector('input[type="name"]')
      let breedInput = document.querySelector('input[type="breed"]')
      let sexInput = document.querySelector('input[type="sex"]')
      let submit_button = document.querySelector('input[type="submit"]')
      let name = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText
      let breed = e.target.parentElement.previousElementSibling.previousElementSibling.innerText
      let sex = e.target.parentElement.previousElementSibling.innerText
      let dog_id = e.target.parentElement.parentElement.getAttribute("data-id")
      nameInput.value = name
      breedInput.value = breed
      sexInput.value = sex
      submit_button.addEventListener('click', () => {
        patchRequest(dog_id)
      })
    }
  })

  // fetch - patch On submit of the form,
  //  - a PATCH request should be made to http://localhost:3000/dogs/:id
  //  - to update the dog information (including name, breed and sex attributes).
  const patchRequest = (dog_id) => {
    let nameInput = document.querySelector('input[type="name"]')
    let breedInput = document.querySelector('input[type="breed"]')
    let sexInput = document.querySelector('input[type="sex"]')
    fetch(`http://localhost:3000/dogs/${dog_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: nameInput.value,
        breed: breedInput.value,
        sex: sexInput.value
      })
    })
      .then(res => res.json())
      .then(console.log)
  }


  // Once the form is submitted, the table should reflect the updated dog information.
  // You can either use the response from the PATCH request for this or use optimistic rendering.
  // This means you can update the frontend before you have gotten the response from the backend.


  // In order to locate one row on the DOM and update specific data cells within it,
  // you may need to assign id and or class values to locate each attribute.
})
