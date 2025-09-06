export const displayPriceInTaka = (price) => {
  return Intl.NumberFormat("bn-BD", {
    style: "currency",
    currency: "BDT",
  }).format(price);
};
