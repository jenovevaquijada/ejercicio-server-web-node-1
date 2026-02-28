let datosActuales = [];
let tipoActual = '';

async function cargarDatos(tipo) {
    tipoActual = tipo;
    const response = await fetch(`/catalogo/${tipo}`);
    datosActuales = await response.json();
    renderizar();
}

function renderizar() {
    const lista = document.getElementById('lista-contenido');
    const controls = document.getElementById('sort-controls');
    const btnExtra = document.getElementById('btn-extra-sort');
    
    lista.innerHTML = '';
    controls.style.display = 'block';

    if (tipoActual === 'peliculas') {
        btnExtra.innerText = 'Director';
        btnExtra.onclick = () => ordenar('director');
    } else {
        btnExtra.innerText = 'Temporadas';
        btnExtra.onclick = () => ordenar('temporadas');
    }

    datosActuales.forEach(item => {
        const li = document.createElement('li');
        li.className = 'card';
        const info = tipoActual === 'peliculas' 
            ? `🎬 <strong>${item.nombre}</strong> - Dir: ${item.director} (${item.anio})`
            : `📺 <strong>${item.nombre}</strong> - ${item.anio} (${item.temporadas} temp.)`;
        
        li.innerHTML = `${info} <button class="delete-btn" onclick="eliminar('${item.nombre}')">🗑️</button>`;
        lista.appendChild(li);
    });
}

function ordenar(criterio) {
    datosActuales.sort((a, b) => a[criterio] > b[criterio] ? 1 : -1);
    renderizar();
}

async function agregarItem(tipo) {
    const prefix = tipo === 'peliculas' ? 'p-' : 's-';
    const body = tipo === 'peliculas' 
        ? { nombre: document.getElementById('p-nombre').value, director: document.getElementById('p-director').value, anio: document.getElementById('p-anio').value }
        : { nombre: document.getElementById('s-nombre').value, anio: document.getElementById('s-anio').value, temporadas: document.getElementById('s-temporadas').value };

    await fetch(`/catalogo/${tipo}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    cargarDatos(tipo);
}

async function eliminar(nombre) {
    if(confirm(`¿Eliminar ${nombre}?`)) {
        await fetch(`/catalogo/${tipoActual}/${nombre}`, { method: 'DELETE' });
        cargarDatos(tipoActual);
    }
}