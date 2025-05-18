const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const CustomerRouter = require('./Routes/CustomerRouter');
const Superadminrouter = require('./Routes/Superadminroute');
const adminauth = require('./Routes/Adminauth');
const Imageuploadroute = require('./Routes/Imageuploadroute');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

// Middleware to extract subdomain
app.use(cors(
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "https://fecom.weblasser.com"
));

// Your existing routes
app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(express.static("public"))
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/customer', CustomerRouter);
app.use("/super/admin", Superadminrouter);
app.use("/api/admin", adminauth);
app.use("/api/upload/image", Imageuploadroute);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    console.log(`Wildcard subdomains enabled. Try accessing with any subdomain.`);
});