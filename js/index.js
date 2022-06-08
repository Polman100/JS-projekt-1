import { nanoid } from './nanoid.js'

// helper function
const qs = (s) => document.querySelector(s);
const getElement = (s) => document.getElementById(s);
const create = (s) => document.createElement(s);
const appendToElement = (x, s) =>  x.appendChild(s);

// DOM

const incomeButton = getElement("button-income");
const outcomeButton = getElement("button-outcome");
const incomeName = getElement("income-name");
const incomeValue = getElement("income-value");
const outcomeName = getElement("outcome-name");
const outcomeValue = getElement("outcome-value");
const incomeList = getElement("income-list");
const outcomeList = getElement("outcome-list");


// declarations

let incomeArray = []
let outcomeArray = []

// let nanoId = nanoid()

// functions

const addNewObjectToArray = (text, value, array) => {
    const object = {
        id: nanoid(),
        name: text,
        amount: value,
    };
    array.push(object);
};

const removeObjectFromArray = (id, array) => {
    if (array = incomeArray) {
        const newArray = array.filter((item) => item.id !== id);
        incomeArray = newArray;
    }
    if (array = outcomeArray) {
        const newArray = array.filter((item) => item.id !== id);
        outcomeArray = newArray;
    }   
}

const editObjectInArray = (id, array, newText, newValue) => {
    if (array = incomeArray) {
        const newArray = array.filter((item) => item.id !== id);
        incomeArray = newArray;
    }
    if (array = outcomeArray) {
        array.find((item) => item.id == id).name = newText;
        array.find((item) => item.id == id).amount = newValue;
        console.log(outcomeArray);
        // objectBeingEdited.name = newText;
        // objectBeingEdited.value = newValue;
        createLi(outcomeList, outcomeArray);
    }   
    
    // if (array = outcomeArray) {
    //     array.find((item) => item.id == id);
    //     let properties = {
    //         "name": newText,
    //         "value": newValue,
    //     };
    //     createLi(outcomeList, outcomeArray)
    // }   
} 



const createIncomeElement = (item, list, array) => {
    const listItem = create("li");
    listItem.className = "item-class";
    listItem.id = item.id;
    listItem.innerText = item.name + " - " + item.amount + "zł";
    list.appendChild(listItem);

    createEditButton(item, listItem, array, item.name, item.amount);
    createDeleteButton(item, listItem, array);
};


const createLi = (list, array) => {
    list.innerHTML = ''
    array.forEach(item => {
        createIncomeElement(item, list, array);
    })
};

const createEditButton = (item, parent, array, previousName, previousValue) => {
    const editButton = create("button");
    editButton.innerText = "Edytuj";
    editButton.id = item.id;
    editButton.className = "positions-button";
    parent.appendChild(editButton);
    editButton.addEventListener("click", (e) => {
        e.preventDefault();
        // console.log(item.id);
        const itemToEdit = getElement(item.id);
        console.log(itemToEdit);
        itemToEdit.innerText = '';
        const editForm = create("form");
        editForm.className = "edit-form"
        const editFormTextField = create("input");
        editFormTextField.id = "edit-name";
        editFormTextField.type = "text"
        editFormTextField.className = "edit-text-field"
        editFormTextField.value = previousName
        const editFormValueField = create("input");
        editFormValueField.id = "edit-value";
        editFormValueField.type = "number"
        editFormValueField.className = "edit-value-field"
        // console.log(previousValue)
        editFormValueField.value = previousValue
        editForm.append(editFormTextField, editFormValueField);
        // saveButton
        const saveButton = create("button")
        saveButton.innerText = "Zapisz"
        saveButton.id = item.id
        saveButton.className = "save-button";
        saveButton.addEventListener("click", (e) => {
            e.preventDefault();
            const newText = getElement("edit-name")
            const newValue = getElement("edit-value")
            editObjectInArray(item.id, array, newText.value, newValue.value);

        });

        itemToEdit.append(editForm, saveButton)
        
        
        // itemToEdit.removeChild(button.className = "positions-button");

        

    })
};

const createDeleteButton = (item, parent, array) => {
    const deleteButton = create("button");
    deleteButton.innerText = "Usuń";
    deleteButton.id = item.id;
    deleteButton.className = "delete-button";
    parent.appendChild(deleteButton)
    deleteButton.addEventListener("click", (e) => {
        const itemToRemove = getElement(parent.id);
        itemToRemove.remove();                          // <<-- MIND BLOWN, że to działa (nie do końca)
        removeObjectFromArray(item.id, array);
        console.log(item.id, array)
    });
}   


// events

document.addEventListener("DOMContentLoaded", function() {
    addIncome;
    addOutcome;
    calculateIncome; // <<--- jak stworzyć funkcję, która będzie liczyła sumę na bieżąco, niezależnie od tego co się zmieni
    // calculateOutcome;
})

const addIncome = incomeButton.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log("incomeButton is clicked");
    console.log(incomeName.value);
    console.log(incomeValue.value);

    addNewObjectToArray(incomeName.value, incomeValue.value, incomeArray);
    console.log(incomeArray);

    createLi(incomeList, incomeArray);

});

const addOutcome = outcomeButton.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log("outcomeButton is clicked");
    // console.log(outcomeName.value);
    // console.log(outcomeValue.value);

    addNewObjectToArray(outcomeName.value, outcomeValue.value, outcomeArray);
    console.log(outcomeArray);

    createLi(outcomeList, outcomeArray);



    // const outcomeItem = create("li");
    // outcomeItem.className = "item-class";
    // outcomeItem.id = "item-id";
    // outcomeItem.innerText = outcomeName.value + " - ";

    // const outcomeItemValue = create("span");
    // outcomeItemValue.innerText = outcomeValue.value + "zł";

    // const editButton = create("button");
    // editButton.innerText = "Edytuj";
    // editButton.id = "edit-outcome";
    // editButton.className = "positions-button";

    // const deleteButton = create("button");
    // deleteButton.innerText = "Usuń";
    // deleteButton.id = "delete-outcome";
    // deleteButton.className = "delete-button";
    // deleteButton.addEventListener("click", (e) => {
    //     const itemToRemove = getElement(incomeItem.id);
    //     itemToRemove.remove();                          // <<-- MIND BLOWN, że to działa
    // });
    

    
    // appendToElement(outcomeItem, outcomeItemValue);
    // appendToElement(outcomeItem, editButton);
    // appendToElement(outcomeItem, deleteButton);
    // appendToElement(outcomeList, outcomeItem);

});


const calculateIncome = incomeList.addEventListener("change", (e) => {
    console.log("income się zmienił")


});