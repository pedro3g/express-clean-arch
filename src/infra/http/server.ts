import express from 'express';
import userRouter from './modules/user';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World' });
});

app.use('/users', userRouter);

void mongoose
  .connect('mongodb://localhost:27017/caf')
  .then(() => {
    app.listen(3333, () => {
      console.log('Server is running on http://localhost:3333');
    });
  })
  .catch((err) => {
    console.log(err);
  });
