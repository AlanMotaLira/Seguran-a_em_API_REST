require('dotenv').config();
const app = require('./app');
const routes = require('./src/routes');

const port = process.env.PORT || 3000;
// eslint-disable-next-line no-unused-vars
const db = require('./database');
require('./redis/blacklist');

routes(app);

app.listen(port, () => console.log(`servidor rodando na porta ${port}`));
