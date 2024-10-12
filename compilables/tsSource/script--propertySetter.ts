console.log('initiate propertySetter')

type ProductProperty = {
    key: string,
    value: string
}
const setterDiv = document.querySelector("#propertiesSetter")!
class ProductPropertySetter {
    constructor(properties: ProductProperty[], formID: string){
        const inputs = properties.map((el)=>{
            return this.createInput(el)
        })
        this.insertInputs(inputs, formID)
    }
    createInput = (property: ProductProperty)=>{
        const input = document.createElement("input")
        Object.assign(input, {name: `properties[${property.key}]`}, {value: property.value}, {type: "text"}, {style: "display: none"})
        return input
    }
    insertInputs = (inputs: HTMLInputElement[], formID: string)=>{
        const target = document.querySelector(formID)
        target? inputs.forEach((el)=>{
            const sameElm = target.querySelector(`[name="${el.name}"]`)
            sameElm? sameElm.remove(): ""
            target.insertAdjacentElement('beforeend', el)
        }):console.log("target form element not found, properties insertion failed")
    }
}
