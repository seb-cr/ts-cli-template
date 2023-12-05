import { stderr, stdout } from 'stdout-stderr';

import { cli } from '@/src/cli/index.js';

export interface InvokeResult {
  exitCode: number;
  stdout: string;
  stderr: string;
}

/**
 * Runs the CLI with the given arguments.
 *
 * All output (stdout, stderr) is captured and returned along with the process
 * exit code.
 *
 * @param args List of command-line arguments.
 */
export async function invoke(args: string[]): Promise<InvokeResult> {
  const oldExitCode = process.exitCode;
  process.exitCode = 0;

  stdout.start();
  stderr.start();

  await cli(args);

  stdout.stop();
  stderr.stop();

  const stdoutOutput = stdout.output;
  const stderrOutput = stderr.output;
  const exitCode = process.exitCode || 0;
  process.exitCode = oldExitCode;

  return {
    exitCode,
    stdout: stdoutOutput,
    stderr: stderrOutput,
  };
}
