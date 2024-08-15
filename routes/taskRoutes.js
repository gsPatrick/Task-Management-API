const express = require('express');
const {newTask,listAllTasks, listShortnessTasks, listCompletedTasks,listOngoingTasks, listOverdueTasks, updateTask, deleteTask, deleteAllTasks
} = require('../services/taskService');
const router = express.Router();


router.post('/newTask', async (req,res) => {

    try {
        const task = await newTask (req.body);
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json({error: error.message});
    }

})

router.get('/allTasks', async (_, res) => {
    try {
        const allTasks = await listAllTasks();
        res.status(200).json(allTasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} );

router.get('/short', async (_, res) => {
    try {
        const shortTask = await listShortnessTasks();
        res.status(200).json(shortTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} );


router.get('/completed', async (_, res) => {
    try {
        const completedTask = await listCompletedTasks();
        res.status(200).json(completedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/ongoing', async (_, res) => {
    try {
        const tasks = await listOngoingTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/overdue', async (_, res) => {
    try {
        const tasks = await listOverdueTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put ('/update/:id', async (req,res) => {
    try {
        const updatedTask = await updateTask(req.params.id, req.body);
        res.status(200).json(updatedTask); // Correção aqui
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/delete/:id', async (req,res) => {
    try {
        await deleteTask (req.params.id);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/deleteAll', async (_, res) => {
    try {
        await deleteAllTasks();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
