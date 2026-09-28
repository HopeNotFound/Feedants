require('dotenv').config();

//console.log("MONGO URI:", process.env.MONGO_URI);
const app=require('./app');
const connectDB = require('./db/db');
const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
    console.log(`Feedants Server running on http://localhost:${PORT}`);
});