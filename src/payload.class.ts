export type PayloadProps = {
	name: string
	key: string
	amount?: number
	city: string
	transactionId?: string
}

export default class Payload {
	constructor(
		private readonly data: PayloadProps,
		private readonly PAYLOAD_FORMAT_INDICATOR = "00",
		private readonly MERCHANT_ACCOUNT_INFORMATION = "26",
		private readonly MERCHANT_ACCOUNT_INFORMATION_GUI = "00",
		private readonly MERCHANT_ACCOUNT_INFORMATION_KEY = "01",
		private readonly MERCHANT_CATEGORY_CODE = "52",
		private readonly TRANSACTION_CURRENCY = "53",
		private readonly TRANSACTION_AMOUNT = "54",
		private readonly COUNTRY_CODE = "58",
		private readonly MERCHANT_NAME = "59",
		private readonly MERCHANT_CITY = "60",
		private readonly ADDITIONAL_DATA_FIELD = "62",
		private readonly ADDITIONAL_DATA_FIELD_TXTID = "05",
		private readonly CRC16 = "63"
	) {}

	private EVM(id: number | string, subject: string): string {
		if (subject.length > 99)
			throw new Error("Content of EVM not over 99 chars!")

		return (
			this.padder(id) + this.padder(subject.length) + subject.toString()
		)
	}

	private calcCRC16CCITT(subject: string): string {
		let result = 0xffff

		if (subject.length > 0) {
			for (let offset = 0; offset < subject.length; offset++) {
				result ^= subject.charCodeAt(offset) << 8
				for (let bitwise = 0; bitwise < 8; bitwise++) {
					if ((result <<= 1) & 0x10000) result ^= 0x1021
					result &= 0xffff
				}
			}
		}

		return result.toString(16).toUpperCase()
	}

	private padder(subject: number | string): string {
		return subject.toString().padStart(2, "0")
	}

	private getPayloadFormatIndicator(): string {
		return this.EVM(this.PAYLOAD_FORMAT_INDICATOR, "01")
	}

	private getMerchantAccountInformation(): string {
		if (!this.data.key) throw new Error("Pix key is mandatory!")

		const GUI = this.EVM(
			this.MERCHANT_ACCOUNT_INFORMATION_GUI,
			"BR.GOV.BCB.PIX"
		)
		const KEY = this.EVM(
			this.MERCHANT_ACCOUNT_INFORMATION_KEY,
			this.data.key
		)

		return this.EVM(this.MERCHANT_ACCOUNT_INFORMATION, `${GUI}${KEY}`)
	}

	private getMerchantCategoryCode(): string {
		return this.EVM(this.MERCHANT_CATEGORY_CODE, "0000")
	}

	private getTransactionCurrency(): string {
		return this.EVM(this.TRANSACTION_CURRENCY, "986")
	}

	private getTransactionAmount(): string {
		if (this.data.amount !== undefined) {
			const value = Number(this.data.amount).toFixed(2).toString()
			return this.EVM(this.TRANSACTION_AMOUNT, value)
		}
		return ""
	}

	private getCountryCode(): string {
		return this.EVM(this.COUNTRY_CODE, "BR")
	}

	private getMerchantName(): string {
		if (!this.data.name) throw new Error("Name is mandatory!")
		return this.EVM(this.MERCHANT_NAME, this.data.name)
	}

	private getMerchantCity(): string {
		if (!this.data.city) throw new Error("Citi is mandatory!")
		return this.EVM(this.MERCHANT_CITY, this.data.city)
	}

	private getTransactionId(): string {
		if (this.data.transactionId !== undefined) {
			const transactionId = this.EVM(
				this.ADDITIONAL_DATA_FIELD_TXTID,
				this.data.transactionId
			)
			return this.EVM(this.ADDITIONAL_DATA_FIELD, transactionId)
		}
		return ""
	}

	private getCRC16(subject: string): string | number {
		const calculated = this.calcCRC16CCITT(`${subject}6304`)
		return this.EVM(this.CRC16, calculated)
	}

	public get(): string {
		const payload =
			this.getPayloadFormatIndicator() +
			this.getMerchantAccountInformation() +
			this.getMerchantCategoryCode() +
			this.getTransactionCurrency() +
			this.getTransactionAmount() +
			this.getCountryCode() +
			this.getMerchantName() +
			this.getMerchantCity() +
			this.getTransactionId()

		return `${payload}${this.getCRC16(payload)}`
	}
}
