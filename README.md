# 🛒 E-Commerce Backend

Proyecto final del curso Backend de Coderhouse. Aplicación de backend desarrollada con Node.js, Express y MongoDB.

## 🚀 Funcionalidades

- Sistema de usuarios con autenticación (JWT)
- Control de roles (admin, usuario)
- Manejo de productos (crear, actualizar, eliminar) solo por admin
- Manejo de carritos por usuario
- Sistema de compra que valida stock y genera tickets
- Generación de tickets de compra únicos
- Implementación del patrón DAO y Repository
- Rutas protegidas y DTO para el usuario actual

## 🧰 Tecnologías utilizadas

- Node.js + Express
- MongoDB + Mongoose
- Passport + JWT
- bcrypt
- dotenv
- handlebars

## 🔐 Variables de entorno

Crear un archivo `.env` con los siguientes campos:

```env
PORT=8080
MONGO_URL=mongodb+srv://ignaciodaddario:Liam1603177@cluster0.zggve.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
