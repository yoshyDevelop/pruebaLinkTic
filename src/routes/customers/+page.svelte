<script>
    /** @type {import('./$types').PageData} */
    export let data;

  function countOrders(customerId) {
      return data?.orders.filter(order => order.customer_id === customerId).length;
  }
</script>

<table class="table">
  <thead>
      <tr>
        <th scope="col"># Cliente</th>
          <th scope="col">Cliente</th>
          <th scope="col">Total de Pedidos</th>
      </tr>
  </thead>
  <tbody>
      {#each data?.customers as customer, i}
          <tr>
            <th scope="row">{i+1}</th>
              <td>{customer.name}</td>
              <td>{countOrders(customer.id)}</td>
          </tr>
      {/each}
  </tbody>
</table>