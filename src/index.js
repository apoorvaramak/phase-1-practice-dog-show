let counter = 1;
document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(data => data.forEach(element => {
        putInTable(element)
        //editButtonPressed(data, element); 
        console.log(element.id); 
        //edit(element.id); 
    }))



})

function putInTable(data){
    let newRow = document.createElement('tr'); 
    newRow.id = `${data.id}`;
    //console.log(newRow.id); 
    let dogName = document.createElement('td');
    let dogBreed = document.createElement('td');
    let dogSex = document.createElement('td');

    let editButton = document.createElement('button'); 


    dogName.textContent = data.name; 
    dogBreed.textContent = data.breed; 
    dogSex.textContent = data.sex; 
    editButton.textContent = 'Edit';
    editButton.id = 'button'; 
    
    newRow.append(dogName, dogBreed, dogSex, editButton);
    document.querySelector("#table-body").append(newRow);

    editButton.addEventListener('click', (e) => {
        //e.preventDefault(); 
        document.querySelector('input[name="name"]').value = data.name; 
        document.querySelector('input[name="breed"]').value = data.breed;
        document.querySelector('input[name="sex"]').value = data.sex;

        edit(data.id); 

        // let form = document.querySelector('#dog-form');
        // form.addEventListener('submit', (event) => {
        //     event.preventDefault();
        //     //console.log(newRow); 
        //     newRow.childNodes[0].innerHTML = event.target[0].value;
        //     newRow.childNodes[1].innerHTML = event.target[1].value; 
        //     newRow.childNodes[2].innerHTML = event.target[2].value;
        

        // })

    })
 
}

function edit(id){
    let form = document.querySelector('#dog-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        //console.log(newRow); 
        fetch(`http://localhost:3000/dogs/${id}`,{
            method: 'PATCH', headers: {'Content-type': 'application/json'}, 
            body: JSON.stringify({
                name: `${event.target[0].value}`,
                breed: `${event.target[1].value}`,
                sex: `${event.target[2].value}`
            }),
        })
        .then(response => response.json())
        .then(data => {
            //document.getElementById(`${id}`).append(data); 
            console.log(document.getElementById(`${id}`))
            console.log(event.target); 
        }); 
    })
    //document.location.reload()
}