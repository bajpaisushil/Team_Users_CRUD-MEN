import bodyParser from 'body-parser';
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import userRoutes from './routes/users.js';
import teamRoutes from './routes/team.js';

config();

const app=express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
const PORT=process.env.PORT || 5000;
const DB_URL=process.env.DB_URL;

mongoose.connect(DB_URL)
.then(()=> console.log('Connected to DB'))
.catch((err)=> console.log(`Database connection failed `, err.message));

app.get('/ping', (req, res)=>{
    res.send('Pong');
})
app.use('/api/users', userRoutes);
app.use('/api/team', teamRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is listening on port: ${PORT}`);
})
