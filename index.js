const express = require('express');
const cors = require('cors');
const path = require('path');
const PaymentRouter = require('./routes/paymentRoutes');
const dbConn = require('./dbConn');
const routeDoc = require('./routeDoc.json');


const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Ensure that the views folder is properly specified
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        Documentation: routeDoc,
    });
});

app.use('/payment', PaymentRouter);

app.all('*', (req, res) => {
    res.status(404).json({
        message: "This route doesn't exist",
    });
});

app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: err.message || err,
    });
});

const startServer = async () => {
    try {
        await dbConn();

        const port = process.env.PORT || 8083;

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

startServer();
