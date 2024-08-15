const Task = require('../models/Task');

const newTask = async (taskData) => {
    try {
        const newTask = await Task.create ({
            title: taskData.title,
            description: taskData.description,
            priority: taskData.priority,
            dueDate: taskData.dueDate,
            status: taskData.status
        });
        return newTask;
    } catch (error) {
        console.error('Erro ao criar a tarefa:', error); // Corrigido: adiciona o erro no log para mais detalhes
        throw new Error('Erro ao tentar cria uma nova tarefas');
    }
};

const listAllTasks = async () => {
    try {
        const tasks = await Task.findAll({
            attributes: ['id', 'title', 'description', 'priority', 'dueDate', 'status', 'createdAt', 'updatedAt']
        });
        return tasks;
    } catch (error) {
        throw new Error("Não foi possível listar as tarefas");
    }
};

const listShortnessTasks = async () => {
    try {
        const tasks = await Task.findAll({
            attributes: ['id', 'title', 'description', 'priority', 'status']
        });
        return tasks;
    } catch (error) {
        throw new Error("Não foi possível listar as tarefas");
    }
};

const listCompletedTasks = async () => {
    try {
        const tasks = await Task.findAll({
            where: {status:'concluida'},
            attributes: ['id', 'title', 'description', 'priority', 'dueDate', 'status', 'createdAt', 'updatedAt']
        });
        return tasks;
    } catch (error) {
        throw new Error("Não foi possível listar as tarefas concluidas");
    }
};

const listOngoingTasks = async() => {
    try{
        const tasks = await Task.findAll({
            where: {status:'Em andamento'},
            attributes: ['id', 'title', 'description', 'priority', 'dueDate', 'status', 'createdAt', 'updatedAt']
        });
        return tasks;
    } catch (error) {
        throw new Error("Não foi possível listar as tarefas em andamento");
    }
};

const listOverdueTasks = async () => {
    try {
        const tasks = await Task.findAll ({
            where: {status: 'Atrasada'},
            attributes: ['id', 'title', 'description', 'priority', 'dueDate', 'status', 'createdAt', 'updatedAt']
        }) 
        return tasks;
    } catch (error) {
        throw new Error("Não foi possível listar as tarefas atrasadas");
    }
} 

const updateTask = async (taskId, updatedData) => {
    try {
        await Task.update(updatedData, {
            where: {id: taskId}
        });
        const updatedTask = await Task.findByPk(taskId);
        return updatedTask;
    } catch (error) {
        throw new Error('Não foi possível atualizar a tarefa');
    }
};

const deleteTask = async (taskId) => {
    try {
        await Task.destroy({
            where: {id: taskId}
        });
    } catch (error) {
        throw new Error('Não foi possível deletar a tarefa');
    }
};

const deleteAllTasks = async () => {
    try {
           const result = await Task.destroy ({
                where: {},
                truncate:true
            });
            return result;
        } catch (error) {
            throw new Error("Não foi possível deletar todas as tarefas");  
      }
}

module.exports = {
    newTask,
    listAllTasks,
    listShortnessTasks,
    listCompletedTasks,
    listOngoingTasks,
    listOverdueTasks,
    updateTask,
    deleteTask,
    deleteAllTasks
}
