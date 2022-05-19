const app = require('./app');
const port = process.env.PORT || 3000;
const db = require('./database');

const routes = require('./src/routes');

routes(app);

app.listen(port, () => console.log(`servidor rodando na porta ${port}`));
