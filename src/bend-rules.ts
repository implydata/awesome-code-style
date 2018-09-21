import * as process from 'process';
import * as path from 'path';
import { exec } from 'child_process';
import * as yargs from 'yargs';
import * as fs from 'fs-extra';
import * as glob from 'glob-promise';
import spinPromise from 'spin-promise';

const argv = yargs
  .option('dry', {
    default: false,
    description: 'Dry run'
  })

  .option('verbose', {
    alias: 'v',
    default: false,
    description: 'Verbose'
  })

  .option('folder', {
    alias: 'f'
  })

  .demandOption(['folder'])

  .help('h')
  .alias('h', 'help')

  .argv;

function getIndex(str: string) {
  return +str.match(/\d+/)[0];
}

function shiftIndex(str: string, inc = 1) {
  return str.replace(/(\d+)\.json$/, (match, number) => {return +number + inc + '.json'});
}

async function getRuleFiles() {
  const p = path.resolve(path.join(process.cwd(), argv.folder, '/*.json'));
  const files = await glob(p);

  if (argv.verbose) console.log('Got rules files : ' + files);

  files.sort((a, b) => getIndex(b) - getIndex(a));

  return spinPromise(Promise.resolve(files), 'Getting rule files');
}

async function renameFile(filePath: string) {
  const newPath = shiftIndex(filePath);

  if (argv.verbose) console.log('renaming ' + filePath + ' into ' + newPath);

  if (argv.dry) {
    return Promise.resolve(newPath);
  } else {
    return fs.rename(filePath, newPath).then(() => newPath);
  }
}

async function renameFiles(files: string[]) {
  const newFiles: string[] = [];

  const p = files
    .reduce((p, file) => p.then(async () => {
      const newFile = await renameFile(file);
      newFiles.push(newFile);
    }), Promise.resolve());

  return spinPromise(p.then(() => newFiles), 'Renaming rule files');
}

async function shiftExtends(files: string[]) {
  const p = Promise.all(files.map(async (f) => {
    const content = await fs.readFile(f, 'utf-8');

    const parsedContent = JSON.parse(content);
    if (/(\d+)\.json$/.test(parsedContent.extends)) {
      parsedContent.extends = shiftIndex(parsedContent.extends);

      if (argv.verbose) console.log('Shifting extend of ' + f);

      if (!argv.dry) {
        fs.writeFile(f, JSON.stringify(parsedContent, null, 2));
      }
    }

    return f;
  }));

  return spinPromise(p, 'Shifting rule files extends');
}

async function newLow(files: string[]) {
  const f = files[files.length - 1];

  const content = await fs.readFile(f, 'utf-8');
  const parsedContent = JSON.parse(content);
  parsedContent.extends = shiftIndex(parsedContent.extends, -1);
  parsedContent.rules = (parsedContent.rules || {});
  parsedContent.rules['NEW RULE'] = false;

  const newPath = shiftIndex(f, -1);
  if (argv.verbose) console.log('Creating a new low level rules file: ' + newPath);

  if (!argv.dry) {
    await fs.writeFile(newPath, JSON.stringify(parsedContent, null, 2));
  }
}

getRuleFiles()
  .then(shiftExtends)
  .then(renameFiles)
  .then(newLow)
  .catch(e => {
    console.log(e)
  })
