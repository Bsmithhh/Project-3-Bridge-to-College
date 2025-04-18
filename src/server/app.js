const express = require('express');
const mongoose = require('mongoose');
const interactionsRouter = require('./routes/interactions');

const app = express();

mongoose.connect('mongodb://localhost/truthbot', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use('/api/interactions', interactionsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 