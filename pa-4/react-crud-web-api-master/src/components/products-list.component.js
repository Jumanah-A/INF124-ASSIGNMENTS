import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import { Link } from "react-router-dom";

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
    this.onChangeFromPrice = this.onChangeFromPrice.bind(this);
    this.onChangeToPrice = this.onChangeToPrice.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
      fromPrice: null,
      toPrice: null,
      categories: [],
      category: ""
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }
  onChangeFromPrice(e) {
    const fromPrice = e.target.value;
    this.setState({
      fromPrice: fromPrice
    });
  }
  onChangeToPrice(e) {
    const toPrice = e.target.value;
    this.setState({
      toPrice: toPrice
    });
  }
  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }
  onChangeCategory(e) {
    const category = e.target.value;

    this.setState({
      category: category
    });
  }

  retrieveTutorials() {
    ProductDataService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        var categories = []
        response.data.forEach(product => {
          if (!categories.includes(product.category)) {
            categories.push(product.category)
          }
        })
        this.setState({
          categories: categories
        })
        console.log(this.state.categories);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removeAllTutorials() {
    ProductDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });

    console.log(this.state.fromPrice)

    ProductDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchFilter() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
    ProductDataService.findByFilter(this.state.searchTitle, this.state.fromPrice, this.state.toPrice, this.state.category)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-12" id="search-bar">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
          <hr></hr>
        </div>
        <div className="col-md-12" id="price-filter">
          <p><strong>Filter by price</strong></p>
          <div className="input-group">
            <label htmlFor="from">From:</label>
            <input
              type="number"
              className="form-control"
              placeholder="0.00"
              step="0.01"
              name="from"
              onChange={this.onChangeFromPrice}
            />
            <label htmlFor="to">To:</label>
            <input
              type="number"
              className="form-control"
              placeholder="0.00"
              step="0.01"
              name="to"
              onChange={this.onChangeToPrice}
            />
            {/* <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.filterPrice}
            >
              Apply
            </button> */}
          </div>
          <br></br>
        </div>
        
        <div className="col-md-12" id="category-filter">
          <p><strong>Filter by Category</strong></p>
          <div className="input-group">
            {/* <label htmlFor="categories">Categories</label> */}
            <select name="categories" className="form-control" onChange={this.onChangeCategory}>
              <option value="none">None</option>
              {this.state.categories.map((category, index) => {
                return (
                  <option value={category} key={index}>{category}</option>

                )
              })}
            </select>

            {/* <button
              className="btn btn-outline-secondary"
              type="button"
            // onClick={this.filterPrice}
            >
              Apply
            </button> */}
          </div>
        </div>
        <div className="col-md-12" id="apply-filter">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={this.searchFilter}
          >
            Apply Filters
          </button>
          <hr></hr>
        </div>
        <div className="col-md-6">
          <h4>Products List</h4>
          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Product</h4>
              <div id="product-info">
                <div>
                  <img src={currentTutorial.image} alt="product" />
                </div>
                <div>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentTutorial.title}
                </div>
                <div>
                  <label>
                    <strong>Price: </strong>$
                  </label>{""}
                  {currentTutorial.price}
                </div>

                <div>
                  <label>
                    <strong>Category:</strong>
                  </label>{" "}
                  {currentTutorial.category}
                </div>
                <div>
                  <label>
                    <strong>Number of Units:</strong>
                  </label>{" "}
                  {currentTutorial.count}
                </div>

                <div>
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  {currentTutorial.description}
                </div>
                <div>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentTutorial.published ? "Published" : "Pending"}
                </div>

                <Link
                  to={"/products/" + currentTutorial.id}
                  className="badge badge-warning"
                >
                  Edit
                </Link>
              </div>

            </div>
          ) : (
            <div>
              <br />
              <center>
                <p>Please click on a Product...</p>
              </center>
            </div>
          )}
        </div>
      </div>
    );
  }
}
