# PRÁCTICA 10 - Sistema de ficheros y creación de procesos en Node.js
### *ASIGNATURA:* Desarrollo de Sistemas Informáticos
 > **NOMBRE COMPLETO:** DANIELE VITALE  
 > ID ALU: ALU0101329017  
 > E-MAIL: alu0101329017@ull.edu.es  
 > CURSO: 3ro Ingeniería Informática   

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-DanyVitale/actions/workflows/test.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-DanyVitale/actions/workflows/test.js.yml)
[![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-DanyVitale/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-DanyVitale/actions/workflows/coveralls.yml)
[![Sonar-Cloud](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-DanyVitale/actions/workflows/sonarcloud.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-DanyVitale/actions/workflows/sonarcloud.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct10-async-fs-process-DanyVitale&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct10-async-fs-process-DanyVitale)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct10-async-fs-process-DanyVitale&metric=coverage)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct10-async-fs-process-DanyVitale)

## **ÍNDICE**   
1. [INTRODUCCIÓN](#id1)
2. [DESARROLLO](#id2)  
  2.1 [EJERCICIO 1](#id3)  
  2.2 [EJERCICIO 2](#id4)  
  2.3 [EJERCICIO 3](#id5)  
  2.4 [EJERCICIO 4](#id6)
3. [CONCLUSIONES](#id7)

## **INTRODUCCIÓN**<a name="id1"></a>
La práctica plantea una serie de ejercicios o retos a resolver haciendo uso de las APIs proporcionadas por Node.js para interactuar con el sistema de ficheros, así como para crear procesos.

Antes de empezar hay que realizar una serie de tareas previas que comprenden lo siguiente:
- [x] Aceptar la [asignación de GitHub Classroom]() asociada a esta práctica.
- [x] Familiarizarse con el [API de callbacks proporcionada por Node.js para interactuar con el sistema de ficheros](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#callback-api).
- [x] Familiarízarse con el [API asíncrona proporcionada por Node.js para crear procesos](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#asynchronous-process-creation) y, en concreto, con la función ```spawn```.

## **DESARROLLO**<a name="id2"></a>
Todos código fuente de los ejercicios se irán almacenando en la carpeta ```src/```. En la carpeta ```src/``` se encuentran los siguientes ficheros.
### **EJERCICIO 1**<a name="id3"></a>
El enunciado nos asigna el siguiente código:

```typescript
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```

Dado el programa se realizará una traza de ejecución mostrando, paso a paso, el contenido de la pila de llamadas, el registro de eventos de la API y la cola de manejadores, además de lo que se muestra por la consola. 

Paso inicial: se inicia el programa con el nombre del fichero que se quiere observar.
- Pila de llamadas: '[]'
- Registro de eventos de la API: '[]'
- Cola de manejadores: '[]'
- Consola: '[]'

Paso 1:
- Pila de llamadas: '[]'
- Registro de eventos de la API: '[]'
- Cola de manejadores: '[]'
- Consola: '[]'

Paso 2: se llama a la función 'access' con los parámetros 'filename' y 'constants.F_OK'
- Pila de llamadas: '[access, main]'
- Registro de eventos de la API: '[]'
- Cola de manejadores: '[]'
- Consola: '[]'

Paso 3: sale access de la pila de llamadas y entra en la cola de manejadores
- Pila de llamadas: '[main]'
- Registro de eventos de la API: '[callback of access]'
- Cola de manejadores: '[]'
- Consola: '[]'

Paso 4: gracias a la ausencia de errores, se llama a la función 'constants.F_OK'
- Pila de llamadas: '[main]'
- Registro de eventos de la API: '[]'
- Cola de manejadores: '[access]'
- Consola: '[]'

Paso 5: entra callback de access y sale el main de la pila de llamadas
- Pila de llamadas: '[callback of access]'
- Registro de eventos de la API: '[]'
- Cola de manejadores: '[]'
- Consola: '[]'

Paso 6: gracias a la ausencia de errores, se llama a la función 'constants.F_OK' y se muestra por la consola que el fichero existe y se está observando
- Pila de llamadas: '[watcher.on, callback of access x 2]'
- Registro de eventos de la API: '[]'
- Cola de manejadores: '[]'
- Consola: '['Starting to watch file helloworld.txt']'

Paso 7: se muestra por la consola que el fichero ya no está observado
- Pila de llamadas: '[]'
- Registro de eventos de la API: '[]'
- Cola de manejadores: '[]'
- Consola: '['File helloworld.txt is no longer watched']'

Paso 8: se llama a la función 'watcher.on' con los parámetros 'change' y '() => {}' y se muestra por la consola que el fichero se ha modificado
- Pila de llamadas: '[watcher.on]'
- Registro de eventos de la API: '[]'
- Cola de manejadores: '[]'
- Consola: '[File helloworld.txt has been modified somehow]'

Una vez hecho lo anterior, se procede con la resolución de algunas preguntas:
- ¿Qué hace la función ```access```? La función ```access``` comprueba los permisos de acceso de un fichero dado. Los permisos de acceso existentes son:
  - ```constants.F_OK```: comprueba si el fichero existe
  - ```constants.R_OK```: comprueba si el fichero tiene permisos de lectura
  - ```constants.W_OK```: comprueba si el fichero tiene permisos de escritura
  - ```constants.X_OK```: comprueba si el fichero tiene permisos de ejecución
- ¿Qué hace la función ```constants```? La función ```constants``` contiene constantes que representan los permisos de acceso de un fichero previamente mencionados.

### **EJERCICIO 2**<a name="id4"></a>
Para la realización del ejercicio 2, se crearon dos ficheros: 
- ```src/Ejercicio-2/ejercicio-2.ts```: contiene el código fuente del ejercicio 2
- ```src/Ejercicio-2/findWord.ts```: contiene la clase ```FindWord``` que se encarga de buscar una palabra en un fichero.

Empezando por la clase ```FindWord```, se puede observar que describe una clase que busca una palabra en un fichero.

```typescript
export class FindWord extends EventEmitter {
  constructor() {
    super();
  }

  // code goes here ...
}
```

Además del constructor, la clase ```FindWord``` tiene un método ```findWithPipe``` que recibe como parámetro el nombre del fichero y la palabra que se quiere buscar.

```typescript
findWithPipe(fileName: string, word: string): void {
  access(fileName, (err) => {
    if (err) {
      this.emit('error', err);
    } else {
      const grep = (spawn('grep', [word, fileName]));
      const wc = (spawn('wc', ['-l']));
      grep.stdout.pipe(wc.stdin);
      wc.stdout.on('data', (data) => {
        const count = parseInt(data.toString(), 10);
        console.log(`The word "${word}" appears ${count} times in the file "${fileName}"`);
      });
    }
  });
}
```

El método ```findWithPipe``` se encarga de ejecutar el comando ```grep``` y el comando ```wc``` para buscar la palabra en el fichero. Lo primero que se hace es llaar a la función ```access``` para comprobar si el fichero existe. En caso de que no exista se lanza un error mientras que, en caso contrario se declaran dos constantes que representan los comandos ```grep``` y ```wc```. A continuación se asigna a ```grep``` que representa el comando ```grep``` y se le asigna el valor de la función ```spawn``` con los parámetros ```grep``` y ```[word, fileName]```. Siguiendo el mismo procedimiento se asigna a ```wc```, que representa el comando ```wc```, el valor de la función ```spawn``` con los parámetros ```wc``` y ```['-l']```. 

Para introducir el pipe de salida de ```grep``` a ```wc```, se asigna a ```grep``` el valor de la función ```stdout``` de ```pipe``` con el valor de ```wc``` de la función ```stdin```. Finalmente, con la creación de un contador se comprueba cuantas veces aparece la palabra en el fichero.

En cuánto al segundo método ```findWithoutPipe``` tenemos lo siguiente:

```typescript
findWithoutPipe(fileName: string, word: string): void {
  access(fileName, (err) => {
    if (err) {
      this.emit('error', err);
    } else {
      const grep = spawn('grep', [word, fileName]);
      const wc = spawn('wc', ['-l']);
      grep.stdout.on('data', (data) => {
        wc.stdin.write(data);
      });
      wc.stdout.on('data', (data) => {
        const count = parseInt(data.toString(), 10);
        console.log(`The word "${word}" appears ${count} times in the file "${fileName}"`);
      });
    }
  });
}
```

Tal y como se vio en el método anterior, se llama a la función ```access``` para comprobar si el fichero existe. En caso de que no exista se lanza un error mientras que, en caso contrario se declaran dos constantes que representan los comandos ```grep``` y ```wc```. A continuación se asigna a ```grep``` que representa el comando ```grep``` y se le asigna el valor de la función ```spawn``` con los parámetros ```grep``` y ```[word, fileName]```. Siguiendo el mismo procedimiento se asigna a ```wc```, que representa el comando ```wc```, el valor de la función ```spawn``` con los parámetros ```wc``` y ```['-l']```.

El método no se hace uso del pipe de salida de ```grep``` a ```wc```, sino que se asigna a ```grep``` el valor de la función ```stdout``` de ```pipe``` con
el valor de ```wc``` de la función ```stdin```. Finalmente, con la creación de un contador se comprueba cuantas veces aparece la palabra en el fichero.

El fichero del código fuente de este ejercicio hace lo siguiente:

```typescript
if (argv.length !== 6) {
  console.log('Usage: node dist/Ejercicio-2/ejercicio-2.js <fileName> <word> <pipe|without>');
  process.exit(1);
}
```

En primer lugar comprueba el numero de argumentos que se le pasan al programa. Si el numero de argumentos es distinto de 6, se imprime un mensaje de error y se sale del programa.

A continuación se implementa el comando ```find``` que se encarga de buscar la palabra en el fichero haciendo uso de ```yargs``` para recibir los parámetros.

```typescript
yargs.command({
  command: 'find',
  describe: 'Find a word in a file',
  builder: {
    fileName: {
      describe: 'File name',
      demandOption: true,
      type: 'string',
    },
    word: {
      describe: 'Word to find',
      demandOption: true,
      type: 'string',
    },
    pipe: {
      describe: 'Use pipe',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    if (typeof argv.fileName === 'string' && typeof argv.word === 'string' && typeof argv.pipe === 'string') {
      const findWord = new FindWord();

      findWord.on('error', (err) => {
        console.log('The file does not exists.\n');
        console.log('Usage: node dist/Ejercicio-2/ejercicio-2.js <fileName> <word> <pipe|without>');
      });

      if (argv.pipe === 'pipe') {
        findWord.findWithPipe(argv.fileName, argv.word);
      } else if (argv.pipe === 'without') {
        findWord.findWithoutPipe(argv.fileName, argv.word);
      }
    }
  },
});
```

Lo primero que se hace es comprobar que los parámetros son de tipo ```string```. En caso de que no lo sean se imprime un mensaje de error y se sale del programa. En caso contrario se procede creando una instancia de la clase ```FindWord``` y, en base a la opción que se le pasa, se llama a la función ```findWithPipe``` o ```findWithoutPipe```.

### **EJERCICIO 3**<a name="id4"></a>
El ejercicio tres se pide desarrollar una aplicación que reciba desde la línea de comandos el nombre de un usuario de la aplicación de notas, así como la ruta donde se almacenan las notas de dicho usuario.
Para la realización del mismo importé algunas funciones utilizadas en la práctica anterior pero, modificandolas según lo que describe el profesor en cuánto a la eficiencia. En primer lugar se importan las funciones ```fs```, ```path``` y ```readline``` para poder trabajar con el fichero de notas.

Como en el ejercicio anterior, se comprueba si el número de argumentos es correcto. En caso de que no lo sea se imprime un mensaje de error y se sale del programa.

Siguiendo el orden de desarrollo, la primera función implementada es la ```readFile``` que se encarga de leer el fichero de notas.

```typescript
export function readFile(path: string): void {
  console.log(chalk.blue('Reading file...'));
  const readStream = createReadStream(path);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on('line', (line) => {
    console.log(chalk.blue('Line: ' + line));
  });

  rl.on('close', () => {
    console.log(chalk.blue('File read'));
  });
}
```

Lo primero que hace es imprimir un mensaje para indicar al usuario que se está leyendo el fichero. A continuación se crea una variable ```readStream``` que se encarga de crear un flujo de lectura del fichero y sucesivamente otra variable ```rl``` o readLine que se encarga de crear una interfaz de lectura de la línea de comandos.

Por último, se crea una función ```on``` que se encarga de crear una interfaz de escucha de eventos. En el caso de que se produzca un evento de lectura de línea, se imprime la línea leída. En el caso de que se produzca un evento de cierre de fichero, se imprime un mensaje de que el fichero se ha leído correctamente.

Pasamos a la función ```getUser``` que se encarga de obtener el nombre de usuario de la aplicación de notas.

```typescript
export function getUser(path: string) {
  console.log('Getting user...');
  const user = path.split('/')[2];
  console.log(chalk.blue(`User: ${user}`));
  return user;
}
```

Finalmente las dos últimas funciones ```watchFile``` y ```watchDirectory```:

```typescript
export function watchDirectory(path: string): void {
  const user = getUser(path);
  watch(path, (eventType, filename) => {
    if (eventType === 'change') {
      console.log(chalk.green(`File ${filename} changed by ${user}`));
      readFile(path + '/' + filename);
    } else if (eventType === 'rename') {
      console.log(chalk.green(`File ${filename} renamed by ${user}`));
      readFile(path + '/' + filename);
    } else if (eventType === 'delete') {
      console.log(chalk.green(`File ${filename} deleted by ${user}`));
      readFile(path + '/' + filename);
    } else if (eventType === 'add') {
      console.log(chalk.green(`File ${filename} added by ${user}`));
      readFile(path + '/' + filename);
    } else {
      console.log(chalk.red(`Error: ${eventType}`));
    }
  });
}
```

```typescript
export function watchFile(path: string): void {
  watch(path, (eventType, filename) => {
    if (eventType === 'change') {
      console.log(chalk.green(`File ${filename} changed`));
      readFile(path);
    } else if (eventType === 'rename') {
      console.log(chalk.green(`File ${filename} renamed`));
      readFile(path);
    } else if (eventType === 'delete') {
      console.log(chalk.green(`File ${filename} deleted`));
      readFile(path);
    }
  });
}
```

Se encargan de crear una interfaz de escucha de eventos. En el caso de que se produzca un evento de modificación de fichero, se imprime un mensaje de que el fichero ha sido modificado. En el caso de que se produzca un evento de modificación de directorio, se imprime un mensaje de que el directorio ha sido modificado.

Para terminar, haciendo uso de ```yargs``` tal y como se vió en el ejercicio anterior, se comprueban los parámetros de entrada y se llama a la función ```watchDirectory``` o ```watchFile``` según el tipo de fichero que se esté observando.

```typescript
yargs.command({
  command: 'watch',
  describe: 'Watch a file',
  builder: {
    path: {
      describe: 'Path to the file',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv: any) => {
    if (typeof argv.path === 'string') {
      watchFile(argv.path);
    } else {
      console.log(chalk.red(Error));
    }
  },
}).command({
  command: 'watchAll',
  describe: 'Watch all files',
  builder: {
    path: {
      describe: 'Path to the file',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv: any) => {
    if (typeof argv.path === 'string') {
      watchDirectory(argv.path);
    } else {
      console.log(chalk.red(Error));
    }
  },
}).parse();
```

### **EJERCICIO 4**<a name="id5"></a>
Para la realización del ejercicio se crearon dos ficheros, donde en uno se encuentra el código fuente y en el otro la clase ```Wrapper``` que se encarga de implementar las varias opciones requeridas. 

Empezando por la clase ```Wrapper```:

```typescript
export class Wrapper extends EventEmitter {
  /**
   * Contructor of the Wrapper class.
   */
  constructor() {
    super();
  }

  // code goes here ...
}
```

Como podemos observar implementa un contructor vacío.
Pasando a los métodos implementados, empezamos por ```isDirectory```:

```typescript
isDirectory(path: string): void {
  if (fs.existsSync(path)) {
    const stat = fs.statSync(path);
    if (stat.isDirectory()) {
      console.log(chalk.green(`${path} is a directory`));
    } else {
      console.log(chalk.red(`${path} is not a directory`));
    }
  } else {
    console.log(chalk.red(`${path} does not exist`));
  }
}
```

```isDirectory``` se encarga de comprobar si un fichero o directorio existe. En el caso de que exista, se comprueba si es un directorio o no haciendo uso de la función ```statSync``` de fs. En el caso de que no exista, se imprime un mensaje de error.

A continuación tenemos el método ```createDirectory```:

```typescript
createDirectory(path: string): void {
  if (!fs.existsSync(path)) {
    fs.mkdir(path, (err) => {
      if (err) {
        console.log(chalk.red(`Error: ${err}`));
      } else {
        console.log(chalk.green(`Directory created`));
      }
    });
  } else {
    console.log(chalk.red(`Directory already exists`));
  }
}
```

createDirectory se encarga de crear un directorio. En el caso de que no exista, se crea el directorio y en caso de que exista, se imprime un mensaje de error.
Para la implementación del método se usan las funciones ```mkdir``` y ```existsSync``` de ```fs``` que se encargan de crear un directorio y comprobar si existe o no.

Seguimos con el método ```listFiles```:

```typescript
listFiles(path: string): void {
    const files = spawn('ls', [path]);
    files.stdout.on('data', (data) => {
      console.log(data.toString());
    });
  }
```

listFiles se encarga de listar los ficheros de un directorio. Se usa la función ```spawn``` de ```child_process``` para ejecutar el comando ```ls``` y se le pasa como parámetro el directorio o mejor dicho la ruta.

Pasando al método ```showFile```:

```typescript
showFile(path: string): void {
    const file = spawn('cat', [path]);
    file.stdout.on('data', (data) => {
      console.log(data.toString());
    });
  }
```

Observamos que en este método se usa la función ```spawn``` de ```child_process``` para ejecutar el comando ```cat``` y se le pasa como la ruta del fichero.

Por último, implementamos el método ```moveFile```:

```typescript
moveFile(path: string, path2: string): void {
  if (fs.existsSync(path)) {
    fs.rename(path, path2, (err) => {
      if (err) {
        console.log(chalk.red(`Error: ${err}`));
      } else {
        console.log(chalk.green(`File moved`));
      }
    });
  } else {
    console.log(chalk.red(`File does not exist`));
  }
}
```

Se encarga de mover un fichero. En el caso de que exista, se mueve el fichero y en caso de que no exista, se imprime un mensaje de error. Se hace uso de las función ```rename``` de ```fs``` para mover el fichero y de ```existsSync``` para comprobar si existe o no.

El segundo fichero a explicar es aquel que contiene el código fuente donde se hace uso de ```yargs```:

```typescript
yargs.command({
  command: 'isDirectory',
  describe: 'Checks if a path is a directory',
  builder: {
    path: {
      describe: 'Path to check',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv: any) => {
    if (typeof argv.path === 'string') {
      const wrapper = new Wrapper();
      wrapper.isDirectory(argv.path);
    } else {
      console.log(chalk.red(Error));
    }
  },
}).command({
  command: 'createDir',
  describe: 'Creates a directory',
  builder: {
    path: {
      describe: 'Path to create',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv: any) => {
    if (typeof argv.path === 'string') {
      const wrapper = new Wrapper();
      wrapper.createDirectory(argv.path);
    } else {
      console.log(chalk.red(Error));
    }
  },
}).command({
  command: 'list',
  describe: 'Lists the files in a directory',
  builder: {
    path: {
      describe: 'Path to list',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv: any) => {
    if (typeof argv.path === 'string') {
      const wrapper = new Wrapper();
      wrapper.listFiles(argv.path);
    } else {
      console.log(chalk.red(Error));
    }
  },
}).command({
  command: 'move',
  describe: 'Moves a file',
  builder: {
    path: {
      describe: 'Path to move',
      demandOption: true,
      type: 'string',
    },
    newPath: {
      describe: 'New path',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv: any) => {
    if (typeof argv.path === 'string' && typeof argv.newPath === 'string') {
      const wrapper = new Wrapper();
      wrapper.moveFile(argv.path, argv.newPath);
    } else {
      console.log(chalk.red(Error));
    }
  },
}).parse();
```

Para explicar el código de este fichero, se hace uso de la función ```command``` de ```yargs``` que nos permite crear un comando. Considerando que el procedimiento de desarrollo es muy similar para todos los comandos, se decidió explicarlo de forma general. 
Para cada comando se crea la opción command correspondiente (```isDirectory```, ```createDir```, ```list``` y ```move```) y se le asigna una descripción.
A continuación con la opción ```builder``` se le asigna un objeto que contiene los parámetros que se le pasan al comando, si nos fijamos en todos los comandos solo se les pasa la ruta de un directorio o fichero, mientras que en ```move``` se les pasa dos porque se necesita una ruta y otra para mover el fichero. 
Una vez hecho lo anterior, se comprueban los parámetros y se ejecuta el comando. En caso de que el comando no se ejecute correctamente o de que los parámetros no sean de tipo adecuado, se imprime un mensaje de error.

## CONCLUSIONES<a name="id6"></a>
Para el desarrollo de esta práctica se han utilizado las siguientes librerías: ```fs```, ```yargs```, ```chalk```, ```child_process``` y ```path```.
Fue muy útil la realización de la práctica para que se pudiera entender mejor el funcionamiento de estas. Además, se intentó gestionar y manejar de los errores que se pudieran producir en cada uno de los ejercicios desarrollados. 