
import { supabase } from "$lib/supabaseClient";

export async function load() {
    console.log('holaaa')
  const { data } = await supabase.from("countries").select();
  console.log(data)
   
  return {
    countries: data ?? [],
  };
}
