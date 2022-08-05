# Muévete por los que no pueden
Proyecto frontend para la aplicación web [Muévete APP](https://mueveteapp.herokuapp.com/) inspirada en la iniciativa solidaria "Muévete por los que no pueden" y que se desarrolla como proyecto TFG.

## Requisitos para desarrollo y despliegue local
El entorno de desarrollo local debe contar con el siguiente software instalado.
- Nodejs +v16.15.0
- NPM +v8.8.0

```
$ git clone https://github.com/mrf1989/muevete.git
```

Se debe crear un archivo .env en el directorio raíz del proyecto y configurar las variables de entorno requeridas:

- MUEVETE_API_URI: URI de consumo de la API Rest, [muevete-api](https://github.com/mrf1989/muevete-api).
- VITE_SENDGRID_API_KEY: API-Key generanda por [SendGrid](https://sendgrid.com/) (se requiere crear una cuenta y seleccionar la capa de servicio gratis).
- VITE_SENDGRID_EMAIL: dirección de email asociada a SendGrid y validada por el servicio, desde la cual se van a enviar las newsletters de Muévete APP.

Puede seguirse el ejemplo mostrado en `.env.example`.

La variable MUEVETE_API_URI es requerida para el correcto funcionamiento de la aplicación. Las otras no son necesarias, pero no estaría disponible la funcionalidad de envío de newsletters a los usuarios de la aplicación.

### Ejecutar la aplicación
Es necesario tener configuradas las variables de entorno en .env y tener una instancia activa del backend para la realización de las consultas a la API Rest.

La aplicación se ejecuta mediante el siguiente comando, desde el directorio raíz del proyecto:

```
$ npm run dev
```