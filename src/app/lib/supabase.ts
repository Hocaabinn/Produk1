import { createClient } from '@supabase/supabase-js';

<<<<<<< HEAD
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

=======
// Tambahkan tanda ! di akhir untuk validasi tipe data TypeScript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Pastikan variabel di atas tidak undefined sebelum membuat client
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase Environment Variables');
}

>>>>>>> 59078d26e018fb5fe874e988daee85ba0518157d
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    db: { schema: 'public' },
});