"use strict";
class ProductRemarkArea {
    // textArea: HTMLTextAreaElement
    constructor(id) {
        this.currentText = '';
        const textArea = document.getElementById(id);
        console.log(textArea);
        if (!textArea)
            return;
        textArea.addEventListener("input", () => {
            this.currentText = textArea.value;
            console.log(this.currentText);
            new ProductPropertySetter([{ key: "remark", value: this.currentText }], '[data-type="add-to-cart-form"]');
        });
    }
}
const remarksArea = new ProductRemarkArea("lineItemRemark");
