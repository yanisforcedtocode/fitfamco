class VirtualClassPicker {
    deliveryIdentifier: string
    virtualIdentifider: string
    constructor(delivery: string, virtual: string) {
        this.deliveryIdentifier = delivery
        this.virtualIdentifider = virtual
        this.int()
    }
    int = () => {
        const script = this.getSelectedVariant()!
        const option2Val = this.getOption2Val(script)
        if(option2Val !== this.virtualIdentifider){
            this.notVirtualVariantHandler()
        }
        if(option2Val === this.virtualIdentifider){
            this.virtualVariantHandler()
        }
    }
    listenToDeliveryField = () => {
        const productInfoWrapper = document.querySelector('.product__info-wrapper')
        const fieldElm = this.getDeliveryField(this.deliveryIdentifier)
        productInfoWrapper?.addEventListener('click', () => {
            console.log('click')
            const script = this.getSelectedVariant()
            
            if (!script) return
            const option2Val = this.getOption2Val(script)
            console.log(option2Val)
            if (option2Val !== "Virtual") return
            this.virtualVariantHandler()
        })
    }
    getDeliveryField = (deliveryString: string): HTMLFieldSetElement | undefined => {
        const variantSelects = document.querySelector("variant-selects")
        const fieldsets = variantSelects?.querySelectorAll("fieldset")
        if (!fieldsets) return
        const fields = Array.from(fieldsets).filter((el) => {
            const lengend = el.querySelector('legend')
            if (lengend && lengend.innerText === deliveryString) return true
        })
        const deliveryField = fields[0]
        return deliveryField
    }
    getSelectedVariant = (): HTMLScriptElement | null => {
        const script = document.querySelector("script[data-selected-variant]") as HTMLScriptElement | null
        return script
    }
    getOption2Val = (script: HTMLScriptElement): string | undefined => {
        const innerText = script.innerHTML
        const variantData = (JSON.parse(innerText))
        return variantData.option2
    }
    updateZipCodeInput = (message: string, enabled: boolean)=>{
        const input = document.getElementById('productZipCodeParser') as HTMLInputElement | null
        input? input.value = "":''
        input? input.placeholder = message:''
        input? input.disabled = !enabled:''
    }
    updateZipCodeMessage = (message: string)=>{
        const messageElm = document.getElementById('productParsedAddress')
        messageElm? messageElm.innerText = message:''
    }
    updateFlatPicker = ()=>{
        const picker = document.getElementById('flatpickrWrapper') as HTMLInputElement
        picker.value = ''
    }
    virtualVariantHandler = ()=>{
        this.updateZipCodeInput("NA", false)
        this.updateZipCodeMessage("Address is not required for Virtual Classes")
        this.updateFlatPicker()
        new ProductPropertySetter([{
            key: "address",
            value: "VIRTUAL"
        },{
            key: "time",
            value: ""
        }], '[data-type="add-to-cart-form"]')
    }
    notVirtualVariantHandler = ()=>{
        this.updateZipCodeInput("Input postal code...", true)
        this.updateZipCodeMessage("" )
        this.updateFlatPicker()
        new ProductPropertySetter([{
            key: "address",
            value: undefined
        },{
            key: "time",
            value: ""
        }], '[data-type="add-to-cart-form"]')
    }
}

new VirtualClassPicker('Delivery', 'Virtual')