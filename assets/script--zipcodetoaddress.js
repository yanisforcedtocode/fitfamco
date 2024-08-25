"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ZipCodeParse {
    constructor(elmId) {
        this.init = (elm, handler) => {
            elm.addEventListener('input', () => {
                const inputVal = elm.value;
                handler(inputVal);
            });
        };
        this.isSixDigitNumber = (value) => {
            const sixDigitNumberPattern = /^\d{6}$/;
            return sixDigitNumberPattern.test(value);
        };
        this.inputHandler = (input) => __awaiter(this, void 0, void 0, function* () {
            const isValid = this.isSixDigitNumber(input);
            if (!isValid) {
                this.isInputValid = false;
                this.evokeChanges(this.isInputValid, this.inputVal);
                // evoke changes
            }
            if (isValid) {
                this.inputVal = Number(input);
                this.isInputValid = true;
                this.evokeChanges(this.isInputValid, this.inputVal);
                // evoke changes
            }
        });
        this.evokeChanges = (isValid, input) => __awaiter(this, void 0, void 0, function* () {
            if (isValid && input) {
                const result = yield this.getAddress(input);
                if (result) {
                    const resObj = JSON.parse(result);
                    console.log(resObj);
                    this.address = resObj;
                }
            }
            if (!isValid || !input) {
                if (this.inputElm && (JSON.stringify(this.inputElm.value).length - 2) > 6) {
                    this.inputElm.value = JSON.stringify(this.inputVal);
                }
                if (this.inputVal && this.inputElm && (JSON.stringify(this.inputElm.value).length - 2) > 6) {
                }
                console.log('prompt reenter');
            }
        });
        this.getAddress = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const myHeaders = new Headers();
                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow"
                };
                const response = yield fetch(`https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${input}&returnGeom=N&getAddrDetails=Y&pageNum=1`, requestOptions);
                const restext = response.text();
                return restext;
            }
            catch (error) {
                console.log(error);
                return undefined;
            }
        });
        this.inputElm = document.querySelector(`input#${elmId}`);
        this.isInputValid = false;
        if (!this.inputElm) {
            console.log('zip code input element not found');
            return;
        }
        this.init(this.inputElm, this.inputHandler);
    }
}
const productZipCodeParser = new ZipCodeParse("productZipCodeParser");
