import express from 'express';
import userRoutes from './routes/userRoute';

const app = express();

// ... Other middleware and configuration ...

// Include the userRoutes
app.use('/api/users', userRoutes);

// ... Other routes and middleware ...

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});