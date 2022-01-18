const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner(
  {
  serverUrl: "http://sonarjason22.eastus.cloudapp.azure.com:9000",
  //login:"admin",
  //password:"Maestro1710.",
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