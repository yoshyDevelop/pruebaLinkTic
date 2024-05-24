import { supabase } from "$lib/supabaseClient";
import { json } from "@sveltejs/kit";

export async function load() {
  const products = await supabase.from("Products").select("*")
  const categorys = await supabase.from("Categories").select("*")
//   .eq('id', '2 ');
  return {
    products: products?.data ?? [],
    categorys: categorys?.data ?? [],
  };
}

/** @type {import('./$types').Actions} **/
export const actions = {	
    add: async ({ cookies, request }) => {		
        console.log('ADD PRODUCT')
        const formData = await request.formData();

        console.log('formData:', formData)
        const { data, error } = await supabase
        .from('Products')
        .insert([
            { name: formData.get('name'), price: formData.get('price') , category_id: formData.get('category'), description: formData.get('description')},
        ])
        .select()

        console.log('data:', data)
        console.log('error:', error)
        return {
            status: 200,
            body: data
        }
    },  
};
