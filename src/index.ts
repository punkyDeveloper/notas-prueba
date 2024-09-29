import express, {  } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './api/db/conection'; 
import { router } from './api/routers/router';
import cors from 'cors'; // Importa el middleware cors

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const app = express();
const port = process.env.PORT || 3001;

// Conectar a la base de datos MongoDB
connectDB();

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Configurar CORS
if (process.env.CORS === 'development') {
  // Permitir solicitudes CORS solo desde el frontend en desarrollo
  app.use(cors({
    origin: 'http://localhost:5173', // Cambia esto por la URL de tu frontend en desarrollo
  }));
} else {
  // Configuración para producción
  app.use(cors({
    origin: 'https://miapp.com', // Cambia esto por tu dominio de producción
  }));
}

// Usar el enrutador para las rutas
app.use('/', router);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});