import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const modulePath = fileURLToPath(import.meta.url);
const packagePath = resolve(dirname(modulePath), '..', 'package.json');
const packageJson = await readFile(packagePath);
export default JSON.parse(packageJson.toString());
