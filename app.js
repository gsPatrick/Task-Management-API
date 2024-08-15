const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const sequelize = require('./config/database'); // Importação do sequelize
const Task = require('./models/Task'); // Importar o modelo Task para sincronização

const app = express();

app.use(bodyParser.json());

app.use('/tasks', taskRoutes);

// Rota padrão para tratar erros de rota não encontrada
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

// Middleware para tratar erros internos
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

// Sincroniza o modelo com o banco de dados e inicializa o servidor
sequelize.sync({ force: true }).then(() => {  // 'force: true' recria a tabela a cada execução (use com cuidado)
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(err => {
    console.error('Erro ao sincronizar o banco de dados:', err);
});

module.exports = app;
