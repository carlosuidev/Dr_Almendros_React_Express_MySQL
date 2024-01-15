import express from "express";
import morgan from "morgan";
import cors from 'cors';

import indexRoutes from "./routes/index.routes.js";
import empleadosRoutes from "./routes/empleados.routes.js";
import pacientesRoutes from "./routes/pacientes.routes.js";
import serviciosRoutes from "./routes/servicios.routes.js";
import citasRoutes from "./routes/citas.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes
app.use("/", indexRoutes);
app.use("/api", indexRoutes);
app.use("/api/empleados", empleadosRoutes);
app.use("/api/pacientes", pacientesRoutes);
app.use("/api/servicios", serviciosRoutes);
app.use("/api/citas", citasRoutes);
app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
