const express = require('express');
const {Payment, getPayment, updatePayment, deletePayment} = require('../controllers/paymentController');

const router = express.Router();
router.get("/pay/:PaymentId", getPayment)
router.post("/pay", Payment);
router.put("/pay/:PaymentId", updatePayment);
router.delete("/pay/:PaymentId", deletePayment);

router.get("*", (req, res) => {
  return res.status(404).json({
    message: "Route doesn't exist",
  });
});

module.exports = router;