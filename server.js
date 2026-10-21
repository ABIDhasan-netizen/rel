const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// রুট বা হোম পেজ
app.get('/', (req, res) => {
    res.json({ status: "success", message: "My Personal Free Fire API Server is Running!" });
});

// প্লেয়ার ইনফো এপিআই রাউট
app.get('/api/player', async (req, res) => {
    const { uid, region = 'ind' } = req.query;

    if (!uid) {
        return res.status(400).json({ status: 'error', message: 'UID is required' });
    }

    try {
        // আপনি এখানে আপনার নিজস্ব ব্যাকএন্ড লজিক বা অন্য কোনো রিলায়েবল সোর্স থেকে ডেটা ফেচ করতে পারেন
        const response = await axios.get(`https://free-fire-api-three.vercel.app/api/info?uid=${uid}&region=${region}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            },
            timeout: 10000
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch player data from game server.',
            details: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
