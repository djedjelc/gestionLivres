const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require("./routes/auth.routes");
const livreRoutes = require('./routes/livre.routes');

const path = require('path');
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/livres', livreRoutes);
app.use("/auth", authRoutes);

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/login.html'))
 });
 
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
