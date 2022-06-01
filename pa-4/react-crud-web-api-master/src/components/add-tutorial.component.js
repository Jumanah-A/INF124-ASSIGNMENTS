import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeCount = this.onChangeCount.bind(this);
    this.onChangeRate = this.onChangeRate.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      category: "",
      count:0,
      rate:0,
      price:0,
      published: false,
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }
  onChangeCount(e) {
    this.setState({
      count: e.target.value
    });
  }
  onChangeRate(e) {
    this.setState({
      rate: e.target.value
    });
  }
  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }

  saveTutorial() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      category: this.state.category,
      count: this.state.count,
      rate: this.state.rate,
      price: this.state.price
    };
    console.log(data);

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          category: response.data.category,
          count: response.data.count,
          rate: response.data.rate,
          price: response.data.price,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      title: "",
      description: "",
      category: "",
      count:0,
      rate:0,
      price:0,
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                required
                value={this.state.category}
                onChange={this.onChangeCategory}
                name="category"
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                required
                value={this.state.price}
                onChange={this.onChangePrice}
                name="price"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Number of Units Available</label>
              <input
                type="number"
                className="form-control"
                id="count"
                required
                value={this.state.count}
                onChange={this.onChangeCount}
                name="count"
              />
            </div>
            <div className="form-group">
              <label htmlFor="rate">Rate</label>
              <input
                type="number"
                className="form-control"
                id="rate"
                required
                value={this.state.rate}
                onChange={this.onChangeRate}
                name="rate"
              />
            </div>

            <button onClick={this.saveTutorial} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
