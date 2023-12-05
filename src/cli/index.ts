#!/usr/bin/env node
import { Command, CommanderError } from 'commander';
import esMain from 'es-main';

import { greet } from '../index.js';
import pkg from '../package.js';

type CliOptions = {
  name: string;
};

/**
 * Parse CLI arguments.
 *
 * @param args
 */
function getOptions(args: string[]): CliOptions {
  const { version, description, bin } = pkg;
  const name = Object.keys(bin)[0];

  const cmd = new Command()
    .name(name)
    .version(version)
    .description(description)
    .option('-n, --name <name>', 'who to say hello to')
    .showHelpAfterError('(try --help for additional information)')
    .configureHelp({ sortOptions: true })
    .exitOverride()
    .parse(args, { from: 'user' });

  return cmd.opts<CliOptions>();
}

async function main(args: string[]) {
  const opts = getOptions(args);

  console.log(greet(opts.name));
}

/**
 * Run `main` and handle errors.
 *
 * @param args Command line arguments
 */
export async function cli(args: string[]): Promise<void> {
  try {
    await main(args);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // only Commander errors are tested in the template example
    /* istanbul ignore else */
    if (error instanceof CommanderError) {
      // note that commander outputs its own error messages
      process.exitCode = error.exitCode;
    } else {
      console.error('error:', error.message);
      process.exitCode = 1;
    }
  }
}

// this can't be covered by tests -- they call `cli` directly
/* istanbul ignore next */
if (esMain(import.meta)) {
  cli(process.argv.slice(2));
}
