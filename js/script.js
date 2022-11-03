"use strict"
class TodoList {
    constructor(task, condition) {
        this.task = task;
        if (!condition) {
            this.condition = false;
        }
        else {
            this.condition = condition;
        }
    }

    getCondition() { return this.condition; };
    getTask() { return this.task; };
}

function Comparison(elementValue) {
    for (let i = 0; i < Elements.length; i++) {
        if (Elements[i].task == elementValue) {
            return i;
        }
    }
    return -1;
}

let type = 0;
function printElements() {
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            if (type === i) {
                return 0;
            }
            else {
                type = i;
                break;
            }
        }
    }
    elements.innerHTML = ``;
    for (let i = 0; i < Elements.length; i++) {
        if ((Elements[i].condition) && (type != 1)) {
            elements.innerHTML += `
                <div class="elements-box">
                    <div class="elements-box__checkbox">
                        <input checked class="elements__condition" type="checkbox">
                        <span></span>
                    </div>
                    <div class="elements__name elements__name_completed">${Elements[i].task}</div>
                    <div class="elements-box__close">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                    <div class="appearance-anim"></div>
                </div>
            `;
        }
        else if ((!Elements[i].condition) && (type !== 2)) {
            elements.innerHTML += `
                <div class="elements-box">
                    <div class="elements-box__checkbox">
                        <input class="elements__condition" type="checkbox">
                        <span></span>
                    </div>
                    <div class="elements__name">${Elements[i].task}</div>
                    <div class="elements-box__close">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                    <div class="appearance-anim"></div>
                </div>
            `;
        }
    }
    animateAppearance(elements.children);
}

function addElement() {
    elements.innerHTML += `
            <div class="elements-box">
                <div class="elements-box__checkbox">
                    <input class="elements__condition" type="checkbox">
                    <span></span>
                </div>
                <div class="elements__name">${elementName.value}</div>
                <div class="elements-box__close">
                    <i class="fa-solid fa-trash"></i>
                </div>
                <div class="appearance-anim"></div>
            </div>
        `;
    animateAppearance(elements.lastElementChild, 1);
}
function deleteElement(i) {

    if (i === elements.children.length - 1) {
        elements.children[i].remove();
    }
    else {
        elements.children[i].remove();
        animateAppearance(elements.children[i], 2);
    }
}

function animateAppearance(el, action) {
    let pos = 0;
    let i;
    if (action === 2) {
        for (i = Comparison(el.children[1].innerHTML) - 1; i < elements.children.length; i++) {
            deleteElement(i);
        }
    }
    else if (action === 3) {
        for (i = 0; i < Elements.length; i++) {
            deleteElements(i);
        }
        Elements.length = 0;
    }
    else if (el.length === undefined && action) {
        i = elements.children.length - 1;
        el.style.top = 0 + "px";
        for (i = 0; i < Elements.length; i++) {
            setTimeout(timeout, 1, i)
        }
    }
    else {
        for (i = 0; i < el.length; i++) {
            el[i].style.top = 0 + "px";
            setTimeout(timeout, 0, i)
        }
    }

    function deleteElement(i) {
        let j = 0;
        setPoss();
        function setPoss() {
            if (j <= 50) {
                elements.children[i].style.top = (parseInt(elements.children[i].style.top, 10) - 1) + "px";
                setTimeout(setPoss, 5);
                j++;
            }
        }
    }
    function deleteElements(i) {
        let obj = el[i];
        let k = (parseInt(el[i].style.top, 10));
        setPosasd();
        function setPosasd() {
            if (k >= -50) {
                k -= 1;
                obj.style.top = (parseInt(obj.style.top, 10) - i) + "px";
                setTimeout(setPosasd, 5);
            }
            else {
                obj.remove();
            }
        }
    }
    function timeout(i) {
        setInterval(() => {
            if ((pos <= 50 * i) && (i !== 0)) {
                pos += 1;
                if (action) {
                    el.style.top = pos + "px";
                }
                else {
                    el[i].style.top = pos + "px";
                }
            }
            else {
                return 0;
            }
        }, 5);

    }
}

let Elements = [];
const elementName = document.querySelector(".add-element__name");
const elements = document.querySelector(".elements");
const formOptions = document.querySelector(".form__options");
let options = formOptions.elements.options;
const clearElement = document.querySelector(".options__close-all");


elementName.addEventListener('keydown', event => {
    if ((event.keyCode === 13) && (Comparison(elementName.value) < 0) && (elementName.value)) {
        Elements.push(new TodoList(elementName.value));
        addElement();
        elementName.value = "";
        clearElement.classList.add("options__close-all_active");
    }
    console.log(Elements);
});

elements.addEventListener('click', (event) => {
    if (event.target.closest(".elements-box")) {
        if (event.target.closest(".elements__condition")) {
            event.target.parentElement.nextElementSibling.classList.toggle("elements__name_completed");
            if (event.target.parentElement.nextElementSibling.classList.contains("elements__name_completed")) {
                Elements[Comparison(event.target.parentElement.nextElementSibling.innerHTML)].condition = true;
            }
            else
                Elements[Comparison(event.target.parentElement.nextElementSibling.innerHTML)].condition = false;
        }
        else if (event.target.closest(".elements-box__close")) {
            deleteElement(Comparison(event.target.previousElementSibling.innerHTML));
            Elements.splice(Comparison(event.target.previousElementSibling.innerHTML), 1);
        }
    }

})

formOptions.addEventListener('click', (event) => {
    if (event.target.name === "options") {
        printElements();
    }
})

clearElement.addEventListener("click", () => {
    animateAppearance(elements.children, 3);
    clearElement.classList.remove("options__close-all_active");
})


const clock = document.querySelector(".clock");
const calendar = document.querySelector(".calendar");

setInterval(() => {
    let today = new Date();
    let hour = today.getHours(), min = today.getMinutes(), sec = today.getSeconds();
    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;
    clock.innerHTML = `
        <p>${hour}:${min}:${sec}</p>
        <p>${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}</p>
    `
}, 60);

Date.prototype.daysInMonth = function () {
    return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};

function printCalendar(monthNumber) {
    calendar.innerHTML = "";
    for (let i = 0; i < monthNumber; i++) {
        calendar.innerHTML += `<div class="calendar-element">${i + 1}</div>`
    }
}
printCalendar(31);
const calendarValues = document.querySelector(".calendar-month__values");
calendarValues.addEventListener("click", (event) => {
    printCalendar(new Date(2022, event.target.value, 1).daysInMonth());
})
