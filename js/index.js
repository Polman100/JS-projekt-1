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

const incomeArray = []
const outcomeArray = []

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

const createElement = (item) => {
    const incomeItem = create("li");
    incomeItem.className = "item-class";
    incomeItem.id = item.id;
    incomeItem.innerText = item.name + " - " + item.amount + "zł";
    incomeList.appendChild(incomeItem);
};


const createLi = () => {
    incomeList.innerHTML = ''
    incomeArray.forEach(item =>{
        createElement(item)
    })
};



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

    createLi();



    // const incomeItem = create("li");
    // incomeItem.className = "item-class";
    // incomeItem.id = nanoId;
    // incomeItem.innerText = incomeName.value + " - ";

    // const incomeItemValue = create("span");        //   <<----- czy to najlepsze podejście?
    // incomeItemValue.innerText = incomeValue.value + "zł";

    const editButton = create("button");
    editButton.innerText = "Edytuj";
    editButton.id = "edit-income";
    editButton.className = "positions-button";
    

    const deleteButton = create("button");
    deleteButton.innerText = "Usuń";
    deleteButton.id = "delete-income";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", (e) => {
        const itemToRemove = getElement(incomeItem.id);
        itemToRemove.remove();                          // <<-- MIND BLOWN, że to działa (nie do końca)
    });                                                 // no i znowu tego nie można rozbić bo czerpie z incomeItem
    // deleteButton.onclick = incomeItem.remove(incomeList);

    
    // appendToElement(incomeItem, incomeItemValue);
    // appendToElement(incomeItem, editButton);
    // appendToElement(incomeItem, deleteButton);
    // appendToElement(incomeList, incomeItem);

    // + incomeValue.Value + "zł";  <<---- ciekawi mnie czemu to wyrzucało undefined przy dodaniu do incomeItem.innerText
});

const addOutcome = outcomeButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("outcomeButton is clicked");
    console.log(outcomeName.value);
    console.log(outcomeValue.value);

    const outcomeItem = create("li");
    outcomeItem.className = "item-class";
    outcomeItem.id = "item-id";
    outcomeItem.innerText = outcomeName.value + " - ";

    const outcomeItemValue = create("span");
    outcomeItemValue.innerText = outcomeValue.value + "zł";

    const editButton = create("button");
    editButton.innerText = "Edytuj";
    editButton.id = "edit-outcome";
    editButton.className = "positions-button";

    const deleteButton = create("button");
    deleteButton.innerText = "Usuń";
    deleteButton.id = "delete-outcome";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", (e) => {
        const itemToRemove = getElement(incomeItem.id);
        itemToRemove.remove();                          // <<-- MIND BLOWN, że to działa
    });
    

    
    appendToElement(outcomeItem, outcomeItemValue);
    appendToElement(outcomeItem, editButton);
    appendToElement(outcomeItem, deleteButton);
    appendToElement(outcomeList, outcomeItem);

});


const calculateIncome = incomeList.addEventListener("change", (e) => {
    console.log("income się zmienił")


});