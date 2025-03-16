import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import Algorithm from "../models/Algorithm";  // Modelo de algoritmo

export const collections: { algorithms?: mongoDB.Collection<Algorithm> } = {};

export async function connectToDatabase() {
    // Cargar el archivo .env para acceder a las variables de entorno
    dotenv.config();

    // Crear un nuevo cliente de MongoDB con la cadena de conexión desde .env
    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);

    // Conectar al clúster de MongoDB
    await client.connect();

    // Conectar a la base de datos con el nombre especificado en .env
    const db = client.db(process.env.DB_NAME);

    // Aplicar validación de esquema a la colección
    await applySchemaValidation(db);

    // Conectar a la colección de algoritmos especificada en .env
    const algorithmsCollection = db.collection<Algorithm>(process.env.ALGORITHMS_COLLECTION_NAME!);

    // Persistir la conexión a la colección de algoritmos
    collections.algorithms = algorithmsCollection;

    console.log(
        `Successfully connected to database: ${db.databaseName} and collection: ${algorithmsCollection.collectionName}`,
    );
}

// Actualizar nuestra colección existente con validación de esquema JSON para asegurar que los documentos siempre coincidan con la forma de nuestro modelo de Algoritmo
async function applySchemaValidation(db: mongoDB.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "complexity", "category"],  // Campos necesarios para un algoritmo
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                complexity: {
                    bsonType: "string",
                    description: "'complexity' is required and is a string",  // Complejidad del algoritmo
                },
                category: {
                    bsonType: "string",
                    description: "'category' is required and is a string",  // Categoría del algoritmo
                },
                description: {
                    bsonType: "string",
                    description: "'description' is optional and is a string",  // Descripción del algoritmo (opcional)
                },
                created_at: {
                    bsonType: "date",
                    description: "'created_at' is optional and is a date",  // Fecha de creación (opcional)
                },
            },
        },
    };

    // Intentar aplicar la modificación al esquema de la colección, si la colección no existe, crearla
    await db.command({
        collMod: process.env.ALGORITHMS_COLLECTION_NAME!,
        validator: jsonSchema,
    }).catch(async (error: mongoDB.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection(process.env.ALGORITHMS_COLLECTION_NAME!, { validator: jsonSchema });
        }
    });
}
