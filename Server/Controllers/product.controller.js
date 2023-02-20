const productModel = require("../Models/products.model");

const getProduct = async (page, limit, gender, brand, price) => {
  let product;
  let count;
  if ((page && limit && gender && brand, price)) {
    let skips = limit * (page - 1);
    count = await productModel
      .find({ gender: gender, brand: brand })
      .skip(skips)
      .limit(limit)
      .count();
    product = await productModel
      .find({ gender: gender, brand: brand })
      .skip(skips)
      .limit(limit)
      .sort({ price });
  } else if (page && limit && gender && brand) {
    let skips = limit * (page - 1);
    count = await productModel
      .find({ gender: gender, brand: brand })
      .skip(skips)
      .limit(limit)
      .count();
    product = await productModel
      .find({ gender: gender, brand: brand })
      .skip(skips)
      .limit(limit);
  } else if (page && limit && gender && price) {
    let skips = limit * (page - 1);
    count = await productModel
      .find({ gender: gender })
      .skip(skips)
      .limit(limit)
      .count();
    product = await productModel
      .find({ gender: gender })
      .skip(skips)
      .limit(limit)
      .sort({ price });
  } else if (page && limit && gender) {
    let skips = limit * (page - 1);
    count = await productModel
      .find({ gender: gender })
      .skip(skips)
      .limit(limit)
      .count();
    product = await productModel
      .find({ gender: gender })
      .skip(skips)
      .limit(limit);
  } else if (page && limit && brand && price) {
    let skips = limit * (page - 1);
    count = await productModel
      .find({ brand: brand })
      .skip(skips)
      .limit(limit)
      .count();
    product = await productModel
      .find({ brand: brand })
      .skip(skips)
      .limit(limit)
      .sort({ price });
  } else if (page && limit && brand) {
    let skips = limit * (page - 1);
    count = await productModel
      .find({ brand: brand })
      .skip(skips)
      .limit(limit)
      .count();
    product = await productModel
      .find({ brand: brand })
      .skip(skips)
      .limit(limit);
  } else if (gender && brand && price) {
    count = await productModel.find({ gender: gender, brand: brand }).count();
    product = await productModel
      .find({ gender: gender, brand: brand })
      .sort({ price });
  } else if (gender && brand) {
    count = await productModel.find({ gender: gender, brand: brand }).count();
    product = await productModel.find({ gender: gender, brand: brand });
  } else if (gender && price) {
    count = await productModel.find({ gender: gender }).count();
    product = await productModel.find({ gender: gender }).sort({ price });
  } else if (gender) {
    count = await productModel.find({ gender: gender }).count();
    product = await productModel.find({ gender: gender });
  } else if (brand && price) {
    count = await productModel.find({ brand: brand }).count();
    product = await productModel.find({ brand: brand }).sort({ price });
  } else if (brand) {
    count = await productModel.find({ brand: brand }).count();
    product = await productModel.find({ brand: brand });
  } else if (price) {
    count = await productModel.find().count();
    product = await productModel.find().sort({ price: price });
  } else {
    count = await productModel.find().count();
    product = await productModel.find();
  }

  let data = {
    product,
    count,
  };
  return data;
};

module.exports = { getProduct };
