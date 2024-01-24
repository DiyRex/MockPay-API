const PaymentModel = require("../models/PaymentSchema");
const {getCardType} = require('../helpers/cardCategorize');
const { isCardValid } = require("../helpers/cardExpDate");

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
    if (
      getCardType(cardDetailsData.card_number) != "invalid" &&
      isCardValid(cardDetailsData.exp_year, cardDetailsData.exp_month)
    ) {
        console.log("inside");
      PaymentDocument.payment_status = "completed";
      PaymentDocument.card_details.card_type = getCardType(
        cardDetailsData.card_number
      );
      PaymentDocument.card_details.card_number = cardDetailsData.card_number;
      PaymentDocument.card_details.exp_year = cardDetailsData.exp_year;
      PaymentDocument.card_details.exp_month = cardDetailsData.exp_month;
      PaymentDocument.card_details.ccv = cardDetailsData.ccv;
      PaymentDocument.card_details.cardholder_name =
        cardDetailsData.cardholder_name;
      await PaymentDocument.save();
      return res.status(201).json({
        success: true,
        message: "Payment completed successfully",
        pay_id: PaymentId,
      });
    } else {
      PaymentDocument.payment_status = "failed";
      await PaymentDocument.save();
      return res.status(400).json({
        success: false,
        message: "Invalid Card Number",
        error: error.message,
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

module.exports = { Payment, getPayment, updatePayment, deletePayment };
