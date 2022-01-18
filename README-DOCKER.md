#Docker

#Instalacion de Docker

para instalar docker dentro de una maquina wsl sin instalar docker desk, se debe seguir los pasos mostrados en este [Documento de Microsoft](https://docs.microsoft.com/en-us/windows/wsl/install-manual)

#Crear DockerFile

Para crear un DockerFile se debe tenere presente las caracteristicas que tienen todos estos documentos

**Ingredientes de un Dockerfile**

**FROM:** Definir una imagen base para crear nuestra nueva imagen con Dockerfile
```node:12-alpine3.12 as build```

**MAINTAINER:** Hace referencia al creador de la receta
MAINTAINER JGALTPro SoportefGAITPro.com

**RUN:** Nos permite ejecutar comandos en la imagen base antes de ser creada
```RUN npm install```

**ADD/COPY:** Nos permite agregar o copiar archivos desde el equipo local a la imagen
```COPY . .```

**EXPOSE:** Nos permite exponer por defecto un puerto para el contenedor
```EXPOSE 0080```

**CMD:** Ejecutar acción por defecto al crear el contenedor, es la finalidad.
```CMD ["/usr/sbin/apacho2", "=D", "FOREGROUND"]```

#Integracion de docker con SonarQube

Para integrar Sonar con docker primero debe asegirarse de tenere instalado sonarqube-scanner en caso de no estar instalado se puede generar con el siquiente comando
```npm install sonarqube-scanner --save-dev```

Despues de tenere el sonarqube-scanner se debe crear un archivo para ejecutar las funciones de integracion con sonar, en este caso para la integracion con un proyecto de react, se cre un archivo llamado sonarqube-scanner.js, con los siguientes comandos.

```javascript
const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner(
  {
  serverUrl: "http://sonarjason22.eastus.cloudapp.azure.com:9000",
  //login:"usuario",
  //password:"contraseña",
  token:"54c30b1fc69de51cab4f33b590de4200900c838d",
  options: {
    "sonar.projectKey":"React-Juan-Docker",
    "sonar.projectName":"React-Juan-Docker",
    "sonar.projectVersion":"1.0",
    "sonar.sources":"src",
    "sonar.tests":"src",
    "sonar.test.inclusions":"src/**/*.test.js,src/**/*.test.jsx",
    "sonar.typescript.lcov.reportPaths":"coverage/lcov.info",
    "sonar.testExecutionReportPaths":"test-report.xml"
  },
},

() => process.exit()
);
```

En el anterior comando se creo un tocken por seguridad del codigo, pero tambien se puede colocar directamente el usuario y la contraseña como se muestra en los comantarios del codigo,  en el comando serverUrl se coloca la url de sonar y en options los comandos de integracion para los test.

Por comodidad y uniformidad del codigo en el package.json, se agrega el siguiente comando para agregar el ejecutable ```npm run sonar```

```javascript
"scripts": {
    ...
    "sonar": "node sonarqube-scanner.js"
  },
```

**DockerFile**

En cuanto el DockerFile despues de el comando que genera los test se debe integrar el comando ```RUN npm run sonar ```.
En caso de que le genere el siquiente error:
```javascript
[15:46:37] Starting analysis...
[15:46:37] Getting info from "package.json" file
[15:46:37] Checking if executable exists: /root/.sonar/native-sonar-scanner/sonar-scanner-4.5.0.2216-linux/bin/sonar-scanner        
[15:46:37] Platform binaries for SonarScanner found. Using it.
/root/.sonar/native-sonar-scanner/sonar-scanner-4.5.0.2216-linux/bin/sonar-scanner: exec: line 66: /root/.sonar/native-sonar-scanner/sonar-scanner-4.5.0.2216-linux/jre/bin/java: not found
```

Se puede solicionar instalando el JDK 11 de java con el siquiente comando:
```javascript
RUN  apk update \
  && apk upgrade \
  && apk add ca-certificates \
  && update-ca-certificates \
  && apk add --update coreutils && rm -rf /var/cache/apk/*   \ 
  && apk add --update openjdk11 tzdata curl unzip bash \
  && apk add --no-cache nss \
  && rm -rf /var/cache/apk/*
```
 segun el error anterior tambien se debe instalar el sonar scaner y colocarle la ubicacion de la carpeta adecuada, eso se realiza con lo siquiente:
```javascript
 RUN curl -s -L https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.5.0.2216-linux.zip -o sonarscanner.zip \
  && unzip -qq sonarscanner.zip \
  && rm -rf sonarscanner.zip \
  && mkdir -p /root/.sonar/native-sonar-scanner \
  && mv  sonar-scanner-4.5.0.2216-linux /root/.sonar/native-sonar-scanner
```
y con el comando:
```javascript
RUN sed -i 's/use_embedded_jre=true/use_embedded_jre=false/g' /root/.sonar/native-sonar-scanner/sonar-scanner-4.5.0.2216-linux/bin/sonar-scanner
```

se intercala la ubicacion de las carpetas 

#Despliegue de la imagen en una AppService Azure

##Creacion de un AppService Azure**

Para crear un AppService en azure debemos registrarnos en azure y ingreasar al [Portal Azure](https://portal.azure.com/), estando registrados damos click sobre **Create a resource**.

![Image-1](https://i.postimg.cc/3JzQ4CLG/Captura.png)

Estando dento damos click sobre buscamos **Web App** y presionamos clieck sobre **create**

![Image-2](https://i.postimg.cc/5tVcp9WN/Captura2.png)

llenamos el formaulario que registr, en la parte de publish seleccionamos **Docker Container** sobre una maquina **linux**, acoplamos el plan que mas se ajuste a nuestro presupuesto y presionamos sobre **Next: Docker**.

En la siguiente pestaña de piden los datos de Docker, nos aseguramos de que en **Image Source** este seleccionado **DockerHub**, como ejemplo se puede llenear de la siquiente manera:

![Image-3](https://i.postimg.cc/HxYqDSLq/Captura3.png)

estando creada la imagen, debemos ingresar a [Azure DevOps](https://dev.azure.com) y conectar el portal azure con DevOps, para conectarlo, ingresamos sobre la organozación en azure y damos click sobre **Project Settings** luego sobre **Service connections** despues **New service connection** - **Azure Resource Manager** y **service principal (manual)** en este menu se deplegaran las siguientes opciones:

![Image-4](https://i.postimg.cc/hj2HS9zf/Captura4.png)

Para sacar las credenciales debemos ingresar sobre la ventana de comandos de [Portal Azure](https://portal.azure.com/)

![Image-5](https://i.postimg.cc/MpR2yM4F/Captura5.png)

El comando para sacar las credenciales es:

```javascript
az ad sp create-for-rbac --name "nombreDeLaConexión"
```

El Service Principal Id = appId
Service principal key = password
Tenant ID = tenant

Para sacar el **Subscription ID** debemos ingresar sobre **Subscriptions** y copiamos el **Subscription ID**

![Image-6](https://i.postimg.cc/W46ByRsm/Captura6.png)

##Desplegar imagen sobre el AppService

Debemos crear un **Release**  con la tarea **Azure App Service deploy** y lo nombramos como dev

![Image-7](https://i.postimg.cc/gky3ndHb/Captura7.png)

agregamos un Artefacto llamando el pipeline anterioemente creado    

![Image-8](https://i.postimg.cc/rps4n4Xq/Captura8.png)

Ingresamos sobre **Tasks** y llenamos las palntillas requeridas. 

Primero sobre **dev** en **Azure subscription** seleccionamos la subcribción anteriormente creada y llenamos los siguientes campos:

![Image-9](https://i.postimg.cc/7Zx0zcKG/Captura9.png)

Estando lleno damos click sobre **Save** y **Create Release**

![Image-10](https://i.postimg.cc/DwBsPgNC/Captura10.png)
