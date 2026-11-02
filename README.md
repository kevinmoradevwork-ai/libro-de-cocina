# 📖 El Recetario de la Abuela - Revelación de Embarazo Sorpresa

Una experiencia web interactiva fotorrealista diseñada como un antiguo libro de recetas de cocina familiar con animación de paso de página en 3D/2D, texturas de pergamino, efectos de sonido de hojas de papel y una emotiva revelación final con ecografía y confeti.

---

## 🚀 Inicio Rápido

1. **Instalar dependencias** (si no lo has hecho ya):
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre el enlace que muestra la consola (por defecto: `http://localhost:5173`) en tu navegador o en el de tu teléfono móvil.

3. **Construir para producción** (para subir a Netlify, Vercel, GitHub Pages, etc.):
   ```bash
   npm run build
   ```

---

## 📁 Estructura del Proyecto

```text
revelacion-abuela/
├── public/
│   ├── ultrasonido-placeholder.svg  # Ecografía médica fotorrealista por defecto
│   └── favicon.svg                  # Ícono de pestaña
├── src/
│   ├── pagesData.js                 # ✏️ Todos los textos, ingredientes, notas y fecha editable
│   ├── book.js                      # Configuración de PageFlip, páginas HTML y lógica de interacción
│   ├── audio.js                     # Sonidos realistas de papel y campanitas (Web Audio API)
│   ├── celebrations.js              # Explosión de confeti y chispas doradas para el clímax
│   ├── style.css                    # Estilos fotorrealistas: pergamino, harina, cuero, polaroid
│   └── main.js                      # Punto de entrada y barra de controles
├── index.html                       # HTML base y Google Fonts
├── vite.config.js                   # Configuración del servidor Vite
└── package.json
```

---

## 📷 Cómo cambiar la foto de la ecografía

Tienes **dos opciones muy sencillas**:

1. **Desde la misma página web (Instantáneo)**:
   - Navega hasta la página del ultrasonido (Página 6).
   - Haz clic en el botón `[ 📷 Cambiar por foto real ]` debajo de la foto polaroid.
   - Selecciona cualquier foto o imagen de tu ecografía desde tu computadora o teléfono. Se guardará automáticamente.

2. **Reemplazo de archivo permanente**:
   - Guarda tu foto con el nombre `ultrasonido.jpg` dentro de la carpeta `public/`.
   - En `src/book.js`, busca la línea:
     ```html
     <img id="ultrasound-img" src="/ultrasonido-placeholder.svg" ... />
     ```
     y cámbiala por:
     ```html
     <img id="ultrasound-img" src="/ultrasonido.jpg" ... />
     ```

---

## ✏️ Personalizar los textos y nombres

Abre el archivo `src/pagesData.js`. Allí encontrarás organizados todos los textos de la portada, prólogo, cada ingrediente, la fecha estimada de llegada del bebé y las firmas finales para adaptarlas a los nombres de tu familia.

---

## 📱 Responsividad

- **Computadoras y Tablets (Pantallas anchas)**: El libro se despliega abierto mostrando dos páginas simultáneas (spread de dos páginas).
- **Teléfonos Móviles (Pantallas estrechas)**: Cambia automáticamente a modo de una sola página por pantalla para una lectura óptima y cómoda.

