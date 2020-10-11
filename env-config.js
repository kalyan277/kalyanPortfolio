const prod = process.env.NODE_ENV === 'production';

module.exports = {
  "process.env.BASE_URL": prod
    ? "https://kalyanportfolio.herokuapp.com"
    : "http://localhost:3000",
  "process.env.NAMESPACE": "https://kalyanportfolio.herokuapp.com",
  "process.env.CLIENT_ID": "38K2xttzqENxOqmCZFABnra77U7OJHPN",
};