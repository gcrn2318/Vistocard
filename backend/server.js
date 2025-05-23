const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
}));
app.use(express.json());

// mongoose.connect("mongodb+srv://admins:visitingcards@vistocard.t30ugqa.mongodb.net/guru?retryWrites=true&w=majority&appName=VistoCard", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch(err => console.error('MongoDB connection error:', err));

app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});