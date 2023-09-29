const ExpressError = require("./ExpressError");
const baseUrl = "https://geocode.search.hereapi.com/v1";
const apiKey = "VJXH6jf9Wpsv1fPDHGxu84QZ1099BJniaGuLxEJWs10";

module.exports.geocode = async (address) => {
  const url = `${baseUrl}/geocode?q=${address}&limit=1&apiKey=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.items[0];
  } catch (err) {
    new ExpressError(err.message, 500);
  }
};
