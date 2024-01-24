const express = require('express');
const PaymentRouter = require('./routes/paymentRoutes');
const dbConn = require('./dbConn.js');
const routeDoc = require('./routeDoc.json');
const cors = require('cors');


const app = express();
app.use(cors);

const port = process.env.PORT || 8081;

const startServer = async() => {
    await dbConn();

    app.use(express.json());

    // Default Route
    app.get("/", (req, res) => {
      res.status(200).json({
        Documentation:routeDoc,
      });
    });

    // Adding Route Modules
    app.use("/payment", PaymentRouter);

    // Unknown Routes
    app.get("*", (req, res) => {
      res.status(404).json({
        message: "This Route doesn't exist",
      });
    });

    app.listen(port, () => {
      console.log(`Server started at http://127.0.0.1:${port}`);
    });
}

startServer();