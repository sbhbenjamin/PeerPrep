import express from 'express';
import userRoutes from './routes/userRoute';
const cors = require('cors');

const app = express();
const corsOptions = {
  origin: ['http://localhost:3000', 'https://yourproductiondomain.com'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // enable session cookie
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Include the userRoutes
app.use('/api/users', userRoutes);

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});