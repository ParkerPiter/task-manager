const express = require('express');
const connectDB = require('./db');
const principalRoutes = require('./routes/principal.routes');
const setupSwagger = require('./doc/swagger');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
connectDB();
setupSwagger(app);

app.use('/api', principalRoutes);

const port = 3001;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);