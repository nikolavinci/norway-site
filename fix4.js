const fs = require('fs');
const fix = (f) => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/from\s+['"]([^'"]*)["']/g, "from '$1'");
  fs.writeFileSync(f, c);
};
fix('src/app/(admin)/layout.tsx');
fix('src/app/(storefront)/layout.tsx');
fix('src/app/(storefront)/page.tsx');
