import { supabase } from './supabase';

export interface Blog {
  id: string;
  title: string;
  slug?: string;
  content: string;
  img: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
}

export async function getBlogs(): Promise<Blog[]> {
  const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
  return data || [];
}

export async function getBlogById(id: string): Promise<Blog | null> {
  const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
  if (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
  return data;
}

export async function createBlog(blog: Partial<Blog>): Promise<Blog | null> {
  // Generate slug if not provided
  if (!blog.slug && blog.title) {
    blog.slug = blog.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  const { data, error } = await supabase.from('blogs').insert([blog]).select().single();
  if (error) {
    throw error;
  }
  return data;
}

export async function updateBlog(id: string, updates: Partial<Blog>): Promise<void> {
  const { error } = await supabase.from('blogs').update(updates).eq('id', id);
  if (error) {
    throw error;
  }
}

export async function deleteBlog(id: string): Promise<void> {
  const { error } = await supabase.from('blogs').delete().eq('id', id);
  if (error) {
    throw error;
  }
}
