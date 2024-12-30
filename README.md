# Backend API

Este es el backend de la aplicación, construido con Node.js y Express. Proporciona una API RESTful para manejar las operaciones de la aplicación.

## Requisitos

- Node.js
- npm

## Instalación

1. Clona el repositorio:
   git clone https://github.com/ParkerPiter/task-manager-backend

2. Navega al directorio del proyecto:
   cd tu-repositorio/backend

3. Instala las dependencias: 
   npm install

## Configuración

Crea un archivo .env en la raíz del proyecto y añade tus variables de entorno. Por ejemplo:
MONGO_URI=mongodb://localhost:27017/tu-base-de-datos

## Uso

Para iniciar el servidor de desarrollo, ejecuta:

npm start

El servidor se ejecutará en http://localhost:3001.

Rutas
Principal Routes
GET /api/tasks: Obtiene todas las tareas.
GET /api/tasks/:id: Obtiene una tarea por ID.
POST /api/tasks: Crea una nueva tarea.
PUT /api/tasks/:id: Actualiza una tarea por ID.
DELETE /api/tasks/:id: Elimina una tarea por ID.
Documentación de la API
La documentación de la API está disponible a través de Swagger. Para visualizar la documentación, inicia el servidor y navega a http://localhost:3001/api-docs.

Contribución
Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
3. Realiza tus cambios y haz commit (git commit -am 'Añadir nueva funcionalidad').
4. Sube tus cambios a tu fork (git push origin feature/nueva-funcionalidad).
. Crea un Pull Request.

Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.


