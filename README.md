# Package Pix Payload

Use it when you need to generate a pix payload following the pix standardization rules. This payload can be transformed into a QR Code or, for example, used for PIX "copy & paste".



## 🔧 Installation

Install the public package:
```bash
npm i pix-payload
```
## 👨‍💻 How To Use

```javascript
import { payload } from "pix-payload"

const data = {
    key: "devcarlosalberto@gmail.com",
    name: "Carlos Alberto",
    city: "Praia Grande",
    amount: 150,
    transactionId: "PAY123",
}

const myPayload = payload(data)
```

The parameters when calling the payload() function are these and must be inside an object:

`key: string`<br/>
`name: string`<br/>
`city: string`<br/>
`amount?: number`<br/>
`transactionId?: string`<br/>

The values accepted as pix key are listed below and must follow the formatting pattern followed by their respective example:

*CPF*: `12345678900`<br/>
*CNPJ*: `00038166000105`<br/>
*E-mail*: `fulano_da_silva.recebedor@example.com`<br/>
*Phone*: `+5561912345678`<br/>

## 🕹️ Functions

- Create payload PIX


## 🚀 Technologies

Thats project has utilized following technologies:
- Typescript


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://devcarlosalberto.netlify.app)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/devcarlosalberto)

## Authors

- [@devcarlosalberto](https://www.github.com/devcarlosalberto)
