const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const competitionRoutes = require("./routes/competition.routes");

const path = require('path');
const fs = require('fs');

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/competitions', competitionRoutes);

const clientDist = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(clientDist, 'index.html'));
    }
    next();
  });
}

module.exports = app;

// explainantiom:
// our post method : localost:3000/api/auth/register
// when we send
// ye app.js me /api/auth me jayega usse authrouts me jayega aur register api me request aayegi
// woh request ek controller me jayga "registerUser"
// registerUser ke under req.body me jo data aayega,username, email aur password
// uske sath ham ek user creste karenge.aayega
// user create karne ke baad ek token create hoga
// now user aur token ke details ko ham response(res) me send kar rahe honga

