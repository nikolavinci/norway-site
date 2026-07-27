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

const fixQuotes = (str) => {
  return str.replace(/from '([^'"]+)"/g, "from '$1'").replace(/from "([^'"]+)'/g, 'from "$1"');
}

walk('src/app/(storefront)').forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/from ['"]\.\.\/\.\.\/shared['"]/g, "from '../../../shared'");
  c = c.replace(/from ['"]\.\.\/components['"]/g, "from '../../components'");
  c = c.replace(/from ['"]\.\.\/shared['"]/g, "from '../../shared'");
  
  // also specifically fix the ones that got broken by previous script
  c = c.replace(/from '\.\.\/\.\.\/shared"/g, "from '../../shared'");
  c = c.replace(/from '\.\.\/\.\.\/components"/g, "from '../../components'");
  c = c.replace(/from '\.\.\/\.\.\/\.\.\/shared"/g, "from '../../../shared'");
  fs.writeFileSync(f, c);
});

walk('src/app/(admin)').forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  // Specifically fix dashboard pages:
  if (f.includes('dashboard')) {
      c = c.replace(/from ['"]\.\.\/\.\.\/\.\.\/shared\/utils\/supabase['"]/g, "from '../../../../shared/utils/supabase'");
      c = c.replace(/from ['"]\.\.\/\.\.\/\.\.\/shared\/utils\/products['"]/g, "from '../../../../shared/utils/products'");
      
      c = c.replace(/from ['"]\.\.\/\.\.\/\.\.\/\.\.\/shared\/utils\/products['"]/g, "from '../../../../../shared/utils/products'");
      c = c.replace(/from ['"]\.\.\/\.\.\/\.\.\/\.\.\/shared\/utils\/supabase['"]/g, "from '../../../../../shared/utils/supabase'");
  }
  
  // fix broken from previous script
  c = c.replace(/from '\.\.\/\.\.\/components\/admin\/AdminSidebar"/g, "from '../../components/admin/AdminSidebar'");

  fs.writeFileSync(f, c);
});
