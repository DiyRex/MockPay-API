const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    reference_id: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
    },
    payment_status: {
      type: String,
      required: true,
    },
    card_details: {
      card_type: String,
      card_number: String,
      exp_year: String,
      exp_month: String,
      ccv: String,
      cardholder_name: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PaymentModel = mongoose.model("Payments", PaymentSchema);
module.exports = PaymentModel;
