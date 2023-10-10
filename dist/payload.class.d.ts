export type PayloadProps = {
    name: string;
    key: string;
    amount?: number;
    city: string;
    transactionId?: string;
};
export default class Payload {
    private readonly data;
    private readonly PAYLOAD_FORMAT_INDICATOR;
    private readonly MERCHANT_ACCOUNT_INFORMATION;
    private readonly MERCHANT_ACCOUNT_INFORMATION_GUI;
    private readonly MERCHANT_ACCOUNT_INFORMATION_KEY;
    private readonly MERCHANT_CATEGORY_CODE;
    private readonly TRANSACTION_CURRENCY;
    private readonly TRANSACTION_AMOUNT;
    private readonly COUNTRY_CODE;
    private readonly MERCHANT_NAME;
    private readonly MERCHANT_CITY;
    private readonly ADDITIONAL_DATA_FIELD;
    private readonly ADDITIONAL_DATA_FIELD_TXTID;
    private readonly CRC16;
    constructor(data: PayloadProps, PAYLOAD_FORMAT_INDICATOR?: string, MERCHANT_ACCOUNT_INFORMATION?: string, MERCHANT_ACCOUNT_INFORMATION_GUI?: string, MERCHANT_ACCOUNT_INFORMATION_KEY?: string, MERCHANT_CATEGORY_CODE?: string, TRANSACTION_CURRENCY?: string, TRANSACTION_AMOUNT?: string, COUNTRY_CODE?: string, MERCHANT_NAME?: string, MERCHANT_CITY?: string, ADDITIONAL_DATA_FIELD?: string, ADDITIONAL_DATA_FIELD_TXTID?: string, CRC16?: string);
    private EVM;
    private calcCRC16CCITT;
    private padder;
    private getPayloadFormatIndicator;
    private getMerchantAccountInformation;
    private getMerchantCategoryCode;
    private getTransactionCurrency;
    private getTransactionAmount;
    private getCountryCode;
    private getMerchantName;
    private getMerchantCity;
    private getTransactionId;
    private getCRC16;
    get(): string;
}
