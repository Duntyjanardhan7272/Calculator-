let history = [];

function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(tabName).classList.add('active');
    document.querySelector(`.tab-button[onclick="showTab('${tabName}')"]`).classList.add('active');
}

function appendToInput(value) {
    const input = document.getElementById('advanced-input');
    input.value = (input.value === "0") ? value : input.value + value; // Prevent multiple leading zeros
}

function appendToInput(value) {
    const input = document.querySelector('.tab-content.active input');

    // Handling initial '0' and adding valid characters
    if (input.value === "0" && value !== '(' && value !== ')') {
        input.value = value;
    } else {
        input.value += value;
    }
}

function clearInput() {
    document.getElementById('advanced-input').value = "0";
    document.getElementById('advanced-result').innerText = '';
}

function calculateAdvanced() {
    const input = document.getElementById('advanced-input').value;
    try {
        const result = eval(input);
        document.getElementById('advanced-result').innerText = `Result: ${result}`;
        addToHistory(`Advanced: ${input} = ${result}`);
    } catch (error) {
        document.getElementById('advanced-result').innerText = 'Invalid expression';
    }
}

// Adding the backspace function
function backspaceInput() {
    const input = document.querySelector('.tab-content.active input');
    input.value = input.value.slice(0, -1) || '0';  // Remove last character or reset to '0' if empty
}

function appendScientificInput(value) {
    const input = document.getElementById('scientific-input');
    input.value = (input.value === "") ? value : input.value + value; // Prevent multiple leading zeros
}

function clearScientificInput() {
    document.getElementById('scientific-input').value = "";
    document.getElementById('scientific-result').innerText = '';
}

function calculateScientific() {
    const input = document.getElementById('scientific-input').value;
    try {
        const result = eval(input);
        document.getElementById('scientific-result').innerText = `Result: ${result}`;
        addToHistory(`Scientific: ${input} = ${result}`);
    } catch (error) {
        document.getElementById('scientific-result').innerText = 'Invalid expression';
    }
}
function backspaceScientificInput() {
    const input = document.getElementById('scientific-input');
    input.value = input.value.slice(0, -1); // Remove the last character
}


function calculateAge() {
    const birthdate = new Date(document.getElementById('birthdate').value);
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }

    document.getElementById('age-result').innerText = `Age: ${age} years`;
    addToHistory(`Age: ${birthdate.toLocaleDateString()} = ${age} years`);
}

function addToHistory(entry) {
    history.push(entry);
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyContainer = document.getElementById('history');
    historyContainer.innerHTML = ''; // Clear previous history
    history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerText = item;
        historyContainer.appendChild(div);
    });
}

function calculateAdvanced() {
    const input = document.getElementById('advanced-input').value;

    // Validate the expression
    try {
        const result = Function(`'use strict'; return (${input})`)(); // Using Function instead of eval for safety
        if (isNaN(result) || !isFinite(result)) {
            throw new Error("Invalid result");
        }
        document.getElementById('advanced-result').innerText = `Result: ${result}`;
        addToHistory(`Advanced: ${input} = ${result}`);
    } catch (error) {
        document.getElementById('advanced-result').innerText = 'Invalid expression';
    }
}
