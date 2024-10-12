type OneMapRes = {
    found: number, //     "found": 0 if no results returned
    totalNumPages: number,
    pageNum: number,
    results: {
        SEARCHVAL: string,
        BLK_NO: string,
        ROAD_NAME: string,
        BUILDING: string,
        ADDRESS: string,
        POSTAL: number
    }[]
} | undefined

class ZipCodeParse {
    inputElm: HTMLInputElement | null
    addressElm: HTMLElement | null
    public inputVal: number | undefined
    public isInputValid: boolean
    public address: OneMapRes | undefined
    constructor(elmId: string, addressId: string) {
        this.inputElm = document.querySelector(`input#${elmId}`)
        this.addressElm = document.getElementById(addressId)
        this.isInputValid = false
        if (!this.inputElm) { console.log('zip code input element not found'); return }
        this.init(this.inputElm, this.inputHandler)
    }

    init = (elm: HTMLInputElement, handler: Function) => {
        elm.addEventListener('input', () => {
            const inputVal = elm.value
            handler(inputVal)
        })
    }
    static isSixDigitNumber = (value: string): boolean => {
        const sixDigitNumberPattern = /^\d{6}$/;
        return sixDigitNumberPattern.test(value);
    }
    inputHandler = async (input: string) => {
        const isValid = ZipCodeParse.isSixDigitNumber(input)
        if (!isValid) {
            this.isInputValid = false
            this.evokeChanges(this.isInputValid, this.inputVal)
            // evoke changes
        }
        if (isValid) {
            this.inputVal = Number(input)
            this.isInputValid = true
            this.evokeChanges(this.isInputValid, this.inputVal)
            // evoke changes
        }
    }
    printAddress = (oneMapRes: OneMapRes)=>{
        if(this.addressElm && oneMapRes?.results[0]?.ADDRESS){
            this.addressElm.innerText = oneMapRes?.results[0].ADDRESS
            new ProductPropertySetter([{key: "address", value: `${this.addressElm.innerText}, ZIP CODE: ${this.inputVal}`}], '[data-type="add-to-cart-form"]')
        }
        if(this.addressElm && !oneMapRes?.results[0]?.ADDRESS){
            this.addressElm.innerText = "Address not found, please enter a valid postal code."
            new ProductPropertySetter([{key: "address", value: `Undefined, please contact support to schedule.`}], '[data-type="add-to-cart-form"]')
        }
    }
    evokeChanges = async (isValid: boolean, input: number | undefined) => {
        if (isValid && input) {
            const result = await this.getAddress(input)
            if (result) {
                const resObj = JSON.parse(result)
                this.printAddress(resObj)
                this.address = resObj
            }
        }
        if (!isValid || !input) {
            if (this.inputElm && (JSON.stringify(this.inputElm.value).length - 2) > 6) {
                this.inputElm.value = JSON.stringify(this.inputVal)
            }
            if (this.inputVal && this.inputElm && (JSON.stringify(this.inputElm.value).length - 2) > 6) {
            }
        }
    }
    getAddress = async (input: number) => {
        try {
            const myHeaders = new Headers();
            const requestOptions: RequestInit = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
            const response = await fetch(`https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${input}&returnGeom=N&getAddrDetails=Y&pageNum=1`, requestOptions)
            const restext = response.text()
            return restext
        } catch (error) {
            console.log(error)
            return undefined
        }
    }
}

const productZipCodeParser = new ZipCodeParse("productZipCodeParser", "productParsedAddress")