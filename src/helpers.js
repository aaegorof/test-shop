export const priceValidate = val => /^\d+$/i.test(val);

export const codeValidate = val => /^(\d){4}-(\d){4}/.test(val);

export const scrollTo = val => () => {
  document.querySelector(val).scrollIntoView({
    block: "end",
    behavior: "smooth"
  });
};
