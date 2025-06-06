import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import { __dirname } from './utils/path.js';
import viewsRouter from './routes/views.routes.js';
import productRoutes from './routes/products.routes.js';
import cartRoutes from './routes/carts.routes.js';
import sessionRoutes from './routes/sessions.routes.js';
import { initPassport } from './config/passport.config.js';
import config from './config/config.js';
import { Server } from 'socket.io';
import Product from './dao/mongo/models/Product.js';
import './config/passport.js';


const app = express();
const PORT = config.port || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));

// View engine
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/src/views`);

// Passport
initPassport();
app.use(passport.initialize());

// Routes
app.use('/', viewsRouter);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/sessions', sessionRoutes);

// Conexión a MongoDB y servidor con WebSocket
console.log('Iniciando la aplicación...');
mongoose.connect(config.mongoUrl)
  .then(() => {
    console.log('Conectado a MongoDB');

    const httpServer = app.listen(PORT, () =>
      console.log(`Servidor corriendo en puerto ${PORT}`)
    );
    const io = new Server(httpServer);

    io.on('connection', async (socket) => {
      console.log('Cliente conectado a Socket.io');

      const products = await Product.find().lean();
      socket.emit('update-products', products);
    });
  })
  .catch((err) => {
    console.error('Error conectando a MongoDB:', err);
  });
