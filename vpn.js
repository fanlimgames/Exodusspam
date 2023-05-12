const { OpenVPNClient } = require("openvpn-client");

const config = {
host: "dk213.nordvpn.com",
port: 1194,
protocol: "udp",
username: "<fanlimgames@gmail.com>",
password: "<luka3448",
};

const openvpn = new OpenVPNClient();

const connectVPN = async () => {
try {
await openvpn.connect(config);
console.log("VPN connected!");
} catch (error) {
console.error("VPN connection error:", error);
}
};

module.exports = {
connectVPN,
};