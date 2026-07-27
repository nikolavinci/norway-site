require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const BLOG_POSTS = [
  { 
    title: "Must-Have Bags for Your Summer Getaway", 
    meta_title: "Must-Have Bags for Your Summer Getaway",
    meta_description: "When it comes to summer travel, having the perfect bag is essential.",
    image: "https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/69958c7c30895633d86899b0.webp",
    content: "When it comes to summer travel, having the perfect bag is essential. Not only does it need to carry all your essentials, but it should also effortlessly complement your sunny wardrobe. Our newest collection of handcrafted bohemian bags offers the perfect blend of style and practicality for any destination. Whether you're strolling through coastal towns or exploring vibrant city markets, these woven wonders are designed to be your most reliable companion."
  },
  { 
    title: "Eco-Friendly Textiles for a Sustainable Home", 
    meta_title: "Eco-Friendly Textiles for a Sustainable Home",
    meta_description: "Transforming your living space into a sustainable sanctuary starts with the materials you choose.",
    image: "https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/6997e0b63ccc0711c1c926dc.webp",
    content: "Transforming your living space into a sustainable sanctuary starts with the materials you choose. Our eco-friendly textiles are crafted with deep respect for the environment, utilizing natural dyes and ethically sourced fibers. By integrating these earthy elements into your home, you're not just enhancing its aesthetic appeal—you're supporting artisan communities and promoting a greener future. Discover how a simple throw or cushion can make a world of difference."
  },
  { 
    title: "Styling Your Space with Bohemian Prints", 
    meta_title: "Styling Your Space with Bohemian Prints",
    meta_description: "Bohemian interior design is all about breaking the rules and embracing creative freedom.",
    image: "https://cdn2.blanxer.com/69917932e3880672e54e49e5/hero_image/69fc3289f1cedf3765d321d1.webp",
    content: "Bohemian interior design is all about breaking the rules and embracing creative freedom. Mixing and matching bold prints can breathe life into any room, adding layers of texture and personality. Start with a neutral base and introduce vibrant patterns through rugs, tapestries, and accent pillows. Don't be afraid to combine contrasting motifs—the key is to find a unifying color palette that ties the eclectic mix together into a harmonious and inviting space."
  }
];

async function seed() {
  const { data, error } = await supabase.from('blogs').insert(BLOG_POSTS);
  if (error) {
    console.error('Error seeding blogs:', error);
  } else {
    console.log('Successfully seeded blogs:', data);
  }
}

seed();
