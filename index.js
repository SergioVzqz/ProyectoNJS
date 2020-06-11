//Dependencias
const morgan = require('morgan');
const express = require('express');
const app = express();

// Rutas
const user = require('./routes/user');
const sistema = require('./routes/sistema');

//Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');


app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);

app.use("/user", user)

app.use(auth);

app.use("/sistema", sistema);

app.use(notFound);

app.listen(process.env.PORT || 4000, () => {
    console.log('Server is running...');
});


