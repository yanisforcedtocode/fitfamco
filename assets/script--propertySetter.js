"use strict";
console.log('initiate propertySetter');
const setterDiv = document.querySelector("#propertiesSetter");
class ProductPropertySetter {
    constructor(properties, formID) {
        this.createInput = (property) => {
            const input = document.createElement("input");
            Object.assign(input, { name: `properties[${property.key}]` }, { value: property.value }, { type: "text" }, { style: "display: none" });
            return input;
        };
        this.insertInputs = (inputs, formID) => {
            const target = document.querySelector(formID);
            target ? inputs.forEach((el) => {
                const sameElm = target.querySelector(`[name="${el.name}"]`);
                sameElm ? sameElm.remove() : "";
                target.insertAdjacentElement('beforeend', el);
            }) : console.log("target form element not found, properties insertion failed");
        };
        const inputs = properties.map((el) => {
            return this.createInput(el);
        });
        this.insertInputs(inputs, formID);
    }
}
