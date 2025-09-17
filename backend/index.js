import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './src/config/db.js';
import veterinarioRouter from './src/routes/veterinarioRouter.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
conectarDB();

app.use(express.json());

app.use('/api/veterinarios', veterinarioRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
