import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";  // Asegúrate de que `collections` esté configurado para la colección de algoritmos

export const algorithmsRouter = express.Router();

algorithmsRouter.use(express.json());

// Obtener todos los algoritmos
algorithmsRouter.get("/", async (_req: Request, res: Response) => {
    try {
        // Buscar todos los documentos en la colección de algoritmos
        const algorithms = await collections.algorithms.find({}).toArray();
        res.status(200).send(algorithms);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener un algoritmo por su ID: http://localhost:8080/algorithms/610aaf458025d42e7ca9fcd0
algorithmsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        // _id en MongoDB es de tipo ObjectId, así que buscamos el documento específico
        const query = { _id: new ObjectId(id) };
        const algorithm = await collections.algorithms.findOne(query);

        if (algorithm) {
            res.status(200).send(algorithm);
        } else {
            res.status(404).send(`Unable to find algorithm with id: ${id}`);
        }
    } catch (error) {
        res.status(500).send(`Error retrieving algorithm with id: ${id}`);
    }
});

// Crear un nuevo algoritmo
algorithmsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newAlgorithm = req.body;  // El algoritmo a crear está en el cuerpo de la solicitud
        const result = await collections.algorithms.insertOne(newAlgorithm);

        result
            ? res.status(201).send(`Successfully created a new algorithm with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new algorithm.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// Actualizar un algoritmo existente
algorithmsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedAlgorithm = req.body;  // El algoritmo actualizado está en el cuerpo de la solicitud
        const query = { _id: new ObjectId(id) };
        // Usamos $set para actualizar el documento
        const result = await collections.algorithms.updateOne(query, { $set: updatedAlgorithm });

        result
            ? res.status(200).send(`Successfully updated algorithm with id ${id}`)
            : res.status(304).send(`Algorithm with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// Eliminar un algoritmo por su ID
algorithmsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.algorithms.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed algorithm with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove algorithm with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Algorithm with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
