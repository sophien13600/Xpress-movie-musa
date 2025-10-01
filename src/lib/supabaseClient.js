import { createClient } from "@supabase/supabase-js";
import "dotenv/config";



const supabaseUrl = "https://xflwlhugpayqffrkwkxb.supabase.co";     // URL Supabase
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmbHdsaHVncGF5cWZmcmt3a3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzMDQ2NzAsImV4cCI6MjA3NDg4MDY3MH0.IZgL6GAWKVC6FO3bZ62Z60QOnWQzGOL4PN7BqGYRBTA"; // Anon Key
export const supabase = createClient(supabaseUrl, supabaseKey);
