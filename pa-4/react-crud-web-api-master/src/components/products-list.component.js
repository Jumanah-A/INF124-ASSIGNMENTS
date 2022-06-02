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
    this.filterPrice = this.filterPrice.bind(this);
    this.onChangeFromPrice = this.onChangeFromPrice.bind(this);
    this.onChangeToPrice = this.onChangeToPrice.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
      fromPrice: 0,
      toPrice: 0
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

  retrieveTutorials() {
    ProductDataService.getAll()
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

  filterPrice() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
    ProductDataService.findByPrice(this.state.searchTitle, this.state.fromPrice, this.state.toPrice)
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
        </div>
        <div className="col-md-12" id="price-filter">
          <p><strong>Filter by price</strong></p>
          <div className="input-group">
            <label htmlFor="from">From:</label>
            <input
              type="number"
              className="form-control"
              placeholder="0.00"
              name="from"
              onChange={this.onChangeFromPrice}
            />
            <label htmlFor="to">To:</label>
            <input
              type="number"
              className="form-control"
              placeholder="0.00"
              name="to"
              onChange={this.onChangeToPrice}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.filterPrice}
            >
              Apply
            </button>
          </div>
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
