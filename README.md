# Mock API Documentation

### A fake payment getaway for web testing purposes.

**Name**: Mock-API  
**Version**: 1.0.0  
**Author**: DiyRex  

## Routes

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
