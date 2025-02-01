const express = require('express');
const connectDB=require('./config/db')
const app = express();
const cors=require('cors')

const postRoute=require('./routes/postRoute')

//middleware
app.use(cors())
app.use(express.json())

//connectDB
connectDB();


app.use('/',postRoute);

app.get('/', (req, res) => {
  res.send('Hello from post_service');
}
);
const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});