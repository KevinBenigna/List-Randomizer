window.addEventListener("load", ()=>{

    // To do
    // [ ] Cursor div
    // [X] Each new li has an unique id (select max and add +1 ?)
    // [ ] Select one at random function
    // [ ] ? "Kill" (disable but don't delete) one at random
    // [X] Delete button next to the text added
    // [X] Delete function
    // [X] Add a "Title" for the draw/lottery that you can change
    // [ ] Slider avec limitation de characteres pour le champ ?
    // [ ] ou afficher le nombre de characteres dans le cercle noir avec numéro

    let myForm = document.getElementById("the_form");
    myForm.addEventListener("submit", event => {
        // Prevent the form from submiting/reloading the page
        event.preventDefault();
        addText();
    }, false);

    let addTextButton = document.getElementById("add_text_input");
    addTextButton.addEventListener("click", addText);

    let randomSelectionButton = document.getElementById("random_input");
    randomSelectionButton.addEventListener("click", randomSelection);

    let titleInput = document.getElementById("title_input");
    titleInput.addEventListener("input", updateTitle);

    let titleList = document.getElementById("title_list");

    let textInput = document.getElementById("text_input");

    let textList = document.getElementById("text_list");

    let newLi = "";
    let newDeleteButton = "";
    let maxId = 0; // id of the last <li> next one will be +1

    // Function that update the title <h1>
    function updateTitle(){
        titleList.innerText = titleInput.value;
        // console.log(titleInput.value);
    }

    // Function that add the text into the list
    function addText(){
        // If the string is empty we don't add the value
        if(textInput.value){
            maxId++;
            // We create a new <li>  that will containt a span with the content
            // of the text field and add it to the <ul>
            newLi = document.createElement("li");
            newLi.id = "li_"+maxId;
            textList.appendChild(newLi);
            newSpan = document.createElement("span");
            newSpan.textContent = textInput.value;
            newLi.appendChild(newSpan);
            // We reset the value of the field once it's added
            textInput.value = "";
            addDeleteButton(maxId);
        }
    }

    function addDeleteButton(maxId){
        newDeleteButton = document.createElement("input");
        newDeleteButton.type = "button";
        newDeleteButton.id = "li_delete_"+maxId;
        newDeleteButton.classList.add("button_delete");
        // newDeleteButton.addEventListener("click", deleteText(maxId));
        newDeleteButton.onclick = function (){ deleteText(maxId);} ;
        //newDeleteButton.value = "X"; // marche mais il aime pas donc j'aime pas
        document.getElementById("li_"+maxId).appendChild(newDeleteButton);
        document.getElementById("li_delete_"+maxId).value = "X";
    }
    
    function deleteText(maxId){
        let liToRemove = document.getElementById("li_"+maxId);
        textList.removeChild(liToRemove);
        console.log("Removed "+maxId);
    }

    function randomSelection(){
        // We don't do anything if there are no li/text
        if(textList.childElementCount!=0){
            // We remove the class from the elements that are there
            for(i=0; i < textList.childElementCount; i++){
                textList.children[i].classList.remove("random_selected");
            }
            
            // We choose a number from 0 to the number of li-1 and add a class to the child
            let randomTextSelected = (Math.floor(Math.random()*textList.childElementCount));
            // Delay so it refresh the animation properly if it's the same <li>
            setTimeout(() => {
                textList.children[randomTextSelected].classList.add("random_selected");
            }, 1);
            
            console.log("selected child : "+randomTextSelected);
        }
    }

    function removeRandomText(){
        console.log(textList.childElementCount);
        let leremove = (Math.floor(Math.random()*textList.childElementCount));
        textList.removeChild(textList.children[leremove]);
        console.log("removed child : "+leremove);
    }
})