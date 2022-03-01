const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4cd89e28356c1eba7f23aaab93fe2e01&units=metric`;

  request({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback("unable to connect", undefined);
    } else if (body.message) {
      callback("unable to locate", undefined);
    } else {
      callback(undefined, body.main.temp);
    }
  });
};

module.exports = forecast;
