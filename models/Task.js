const { DataTypes } = require('sequelize');
const sequelize = require ('../config/database')


const Task = sequelize.define('Task', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    priority: {
        type: DataTypes.ENUM('Baixa', 'Media', 'Alta', 'Sem prioridade'),
        allowNull: true,
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('Em andamento', 'Concluída', 'Atrasada'), 
        allowNull: false,
        defaultValue: 'Em andamento',
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }

});

module.exports = Task;
