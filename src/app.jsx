function ProductTable(props) {
  const productRows = props.products.map(product =><ProductRow key={product.id} product={product} />
  );
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {productRows}
      </tbody>
    </table>
  );
}
function ProductRow(props) {
  const product = props.product;
  return (
    <tr>
      <td>{product.productname}</td>
      <td>${product.price}</td>
      <td>{product.category}</td>
      <td><a href={product.imageurl} target="_blank">View</a></td>
    </tr>
  );
}
class ProductAdd extends React.Component {
  constructor() {
    super();
    this.state = {value:'$'};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event)
  {
    this.setState({value:event.target.value});
  }
  handleSubmit(e) {    
    e.preventDefault();
    const form = document.forms.productAdd;
    const pricewithdollar=form.price.value;
    const removeddollarprice = pricewithdollar.substring(1);
    const product = {
      productname: form.productname.value, price: removeddollarprice ,category: form.category.value, imageurl: form.imageurl.value,
    }
    this.props.createProduct(product);
    form.productname.value = " "; form.category.value = " ";
  }
  render() {
    return (
      <form name="productAdd" onSubmit={this.handleSubmit} className="addprodstyle">
        <div>
          <label>Category</label>
          <select name="category">
              <option value="Shirts" defaultValue>Shirts</option>
              <option value="Jeans">Jeans</option>
              <option value="Jackets">Jackets</option>
              <option value="Sweaters">Sweaters</option>
              <option value="Accessories">Accessories</option>
          </select>
          <label>Price Per Unit</label>
          <input type="text" name="price" value={this.state.value} onChange={this.handleChange} />
        </div>
        <div>
          <label>Product Name</label>
          <input type="text" name="productname" />
          <label>Image URL</label>
          <input type="url" name="imageurl" />
        </div>
        <button>Add Product</button>
      </form>
    );
  }
}
class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
    this.createProduct = this.createProduct.bind(this);
  }
  createProduct(product) {
    product.id = this.state.products.length + 1;
    const newProductList = this.state.products.slice();
    newProductList.push(product);
    this.setState({ products: newProductList });
  }
  render() {
    return (
      <React.Fragment>
        <h3>My Company Inventory</h3>
        <h4>Showing all available products</h4>
        <hr/>
        <ProductTable products={this.state.products} />
        <h4>Add a new product to inventory</h4>
        <hr/>
        <ProductAdd createProduct={this.createProduct} />
      </React.Fragment>
    );
  }
}
const element = <ProductList/>;
ReactDOM.render(element, document.getElementById('contents'));