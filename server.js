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
  try {
    const total = Number(req.body.total);

    console.log("RAW BODY:", req.body);
    console.log("TOTAL TYPE:", typeof req.body.total);
    console.log("TOTAL PARSED:", total);

    if (!total || isNaN(total)) {
      return res.status(400).json({ error: "Invalid total" });
    }

    let orderId = 'ORDER-' + Date.now();

let parameter = {
  transaction_details: {
    order_id: orderId,
    gross_amount: Math.round(total)
  },

  item_details: [
    {
      id: "item-1",
      price: Math.round(total),
      quantity: 1,
      name: "Order Marketplace"
    }
  ],

  finish_redirect_url: `https://wirastore.vercel.app//success.html?order_id=${orderId}`
};

    const transaction = await snap.createTransaction(parameter);

    return res.json({
      token: transaction.token
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});
