const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixProducts() {
  const ids = [
    'a16dfd10-2efe-4362-8ebb-56080e5734ad',
    '7f32d1cf-19be-4778-b1fa-3b71231b79bf',
    'a35fe792-7774-4b49-9a92-ca1d1d71c766'
  ];
  
  const images = [
    '/images/bags/bag1.png',
    '/images/bags/bag2.png',
    '/images/bags/bag3.png'
  ];

  for (let i = 0; i < ids.length; i++) {
    const { data, error } = await supabase
      .from('products')
      .update({ image: images[i], gallery: [images[i]] })
      .eq('id', ids[i]);
      
    if (error) {
      console.error('Error updating', ids[i], error);
    } else {
      console.log('Updated', ids[i], 'to use', images[i]);
    }
  }
}

fixProducts();
