const DOMAIN = 'https://trends.google.com/trends/explore';
const BASE_URL = `${DOMAIN}?`;


const getKeyword = async () => {
  const response = await get("trends.google.com/trends/explore?q=influenza&geo=US")
  console.log(response);
}
console.log(getKeyword());