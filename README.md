# Muévete por los que no pueden
Proyecto frontend para la aplicación web Muévete inspirada en la iniciativa solidaria "Muévete por los que no pueden" y que se desarrolla como proyecto TFG.

## Requisitos para desarrollo y despliegue local
El entorno de desarrollo local debe contar con el siguiente software instalado.
- Nodejs v16.15.0 o superior
- NPM v8.8.0 o superior

```
git clone https://github.com/mrf1989/muevete.git
```

Se debe crear un archivo .env en el directorio raíz del proyecto y configurar las variables de entorno requeridas:

- MUEVETE_API_URI: URI de consumo de la API.

Puede seguirse el ejemplo mostrado en .env.example.

### Ejecutar la aplicación
Es necesario tener configuradas las variables de entorno en .env y tener una instancia activa del backend para la realización de las consultas a la API.

La aplicación se ejecuta mediante el siguiente comando, desde el directorio raíz del proyecto:

```
npm run dev
```