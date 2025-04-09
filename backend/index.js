const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => res.send('Hello from backend'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend on port ${PORT}`));
