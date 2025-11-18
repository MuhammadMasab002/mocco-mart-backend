import express from 'express';
import cors from 'cors';
import userRouter from './src/routes/userRouter.js';

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));


app.get('/', (req, res) => {
    res.send('Welcome to Moco Mart API');
})
app.use('/api/auth/user', userRouter)


export default app;
