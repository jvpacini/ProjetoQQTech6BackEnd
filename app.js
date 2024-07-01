require("dotenv").config(); // Load environment variables
const express = require("express");
const usuarioRoutes = require("./routes/UsuarioRoutes");
const perfilRoutes = require("./routes/PerfilRoutes");
const moduloRoutes = require("./routes/ModuloRoutes");
const transacaoRoutes = require("./routes/TransacaoRoutes");
const funcaoRoutes = require("./routes/FuncaoRoutes");
const moduloFuncoesRoutes = require("./routes/ModuloFuncaoRoutes");
const perfilModulosRoutes = require("./routes/PerfilModuloRoutes");
const moduloTransacaoRoutes = require("./routes/ModuloTransacaoRoutes");

const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your front-end URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'x-auth-token'] // Allowed headers
}));

app.use("/api", usuarioRoutes);
app.use("/api", perfilRoutes);
app.use("/api", moduloRoutes);
app.use("/api", transacaoRoutes);
app.use("/api", funcaoRoutes);
app.use("/api", perfilModulosRoutes);
app.use("/api", moduloFuncoesRoutes);
app.use("/api", moduloTransacaoRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
