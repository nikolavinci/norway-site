const fs = require('fs');
const path = require('path');

const walk = d => {
  let r=[];
  fs.readdirSync(d).forEach(f=>{
    f=path.resolve(d,f);
    const s=fs.statSync(f);
    if(s.isDirectory()) r=r.concat(walk(f));
    else if(f.endsWith('.tsx')||f.endsWith('.ts')) r.push(f);
  });
  return r;
};

const files = [...walk('src/app/(storefront)'), ...walk('src/app/(admin)')];

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  
  // Replace anything like from "../../components/..." with from "@/components/..."
  c = c.replace(/from\s+['"]\.*\/.*?components\//g, "from '@/components/");
  c = c.replace(/from\s+['"]\.*\/.*?shared\//g, "from '@/shared/");
  
  // also handle the cases that got garbled like `from '../../shared/utils/products"`
  c = c.replace(/from\s+['"]\.*\/.*?shared\/utils\/products['"]/g, "from '@/shared/utils/products'");
  c = c.replace(/from\s+['"]\.*\/.*?shared\/utils\/supabase['"]/g, "from '@/shared/utils/supabase'");
  c = c.replace(/from\s+['"]\.*\/.*?shared\/utils\/store['"]/g, "from '@/shared/utils/store'");
  
  c = c.replace(/from\s+['"]\.*\/.*?components\/admin\/AdminSidebar['"]/g, "from '@/components/admin/AdminSidebar'");
  c = c.replace(/from\s+['"]\.*\/.*?components\/CuratedPicks['"]/g, "from '@/components/CuratedPicks'");

  // Fix exact layouts
  c = c.replace(/from\s+['"]\.*\/.*?components\/Header['"]/g, "from '@/components/Header'");
  c = c.replace(/from\s+['"]\.*\/.*?components\/Footer['"]/g, "from '@/components/Footer'");
  c = c.replace(/from\s+['"]\.*\/.*?components\/CartDrawer['"]/g, "from '@/components/CartDrawer'");
  
  fs.writeFileSync(f, c);
});
