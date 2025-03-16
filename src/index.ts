import express from 'express';
import { connectToDatabase } from './services/database.service';
import { algorithmsRouter } from './routes/algorithms.router';

const app = express();
const port = 8080;

connectToDatabase()
    .then(() => {
        app.use("/algorithms", algorithmsRouter);

        // Insertar automáticamente el algoritmo al iniciar el servidor
        algorithmsRouter.post("/", (req, res) => {
            // Ejecuta la ruta POST para insertar automáticamente el algoritmo
            req.body = {};  // Aquí puedes enviar el algoritmo directamente si quieres
            res.send("Algorithm automatically added!");
        });

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
