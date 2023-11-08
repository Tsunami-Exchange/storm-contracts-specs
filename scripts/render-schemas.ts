import { createWriteStream, readdirSync } from 'fs';
import { join } from 'path';
// @ts-ignore
import plantuml from 'node-plantuml';

function main() {
  const path = join(__dirname, '..', 'puml');
  const files = readdirSync(path);

  files.forEach((file) => {
    const gen = plantuml.generate(join(path, file));
    gen.out.pipe(createWriteStream(join(__dirname, '..', 'pics', `${file}.png`)));
  });
}

main();
