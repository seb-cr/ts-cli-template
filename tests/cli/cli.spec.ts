import { expect } from 'chai';

import { invoke } from './invoke.js';

describe('cli', () => {
  context('without a name specified', () => {
    it('should greet the world', async () => {
      const result = await invoke([]);
      expect(result.exitCode).to.equal(0);
      expect(result.stdout).to.equal('Hello world!\n');
    });
  });

  context('with a name specified', () => {
    it('should greet the given name', async () => {
      const result = await invoke(['--name', 'tests']);
      expect(result.exitCode).to.equal(0);
      expect(result.stdout).to.equal('Hello tests!\n');
    });
  });

  context('with an unknown option', () => {
    it('should error', async () => {
      const result = await invoke(['--blah']);
      expect(result.exitCode).not.to.equal(0);
      expect(result.stderr).to.include("error: unknown option '--blah'\n");
    });
  });
});
