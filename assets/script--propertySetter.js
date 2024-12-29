"use strict";
const setterDiv = document.querySelector("#propertiesSetter");
class ProductPropertyStore {
    constructor(productKeys) {
        this.init = () => {
            this.productKeys.forEach((el) => {
                Object.assign(this.productProperties, { [el]: undefined });
            });
        };
        this.isKeyAllowed = (newKey) => {
            return this.productKeys.includes(newKey);
        };
        this.isAllValuesTruthy = () => {
            const values = Object.values(this.productProperties);
            for (let i = 0; i < values.length; i++) {
                if (!values[i]) {
                    return false;
                }
            }
            return true;
        };
        this.productKeys = productKeys;
        this.productProperties = {};
        this.init();
    }
    set changeProperty(newProperty) {
        if (!this.isKeyAllowed(newProperty.key))
            return;
        this.productProperties[newProperty.key] = newProperty.value;
    }
    get getProperty() {
        return this.productProperties;
    }
    get isAllValTruthy() {
        return this.isAllValuesTruthy();
    }
}
class ProductPropertySetter {
    constructor(properties, formID) {
        this.changeProductProperties = (properties) => {
            properties.forEach((el) => {
                defaultProductPropertiesStore.changeProperty = el;
            });
        };
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
        this.changeProductProperties(properties);
        if (defaultProductPropertiesStore.isAllValuesTruthy()) {
            // console.log('all truthy')
            FitfamCoUtilities.enableDefaultAdd2Cart();
        }
        if (!defaultProductPropertiesStore.isAllValuesTruthy()) {
            // console.log('not all truthy')
            FitfamCoUtilities.disableDefaultAdd2Cart();
        }
    }
}
const defaultProductPropertiesStore = new ProductPropertyStore(["time", "address"]);
