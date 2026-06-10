require('dotenv').config();
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    nama: String,
    harga: Number,
});
const Item = mongoose.model('Item', ItemSchema);

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        await Item.insertMany([
            { nama: 'Kaos Polos', harga: 85000 },
            { nama: 'Kemeja Casual', harga: 150000 },
            { nama: 'Celana Chino', harga: 175000 },
            { nama: 'Jaket Hoodie', harga: 250000 },
        ]);
        console.log('Data berhasil ditambahkan!');
        process.exit();
    });