export const GetSuccessData = "GetSuccessData";
export const GetOneSuccessData = "GetOneSuccessData";
export const GetLoadData = "GetLoadData";
export const GetErrorData = "GetErrorData";

export const getsuccessdata = (data) => {
  return {
    type: GetSuccessData,
    payload: data,
  };
};

export const getonesuccessdata = (data) => {
  return {
    type: GetOneSuccessData,
    payload: data,
  };
};

export const getloaddata = () => {
  return {
    type: GetLoadData,
  };
};

export const geterrordata = () => {
  return {
    type: GetErrorData,
  };
};

export const getData = (url, setLength) => (dispatch) => {
  dispatch(getloaddata());
  fetch(`${url}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      // console.log(res);
      setLength(res.count);
      return dispatch(getsuccessdata(res.products));
    })
    .catch(() => dispatch(geterrordata()));
};

export const getOneData = (id) => (dispatch) => {
  dispatch(getloaddata());
  fetch(
    `https://nordstrome-fullstack-production-d523.up.railway.app/products/${id}`
  )
    .then((res) => res.json())
    .then((res) => {
      // console.log(res, "from aciton product");
      dispatch(getonesuccessdata(res));
    })
    .catch(() => dispatch(geterrordata()));
};
