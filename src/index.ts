import * as process from 'process';
import * as path from 'path';
import { exec } from 'child_process';
import * as yargs from 'yargs';
import * as fs from 'fs-extra';
import * as glob from 'glob';
import spinPromise from 'spin-promise';

import { Linter, Configuration, LintResult, findFormatter } from 'tslint';

const cwd = process.cwd();

const paths = {
  strictConfig: path.resolve(__dirname, '../rules/tslint-strict.json'),
  looseConfig: path.resolve(__dirname, '../rules/tslint-loose.json')
};

async function getAllFiles() {
  const p = new Promise((yes, no) => {
    glob(path.resolve(cwd, './src/**/*.{ts,tsx}'), (error, files) => {
      if (error) {
        no(error);
      } else {
        yes(files);
      }
    });
  });

  return spinPromise(p, 'Getting all TypeScript files...') as Promise<string[]>;
}

async function getGitDiff() {
  const p = new Promise((yes, no) => {
    exec("git diff --cached --name-only", (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        no(error);
      } else {
        yes(stdout.split('\n').filter(line => /\.tsx?$/.test(line)));
      }
    });
  });

  return spinPromise(p, 'Getting changed files...') as Promise<string[]>;
}

function formatError(result: LintResult) {
  const formatterConstructor = findFormatter('prose');
  const formatter = new formatterConstructor();

  return formatter.format(result.failures);
}

async function lintStuff(files: string[], level: number) {
  const linter = new Linter({fix: false});
  const configuration = Configuration.findConfiguration(path.resolve(__dirname, `../rules/${level}.json`)).results;

  files.forEach(fileName => {
    const content = fs.readFileSync(fileName, "utf8");
    linter.lint(fileName, content, configuration);
  });

  const result = linter.getResult();

  const p = new Promise((yes, no) => {
    if (result.errorCount > 0) {
      no(formatError(result));
    } else {
      yes(0);
    }
  });

  return spinPromise(p, `Linting files with rules level ${level}...`);
}

export async function check(all = false, level = 0) {
  const files = all ? await getAllFiles() : await getGitDiff();

  if (files.length === 0) {
    console.log('Found no files to lint, exiting with 0');
    process.exit(0);
  }

  return lintStuff(files, level)
    .catch(errors => {
      console.error(errors);
      process.exit(1);
    })
    .then(() => {
      console.log('Done.');
    });
}
