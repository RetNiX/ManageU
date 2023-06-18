import Action from "../js/Action.js";
import ActionManager from "../js/ActionManager.js";
/* Creating a actionmanager object */
let manager = new ActionManager();

/* Refreshes all the table content when updating everything */
function showActions() {
    document.getElementById("tableData").innerHTML = "";
    for (let action of manager.actions) {
        document.getElementById("tableData").innerHTML += `<tr class=${action.type == "income" ? "table-success" : "table-danger"}><td>${action.description}</td><td>${action.amount}</td><td><i id="icon" class="fa-solid fa-pen-to-square" onclick="updateAction(${action.id})" style="color: #5188e6;"></i></td><td><i id="icon" class="fa-solid fa-trash-can" onclick="deleteAction(${action.id})" style="color: #5188e6;"></i></td></tr>`;
    }
}
/* Updating actions each time you click ADD */
window.addNewAction = function (){
        /* Taking the values from the form */
        let type = document.getElementById("typeBalance").value;
        let desc = document.getElementById("desc").value;
        let amount = +document.getElementById("amount").value;
        /* Creating Action object */
        let newAction = new Action(type,desc,amount);
        /* Send to method addAction */
        manager.addAction(newAction);
        showNewAction();
        console.log(manager.actions);
        /* Local Storage Adding */
        var serializedTransactionJSON = JSON.stringify(newAction);
        localStorage.setItem(`Transaction${newAction.id}`, serializedTransactionJSON);
}
/* Everytime we add a new Action, we add/remove 1 row instead using showActions */
function showNewAction() {
    document.getElementById("tableData").innerHTML += `<tr class=${manager.actions[manager.actions.length - 1].type == "income" ? "table-success" : "table-danger"}><td>${manager.actions[manager.actions.length - 1].description}</td><td>${manager.actions[manager.actions.length-1].amount}</td><td><i id="icon" class="fa-solid fa-pen-to-square" onclick="updateAction(${manager.actions[manager.actions.length-1].id})" style="color: #5188e6;"></i></td><td><i id="icon" class="fa-solid fa-trash-can" onclick="deleteAction(${manager.actions[manager.actions.length-1].id})" style="color: #5188e6;"></i></td></tr>`;
}

/* Function for editing the amount of a selected action */
window.updateAction = function (id) {
    let newAmount = prompt("Enter the new amount:");
    if (newAmount == null || newAmount == "" || newAmount != +newAmount) { alert("Something went Wrong...!")
    } else {
        manager.updateAction(id, +newAmount);
        showActions();
    }
    /* Local Storage Edit */
    let tempStore = JSON.parse(localStorage.getItem(`Transaction${id}`));
    tempStore.amount = +newAmount;
    localStorage.setItem(`Transaction${id}`,JSON.stringify(tempStore));
}
/* Function for deleting a selected Action */
window.deleteAction = function (id) {
    if(confirm("Are you sure?") == true) {
        manager.deleteAction(id);
        showActions();
        setTimeout(() => {
            alert("The transaction has been REMOVED.");
        }, 150);
    }
    /* Local Storage Removal */
    localStorage.removeItem(`Transaction${id}`);
}

window.disableSelect = function() {
    var dropDown = document.getElementById("typeBalance").value;
    var btn = document.getElementById("addBtn");
    if (dropDown == "not") {
        btn.disabled = true;
        btn.style.cursor = "not-allowed"
    }
    else {
        btn.disabled = false;
        btn.style.cursor = "pointer";
    }
}
window.onload = disableSelect();
