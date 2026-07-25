const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'shop/page.tsx', title: 'Shop', content: 'Explore the full collection of Pust Atteliers.' },
  { path: 'collections/page.tsx', title: 'Collections', content: 'Curated collections for the modern home.' },
  { path: 'category/upholstery/page.tsx', title: 'Upholstery', content: 'Handcrafted upholstery from Nepal.' },
  { path: 'category/cushions/page.tsx', title: 'Cushions & Throws', content: 'Premium cushions and throws.' },
  { path: 'faq/page.tsx', title: 'FAQ', content: 'Frequently asked questions.' },
  { path: 'shipping/page.tsx', title: 'Shipping & Returns', content: 'Information on shipping and our return policy.' },
  { path: 'contact/page.tsx', title: 'Contact Us', content: 'Get in touch with Pust Atteliers.' },
  { path: 'tos/page.tsx', title: 'Terms of Service', content: 'Our terms and conditions.' }
];

const basePath = path.join(__dirname, 'src', 'app');

pages.forEach(page => {
  const fullPath = path.join(basePath, page.path);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const template = `export default function ${page.title.replace(/[^a-zA-Z]/g, '')}() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#2C2C2A] font-sans antialiased pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif font-light mb-6">${page.title}</h1>
        <p className="text-lg text-[#2C2C2A]/80">${page.content}</p>
      </div>
    </div>
  );
}`;

  fs.writeFileSync(fullPath, template);
  console.log(`Created ${page.path}`);
});
