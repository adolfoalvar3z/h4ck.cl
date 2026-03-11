const fs = require('fs');

const files = ['src/pages/generator.astro', 'src/pages/hall-of-fame.astro'];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  
  let s = fs.readFileSync(file, 'utf8');
  
  s = s.replace(/bg-hacker-dark\/50/g, 'bg-dark-100');
  s = s.replace(/bg-hacker-dark/g, 'bg-dark-100');
  s = s.replace(/hacker-red/g, 'red');
  s = s.replace(/bg-hacker-black/g, 'bg-dark');
  s = s.replace(/hacker-dark/g, 'dark-100');
  s = s.replace(/border-white\/5/g, 'border-dark-300');
  s = s.replace(/border-white\/10/g, 'border-dark-300');
  s = s.replace(/border-white\/20/g, 'border-dark-300');
  s = s.replace(/border-white\/30/g, 'border-dark-400');
  s = s.replace(/text-zinc-/g, 'text-gray-');
  
  fs.writeFileSync(file, s);
  console.log('Fixed', file);
}
