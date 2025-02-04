
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xdgfxsrebnqtksgstuym.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkZ2Z4c3JlYm5xdGtzZ3N0dXltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2NzAzMjksImV4cCI6MjA1NDI0NjMyOX0.PvxY-8T7TClNlnOGWFZZylsPL3Cu2a14eo-p4fYJLuk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;