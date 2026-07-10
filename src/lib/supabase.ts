import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ??
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ??
  '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getSupabaseImageUrl = (
  bucket: string,
  path: string | null | undefined,
) => {
  if (!path) return null;

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};
