"use strict";
class VirtualClassPicker {
    constructor(delivery, virtual) {
        this.int = () => {
            const script = this.getSelectedVariant();
            const option2Val = this.getOption2Val(script);
            if (option2Val !== this.virtualIdentifider) {
                this.notVirtualVariantHandler();
            }
            if (option2Val === this.virtualIdentifider) {
                this.virtualVariantHandler();
            }
        };
        this.listenToDeliveryField = () => {
            const productInfoWrapper = document.querySelector('.product__info-wrapper');
            const fieldElm = this.getDeliveryField(this.deliveryIdentifier);
            productInfoWrapper === null || productInfoWrapper === void 0 ? void 0 : productInfoWrapper.addEventListener('click', () => {
                console.log('click');
                const script = this.getSelectedVariant();
                if (!script)
                    return;
                const option2Val = this.getOption2Val(script);
                console.log(option2Val);
                if (option2Val !== "Virtual")
                    return;
                this.virtualVariantHandler();
            });
        };
        this.getDeliveryField = (deliveryString) => {
            const variantSelects = document.querySelector("variant-selects");
            const fieldsets = variantSelects === null || variantSelects === void 0 ? void 0 : variantSelects.querySelectorAll("fieldset");
            if (!fieldsets)
                return;
            const fields = Array.from(fieldsets).filter((el) => {
                const lengend = el.querySelector('legend');
                if (lengend && lengend.innerText === deliveryString)
                    return true;
            });
            const deliveryField = fields[0];
            return deliveryField;
        };
        this.getSelectedVariant = () => {
            const script = document.querySelector("script[data-selected-variant]");
            return script;
        };
        this.getOption2Val = (script) => {
            const innerText = script.innerHTML;
            const variantData = (JSON.parse(innerText));
            return variantData.option2;
        };
        this.updateZipCodeInput = (message, enabled) => {
            const input = document.getElementById('productZipCodeParser');
            input ? input.value = "" : '';
            input ? input.placeholder = message : '';
            input ? input.disabled = !enabled : '';
        };
        this.updateZipCodeMessage = (message) => {
            const messageElm = document.getElementById('productParsedAddress');
            messageElm ? messageElm.innerText = message : '';
        };
        this.updateFlatPicker = () => {
            const picker = document.getElementById('flatpickrWrapper');
            picker.value = '';
        };
        this.virtualVariantHandler = () => {
            this.updateZipCodeInput("NA", false);
            this.updateZipCodeMessage("Address is not required for Virtual Classes");
            this.updateFlatPicker();
            new ProductPropertySetter([{
                    key: "address",
                    value: "VIRTUAL"
                }, {
                    key: "time",
                    value: ""
                }], '[data-type="add-to-cart-form"]');
        };
        this.notVirtualVariantHandler = () => {
            this.updateZipCodeInput("Input postal code...", true);
            this.updateZipCodeMessage("");
            this.updateFlatPicker();
            new ProductPropertySetter([{
                    key: "address",
                    value: undefined
                }, {
                    key: "time",
                    value: ""
                }], '[data-type="add-to-cart-form"]');
        };
        this.deliveryIdentifier = delivery;
        this.virtualIdentifider = virtual;
        this.int();
    }
}
new VirtualClassPicker('Delivery', 'Virtual');
