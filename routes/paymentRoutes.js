const express = require('express');
const {Payment, getPayment, updatePayment, deletePayment, initiatePaymentSession, getPaymentPage} = require('../controllers/paymentController');

const router = express.Router();
router.get("/pay/:PaymentId", getPaymentPage)
router.post("/pay", Payment);
router.put("/pay/:PaymentId", updatePayment);
router.delete("/pay/:PaymentId", deletePayment);

router.post("/initiate", initiatePaymentSession);

// Serve the payment form HTML (for client-side payment flow)
router.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/paymentForm.html'));
});

router.get("*", (req, res) => {
  return res.status(404).json({
    message: "Route doesn't exist",
  });
});

module.exports = router;