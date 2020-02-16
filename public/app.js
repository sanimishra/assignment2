function ProductTable(props) {
  const productRows = props.products.map(product => React.createElement(ProductRow, {
    key: product.id,
    product: product
  }));
  return React.createElement("table", {
    className: "bordered-table"
  }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Product Name"), React.createElement("th", null, "Price"), React.createElement("th", null, "Category"), React.createElement("th", null, "Image"))), React.createElement("tbody", null, productRows));
}

function ProductRow(props) {
  const product = props.product;
  return React.createElement("tr", null, React.createElement("td", null, product.productname), React.createElement("td", null, "$", product.price), React.createElement("td", null, product.category), React.createElement("td", null, React.createElement("a", {
    href: product.imageurl,
    target: "_blank"
  }, "View")));
}

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '$'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    const pricewithdollar = form.price.value;
    const removeddollarprice = pricewithdollar.substring(1);
    const product = {
      productname: form.productname.value,
      price: removeddollarprice,
      category: form.category.value,
      imageurl: form.imageurl.value
    };
    this.props.createProduct(product);
    form.productname.value = " ";
    form.category.value = " ";
  }

  render() {
    return React.createElement("form", {
      name: "productAdd",
      onSubmit: this.handleSubmit,
      className: "addprodstyle"
    }, React.createElement("div", null, React.createElement("label", null, "Category"), React.createElement("select", {
      name: "category"
    }, React.createElement("option", {
      value: "Shirts",
      defaultValue: true
    }, "Shirts"), React.createElement("option", {
      value: "Jeans"
    }, "Jeans"), React.createElement("option", {
      value: "Jackets"
    }, "Jackets"), React.createElement("option", {
      value: "Sweaters"
    }, "Sweaters"), React.createElement("option", {
      value: "Accessories"
    }, "Accessories")), React.createElement("label", null, "Price Per Unit"), React.createElement("input", {
      type: "text",
      name: "price",
      value: this.state.value,
      onChange: this.handleChange
    })), React.createElement("div", null, React.createElement("label", null, "Product Name"), React.createElement("input", {
      type: "text",
      name: "productname"
    }), React.createElement("label", null, "Image URL"), React.createElement("input", {
      type: "url",
      name: "imageurl"
    })), React.createElement("button", null, "Add Product"));
  }

}

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
    this.createProduct = this.createProduct.bind(this);
  }

  createProduct(product) {
    product.id = this.state.products.length + 1;
    const newProductList = this.state.products.slice();
    newProductList.push(product);
    this.setState({
      products: newProductList
    });
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement("h3", null, "My Company Inventory"), React.createElement("h4", null, "Showing all available products"), React.createElement("hr", null), React.createElement(ProductTable, {
      products: this.state.products
    }), React.createElement("h4", null, "Add a new product to inventory"), React.createElement("hr", null), React.createElement(ProductAdd, {
      createProduct: this.createProduct
    }));
  }

}

const element = React.createElement(ProductList, null);
ReactDOM.render(element, document.getElementById('contents'));