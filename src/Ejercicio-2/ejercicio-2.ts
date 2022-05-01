import {argv} from 'process';
import yargs from 'yargs';
import {FindWord} from './findWord';

if (argv.length !== 6) {
  console.log('Usage: node dist/Ejercicio-2/ejercicio-2.js <fileName> <word> <pipe|without>');
  process.exit(1);
}

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

yargs.parse();
