const productModel = require("../Models/products.model");

const getProduct = async (page, limit, gender, brand, _sort, _order) => {
  let product;
  let count;
  if (page && limit && gender && brand && _sort && _order) {
    console.log(page, limit, gender, brand, _sort, _order);

    let skips = limit * (page - 1);
    count = await productModel.find({ gender: gender, brand: brand }).count();
    product = await productModel
      .find({ gender: gender, brand: brand })
      .skip(skips)
      .limit(limit)
      .sort({ [_sort]: [_order === "ase" ? 1 : -1] });
  } else if (page && limit && gender && brand) {
    let skips = limit * (page - 1);
    count = await productModel.find({ gender: gender, brand: brand }).count();
    product = await productModel
      .find({ gender: gender, brand: brand })
      .skip(skips)
      .limit(limit);
  } else if (page && limit && gender && _sort && _order) {
    let skips = limit * (page - 1);
    count = await productModel.find({ gender: gender }).count();
    product = await productModel
      .find({ gender: gender })
      .skip(skips)
      .limit(limit)
      .sort({ [_sort]: [_order === "ase" ? 1 : -1] });
  } else if (page && limit && gender) {
    let skips = limit * (page - 1);
    count = await productModel.find({ gender: gender }).count();
    product = await productModel
      .find({ gender: gender })
      .skip(skips)
      .limit(limit);
  } else if (page && limit && brand && _sort && _order) {
    let skips = limit * (page - 1);
    count = await productModel.find({ brand: brand }).count();
    product = await productModel
      .find({ brand: brand })
      .skip(skips)
      .limit(limit)
      .sort({ [_sort]: [_order === "ase" ? 1 : -1] });
  } else if (page && limit && brand) {
    let skips = limit * (page - 1);
    count = await productModel.find({ brand: brand }).count();
    product = await productModel
      .find({ brand: brand })
      .skip(skips)
      .limit(limit);
  } else if (page && limit && _sort && _order) {
    let skips = limit * (page - 1);
    count = await productModel.find().count();
    product = await productModel
      .find()
      .skip(skips)
      .limit(limit)
      .sort({ [_sort]: [_order === "ase" ? 1 : -1] });
  } else if (page && limit) {
    let skips = limit * (page - 1);
    count = await productModel.find().count();
    product = await productModel.find().skip(skips).limit(limit);
  } else if (gender && brand && _sort && _order) {
    count = await productModel.find({ gender: gender, brand: brand }).count();
    product = await productModel
      .find({ gender: gender, brand: brand })
      .sort({ [_sort]: [_order === "ase" ? 1 : -1] });
  } else if (gender && brand) {
    count = await productModel.find({ gender: gender, brand: brand }).count();
    product = await productModel.find({ gender: gender, brand: brand });
  } else if (gender && _sort && _order) {
    count = await productModel.find({ gender: gender }).count();
    product = await productModel
      .find({ gender: gender })
      .sort({ [_sort]: [_order === "ase" ? 1 : -1] });
  } else if (gender) {
    count = await productModel.find({ gender: gender }).count();
    product = await productModel.find({ gender: gender });
  } else if (brand && _sort && _order) {
    count = await productModel.find({ brand: brand }).count();
    product = await productModel
      .find({ brand: brand })
      .sort({ [_sort]: [_order === "ase" ? 1 : -1] });
  } else if (brand) {
    count = await productModel.find({ brand: brand }).count();
    product = await productModel.find({ brand: brand });
  } else if (_sort && _order) {
    count = await productModel.find().count();
    product = await productModel
      .find()
      .sort({ [_sort]: [_order === "ase" ? 1 : -1] });
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

const getOneProduct = async (id) => {
  const data = await productModel.findById(id);
  return data;
};

module.exports = { getProduct, getOneProduct };
