# Algorithm-Complexity-Visualizer
A time complexity simulator for algorithms

1. Estructura Inicial del Proyecto
Proyecto en Node.js: Se configuró un proyecto utilizando Node.js con TypeScript.
Estructura de carpetas: El código se organizó dentro de carpetas como src para el código fuente y models para los esquemas de la base de datos.
Uso de TypeScript: El proyecto se desarrolló utilizando TypeScript para aprovechar el tipado estático.
2. Dependencias Instaladas
Express: Usado para crear el servidor web y gestionar las rutas de la API.
MongoDB: Instalación de la librería mongodb para la conexión con la base de datos MongoDB.
dotenv: Instalación de dotenv para manejar las variables de entorno como la cadena de conexión a MongoDB.
3. Conexión con MongoDB
Configuración de la conexión: Se configuró la conexión a MongoDB usando las credenciales almacenadas en el archivo .env.
Colección de algoritmos: Se creó una colección llamada algorithms para almacenar los algoritmos en la base de datos.
4. Definición de Modelos y Esquemas
Modelo de datos: Se definió un modelo para los algoritmos, que incluye campos como name, description, complexity, category, code, entre otros.
Validación de esquema: Se aplicó una validación básica para garantizar que los documentos en la base de datos respeten la estructura definida en el modelo.
5. Rutas de la API
Algoritmos Router: Se definieron rutas para gestionar los algoritmos de la siguiente manera:
GET /algorithms: Devuelve todos los algoritmos almacenados en la base de datos.
GET /algorithms/:id: Devuelve un algoritmo específico por su ID.
POST /algorithms: Permite agregar un nuevo algoritmo a la base de datos.
PUT /algorithms/:id: Permite actualizar un algoritmo existente.
DELETE /algorithms/:id: Permite eliminar un algoritmo por su ID.
6. Inserción Automática de Algoritmos
Agregar algoritmos automáticamente: Se implementó un fragmento de código para insertar algoritmos en la base de datos solo si no existe un algoritmo con el mismo nombre.
Verificación de existencia: Antes de agregar un algoritmo, el sistema revisa si ya existe un algoritmo con el mismo nombre para evitar duplicados.
7. Ejecución del Proyecto
Ejecutar el servidor: El servidor se ejecuta con el comando node dist/index.js para poner en marcha el servidor web y la conexión a la base de datos.
Verificación de funcionamiento: El servidor se conecta correctamente a MongoDB y está listo para recibir solicitudes en las rutas definidas.
8. Errores y Soluciones
Problemas con la conexión y validación: Durante el desarrollo, se resolvieron problemas relacionados con la conexión a la base de datos y la validación de los modelos, ajustando las rutas y configuraciones del proyecto.
Manejo de tipos con TypeScript: Se resolvieron problemas relacionados con el uso de TypeScript y la definición de tipos en los modelos.
9. Próximos Pasos
Agregar más algoritmos: El objetivo es seguir agregando más algoritmos a la base de datos, ampliando la colección.
Interfaz de usuario: Se planea desarrollar una interfaz web para visualizar y gestionar los algoritmos, utilizando tecnologías como Next.js.
Pruebas adicionales: Continuar probando las rutas de la API y asegurar que la base de datos se mantenga consistente.
Archivos Principales
src/index.ts: Archivo principal que configura y ejecuta el servidor.
src/routes/algorithms.router.ts: Contiene las rutas para gestionar los algoritmos.
src/models/algorithm.model.ts: Define la estructura de los algoritmos y sus propiedades.
src/services/database.service.ts: Gestiona la conexión a MongoDB y la configuración de las colecciones.