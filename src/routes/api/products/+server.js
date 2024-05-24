import { supabase } from "$lib/supabaseClient";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
	console.log('POST PRODUCTS')
  const { selectedCategories } = await request.json();
  console.log('selectedCategories:', selectedCategories)
  const productsFilter = await supabase
.from('Products')
.select('*')
.in('category_id', selectedCategories)

console.log('data:', productsFilter)
if (productsFilter.error) console.error('Error loading products:', error)

return json({ products: productsFilter?.data ?? [] })
}
