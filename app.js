const express = require('express');
const fs = require('fs/promises'); 
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

async function leerArchivo(tipo) {
    const archivo = tipo === 'peliculas' ? 'peliculas.txt' : 'series.txt';
    try {
        const data = await fs.readFile(path.join(__dirname, archivo), 'utf-8');
        return data.split('\n')
            .filter(linea => linea.trim() !== '')
            .map(linea => {
                const partes = linea.split(',').map(p => p.trim());
                if (tipo === 'peliculas') {
                    return { nombre: partes[0], director: partes[1], anio: partes[2] };
                } else {
                    return { nombre: partes[0], anio: partes[1], temporadas: partes[2] };
                }
            });
    } catch (error) {
        return [];
    }
}

app.get('/catalogo/:tipo', async (req, res) => {
    const { tipo } = req.params;
    if (tipo !== 'peliculas' && tipo !== 'series') {
        return res.status(400).json({ error: 'Tipo no válido. Usa "peliculas" o "series".' });
    }
    const datos = await leerArchivo(tipo);
    res.json(datos);
});

app.post('/catalogo/:tipo', async (req, res) => {
    const { tipo } = req.params;
    const nuevaEntrada = req.body;
    const archivo = tipo === 'peliculas' ? 'peliculas.txt' : 'series.txt';

    let linea;
    if (tipo === 'peliculas') {
        linea = `\n${nuevaEntrada.nombre}, ${nuevaEntrada.director}, ${nuevaEntrada.anio}`;
    } else if (tipo === 'series') {
        linea = `\n${nuevaEntrada.nombre}, ${nuevaEntrada.anio}, ${nuevaEntrada.temporadas}`;
    } else {
        return res.status(400).json({ error: 'Tipo no válido' });
    }

    await fs.appendFile(path.join(__dirname, archivo), linea);
    res.status(201).json({ mensaje: 'Agregado con éxito' });
});

app.delete('/catalogo/:tipo/:nombre', async (req, res) => {
    const { tipo, nombre } = req.params;
    const datos = await leerArchivo(tipo);
    
    const nuevosDatos = datos.filter(item => item.nombre.toLowerCase() !== nombre.toLowerCase());
    
    const contenidoTexto = nuevosDatos.map(item => {
        return tipo === 'peliculas' 
            ? `${item.nombre}, ${item.director}, ${item.anio}`
            : `${item.nombre}, ${item.anio}, ${item.temporadas}`;
    }).join('\n');

    const archivo = tipo === 'peliculas' ? 'peliculas.txt' : 'series.txt';
    await fs.writeFile(path.join(__dirname, archivo), contenidoTexto);
    
    res.json({ mensaje: `${nombre} eliminado correctamente.` });
});

app.use((req, res) => {
    res.status(405).json({ 
        error: `El método ${req.method} no está permitido para la ruta ${req.originalUrl}` 
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});