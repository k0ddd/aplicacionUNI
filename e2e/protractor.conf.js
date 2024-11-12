exports.config = {
    allScriptsTimeout: 11000,
    specs: [
      './src/**/*.e2e-spec.ts'  // Define la ruta de los archivos de especificación
    ],
    capabilities: {
      browserName: 'chrome'  // Configura el navegador (puedes cambiarlo si es necesario)
    },
    directConnect: true,  // Permite que Protractor se conecte directamente al navegador sin WebDriver
    baseUrl: 'http://localhost:3000/',  // Asegúrate de que coincida con la URL donde se ejecuta tu aplicación
    framework: 'jasmine',
    jasmineNodeOpts: {
      showColors: true,
      defaultTimeoutInterval: 30000,
      print: function() {}
    },
    onPrepare() {
      require('ts-node').register({
        project: 'e2e/tsconfig.e2e.json'  // Configura TypeScript para las pruebas
      });
    }
  };
  