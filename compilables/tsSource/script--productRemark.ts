class ProductRemarkArea {
    currentText: string
    // textArea: HTMLTextAreaElement
    constructor(id: string){
        this.currentText = ''
        const textArea = document.getElementById(id) as HTMLTextAreaElement
        console.log(textArea)
        if(!textArea)return
        textArea.addEventListener("input", ()=>{
            this.currentText = textArea.value
            console.log(this.currentText)
            new ProductPropertySetter([{key: "remark", value: this.currentText}], '[data-type="add-to-cart-form"]')
        })
    }
}
const remarksArea = new ProductRemarkArea("lineItemRemark")