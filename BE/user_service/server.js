const express = require('express');
const connectDB=require('./config/db')
const app = express();
const cors=require('cors')
const authRoute=require('./routes/authRoute')

//middleware
app.use(cors())
app.use(express.json())
//connectDB
connectDB();

app.use('/',authRoute);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});