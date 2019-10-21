const url = "http://test-app.viktor.ws/api/products";

export const getProducts = async (callBack) => {
  if (!url) {
    throw new Error("Url should be specified");
  }
  try {
    const response = await fetch(url)
    const data = await response.json()
    callBack(data.data);
  } catch (er) {
    console.error(er)
  }
};

export const fetchProduct = async (id, callBack, {method = "GET", body = null} = {method: "GET"}) => {
  const productUrl = url + '/' + id
  if (!productUrl) {
    throw new Error("Url should be specified");
  }

  const headers = {
    Accept: '*/*',
    'Content-Type': 'application/json; charset=utf-8'
  }

  const options = {
    method: method,
    headers: headers
  }
  if(body) {
    options.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(productUrl, options)
    const data = await response.json()

    callBack(data.data);
  } catch (er) {
    console.error(er)
  }
};
