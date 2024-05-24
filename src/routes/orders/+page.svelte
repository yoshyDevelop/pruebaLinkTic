<script>
    export let data;

    /** @type {import('./$types').ActionData} */
	export let form;
    let successAddOrder = false;
    console.log('form:',form)
    let order = {
        customer: '',
        products: []
    }

    let productToAdd = {
        id: '',
        quantity: 0, 
    }

    let orderModal = {};
    let productAdds = [];

    const nameProduct = (productId) => {

       
            const product = data.products.find(product => product.id === productId);
            return product ? product.name : '';
     
    }
    function addProduct() {
        if (productToAdd.quantity <= 0 || productToAdd.id === '') {
            alert('Por favor, seleccione un producto y una cantidad válida');
        }else {
            let newProductAdds = [...productAdds];
        newProductAdds.push({...productToAdd});
        productAdds = newProductAdds;
        order.products.push({...productToAdd});
        productToAdd.id = '';
        productToAdd.quantity = 0;
        }

    }

    async function addOrder(event) {
        if (order.customer === '' || order.products.length === 0) {
            alert('Por favor, seleccione un cliente y al menos un producto');
        }
        else {
            event.preventDefault(); 
        const response = await fetch('orders?/add', {
            method: 'POST',
            body: JSON.stringify(order)
        });

        const data = await response.json();
        if (data?.type == 'success') {
          successAddOrder = true
        }
        order = {
            customer: '',
            products: []
        }
        productAdds = [];
        }
        
    }

    function getDetails(orderId) {
        return data?.order_products.filter(order_product => order_product.order_id === orderId);
    }

    function getProduct(productId) {
        return data?.products.find(product => product.id === productId)?.name;
    }

    function getCustomer(customerId) {
        return data?.customers.find(customer => customer.id === customerId)?.name;
        
    }

    function selectOrder(orderId, index) {
        console.log(orderId);
        orderModal = data?.orders.find(order => order.id === orderId);
        orderModal.index = index;
    }
</script>

<ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="list-tab" data-bs-toggle="tab" data-bs-target="#list-tab-pane" type="button" role="tab" aria-controls="list-tab-pane" aria-selected="true">Lista de pedidos</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="create-tab" data-bs-toggle="tab" data-bs-target="#create-tab-pane" type="button" role="tab" aria-controls="create-tab-pane" aria-selected="false">Crear pedido</button>
    </li>
  </ul>
  <div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="list-tab-pane" role="tabpanel" aria-labelledby="list-tab" tabindex="0">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col"># Pedido</th >
                    <th scope="col">Cliente</th >
                    <th scope="col">Productos</th >
                    <th scope="col">Fecha de creacion</th>
                </tr>
            </thead>
            <tbody>
                {#each data?.orders as order,i}
                    <tr on:click="{() => {selectOrder(order.id, i)}}" class="selectOrder" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <td>{i}</td>
                        <td>{getCustomer(order?.customer_id )}</td>
                        <td>
                            {#each getDetails(order.id) as detail}             
                                {getProduct(detail.product_id)}, 
                            {/each}
                        </td>
                        <td>{order.created_at}</td>
                    </tr>
                    <!-- {#each getDetails(order.id) as detail}
                        <tr>
                            <td>{i}</td>
                            <td>{getProduct(detail.product_id)}</td>
                            <td>{detail.quantity}</td>
                        </tr>
                    {/each} -->
                {/each}
            </tbody>
        </table>
        
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Pedido #{orderModal?.index}</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table class="table">
                    <thead>
                        <tr>
                            <th scope="col"># Producto</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Cantidad</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                            {#each getDetails(orderModal.id) as detail, i}
                                <tr>
                                    <th scope="row">{i}</th>
                                    <td>{getCustomer(orderModal?.customer_id )}</td>
                                    <td>{getProduct(detail.product_id)}</td>
                                    <td>{detail.quantity}</td>
                                </tr>
                            {/each}
                    </tbody>
                </table>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                
                </div>
              </div>
            </div>
          </div>
    </div>
    <div class="tab-pane fade" id="create-tab-pane" role="tabpanel" aria-labelledby="create-tab" tabindex="0">
        <form on:submit={addOrder} class="row">
            <div class="row">
                <div class="col-6">
                    <div class="col-md-10">
                        <label for="inputState" class="form-label"> Cliente:</label>
                        <select name="customer" bind:value={order.customer} id="customer" class="form-select">
                          <option selected>--Por favor, elija una opción--</option>
                            {#each data.customers as customer}
                                <option value="{customer.id}">{customer.name}</option>
                            {/each}
                        </select>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="inputState" class="form-label">Producto:</label>
                            <select bind:value={productToAdd.id} name="product" id="product" class="form-select">
                                <option selected>--Por favor, elija una opción--</option>
                                {#each data.products as product}
                                    <option value="{product.id}">{product.name}</option>
                                {/each}
                            </select>
                        </div>
        
                        <div class="col">
                            <label for="inputState" class="form-label">Cantidad:</label>
                            <input bind:value={productToAdd.quantity} type="number" class="form-control" id="quantity" name="" min="0">    
                            
                        </div>
                    </div>
                    
                    <div class="col-md-12 my-2">
                        <button type="button" class="btn btn-success" on:click={addProduct}>Agregar producto</button>
                    </div>
                </div>
                <div class="col">
                    <h3>Productos agregados</h3>
                    <ul class="list-group">
                        {#each productAdds as product}
                            <li class="list-group-item">{nameProduct(product.id)} - {product.quantity}</li>
                        {/each}
                      </ul>
                </div>

                
            </div>
           
            <div class="row my-2">
                <div class="col">
                    <button type="submit" class="btn btn-warning">Crear Pedido</button>
                </div>
            </div>
            
        </form>
    </div>
  </div>



  {#if successAddOrder}
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
    Pedido creado con exito!
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" on:click={() => successAddOrder = false}></button>
  </div>
  {/if}



<style>
    .selectOrder {
        cursor: pointer;
    }   
    .selectOrder:hover {
        background-color: black!important;
    }
</style>





