"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Payload {
    constructor(data, PAYLOAD_FORMAT_INDICATOR = "00", MERCHANT_ACCOUNT_INFORMATION = "26", MERCHANT_ACCOUNT_INFORMATION_GUI = "00", MERCHANT_ACCOUNT_INFORMATION_KEY = "01", MERCHANT_CATEGORY_CODE = "52", TRANSACTION_CURRENCY = "53", TRANSACTION_AMOUNT = "54", COUNTRY_CODE = "58", MERCHANT_NAME = "59", MERCHANT_CITY = "60", ADDITIONAL_DATA_FIELD = "62", ADDITIONAL_DATA_FIELD_TXTID = "05", CRC16 = "63") {
        this.data = data;
        this.PAYLOAD_FORMAT_INDICATOR = PAYLOAD_FORMAT_INDICATOR;
        this.MERCHANT_ACCOUNT_INFORMATION = MERCHANT_ACCOUNT_INFORMATION;
        this.MERCHANT_ACCOUNT_INFORMATION_GUI = MERCHANT_ACCOUNT_INFORMATION_GUI;
        this.MERCHANT_ACCOUNT_INFORMATION_KEY = MERCHANT_ACCOUNT_INFORMATION_KEY;
        this.MERCHANT_CATEGORY_CODE = MERCHANT_CATEGORY_CODE;
        this.TRANSACTION_CURRENCY = TRANSACTION_CURRENCY;
        this.TRANSACTION_AMOUNT = TRANSACTION_AMOUNT;
        this.COUNTRY_CODE = COUNTRY_CODE;
        this.MERCHANT_NAME = MERCHANT_NAME;
        this.MERCHANT_CITY = MERCHANT_CITY;
        this.ADDITIONAL_DATA_FIELD = ADDITIONAL_DATA_FIELD;
        this.ADDITIONAL_DATA_FIELD_TXTID = ADDITIONAL_DATA_FIELD_TXTID;
        this.CRC16 = CRC16;
    }
    EVM(id, subject) {
        if (subject.length > 99)
            throw new Error("Content of EVM not over 99 chars!");
        return (this.padder(id) + this.padder(subject.length) + subject.toString());
    }
    calcCRC16CCITT(subject) {
        let result = 0xffff;
        if (subject.length > 0) {
            for (let offset = 0; offset < subject.length; offset++) {
                result ^= subject.charCodeAt(offset) << 8;
                for (let bitwise = 0; bitwise < 8; bitwise++) {
                    if ((result <<= 1) & 0x10000)
                        result ^= 0x1021;
                    result &= 0xffff;
                }
            }
        }
        return result.toString(16).toUpperCase();
    }
    padder(subject) {
        return subject.toString().padStart(2, "0");
    }
    getPayloadFormatIndicator() {
        return this.EVM(this.PAYLOAD_FORMAT_INDICATOR, "01");
    }
    getMerchantAccountInformation() {
        if (!this.data.key)
            throw new Error("Pix key is mandatory!");
        const GUI = this.EVM(this.MERCHANT_ACCOUNT_INFORMATION_GUI, "BR.GOV.BCB.PIX");
        const KEY = this.EVM(this.MERCHANT_ACCOUNT_INFORMATION_KEY, this.data.key);
        return this.EVM(this.MERCHANT_ACCOUNT_INFORMATION, `${GUI}${KEY}`);
    }
    getMerchantCategoryCode() {
        return this.EVM(this.MERCHANT_CATEGORY_CODE, "0000");
    }
    getTransactionCurrency() {
        return this.EVM(this.TRANSACTION_CURRENCY, "986");
    }
    getTransactionAmount() {
        if (this.data.amount !== undefined) {
            const value = Number(this.data.amount).toFixed(2).toString();
            return this.EVM(this.TRANSACTION_AMOUNT, value);
        }
        return "";
    }
    getCountryCode() {
        return this.EVM(this.COUNTRY_CODE, "BR");
    }
    getMerchantName() {
        if (!this.data.name)
            throw new Error("Name is mandatory!");
        return this.EVM(this.MERCHANT_NAME, this.data.name);
    }
    getMerchantCity() {
        if (!this.data.city)
            throw new Error("Citi is mandatory!");
        return this.EVM(this.MERCHANT_CITY, this.data.city);
    }
    getTransactionId() {
        if (this.data.transactionId !== undefined) {
            const transactionId = this.EVM(this.ADDITIONAL_DATA_FIELD_TXTID, this.data.transactionId);
            return this.EVM(this.ADDITIONAL_DATA_FIELD, transactionId);
        }
        return "";
    }
    getCRC16(subject) {
        const calculated = this.calcCRC16CCITT(`${subject}6304`);
        return this.EVM(this.CRC16, calculated);
    }
    get() {
        const payload = this.getPayloadFormatIndicator() +
            this.getMerchantAccountInformation() +
            this.getMerchantCategoryCode() +
            this.getTransactionCurrency() +
            this.getTransactionAmount() +
            this.getCountryCode() +
            this.getMerchantName() +
            this.getMerchantCity() +
            this.getTransactionId();
        return `${payload}${this.getCRC16(payload)}`;
    }
}
exports.default = Payload;
