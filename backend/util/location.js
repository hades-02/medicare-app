const axios = require('axios');
const AppError = require('./appError');

const getCoordsForAddress = async address => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${process.env.GOOGLE_API_KEY}`
  );

  const { data } = response;

  if (!data || data.status === 'ZERO_RESULTS') {
    throw new AppError('Please enter a valid address', 422);
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
};

module.exports = getCoordsForAddress;
