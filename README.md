# ejercicio-server-web-node-1# 🎬 Netflix Catalogue API

Bienvenida/o a mi catálogo digital de películas y series. Este proyecto es una API REST construida con **Node.js** y **Express**, diseñada bajo los principios de programación asíncrona (non-blocking) y manejo eficiente de datos en archivos planos.

> **Tagline:** Construyendo experiencias digitales desde la empatía y la creatividad.

---

## 🚀 Características
* **API RESTful:** Endpoints estructurados para operaciones CRUD (Create, Read, Delete).
* **Persistencia de Datos:** Almacenamiento en archivos de texto (`.txt`) mediante el módulo `fs/promises`.
* **Seguridad y Errores:** Implementación de códigos de estado HTTP, incluyendo el error **405** para métodos no permitidos.
* **Interfaz de Usuario:** Frontend minimalista y responsivo con feedback visual de acciones.

## 🛠️ Tecnologías utilizadas
* **Backend:** Node.js, Express.
* **Frontend:** HTML5, CSS3 (Flexbox), JavaScript (Fetch API).
* **Persistencia:** File System (fs).

## 📋 Requisitos y Ejecución
1.  Clona el repositorio.
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el servidor:
    ```bash
    node app.js
    ```
4.  Accede a `http://localhost:3000` en tu navegador.

## 📡 Endpoints principales
| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `GET` | `/catalogo/:tipo` | Obtiene la lista completa de películas o series. |
| `POST` | `/catalogo/:tipo` | Agrega un nuevo ítem al archivo correspondiente. |
| `DELETE` | `/catalogo/:tipo/:nombre` | Elimina un registro por su nombre. |

## 👩🏻‍💻 Autora
Jenoveva Quijada
