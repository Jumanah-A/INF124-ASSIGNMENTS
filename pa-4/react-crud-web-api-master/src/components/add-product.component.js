import React, { Component, useState } from "react";
import ProductDataService from "../services/product.service";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeUnits = this.onChangeUnits.bind(this);
    
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      published: false,
      price: 0,
      category: "",
      image:"",
      units:0,
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

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }
  
  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }

  onChangeImage(e) {
    this.setState({
      image: e.target.value
    });
  }

  onChangeUnits(e) {
    this.setState({
      units: e.target.value
    });
  }

  saveTutorial() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
      category: this.state.category,
      image: this.state.image,
      count: this.state.units,
      published: this.state.published
    };

    ProductDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.title,
          description: response.description,
          price: response.price,
          category: response.category,
          image: response.image,
          count: response.count,
          published: response.published,

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
      published: false,
      price: 0,
      category: "",
      image:"",
      units:0,

      submitted: false
    });
  }

  render() {
    return (
      <div className="add-component">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>

            <br></br>
            <h2>Add a new product</h2>
            <hr></hr>
            <div id="add-form">
                <div className="form-group">
                  <label htmlFor="title">Product Name</label>
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

                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    step=".01"
                    min="0"
                    id="price"
                    required
                    name="price"
                    onChange={this.onChangePrice}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    required
                    name="category"
                    onChange={this.onChangeCategory}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    id="image"
                    required
                    name="image"
                    onChange={this.onChangeImage}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="count">Number of Units</label>
                  <input
                    type="number"
                    className="form-control"
                    id="count"
                    required
                    name="count"
                    onChange={this.onChangeUnits}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    type="textarea"
                    className="form-control"
                    id="description"
                    required
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    name="description"
                    rows="5"
                  ></textarea>
                </div>

                <button onClick={this.saveTutorial} className="btn btn-success">
                  Submit
                </button>
            </div>
          </div>

        )}
      </div>
    );
  }
}
