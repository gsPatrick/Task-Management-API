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
        validate: {
            isIn: {
                args: [['Baixa', 'Media', 'Alta', 'Sem prioridade']],
                msg: "A prioridade deve ser 'Baixa', 'Media', 'Alta' ou 'Sem prioridade'."
            }
        }
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('Em andamento', 'Concluída', 'Atrasada'),
        allowNull: false,
        defaultValue: 'Em andamento',
        validate: {
            isIn: {
                args: [['Em andamento', 'Concluída', 'Atrasada']],
                msg: "O status deve ser 'Em andamento', 'Concluída' ou 'Atrasada'."
            }
        }
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
}, {
    tableName: 'Tasks' // Especifica o nome da tabela explicitamente, se necessário
});

module.exports = Task;
