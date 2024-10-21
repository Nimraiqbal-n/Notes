
showNotes();

// Add event listener for the "Save note" button
let addBtn = document.getElementById('addbtn');
addBtn.addEventListener('click', function () {
    let addTxt = document.getElementById('addtxt');
    let notes = localStorage.getItem('notes');
    
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    
    notesObj.push(addTxt.value); 
    localStorage.setItem('notes', JSON.stringify(notesObj)); // Store updated notes in local storage
    addTxt.value = ''; 
    showNotes(); 
});

// Function to display notes from local storage
function showNotes() {
    let notes = localStorage.getItem('notes');
    
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    //this.id(when the button is clicked,it will calls the delete note function)
    let html = '';
    notesObj.forEach(function (element, index) {
        html += `
            <div class="card my-2 mx-2 notecard" style="width: 18rem;"> <!-- Add 'notecard' class -->
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button> 
                </div>
            </div>`;
    });
    
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Save note" section above to add notes.`;
    }
}
//Function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    
    notesObj.splice(index, 1); 
    localStorage.setItem('notes', JSON.stringify(notesObj)); 
    showNotes(); 
}

// Search function
let search = document.getElementById('searchTxt');
console.log('searching value!!!')
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase(); 
    
    let notecards = document.getElementsByClassName('card');
    Array.from(notecards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase(); 
        
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block"; //Show the card if match
        } else {
            element.style.display = "none"; //Hide the card if no match
        }
    });
});
