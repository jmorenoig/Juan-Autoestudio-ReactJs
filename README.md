# Introduction 
Lo que se pretende con este proyecto es crear un codigo que sirva como referencia de como realizar los pipelines y conectarlo con SonarQuBe, para que en futuros proyectos realizados con el mismo lenguaje sea mas facil la tarea.

**Dependencias:** 

para que el Software corra correctamente se debe instalar primero las siquientes dependencias:
- [NojeJs](https://nodejs.org/es/download/) Como lenguaje de programacion.
- [ReactJs](https://es.reactjs.org/) Como biblioteca Javascript de código abierto
- [Visual Studio Code](https://code.visualstudio.com/download) Como editor de código. 

# Generar Reporte Del Test y el code Coverage En pipelines

Para generar este reporte en react, inicialmenta se debe instalar en el ```package.json``` el modujo jest-unit con el comando ```npm install --save-dev jest-junit```, teniendo esto instalado, en el pipeline al test se le debe agregar el siguiente comando ```--ci --reporters=default --reporters=jest-junit --coverageReporters=cobertura``` el cual generara en la carpeta coverage un archivo llamado ```cobertura-coverage.xml``` el cual servira para reportar el code coverage y un archivo ```junit.xml``` en la carpeta principal, el cual servira para reportar el test.

![Image-1](https://i.postimg.cc/nrnS7DnZ/Captura1.png)

Estando Generados los archivos mencionados anteriormente, se debe crear un Task llamado Publish code coverage results, el cual se encargara de publicar el code coverage, por lo tanto se debe llamar el archivo creado anteriormente de la siguiente manera ```**/coverage/cobertura-coverage.xml```

![Image-2](https://i.postimg.cc/9018BQf9/Captura2.png)

![Image-5](https://i.postimg.cc/DwGN9Fj9/Captura5.png)

despues de reportarlo, se debe crear un Task llamado Publish Test Results, el cual se encargara de publicar el Test, por lo tanto se debe colocar el formato JUnit y llamar el archivo creado anteriormente de la siguiente manera ```**/junit.xml```

![Image-3](https://i.postimg.cc/ry9PTQ9p/Captura3.png)

![Image-4](https://i.postimg.cc/BQky7tg5/Captura4.png)

# Generar Reporte Del Test en SonarQuBe

para generar reporte de los Test en SonarQuBe primero en el ```package.json``` se debe tener instalado jest con el comando ```npm install --save-dev jest```, tmabien se debe instalr el jest-sonar-reporter y el sonarqube-scanner con el comando ```npm install --save-dev jest-sonar-reporter sonarqube-scanner```.

despues de tener estos modulos instalados, se debe llamar en el pipeline el Prepare analysis on SonarQube, Run Code Analysis y el Publish Quality Gate Result.

antes de colocar la informacion de Prepare analysis on SonarQube, en el test se debe adicionar los comandos ```-- --watchAll=false --coverage  --testResultsProcessor jest-sonar-reporter``` el ```-- --watchAll=false``` es importante para que el Test se finalice y no se quede corriendo en el pipeline

![Image-1](https://i.postimg.cc/nrnS7DnZ/Captura1.png)

El Prepare analysis on SonarQube se deben llamar los comandos en Additional Properties ```sonar.typescript.lcov.reportPaths=React-App/coverage/lcov.info```, para reportar el porcentaje de coverage y para reportar el numero de unit test se genera el comando 
```
sonar.sources=React-App/src
sonar.tests=React-App/src
sonar.test.inclusions=React-App/src/**/*.test.js,src/**/*.test.jsx
sonar.testExecutionReportPaths=React-App/test-report.xml
```
- en ```sonar.sources```, se coloca la carpeta donde esta el archivo source
- en ```sonar.test```, se coloca la carpeta donde esta generado el test
- en ```sonar.test.inclusions``` se llaman los archivos Test
- en ```sonar.testExecutionReportPath``` se llama el archovo test-report.xml generado anteriormente y es importante para que reporte la cantidad de unit test

se debe ver de esa menera

![Image-7](https://i.postimg.cc/1R0Pnkpc/Captura7.png)

quedando reportado en el SonarQube de la siguiente manera 

![Image-6](https://i.postimg.cc/Xqg0R5VD/Captura6.png)

# Generar archivo .zip para ser tomado en una App Service atravez de Azure Devops 

En primer lugar se debe generar en el pipeline el Task build

![Image-8](https://i.postimg.cc/1zv3bLzZ/Captura8.png)

estando generado, se crea un Task Copy files el cual integrara las carpetas en el .Zip, para generar el archivo .Zip se debe crear un Task Archive Files el cual es quien pasara los archivos de build a .Zip, para al finar generar la publicacion mediante Publish artifacts

![Image-8](https://i.postimg.cc/MT4KpVRP/Captura9.png)






  
