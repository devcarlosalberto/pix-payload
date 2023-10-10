# Package Pix Payload

Use it when you need to generate a pix payload following the pix standardization rules. This payload can be transformed into a QR Code or, for example, used for PIX "copy & paste".



## 🔧 Installation

Install the public package:
```bash
npm i pix-payload
```
## 👨‍💻 Example

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


## 🕹️ Functions

- Create payload PIX


## 🚀 Technologies

Thats project has utilized following technologies:
- Typescript
- CRC


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://devcarlosalberto.netlify.app)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/devcarlosalberto)

## Autores

- [@devcarlosalberto](https://www.github.com/devcarlosalberto)
