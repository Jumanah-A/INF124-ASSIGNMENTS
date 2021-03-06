const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  console.log("CREATING TEST" + req.body.price);
  // Create a Tutorial
  const product = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    rate: 0,
    count: req.body.count,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  Product.create(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
<<<<<<< HEAD
  const category =  req.query.category;
  var categoryCondition = category ? { category: { [Op.like]: `%${category}%` } } : null;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Product.findAll({ where: {condition, categoryCondition} })
=======
  const fromPrice = req.query.fromPrice;
  const toPrice = req.query.toPrice;
  const category = req.query.category;

  var conditions = {}

  if (title) {
    conditions.title = { [Op.like]: `%${title}%`};
  }

  console.log(toPrice, fromPrice)
  if (fromPrice && toPrice) {
    conditions.price = {[Op.between]: [fromPrice, toPrice]}
  }
  else if (fromPrice) {
    conditions.price = { [Op.gte]: fromPrice};
  }
  else if (toPrice) {
    conditions.price = { [Op.gte]: fromPrice};
  }
  
  if (category) {
    conditions.category = category;
  }


  if (conditions.size === 0) {
    conditions = null;
  }
  console.log(conditions)
  Product.findAll({ where: conditions
        // {
        //   price: {
        //     [Op.gte]: fromPrice
        //   },
        //   title: { [Op.like]: `%${title}%` }
        // }
      
    
  })
>>>>>>> 00281b4bb2e1b2ee1c673ddc3591437fc25bd4a4
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// exports.findCategory = (req, res) => {
//     const category =  req.query.category;
//     var categoryCondition = category ? { category: { [Op.like]: `%${category}%` } } : null;
//     Product.findAll({ where: categoryCondition })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Product.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
    Product.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
