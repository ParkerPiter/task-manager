const express = require('express');
const routes = express.Router();
const Task = require('../schema/tasks');

const { check, validationResult } = require('express-validator');

//Rutas:

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtiene todas las tareas
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: Título de la tarea
 *                   description:
 *                     type: string
 *                     description: Descripción de la tarea
 *                   state:
 *                     type: boolean
 *                     description: Estado de la tarea
 */
routes.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find({});
        if (!tasks) {
            return res.status(404).send({ message: 'Tareas no encontradas' });
        }
        res.status(200).json(tasks);
    }
    catch(err) {
        res.status(500).send('Error al obtener las tareas');
    }
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtiene una tarea por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *             examples:
 *               example1:
 *                 summary: Ejemplo de respuesta exitosa
 *                 value: 
 *                   _id: 60c72b2f9b1d8c1a4c8b4567
 *                   title: Tarea de prueba
 *                   description: Esta es una tarea de prueba
 *                   state: false
 *                   date: 2021-06-13T00:00:00.000Z
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             examples:
 *               example1:
 *                 summary: Ejemplo de tarea no encontrada
 *                 value: 
 *                   message: Tarea no encontrada
 */routes.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(task);
    } catch (err) { 
        res.status(500).send('Error al obtener la tarea');
    }
}); 

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crea una nueva tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *           examples:
 *             example1:
 *               summary: Ejemplo de solicitud para crear una tarea
 *               value: 
 *                 title: Nueva tarea
 *                 description: Descripción de la nueva tarea
 *                 state: false
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             examples:
 *               example1:
 *                 summary: Ejemplo de respuesta exitosa
 *                 value: 
 *                   message: Tarea creada exitosamente
 *       400:
 *         description: Se encontraron errores en los datos ingresados
 *         content:
 *           application/json:
 *             examples:
 *               example1:
 *                 summary: Ejemplo de errores en los datos ingresados
 *                 value: 
 *                   message: Se encontraron errores en los datos ingresados
 *                   errors: 
 *                     - msg: El título es requerido, debe ingresar un título
 *                       param: title
 *                       location: body
 */
routes.post('/tasks', [
    check('title').isString().notEmpty().withMessage('El título es requerido, debe ingresar un título'),
    check('state').isBoolean().withMessage('El estado debe ser un valor booleano')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Se encontraron errores en los datos ingresados', errors: errors.array() });
    }

    const { title, description, state } = req.body;
    try {
        const task = new Task({
            title,
            description,
            state
        });
        await task.save();
        res.status(201).send('Tarea creada exitosamente');
    } catch (err) {
        res.status(500).send('Error al crear la tarea');
    }
});


/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualiza una tarea por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *           examples:
 *             example1:
 *               summary: Ejemplo de solicitud para actualizar una tarea
 *               value: 
 *                 title: Tarea actualizada
 *                 description: Descripción actualizada de la tarea
 *                 state: true
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             examples:
 *               example1:
 *                 summary: Ejemplo de respuesta exitosa
 *                 value: 
 *                   message: Tarea actualizada exitosamente
 *       400:
 *         description: Se encontraron errores en los datos ingresados
 *         content:
 *           application/json:
 *             examples:
 *               example1:
 *                 summary: Ejemplo de errores en los datos ingresados
 *                 value: 
 *                   message: Se encontraron errores en los datos ingresados
 *                   errors: 
 *                     - msg: El título es requerido y debe ser una cadena
 *                       param: title
 *                       location: body
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             examples:
 *               example1:
 *                 summary: Ejemplo de tarea no encontrada
 *                 value: 
 *                   message: Tarea no encontrada
 */
routes.put('/tasks/:id', 
    [check('title').isString().notEmpty().withMessage('El título es requerido, debe ingresar un título')]
    , async (req, res) => {
    const { title, description, state } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Se encontraron errores en los datos ingresados', errors: errors.array() });
    }
    try {
        await Task.findByIdAndUpdate(req.params.id, {
            title,
            description,
            state
        });
        res.status(200).send('Tarea actualizada exitosamente');
    } catch (err) {
        res.status(500).send('Error al actualizar la tarea');
    }
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *         content:
 *           application/json:
 *             examples:
 *               example1:
 *                 summary: Ejemplo de respuesta exitosa
 *                 value: 
 *                   message: Tarea eliminada exitosamente
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             examples:
 *               example1:
 *                 summary: Ejemplo de tarea no encontrada
 *                 value: 
 *                   message: Tarea no encontrada
 */
routes.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send({ message: 'Tarea no encontrada' });
        }
        res.status(200).send('Tarea eliminada exitosamente');
    } catch (err) {
        res.status(500).send({ message: 'Error al eliminar la tarea', error: err.message });
    }
});

// Ruta para inyectar datos de prueba
routes.get('/inject', async (req, res) => {
    try {
        const task = new Task({
            title: 'Tarea de prueba 2',
            description: 'Esta es una segunda tarea de prueba',
            state: true
        });
        await task.save();
        res.send('Datos de prueba inyectados');
    } catch (err) {
        res.status(500).send('Error al inyectar datos de prueba');
    }
});

module.exports = routes;

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - state
 *       properties:
 *         _id:
 *           type: string
 *           description: ID de la tarea
 *         title:
 *           type: string
 *           description: Título de la tarea
 *         description:
 *           type: string
 *           description: Descripción de la tarea
 *         state:
 *           type: boolean
 *           description: Estado de la tarea
 *         date:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la tarea
 *       example:
 *         _id: 60c72b2f9b1d8c1a4c8b4567
 *         title: Tarea de prueba
 *         description: Esta es una tarea de prueba
 *         state: false
 *         date: 2021-06-13T00:00:00.000Z
 */