const express = require('express');
const wol = require('wol');
const cors = require('cors');

const app = express();
app.use(express.json());

// Middleware to enable CORS
app.use(cors({
    origin: '*', // Adjust the origin as needed
    methods: 'GET, POST, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization'
}));

// Middleware to handle OPTIONS requests
app.options('*', cors());

app.use('/', (req, res) => {
    res.send('Server is running ...');
});

app.post('/wake', (req, res) => {
    const { mac, ip } = req.body;
    if (!mac || !ip) {
        return res.status(400).json({ error: 'MAC address and IP address are required' });
    }

    wol.wake(mac, { address: ip }, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to send WOL packet' });
        }
        return res.status(200).json({ message: 'WOL packet sent successfully' });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
