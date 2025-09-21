import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './src/config/db.js';
import veterinarioRouter from './src/routes/veterinarioRouter.js';
import pacienteRouter from './src/routes/PacienteRouter.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
conectarDB();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());

app.use('/api/veterinarios', veterinarioRouter);
app.use('/api/pacientes', pacienteRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
