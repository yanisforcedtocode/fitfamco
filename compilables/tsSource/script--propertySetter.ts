type ProductProperty = {
    key: string,
    value: string | undefined
}
type ProductProperties = {
    [x: string]: string | undefined
}


const setterDiv = document.querySelector("#propertiesSetter")!

class ProductPropertyStore {
    productKeys: string[]
    productProperties: ProductProperties
    constructor(productKeys: string[]){
        this.productKeys = productKeys
        this.productProperties = {}
        this.init()
    }
    init = ()=>{
        this.productKeys.forEach((el)=>{
            Object.assign(this.productProperties, {[el]: undefined})
        })
    }

    isKeyAllowed = (newKey: string)=>{
        return this.productKeys.includes(newKey)
    }

    isAllValuesTruthy = () => {
        const values = Object.values(this.productProperties)
        for (let i = 0; i < values.length; i++) {
            if (!values[i]) {
                return false
            }
        }
        return true
    }

    set changeProperty (newProperty: ProductProperty){
        if(!this.isKeyAllowed(newProperty.key))return
        this.productProperties[newProperty.key] = newProperty.value
    }

    get getProperty (){
        return  this.productProperties
    }

    get isAllValTruthy (){
        return this.isAllValuesTruthy()
    }
}
class ProductPropertySetter {
    constructor(properties: ProductProperty[], formID: string){
        const inputs = properties.map((el)=>{
            return this.createInput(el)
        })
        this.insertInputs(inputs, formID)
        this.changeProductProperties(properties)
        if(defaultProductPropertiesStore.isAllValuesTruthy()){
            FitfamCoUtilities.enableDefaultAdd2Cart()
        }
        if(!defaultProductPropertiesStore.isAllValuesTruthy()){
            FitfamCoUtilities.disableDefaultAdd2Cart()
        }
    }
    changeProductProperties = (properties: ProductProperty[])=>{
        properties.forEach((el)=>{
            defaultProductPropertiesStore.changeProperty = el
        })
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


const defaultProductPropertiesStore = new ProductPropertyStore(["time", "address"])