module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      // id: {
      //   type: Sequelize.INTEGER,
      //   primaryKey: true
      // },
      title: {
        type: Sequelize.STRING(1000)
      },
      price: {
        type: Sequelize.DECIMAL(10,2)
      },
      description: {
        type: Sequelize.STRING(1000)
      },
      category: {
        type: Sequelize.STRING(1000)
      },
      image: {
        type: Sequelize.STRING(1000)
      },
      rate: {
        type: Sequelize.INTEGER
      },
      count: {
        type: Sequelize.INTEGER
      },
      published: {
        type: Sequelize.BOOLEAN
    }
      
      
    }, {
        timestamps: false,
    });
  
    return Product;
  };
  