const express = require('express');
const cors = require('cors');
const app = express();
const stockRoutes = require('./controllers/control');

app.use(cors()); 

app.use(express.json());
app.use('/control', stockRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
