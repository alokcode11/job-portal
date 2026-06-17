const cookieParser = require('cookie-parser');
const express = require("express");
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const userRouter = require("./routes/userRoutes");
const companyRouter = require('./routes/companyRoutes');
const jobRouter = require('./routes/jobRoutes');
const applicationRouter = require('./routes/applicationRoutes');
const cors = require('cors');

dotenv.config();


const app = express();


app.use(cors({
  origin: "http://localhost:5173", // Alow react app to interact
  credentials: true // Allow cookies/headers to be sent back and forth 
}));

app.use(express.json());  // translator that covert json into js so controller can understand it 
app.use(cookieParser());


app.use('/api/users', userRouter); // ye rasta set karta hai [Base Route] --> combining this with the routes became the whole URL 
app.use('/api/company', companyRouter); // isse start ho to companyRouter ke pass bhej dena 
app.use('/api/jobs', jobRouter); 
app.use('/api/application', applicationRouter);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`[SERVER] Server is running at http://localhost:${PORT}`);
      console.log(`[SERVER] Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch((error) => {
    console.error("[SERVER] Failed to start server:", error.message);
    process.exit(1); // Exit process on database connection failure
  });

app.get('/', (req, res) => {
    res.send('Hello from job portal backend');
});

