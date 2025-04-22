require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth')

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend on port ${PORT}`));
app.get('/', (req, res) => res.send('Hello from backend'));
