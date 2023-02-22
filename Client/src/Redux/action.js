export const GetSuccessData = "GetSuccessData";
export const GetLoadData = "GetLoadData";
export const GetErrorData = "GetErrorData";

export const getsuccessdata = (data) => {
  return {
    type: GetSuccessData,
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
      console.log(res);
      setLength(res.count);
      return dispatch(getsuccessdata(res.products));
    })
    .catch(() => dispatch(geterrordata()));
};
