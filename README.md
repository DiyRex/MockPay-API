# Mock API Documentation

### A fake payment getaway for web testing purposes.

## Setup and Installation

### Prerequisites
- Node.js installed
- MongoDB installed

### Clone Repository
```bash
git clone https://github.com/DiyRex/MockPay-API.git
cd MockPay-API   
```
### Install Dependencies
```bash
npm install
```
### Create Environment Configuration
- Create a .env file in the root of the project and add the following configurations:
```bash
PORT=<Port>
MONGO_CONN_STRING=<mongodb-connection-string>
```
- Replace mongodb-connection-string with your actual MongoDB connection string and Port you want to run the server.
  
## Running the Server

### Development Mode
```bash
npm run dev
```
### Production Mode
```bash
npm run start
```
- The server will be running at http://localhost:PORT
  
## API Endpoints

### Get payment record by ID

- **Method**: GET
- **Route**: `/payment/pay/{id}`
- **Response Code**: 200

### Initiate a payment

- **Method**: POST
- **Route**: `/payment/pay/`
- **Body**:
  - `amount`: Amount (int)
  - `currency`: Currency type (String)
  - `payment_method`: Payment method (String)
- **Response Code**: 201

### Complete initiated payment

- **Method**: PUT
- **Route**: `/payment/pay/{id}`
- **Body**:
  - `card_number`: Card Number (XXXX XXXX XXXX XXXX - String)
  - `exp_year`: Expiry Year (YYYY - String)
  - `exp_month`: Expiry Month (MM - String)
  - `ccv`: CCV (XXX - String)
  - `cardholder_name`: Cardholder Name (String)
- **Response Code**: 201

### Delete payment record by ID

- **Method**: DELETE
- **Route**: `/payment/pay/{id}`
- **Response Code**: 200

# License
This project is licensed under the [ISC License](LICENSE).
