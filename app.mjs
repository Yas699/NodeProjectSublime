import express from 'express';
import cors from 'cors';
import { mongoConnection } from './database/connection.mjs';
import dotenv from 'dotenv';
import { customerRoute } from './routes/customer.mjs';

const app = express();

dotenv.config({
    path : '/app/envs/env'
})

app.use(cors());
app.use(express.json({extended : false}));
mongoConnection();

app.use('/customer', customerRoute)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});



