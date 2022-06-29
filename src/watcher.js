const chokidar = require('chokidar')
const path = require('path')
const { spawn } = require('child_process');

const watcher = chokidar.watch(path.resolve(__dirname, 'public', 'notas-etiquetas'), { ignored: "/^\./", persistent: true });

watcher
  .on('add', function (path) {
    // console.log('File', path, 'has been added');
    const caminho = path.split(`notas-etiquetas`)[1]

    const child = spawn("python", ["./src/pdfModule.py"])

    child.stdout.on('data', function (data) {
      const retorno = data.toString()
      child.kill()
    })
  })
  .on('change', function (path) {
    // console.log('File', path, 'has been changed');
  })
  .on('unlink', function (path) {
    // console.log('File', path, 'has been removed');
  })
  .on('error', function (error) { //Apenas um tratamento de erro
    console.error('Error happened', error);
  })
