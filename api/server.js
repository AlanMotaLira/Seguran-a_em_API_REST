const app = require('./app');
const routes = require('./src/routes');
const port = process.env.PORT || 3000;
routes(app);

app.listen(port, () => console.log(`servidor rodando na porta ${port}`));
