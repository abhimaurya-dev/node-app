const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWJoaXNoZWttYXVyeWEtb2ZmaWNpYWwiLCJhIjoiY2t6dzhkZWh1MGU4eTJxbGx3dnQ0NzIzMCJ9.YyOmLvmMdHewdTxdmz9Ypw&limit=1`;

  request({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to server", undefined);
    } else if (body.features.length == 0) {
      callback("unable to find location try another one", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
      });
    }
  });
};

module.exports = geocode;
