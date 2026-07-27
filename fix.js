const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) results = results.concat(walk(file));
    else if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
  });
  return results;
};

// Storefront fixes
walk('src/app/(storefront)').forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/from ['"]\.\.\/\.\.\/shared/g, "from '../../../shared");
  c = c.replace(/from ['"]\.\.\/components/g, "from '../../components");
  c = c.replace(/from ['"]\.\.\/shared/g, "from '../../shared");
  fs.writeFileSync(f, c);
});

// Admin fixes
walk('src/app/(admin)').forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  // the ones that were inside dashboard/products etc now moved from src/app/dashboard to src/app/(admin)/dashboard
  // so their depth increased by 1.
  c = c.replace(/from ['"]\.\.\/\.\.\/\.\.\/\.\.\/shared/g, "from '../../../../../shared");
  c = c.replace(/from ['"]\.\.\/\.\.\/\.\.\/shared/g, "from '../../../../shared");
  c = c.replace(/from ['"]\.\.\/\.\.\/shared/g, "from '../../../shared");
  
  c = c.replace(/from ['"]\.\.\/\.\.\/components/g, "from '../../../components");
  fs.writeFileSync(f, c);
});
