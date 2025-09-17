import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        const url = `${db.connection.host}:${db.connection.port}`;
        console.log("DB Conectada en:", url);
    } catch (error) {
        console.error("Error al conectar a la base:", error.message);
        process.exit(1); // Exit the process with failure
    }
}

    export default conectarDB;