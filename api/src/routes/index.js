const { Router } = require("express");
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const roomRoutes = require("./Room");
const usuarioRoutes = require("./Usuario");
const cenaRoutes = require("./Cena");
const almuerzoRoutes = require("./almuerzo");
const desayunoRoutes = require("./Desayuno");
const comidasRoutes = require("./comidas");
const transporteRoutes = require("./Transporte");
const carritoRoutes = require("./carrito");

const stripe = require("./Stripe");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(usuarioRoutes);
router.use(cenaRoutes);
router.use(almuerzoRoutes);
router.use(desayunoRoutes);
router.use(comidasRoutes);
router.use(roomRoutes);
router.use(transporteRoutes);
router.use(carritoRoutes);
router.use(stripe);

module.exports = router;
