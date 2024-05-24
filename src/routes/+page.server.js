
import { supabase } from "$lib/supabaseClient";

export async function load() {
  const { data } = await supabase.from("countries").select();
  console.log(data)
   
  return {
    countries: data ?? [],
  };
}
