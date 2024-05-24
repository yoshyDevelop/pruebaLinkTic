
<script>
    /** @type {import('./$types').PageData} */
    export let data;
    let selectedCategories = []
    let filterProducts = []
    let successAddproduct = false;
    async function filterProductsByCategory() {
        console.log(selectedCategories)
        const response = await fetch('api/products?/filterByCategory', {
			method: 'POST',
			body: JSON.stringify({ selectedCategories }),
		});
        const data = await response.json();
        console.log(response)
        console.log(data)
        filterProducts = data.products
        // formData.values();
        // const category = document.getElementById('category-select').value;
        // const response = await fetch(`?/products/${category}`);
        // const data = await response.json();
        
    }

    async function addProduct(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(formData.get('name'))
        const response = await fetch('products?/add', {
                    method: 'POST',
                    body: JSON.stringify({name: formData.get('name'), price: formData.get('price') , category_id: formData.get('category'), description: formData.get('description')}),
                });
        const data = await response.json();
        if (data?.type == 'success') {
          successAddproduct = true
        }
        
        console.log(data)
        // formData.values();
        // const category = document.getElementById('category-select').value;
        // const response = await fetch(`?/products/${category}`);
        // const data = await response.json();
    }
    function getCategory(categoryId) {
        return data.categorys.find(category => category.id === categoryId)?.name;
    }
  </script>
  
  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="list-tab" data-bs-toggle="tab" data-bs-target="#list" type="button" role="tab" aria-controls="list" aria-selected="true">Lista de productos</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="create-tab" data-bs-toggle="tab" data-bs-target="#create" type="button" role="tab" aria-controls="create" aria-selected="false">Crear Producto</button>
    </li>
    
  </ul>
  <div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="list" role="tabpanel" aria-labelledby="list-tab">
      
      <div class="row">
        <div class="col">
          
      <fieldset>
        <legend>Filtrar por categoria: </legend>
          {#each data.categorys as category}
              <div>
                  <label>
                  <input type="checkbox" id="{category.id}" name="{category.name}" value="{category.id}" bind:group={selectedCategories}/>
                      {category.name}
                  </label>
              </div>
          {/each}
        <div>
          <button type="button" class="btn btn-primary" on:click={filterProductsByCategory}>Filtrar</button>
        </div>
      </fieldset>
        </div>
        <div class="col-8">
          {#if filterProducts.length > 0}
      <h1></h1>
          {:else}
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Categoria</th>
                <th scope="col">Precio</th>
                <th scope="col">Descripcion</th>
              </tr>
            </thead>
            <tbody>
              {#each data.products as product, i}
            
            <tr>
              <th scope="row">{i}</th>
              <td>{product.name}</td>
              <td>{getCategory(product.category_id)}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
            </tr>
          {/each}
              
            </tbody>
          </table>
    {/if}

    {#if filterProducts.length > 0}
      Productos filtrados:
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Categoria</th>
            <th scope="col">Precio</th>
            <th scope="col">Descripcion</th>
          </tr>
        </thead>
        <tbody>
          {#each filterProducts as product, i}
        
        <tr>
          <th scope="row">{i}</th>
          <td>{product.name}</td>
          <td>{getCategory(product.category_id)}</td>
          <td>{product.price}</td>
          <td>{product.description}</td>
        </tr>
      {/each}
          
        </tbody>
      </table>
      
    {/if}
  
        </div>
      </div>
    </div>
    <div class="tab-pane fade" id="create" role="tabpanel" aria-labelledby="create-tab">
      <form on:submit={addProduct} class="row g-3">

        <div class="col-md-3">
          <label for="name" class="form-label">Nombre</label>
          <input type="text" class="form-control" id="name" name="name" required>
        </div>
        <div class="col-md-3">
          <label for="description" class="form-label">Descripcion</label>
          <input type="text" class="form-control" id="description" name="description" required>
        </div>
        <div class="col-md-4">
          <label for="category" class="form-label">Categoria</label>
          <select id="category-select" name="category" class="form-select" required>
            <option selected>--Por favor, elija una opción--</option>
              {#each data.categorys as category}
                  <option value="{category.id}">{category.name}</option>
              {/each}
          </select>
        </div>
        <div class="col-md-2">
          <label for="price" class="form-label">Precio</label>
          <input type="text" class="form-control" id="price" name="price" min="0" required>
        </div>
        <div class="col-12">
          <button class="btn btn-primary">Crear</button>
        </div>
        <!-- <button>Add</button> -->
      </form>
    </div>
  </div>

  {#if successAddproduct}
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
    Producto creado con exito!
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  {/if}


  



