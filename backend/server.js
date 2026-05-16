const cookieParser = require('cookie-parser');
const express = require("express");
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const userRouter = require("./routes/userRoutes");
const companyRouter = require('./routes/companyRoutes');
const jobRouter = require('./routes/jobRoutes');
const applicationRouter = require('./routes/applicationRoutes');





dotenv.config();

const app = express();

app.use(express.json());  // translator that covert json into js so controller can understand it 
app.use(cookieParser());


app.use('/api/users', userRouter); // ye rasta set karta hai [Base Route] --> combining this with the routes became the whole URL 
app.use('/api/company', companyRouter); // isse start ho to companyRouter ke pass bhej dena 
app.use('/api/jobs', jobRouter); 
app.use('/api/application', applicationRouter);

connectDB();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello from job portal backend');
});

app.listen(PORT, () => {
    console.log(`Server is running successfully on port ${PORT}`);
});
