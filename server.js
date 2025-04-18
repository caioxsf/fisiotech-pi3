const express = require("express");
const routerInicio = require("./routes/inicioRoute");
const routerPaciente = require("./routes/pacienteRoute");
const routerConsulta = require("./routes/consultaRoute");
const routerLogin = require ("./routes/loginRoute");
const routerAdm = require('./routes/admRoute');
const expressEjsLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const app = express();
const dotenv = require('dotenv');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.set("view engine", "ejs");
app.set("layout", "./layout");

app.use(express.static("public"));
app.use(expressEjsLayout);

app.use("/", routerInicio);
app.use("/paciente", routerPaciente);
app.use("/consulta", routerConsulta);
app.use("/login", routerLogin);
app.use('/administrador', routerAdm);

global.CAMINHO_IMG_NAV_ATESTADO = "/img/atestado/";
global.CAMINHO_IMG_NAV_PACIENTE = "/img/paciente/";
global.CAMINHO_IMG_REAL = __dirname + "/public";

app.listen(2525, function() {
    console.log("servidor iniciado!");
})
