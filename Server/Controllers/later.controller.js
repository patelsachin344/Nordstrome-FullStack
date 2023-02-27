const Later = require("../Models/later.model");

const getLater = async (id) => {
  const data = await Later.find({ userId: id });
  return data;
};

const addLater = async (id, body) => {
  const userData = await getLater(id);
  let ans;
  if (userData) {
    ans = userData.filter((el) => el.products.id == body.products.id);
  }

  if (ans.length <= 0) {
    return await Later.create(body);
  }
  return "Already exists";
};

const deleteLater = async (laterId) => {
  const data = await Later.findByIdAndDelete(laterId);
  return data;
};

module.exports = { getLater, addLater, deleteLater };
