
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient('https://qyavqnuvekjkhebsqhti.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5YXZxbnV2ZWtqa2hlYnNxaHRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0ODE1ODgsImV4cCI6MjAzMjA1NzU4OH0.-uRufwUKH2Jda0hFbS4mHk01uNXdkiZbFJWdR2QxAKw');
        