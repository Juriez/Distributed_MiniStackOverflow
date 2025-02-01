const express = require('express');
const connectDB=require('./config/db')
const app = express();
const cors=require('cors')
const notificationRoute=require('./routes/notificationRoute')
require('./jobs/notificationCleaner')
//middleware
app.use(cors())
app.use(express.json())

//connectDB
connectDB();


app.use('/',notificationRoute);

const PORT = 5003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});