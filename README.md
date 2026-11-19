# 🎓 Invitación Digital de Graduación — Promoción DREAM 2026

**Institución:** Colegio Particular Evangélico “La Misión de Jesús”  
**Promoción:** DREAM 2026 (*“Divertidos Recuerdos Entre Amigos Memorables”*)  
**Evento:** Acto de Graduación — Sábado 28 de noviembre de 2026, 19:00 hrs. (UTC-4 Bolivia)  

---

## 📁 Estructura del Proyecto (`Invitacion2/`)

```text
Invitacion2/
│
├── index.html                  # Documento principal HTML5 semántico con metadatos SEO y Open Graph
├── css/
│   └── style.css               # Estilos CSS3 modernos (variables, glassmorphism, responsive mobile-first)
├── js/
│   └── script.js               # Lógica interactiva ES6+ (partículas, audio, cuenta regresiva, carrusel, modal)
├── assets/
│   ├── estudiantes/            # 6 fotografías individuales de estudio optimizadas
│   ├── grupales/               # 32 fotografías grupales de recuerdos optimizadas
│   ├── docentes/               # Fotografías del plantel docente y asesoría
│   ├── audio/                  # Carpeta preparada para archivo de música de fondo opcional (.mp3)
│   └── logo/                   # Escudo oficial de la institución
└── README.md                   # Documentación de uso y publicación
```

> **Nota importante:** Todos los archivos originales en `E:\TRABAJO\INVITACION` se conservaron intactos. Las imágenes dentro de `Invitacion2/assets/` son copias optimizadas en alta definición para garantizar una carga rápida en dispositivos móviles al compartir por WhatsApp.

---

## 🚀 Cómo Ejecutar la Invitación en Visual Studio Code (Live Server)

1. Abre **Visual Studio Code**.
2. Ve a **Archivo > Abrir carpeta...** (`File > Open Folder...`) y selecciona la carpeta:
   `E:\TRABAJO\INVITACION\Invitacion2`
3. En el panel de extensiones de VS Code (`Ctrl + Shift + X`), busca e instala la extensión **Live Server** (de *Ritwick Dey*).
4. Haz clic derecho sobre el archivo `index.html` y selecciona **"Open with Live Server"** (o haz clic en el botón **"Go Live"** en la esquina inferior derecha de VS Code).
5. Se abrirá automáticamente en tu navegador (por ejemplo, en `http://127.0.0.1:5500/index.html`).

---

## 🎵 Cómo Agregar un Archivo MP3 Personalizado (Opcional)

El proyecto ya incluye un **sintetizador instrumental emotivo (Web Audio API)** que reproduce una melodía suave al presionar **"ABRIR INVITACIÓN"** sin depender de rutas externas.

Si deseas utilizar una pista MP3 propia:
1. Copia tu archivo (por ejemplo `graduacion.mp3`) dentro de `Invitacion2/assets/audio/`.
2. En `index.html`, busca la etiqueta `<audio id="bgAudio">` y agrega la ruta relativa:
   ```html
   <audio id="bgAudio" src="assets/audio/graduacion.mp3" loop preload="none"></audio>
   ```

---

## 🌐 Cómo Publicar la Invitación para Compartir por WhatsApp

### Opción A: Netlify Drop (La más rápida, sin cuenta de GitHub)
1. Ingresa a [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastra y suelta la carpeta **`Invitacion2`** directamente en el recuadro de la página.
3. En segundos obtendrás un enlace público `https://...netlify.app` que puedes personalizar en **Site Configuration > Change site name** (por ejemplo: `https://graduacion-dream-2026.netlify.app`).
4. Comparte ese enlace directamente en tus chats o grupos de **WhatsApp** (la vista previa mostrará el título y la fotografía grupal gracias a las etiquetas Open Graph incluidas).

### Opción B: GitHub Pages
1. Crea un repositorio público en GitHub (por ejemplo `invitacion-dream-2026`).
2. Sube el contenido de la carpeta `Invitacion2` a la raíz del repositorio.
3. Ve a **Settings > Pages**, selecciona la rama `main` y guarda.
4. En 1 minuto tendrás tu enlace listo en `https://tu-usuario.github.io/invitacion-dream-2026/`.
