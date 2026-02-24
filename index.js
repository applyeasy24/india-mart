require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Schema and Model
// Using strict: false so it can accept any schema-less data
const entrySchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const Entry = mongoose.model('Entry', entrySchema);

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'Server is healthy',
        dbState: mongoose.connection.readyState,
        mongoUriDefined: !!process.env.MONGO_URI
    });
});

// GET Endpoint to fetch all data
app.get('/data', async (req, res) => {
    try {
        const data = await Entry.find({});
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch data', error: error.message });
    }
});

// POST Endpoint to insert new entries
app.post('/data', async (req, res) => {
    try {
        const newEntry = new Entry(req.body);
        const savedEntry = await newEntry.save();
        res.status(201).json({ success: true, message: 'Data inserted successfully', data: savedEntry });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to insert data', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
