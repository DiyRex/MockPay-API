const PaymentModel = require("../models/PaymentSchema");
const {getCardType} = require('../helpers/cardCategorize');
const { isCardValid } = require("../helpers/cardExpDate");


const initiatePaymentSession = async (req, res) => {
  const { amount, currency, reference_id } = req.body;

  try {
    const newPayment = await PaymentModel.create({
      amount,
      currency,
      reference_id,
      payment_method: "card",
      payment_status: "pending",
    });

    const paymentId = newPayment._id;

    const paymentPageUrl = `${process.env.APP_URL}/payment/pay/${paymentId}`;
    return res.status(200).json({
      success: true,
      paymentUrl: paymentPageUrl, // URL where the user can go to complete payment
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to initiate payment",
    });
  }
};

const getPaymentPage = async (req, res) => {
  const { PaymentId } = req.params;

  try {
    const paymentRecord = await PaymentModel.findById(PaymentId);

    if (!paymentRecord) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }

    // Render the payment form with the payment data (amount, currency, etc.)
    return res.render('paymentPage', {
      payment: paymentRecord,  // Pass the payment record data to the HTML page
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch payment details",
    });
  }
};

const getPayment = async(req,res) => {
    const {PaymentId} = req.params;
    try{
        const PaymentDocument = await PaymentModel.findById(PaymentId);

        if (!PaymentDocument) {
          return res.status(404).json({
            success: false,
            message: "Payment not found",
          });
        }
        res.status(200).json({
            success:true,
            message:"Payment Record Found",
            data:PaymentDocument,
        });
    }catch(error){
        res.status(500).json({
          message: "Internal Server Error",
        });
    }
}
const Payment = async (req, res) => {
  try {
    let initialPaymentData = req.body;
    initialPaymentData.payment_status = "pending";
    console.log(initialPaymentData);
    const createdPayment = await PaymentModel.create(
      initialPaymentData
    );
    const PaymentId = createdPayment._id;  
    console.log(`PayID: ${PaymentId}`);  

    res.status(201).json({
      message: "Payment created successfully.",
      id: PaymentId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updatePayment = async (req, res) => {
  const { PaymentId } = req.params;
  const cardDetailsData = req.body;

  try {
    const PaymentDocument = await PaymentModel.findById(PaymentId);

    if (!PaymentDocument) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }
    console.log(isCardValid(cardDetailsData.exp_year, cardDetailsData.exp_month))
    if (
      getCardType(cardDetailsData.card_number) !== "invalid" &&
      isCardValid(cardDetailsData.exp_year, cardDetailsData.exp_month)
    ) {
      PaymentDocument.payment_status = "completed";
      PaymentDocument.card_details = { ...cardDetailsData };
      await PaymentDocument.save();
      console.log("validated")
      // Redirect back to e-commerce site after successful payment
      return res.status(201).json({
        success: true,
        message: "Payment completed successfully",
        redirectUrl: "http://localhost:8083/order-success",  // Redirect to order success page
      });
    } else {
      PaymentDocument.payment_status = "failed";
      await PaymentDocument.save();
      return res.status(400).json({
        success: false,
        message: "Invalid Card Number",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


const deletePayment = async (req,res) => {
    const { PaymentId } = req.params;
    try{
        const paymentDoc = await PaymentModel.findByIdAndDelete(PaymentId);
        res.status(200).json({
            success:true,
            message:"Payment Record Deleted",
        })
    }catch(error){
        res.status(404).json({
          success: false,
          message: "Failed to delete",
        });
    }
};

const callbackPayment = async (req, res) => {
  try {
    const response = await fetch(process.env.REDIRECT_CALLBACK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.PAYMENT_API_KEY,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error in callback proxy:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
}

module.exports = { Payment, getPayment, updatePayment, deletePayment, initiatePaymentSession, getPaymentPage, callbackPayment };
