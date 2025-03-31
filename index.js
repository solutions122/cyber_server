const express = require('express');
const cors = require('cors');
const connectToMongoose = require("./database")
const app = express();


app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's domain
  }));
  
  connectToMongoose()  
app.use(express.json());


app.use('/api/admin',require('./Router/router'))

const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
