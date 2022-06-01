module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING(1000)
      },
      PRICE: {
        type: Sequelize.DECIMAL(5,2)
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
      
      
    }, {
        timestamps: false,
    });
  
    return Product;
  };
  