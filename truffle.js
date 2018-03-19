module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*" // match any network
    },
    rinkeby: {
      host: "127.0.0.1",
      port: 8545,
      network_id: '4',
    },
  }
};
