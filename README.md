# API Rest basica
Para crear una API Rest como esta se necesita: 
- Node.js para el entorno
- MongoDB para la base de datos
- La libreria Mongoose para crear los objetos
- Un linter como ESLint con la guia de estilos de Airbnb 

La estructura de una API se divide en:

/controllers --> Una carpeta para controladores (la lógica de la API).      
/models --> Una carpeta para los modelos de mongoose (la estructura de los objetos)      
/routes --> Una carpeta para las rutas por las que se accede a las funciones de la API      

Para correr la api de forma local sigue los siguientes pasos:

1. Clona este repositorio
2. Instala MongoDB y Node.js
3. Modifica el path /data/db de mongo o añadelo a el path general del sistema (no recomendado)
4. Si no tienes una instancia de mongo en tus procesos ejecuta "mongod" en la terminal
4. Ejecuta 'npm install' dentro de la carpeta de la API.
5. ejecuta 'npm start'
6. Ya está, tu api debería estar ejecutandose en http://localhost:3000/user

Si tienes alguna duda contacta con un mentor de Backend
