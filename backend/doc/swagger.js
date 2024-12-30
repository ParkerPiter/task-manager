const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Tasks Manager",
            version: "1.0.0",
            description: "API de Tasks Manager con Node.js y Express",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor de desarrollo"
            }
        ]
    },
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);
const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
