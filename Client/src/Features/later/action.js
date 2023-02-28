import {
  Later_Load,
  Later_Success,
  Later_Error,
  Later_Updating,
  Later_Deleting,
  Later_Adding,
} from "./actionType";

export const laterloading = () => {
  return {
    type: Later_Load,
  };
};

export const laterSuccessing = (data) => {
  return {
    type: Later_Success,
    payload: data,
  };
};
export const laterAdding = () => {
  return {
    type: Later_Adding,
  };
};
export const laterUpdating = () => {
  return {
    type: Later_Updating,
  };
};
export const laterDelete = () => {
  return {
    type: Later_Deleting,
  };
};

export const laterErroring = () => {
  return {
    type: Later_Error,
  };
};

export const getLater = (id) => (dispatch) => {
  fetch(`nordstrome-fullstack-production.up.railway.app/laters/${id}`)
    .then((res) => res.json())
    .then((res) => {
      dispatch(laterSuccessing(res));
    })
    .catch(() => dispatch(laterErroring));
};

export const createLater = (id, item) => (dispatch) => {
  console.log(item, "from Later action");
  fetch(`nordstrome-fullstack-production.up.railway.app/${id}`, {
    method: "POST",
    body: JSON.stringify({ products: item, userId: id }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(laterAdding());
      dispatch(getLater(id));
    })
    .catch(() => dispatch(laterErroring()));
};

// export const updateData = (LaterId, count, userId) => (dispatch) => {
//   fetch(`http://localhost:5000/laters/${LaterId}`, {
//     method: "PATCH",
//     body: JSON.stringify({ count }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       dispatch(laterUpdating());
//       dispatch(getData(userId));
//     });
// };

export const deleteLater = (LaterId, userId) => (dispatch) => {
  fetch(`nordstrome-fullstack-production.up.railway.app/${LaterId}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(laterDelete());
      dispatch(getLater(userId));
    });
};
