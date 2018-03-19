const decimals = require("../data/config.json").Token.decimals;

module.exports = function(num){
  return num * Math.pow(10, decimals);
}
