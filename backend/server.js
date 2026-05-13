const cookieParser = require('cookie-parser');
const express = require("express");
const dotenv = require('dotenv');
const userRouter = require("./routes/userRoutes");
const connectDB = require('./config/db');
const companyRouter = require('./routes/companyRoutes');



dotenv.config();

const app = express();

app.use(express.json());  // translator that covert json into js so controller can understand it 
app.use(cookieParser());


app.use('/api/users', userRouter);
app.use('/api/company', companyRouter);

connectDB();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello from job portal backend');
});

app.listen(PORT, () => {
    console.log(`Server is running successfully on port ${PORT}`);
});
