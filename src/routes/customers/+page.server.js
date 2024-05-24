import { supabase } from "$lib/supabaseClient";

export async function load() {
  const customers = await supabase.from("Customers").select("*")
  const orders = await supabase.from("Orders").select("*")
//   .eq('id', '2 ');
  return {
    customers: customers?.data ?? [],
    orders: orders?.data ?? [],
  };
}
