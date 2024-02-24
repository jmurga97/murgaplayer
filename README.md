# Murga Player

Este proyecto es una aplicación de streaming de video construida utilizando Next.js y Tailwind CSS. Presenta una vista principal (accesible a través de la ruta `/`) y una vista de reproductor de video para ver videos (accesible a través de la ruta `/watch/[id]`).

## Setting Up
Para ejecutar la aplicación en modo de desarrollo, simplemente ejecuta el siguiente comando:

```bash
npm run dev
```

Las credenciales de Firebase ya se encuentran configuradas en el proyecto bajo un tiempo limitado en Firebase para probar rápidamente el proyecto
Para futuras implementaciones, se puede configurar las credenciales de Firebase y configurar las variables de entorno para usar el servidor de prueba bajo tu dominio.
Para mayor información: [text](https://firebase.google.com/docs/firestore)

```bash
# Configuración de Firebase
FIREBASE_API_KEY=tu_clave_api
FIREBASE_AUTH_DOMAIN=tu_dominio_de_autenticacion
FIREBASE_PROJECT_ID=tu_id_de_proyecto
FIREBASE_STORAGE_BUCKET=tu_bucket_de_almacenamiento
FIREBASE_MESSAGING_SENDER_ID=tu_id_de_remitente_de_mensajes
FIREBASE_APP_ID=tu_id_de_aplicacion
```

## Tecnologías Utilizadas

- **Next.js**: Un framework de React para construir aplicaciones renderizadas en el lado del servidor y generadas estáticamente.
- **Tailwind CSS**: Un framework CSS utilitario para construir rápidamente diseños personalizados.
- **Firebase Firestore**: Una base de datos NoSQL utilizada para almacenar datos de video como likes, recuento de reproducciones, ruta del video, título, descripción e ID.
- **Firebase Auth**: La autenticación de GitHub se utiliza para el inicio de sesión de usuarios. (Github única opción disponible)
- **tRPC**: Utilizado para llamadas a la API para obtener información sobre todos los videos, un video único y para incrementar el recuento de reproducciones (solo si el usuario ha iniciado sesión).
- **Shadcn**: Proporciona componentes como Toast, Dropdown, Avatar, Button y Skeleton para el desarrollo de la interfaz de usuario.

## Notas

- Capacidad de streaming de video utilizando rutas API nativas de Next.js (`getStreamingVideo`) para la ruta `/watch/[id]`.
- Incluye videos de muestra en el directorio `public` para probar y consumir contenido multimedia basado en datos extraídos de la base de datos.
- tRPC configurado con un loggerLink para probar llamadas a la API en modo de desarrollo
