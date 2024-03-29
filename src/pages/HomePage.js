import React from 'react';
import CartButton from '../components/CartButton';
import InicialMessage from '../components/InicialMessage';
import ProductList from '../components/ProductList';
import { getProductsFromCategoryAndQuery } from '../services/api';
import CategoryList from '../components/CategoryList';

class HomePage extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      products: [],
      shoppingCart: [],
      category: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.queryProducts = this.queryProducts.bind(this);
    this.setShoppingCart = this.setShoppingCart.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick({ target }) {
    const { value } = target;
    this.setState({
      category: value,
    }, () => this.queryProducts());
  }

  setShoppingCart(product) {
    this.setState((state) => ({
      shoppingCart: [...state.shoppingCart, product],
    }));
  }

  queryProducts() {
    const { search, category } = this.state;
    if (search.length > 0 || category.length > 0) {
      getProductsFromCategoryAndQuery(category, search)
        .then((response) => this.setState({
          products: response.results,
        }));
    } else {
      this.setState({
        products: [],
      });
    }
  }

  render() {
    const { search, products, shoppingCart } = this.state;
    return (
      <div>
        <input
          data-testid="query-input"
          type="text"
          name="search"
          value={ search }
          onChange={ this.handleChange }
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.queryProducts }
        >
          Pesquisar
        </button>
        <CartButton shoppingCart={ shoppingCart } />
        { products.length > 0
          ? <ProductList products={ products } setShoppingCart={ this.setShoppingCart } />
          : <InicialMessage /> }
        <CategoryList clickFunction={ this.handleClick } />
      </div>
    );
  }
}

export default HomePage;
