import { createClient } from '@supabase/supabase-js'

const SUPBASE__PROJECT_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL
const SUPBASE__PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY


// Create Supabase client
export const supabase = createClient(SUPBASE__PROJECT_URL, SUPBASE__PUBLISHABLE_KEY)