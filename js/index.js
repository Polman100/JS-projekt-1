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
const spanIncomeTotal = getElement("income-total");
const spanOutcomeTotal = getElement("outcome-total");
const remainingBudget = getElement("available-budget")


// declarations

let incomeArray = []
let outcomeArray = []

// functions

const addNewObjectToArray = (text, value, array, number) => {
    const object = {
        id: nanoid(),
        name: text,
        amount: value,
        type: number,
    };
    array.push(object);
};

const removeObjectFromArray = (id, array) => {
    if (array[0].type == "income") {
        const newArray = incomeArray.filter((item) => item.id !== id);
        incomeArray = newArray;
        calculateIncome();
        console.log(incomeArray, id, array);
    } else if (array[0].type == "outcome") {
        const newArray = outcomeArray.filter((item) => item.id !== id);
        outcomeArray = newArray;
        calculateOutcome();
    }   
}

const editObjectInArray = (id, array, newText, newValue) => {
    console.log(array, incomeArray)
    console.log(array[0].type)
    if (array[0].type == "income") {
        array.find((item) => item.id == id).name = newText;
        array.find((item) => item.id == id).amount = newValue;
        // objectBeingEdited.name = newText;
        // objectBeingEdited.value = newValue;
        createLi(incomeList, incomeArray);
        console.log(incomeArray);
    } else if (array[0].type == "outcome") {
        array.find((item) => item.id == id).name = newText;
        array.find((item) => item.id == id).amount = newValue;
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
    });
    calculateIncome();
    calculateOutcome();
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
        // console.log(item.id, array)
    });
} 
//  createDeleteButton(item, listItem, array);  

const calculateIncome = () => {
    const incomeArrayNumbers = incomeArray.map(item => parseInt(item.amount, 10));
    // console.log(incomeArrayNumbers);
    const incomeTotal = incomeArrayNumbers.reduce((prev, next) => prev + next, 0);
    console.log(incomeTotal)
    spanIncomeTotal.innerText = incomeTotal
    return incomeTotal
}

const calculateOutcome = () => {
    const outcomeArrayNumbers = outcomeArray.map(item => parseInt(item.amount, 10));
    // console.log(outcomeArrayNumbers);
    const outcomeTotal = outcomeArrayNumbers.reduce((prev, next) => prev + next, 0);
    console.log(outcomeTotal)
    spanOutcomeTotal.innerText = outcomeTotal
    return outcomeTotal
}

const calculateBudget = (income, outcome) => {
    const result = income - outcome;
    if (result > 0) {
        remainingBudget.innerText = "Możesz jeszcze wydać " + result;
    } else if (result < 0) {
        remainingBudget.innerText = "Jesteś na minusie " + result;
    } else {
        remainingBudget.innerText = "Bilans wynosi zero";
    };
}

// events

document.addEventListener("DOMContentLoaded", function() {
    // addIncome;
    // addOutcome;
    calculateIncome(); 
    calculateOutcome();
    // calculateBudget(incomeTotal, outcomeTotal)
})

incomeButton.addEventListener("click", (e) => {
    e.preventDefault();

    addNewObjectToArray(incomeName.value, incomeValue.value, incomeArray, "income");
   
    createLi(incomeList, incomeArray);
    console.log(incomeArray);

});

outcomeButton.addEventListener("click", (e) => {
    e.preventDefault();

    addNewObjectToArray(outcomeName.value, outcomeValue.value, outcomeArray, "outcome");

    createLi(outcomeList, outcomeArray);
    console.log(outcomeArray);

});
