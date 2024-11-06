const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const bookRoutes = require('./modules/routes/bookRoutes');


app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi API!');
});

app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
