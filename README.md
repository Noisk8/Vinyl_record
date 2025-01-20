# Vinyl Collection App

Aplicación web para gestionar una colección personal de discos de vinilo.

## Tecnologías

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Vite
  - React Router Dom
  - React Hot Toast
  - Lucide React (iconos)

- **Backend:** 
  - Supabase (Base de datos y Autenticación)

## Características

- 🔐 Autenticación de usuarios (registro/login)
- ✨ Interfaz moderna y responsive con Tailwind CSS
- 📝 CRUD completo para gestionar discos de vinilo
- 🔒 Row Level Security (RLS) en Supabase
- 🖼 Soporte para imágenes de portadas de álbumes
- 🔄 Actualizaciones en tiempo real
- 🍞 Notificaciones toast

## Estructura del Proyecto
vinyl-collection-app/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   └── Layout.tsx      # Componente de diseño principal
│   │
│   ├── contexts/           # Contextos de React
│   │   └── AuthContext.tsx # Contexto de autenticación
│   │
│   ├── lib/               # Configuración y utilidades
│   │   └── supabase.ts    # Cliente de Supabase
│   │
│   ├── pages/             # Páginas de la aplicación
│   │   ├── Dashboard.tsx  # Vista principal
│   │   └── Login.tsx      # Página de login/registro
│   │
│   ├── App.tsx            # Componente principal
│   ├── main.tsx           # Punto de entrada
│   └── index.css          # Estilos globales
│
├── public/                # Archivos estáticos
│
├── supabase/             # Configuración de Supabase
│   └── migrations/       # Migraciones de base de datos
│
├── .env                  # Variables de entorno
├── index.html           # HTML principal
├── package.json         # Dependencias y scripts
├── postcss.config.js    # Configuración de PostCSS
├── tailwind.config.js   # Configuración de Tailwind
├── tsconfig.json        # Configuración de TypeScript
└── vite.config.ts       # Configuración de Vite



