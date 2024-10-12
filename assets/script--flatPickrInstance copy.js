"use strict";
console.log('initiate flatpickerinstance01');
const myInput = document.querySelector("#flatpickrWrapper");
const pickrContainer = document.getElementById("flatpickrContainer");
const flatpickerinstance01 = flatpickr(myInput, {
    enableTime: true,
}); // flatpickr
// pickrContainer?.insertAdjacentElement('beforeend', myInput)
