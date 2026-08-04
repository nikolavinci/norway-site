require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function processImages() {
  console.log('Fetching products...');
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .ilike('image', '%cdn2.blanxer.com%');

  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  console.log(`Found ${products.length} products to process.`);

  const publicDir = path.join(__dirname, '../public/products');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  for (const product of products) {
    try {
      console.log(`Processing ${product.name}...`);
      const url = product.image;
      const fileName = path.basename(new URL(url).pathname);
      const destPath = path.join(publicDir, fileName);

      console.log(`Downloading ${url}...`);
      const buffer = await downloadImage(url);

      console.log(`Resizing and saving to ${destPath}...`);
      // Resize to a maximum width/height suitable for mobile and desktop product cards (e.g., 800x800)
      await sharp(buffer)
        .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(destPath);

      const localUrl = `/products/${fileName}`;
      console.log(`Updating database for ${product.id} to ${localUrl}...`);
      
      const { error: updateError } = await supabase
        .from('products')
        .update({ image: localUrl })
        .eq('id', product.id);

      if (updateError) {
        console.error(`Error updating product ${product.id}:`, updateError);
      } else {
        console.log(`Successfully updated ${product.name}`);
      }
    } catch (e) {
      console.error(`Error processing ${product.name}:`, e);
    }
  }
  
  console.log('Finished processing all images.');
}

processImages();
