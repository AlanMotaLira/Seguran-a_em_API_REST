const app = require('./app');
const routes = require('./src/routes');

const port = process.env.PORT || 3000;
const db = require('./database');

routes(app);

app.listen(port, () => console.log(`servidor rodando na porta ${port}`));
