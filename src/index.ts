import * as process from 'process';
import * as path from 'path';
import { exec } from 'child_process';
import * as fs from 'fs-extra';
import * as glob from 'glob';
import spinPromise from 'spin-promise';

// tslint --fix -c node_modules/\@implydata/im-code-style/rules/0.json 'src/**/*.ts?(x)'

import * as tslint from 'tslint';
import * as stylelint from 'stylelint';

export interface Options {
  tsLevel: number;
  scssLevel: number;
  all?: boolean;
}

const cwd = process.cwd();

const tsFileRegExp = /\.tsx?$/
const scssFileRegExp = /\.scss$/
const bothFileRegExp = /\.(tsx?|scss)$/;

async function getAllFiles() {
  const p = new Promise((yes, no) => {
    glob(path.resolve(cwd, './src/**/*.{ts,tsx,scss}'), (error, files) => {
      if (error) {
        no(error);
      } else {
        yes(files);
      }
    });
  });

  return spinPromise(p, 'Getting all TS and SCSS files...') as Promise<string[]>;
}

async function getGitDiff() {
  const p = new Promise((yes, no) => {
    exec("git diff --cached --diff-filter=ACM --name-only", (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        no(error);
      } else {
        yes(stdout.split('\n').filter(line => bothFileRegExp.test(line)));
      }
    });
  });

  return spinPromise(p, 'Getting changed files...') as Promise<string[]>;
}

function formatTSError(result: tslint.LintResult) {
  const formatterConstructor = tslint.findFormatter('prose');
  const formatter = new formatterConstructor();

  return formatter.format(result.failures);
}

async function tsLintStuff(files: string[], level: number) {
  const linter = new tslint.Linter({fix: false});
  const configuration = tslint.Configuration.findConfiguration(path.resolve(__dirname, `../rules/ts/${level}.json`)).results;

  files.forEach(fileName => {
    if (!tsFileRegExp.test(fileName)) return;

    const content = fs.readFileSync(fileName, "utf8");
    linter.lint(fileName, content, configuration);
  });

  const result = linter.getResult();

  const p = new Promise((yes, no) => {
    if (result.errorCount > 0) {
      no(formatTSError(result));
    } else {
      yes(0);
    }
  });

  return spinPromise(p, `Linting TS files with rules level ${level}...`);
}

function formatScssError(result: stylelint.LinterResult) {
  return stylelint.formatters.string(result.results);
}

async function styleLintStuff(files: string[], level: number) {
  const config = require(path.resolve(__dirname, `../rules/scss/${level}.json`));

  const p = stylelint.lint({
    configBasedir: path.resolve(__dirname, '../rules/scss/'),
    config,
    files: files.filter(f => scssFileRegExp.test(f))
  })
  .then(result => {
    if (result.errored) throw Error(formatScssError(result));
  });

  return spinPromise(p, `Linting SCSS files with rules level ${level}...`);
}

export async function check(options: Options) {
  const { all, tsLevel, scssLevel } = options;

  const files = all ? await getAllFiles() : await getGitDiff();

  if (files.length === 0) {
    console.log('Found no files to lint, exiting with 0');
    process.exit(0);
  }

  return Promise.all([
    tsLintStuff(files, tsLevel),
    styleLintStuff(files, scssLevel)
  ])
    .catch(errors => {
      console.error(errors);
      process.exit(1);
    })
    .then(() => {
      console.log('Done.');
    });
}
