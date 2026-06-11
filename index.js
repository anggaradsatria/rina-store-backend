require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB konek!'))
    .catch(err => console.log('Error:', err));

const ItemSchema = new mongoose.Schema({    
    nama: String,
    harga: Number,
});
const Item = mongoose.model('Item', ItemSchema);

app.get('/api/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.post('/api/items', async (req, res) => {
    const item = new Item(req.body);
    await item.save();
    res.json(item);
});

app.put('/api/items/:id', async (req, res) => {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
});

app.delete('/api/items/:id', async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item dihapus' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('Server jalan di port' + PORT);
});