window.addEventListener("load", ()=>{

    // Ideas (might not use some)
    // [ ] Bg animation sur la ligne sélectionnée
    // [X] Random order (change the order of the li)
    // [ ] Disable all button for 2 sec after any random is done
    // -- [ ] css gray both
    // -- [ ] js
    // [X] Each new li has an unique id (select max and add +1 ?)
    // [X] Select one at random function
    // [ ] ? "Kill" (disable but don't delete) one at random
    // [X] Delete button next to the text added
    // [X] Delete function
    // [X] Add a "Title" for the draw/lliottery that you can change
    // [ ] Slider avec limitation de characteres pour le champ ?
    // [ ] glisser déposer pour changer l'ordre des li
    // -- [ ] css changer l'icone en main et main qui grab
    // -- [ ] js insertBefore ?
    // [ ] Empty gray li saying "add new" and when we click on it and you can fill then validate ? (mobile ?)

    let titleForm = document.getElementById("title_form");
    titleForm.addEventListener("submit", event => {
        event.preventDefault(); // Prevent the form from submiting/reloading the page
        textInput.focus();
    }, false);


    let theForm = document.getElementById("the_form");
    theForm.addEventListener("submit", event => {
        event.preventDefault(); // Prevent the form from submiting/reloading the page
        addText();
    }, false);

    let addTextButton = document.getElementById("add_text_input");
    addTextButton.addEventListener("click", addText);

    let randomPickButton = document.getElementById("random_pick_input");
    randomPickButton.addEventListener("click", randomPick);

    let randomOrderButton = document.getElementById("random_order_input");
    randomOrderButton.addEventListener("click", randomOrder);

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

    function randomPick(){
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
    
    function randomOrder(){
        // Inspired from Fisher and Yate random method
        console.log(textList.childElementCount);
        totalElements = textList.childElementCount;
        // if 4 element we random from 0 to 3 and then insert the li before the first li
        // Then the 2nd element we random between 0 to 2 and insert before the second li, etc
        for(i = totalElements; i > 0; i--){
            let randomTextSelected = (Math.floor(Math.random()*i))+(totalElements-i);
            console.log("random number : "+randomTextSelected);
            textList.insertBefore(textList.children[randomTextSelected], textList.children[(totalElements-i)]);
        }
    }

    function removeRandomText(){
        console.log(textList.childElementCount);
        let leremove = (Math.floor(Math.random()*textList.childElementCount));
        textList.removeChild(textList.children[leremove]);
        console.log("removed child : "+leremove);
    }
})