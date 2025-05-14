declare  var flatpickr: FlatpickrFn 
class FitfamCoUtilities {
    constructor() { }
    static getTodayDateString = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    static getFutureDateString = (days: number) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + days);
        const year = tomorrow.getFullYear();
        const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = tomorrow.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    static enableDefaultAdd2Cart = ()=>{
        const button = document.querySelector('.product-form__buttons .product-form__submit') as HTMLButtonElement
        if(!button)return
        button.disabled = false
    }
    static disableDefaultAdd2Cart = ()=>{
        const button = document.querySelector('.product-form__buttons .product-form__submit') as HTMLButtonElement
        if(!button)return
        button.disabled = true
    }
}

class VariantCalendarControl {
    picker: Instance | undefined
    myInput: Element
    superKey: string
    currentKey: string[]
    constructor(superKey: string) {
        this.currentKey = []
        this.superKey = superKey
        this.myInput = document.querySelector("#flatpickrWrapper")!
        const info = this.getProductInfo()
        this.initiateFlatPicker(7)
        if (!info) return
        const checkedValues = this.getCheckedValues(info)
        if(checkedValues)this.currentKey = checkedValues
            if (checkedValues&&checkedValues.includes(this.superKey)) {
                this.initiateFlatPicker(7)
            } else {
                this.initiateFlatPicker(8)
            }
        this.listenToInfo(info)
    }

    private initiateFlatPicker = (minDate: number | false) => {
        // express 7 days
        // standard 8 working days
        const inputOption: Options = {
            enableTime: true,
            minDate: FitfamCoUtilities.getFutureDateString(8+2),
            maxDate: undefined,
            dateFormat: "Y-m-d",
            minTime: "07:00",
            maxTime: "18:30",
            defaultHour: 8,
        }
        if(minDate){
            inputOption.minDate = FitfamCoUtilities.getFutureDateString(minDate>=7? minDate + 2: minDate)
        }
        this.picker = flatpickr(this.myInput, inputOption);
        const pickerHandler = ()=>{
            new ProductPropertySetter([{key: "time", value: JSON.stringify(Date.now())}], '[data-type="add-to-cart-form"]')
        }
        const picker = this.picker
        picker.config.onValueUpdate.push(function() {
            const pickedDate = picker.selectedDates[0]
            new ProductPropertySetter([{key: "time", value: `${pickedDate.toDateString()}, ${pickedDate.toTimeString()}`}], '[data-type="add-to-cart-form"]')
        } )
    }
    private getProductInfo = () => {
        const productInfo = document.querySelector("product-info")
        return productInfo
    }
    private getVariantSelects = (productInfo: Element) => {
        const variantSelects = productInfo.querySelector("variant-selects")
        return variantSelects
    }
    private getVariantInputs = (selects: Element) => {
        const inputs = selects.querySelectorAll("input")
        return inputs
    }
    private checkCheckedValue = (inputs: NodeListOf<HTMLInputElement>): string[] => {
        let checkedValue: string | undefined = undefined
        const checkedValues:string[] = []
        inputs.forEach((el) => {
            if (el.checked) { 
                checkedValue = el.value 
                checkedValues.push(el.value )
            }
        })
        return checkedValues
    }
    private getCheckedValues = (info: Element):string[]|undefined=>{
        const selects = this.getVariantSelects(info)
            if(!selects)return
            const inputs = this.getVariantInputs(selects)
            if (!inputs) return
            const checkedValues = this.checkCheckedValue(inputs)
            return checkedValues
    }
    private listenToInfo = (info: Element )=>{
        info.addEventListener("input", ()=>{
            const checkedValues = this.getCheckedValues(info)
            if(!checkedValues)return
            if(checkedValues && this.currentKey === checkedValues){
                return
            }
            this.currentKey = checkedValues
            if (checkedValues.includes(this.superKey)) {
                this.initiateFlatPicker(7)
            } else {
                this.initiateFlatPicker(false)
            }
        })
    }
}

new VariantCalendarControl("Express")

