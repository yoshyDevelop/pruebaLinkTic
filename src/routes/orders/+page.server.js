import { supabase } from "$lib/supabaseClient";
import { json } from "@sveltejs/kit";

export async function load() {
  const orders = await supabase.from("Orders").select("*")
    const customers = await supabase.from("Customers").select("*")
    const products = await supabase.from("Products").select("*")
    const order_products = await supabase.from("Order_Product").select("*")
  return {
    orders: orders?.data ?? [],
    customers: customers?.data ?? [],
    products: products?.data ?? [],
    order_products: order_products?.data ?? [],
  };
}

/** @type {import('./$types').Actions} **/
export const actions = {	
    add: async ({ request }) => {		
        const { customer, products} = await request.json();
        // console.log('formData:', formData)
        const new_order = await supabase
        .from('Orders')
        .insert([
            { customer_id: customer},
        ])
        .select()
        products?.map(async (product) => {
            const new_order_product = await supabase
            .from('Order_Product')
            .insert([
                { order_id: new_order?.data[0]?.id, product_id: product?.id, quantity: product?.quantity},
            ])
            .select()
        })

        return { success: true };
    },  
};
