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

export default { getProducts };
