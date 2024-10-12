"use strict";
class FitfamCoUtilities {
    constructor() { }
}
FitfamCoUtilities.getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};
FitfamCoUtilities.getFutureDateString = (days) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + days);
    const year = tomorrow.getFullYear();
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = tomorrow.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};
class VariantCalendarControl {
    constructor(superKey) {
        this.initiateFlatPicker = (maxDate) => {
            const inputOption = {
                enableTime: true,
                minDate: FitfamCoUtilities.getFutureDateString(4),
                maxDate: undefined,
                dateFormat: "Y-m-d",
                minTime: "07:00",
                maxTime: "18:30",
                defaultHour: 8
            };
            if (maxDate) {
                inputOption.minDate = FitfamCoUtilities.getFutureDateString(1);
                inputOption.maxDate = FitfamCoUtilities.getFutureDateString(maxDate);
            }
            this.picker = flatpickr(this.myInput, inputOption);
            const pickerHandler = () => {
                new ProductPropertySetter([{ key: "time", value: JSON.stringify(Date.now()) }], '[data-type="add-to-cart-form"]');
            };
            const picker = this.picker;
            picker.config.onValueUpdate.push(function () {
                const pickedDate = picker.selectedDates[0];
                new ProductPropertySetter([{ key: "time", value: `${pickedDate.toDateString()}, ${pickedDate.toTimeString()}` }], '[data-type="add-to-cart-form"]');
            });
        };
        this.getProductInfo = () => {
            const productInfo = document.querySelector("product-info");
            return productInfo;
        };
        this.getVariantSelects = (productInfo) => {
            const variantSelects = productInfo.querySelector("variant-selects");
            return variantSelects;
        };
        this.getVariantInputs = (selects) => {
            const inputs = selects.querySelectorAll("input");
            return inputs;
        };
        this.checkCheckedValue = (inputs) => {
            let checkedValue = undefined;
            inputs.forEach((el) => {
                if (el.checked) {
                    checkedValue = el.value;
                }
            });
            return checkedValue;
        };
        this.listenToInfo = (info) => {
            info.addEventListener("click", () => {
                const selects = this.getVariantSelects(info);
                if (!selects)
                    return;
                const inputs = this.getVariantInputs(selects);
                if (!inputs)
                    return;
                const checkedValue = this.checkCheckedValue(inputs);
                if (this.currentKey === checkedValue) {
                    return;
                }
                this.currentKey = checkedValue;
                if (checkedValue === this.superKey) {
                    this.initiateFlatPicker(3);
                }
                else {
                    this.initiateFlatPicker(false);
                }
            });
        };
        this.superKey = superKey;
        this.myInput = document.querySelector("#flatpickrWrapper");
        this.initiateFlatPicker(false);
        const info = this.getProductInfo();
        if (!info)
            return;
        this.listenToInfo(info);
    }
}
new VariantCalendarControl("super");
