import fs from 'fs';

const dir = 'src/content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
let count = 0;

files.forEach(f => {
  const c = fs.readFileSync(dir + '/' + f, 'utf8');
  const lines = c.split('\n');
  let metaTitle = '';
  let title = '';
  for (const l of lines) {
    if (l.startsWith('metaTitle:')) {
      metaTitle = l.replace(/^metaTitle:\s*/, '').replace(/^["']|["']$/g, '').trim();
    }
    if (l.startsWith('title:')) {
      title = l.replace(/^title:\s*/, '').replace(/^["']|["']$/g, '').trim();
    }
  }
  const effective = metaTitle || title;
  if (effective.length > 60) {
    count++;
    console.log(`[${effective.length} chars] ${f} -> "${effective}"`);
  }
});
console.log('Total over 60 chars remaining in blog frontmatter:', count);

