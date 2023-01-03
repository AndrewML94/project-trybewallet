const URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchAPI = async () => {
  const promise = await fetch(URL);
  const result = await promise.json();
  delete result.USDT;
  return result;
};

export default fetchAPI;
