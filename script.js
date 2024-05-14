const colorsDivs = document.querySelectorAll(".color");
const hexBtns = document.querySelectorAll(".color .hex");
const addColorBtn = document.querySelector(".add-color-btn");
const refreshBtn = document.querySelector(".refresh-btn");
const blockBtns = document.querySelectorAll(".color div .block-btn");

class Color {
    constructor(div, isblocked, isDeleted) {
        this.div = div;
        this.isblocked = isblocked || false;
        this.isDeleted = isDeleted || false;
    }
}

var colorsObjs = [];
function createColorsObjs() {
    colorsObjs = [];
    colorsDivs.forEach((color) => {
        let obj = new Color(color, false, false);
        colorsObjs.push(obj);
    });
}
createColorsObjs();

document.addEventListener("DOMContentLoaded", () => {
    changeColors();
});

document.addEventListener("keypress", (e) => {
    if (e.code === "Space") {
        // Prevent the default spacebar action
        e.preventDefault();
    }
    changeColors();
});

// Block space from press block buttons
blockBtns.forEach(function (button) {
    button.addEventListener("keydown", function (event) {
        if (event.code === "Space") {
            event.preventDefault();
            button.blur();
        }
    });
});

// Block color
colorsObjs.forEach((obj) => {
    const blockBtn = obj.div.querySelector(".block-btn");
    blockBtn.addEventListener("click", () => {
        obj.isblocked = obj.isblocked ? false : true;
    });
});

// Hide color
colorsObjs.forEach((obj) => {
    const removeBtn = obj.div.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
        obj.isDeleted = true;
        obj.div.classList.add("removed");
    });
});

// Add color
addColorBtn.addEventListener("click", () => {
    let count = 0;
    colorsObjs.forEach((obj) => {
        if (obj.isDeleted) {
            if (count == 0) {
                obj.div.classList.remove("removed");
                obj.isDeleted = false;
                count++;
            }
        }
    });
});

// Refresh page
refreshBtn.addEventListener("click", () => {
    changeColors();
});

function changeColors() {
    colorsObjs.forEach((colorObj, i) => {
        // Change color if isn't blocked
        if (!colorObj.isblocked) {
            let random = randomColor().toUpperCase();
            let luminance = getContrastYIQ(random);

            colorObj.div.style.backgroundColor = `#${random}`;

            hexBtns[i].textContent = `#${random}`;
            hexBtns[i].style.color = luminance;
        }
    });
}

function randomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
}

function getContrastYIQ(hexcolor) {
    // Convert hex color to RGB
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);

    // Calculate the luminance of the color
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;

    // Return black for bright colors, white for dark colors
    return yiq >= 128 ? "#101010" : "white";
}
