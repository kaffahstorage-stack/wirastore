const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
const midtransClient = require('midtrans-client');

let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: 'Mid-server-Sh2Gb0Myp4rvUpa4XPqtl2XE'
});
app.listen(3000, () => {
  console.log('Server jalan di http://localhost:3000');
});
app.post('/create-transaction', async (req, res) => {

    const { total } = req.body;

    try {

        let parameter = {
            transaction_details: {
                order_id: 'ORDER-' + Date.now(),
                gross_amount: total
            }
        };

        const transaction = await snap.createTransaction(parameter);

        res.json({
            token: transaction.token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }

});