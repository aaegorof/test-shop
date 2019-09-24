export const getProducts = async (url, toState) => {
  if (!url) {
    throw new Error("Url should be specified");
  }
  try {
    const response = await fetch(url)
    const data = await response.json()
    toState(data.data);
  } catch (er) {
    console.error(er)
  }
};

export const fetchProduct = async (url, toState, {method = "GET", body = null, id = null} = {method: "GET"}) => {
  if (!url) {
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
    const response = await fetch(url, options)
    const data = await response.json()

    toState(data.data);
  } catch (er) {
    console.error(er)
  }
};

export default { getProducts };
