let conf = new Object();

// VPN
conf.vpnUser   = conf.vpnUSer   || `${process.env.NORDVPN_USERNAME}`;
conf.vpnPass   = conf.vpnPass   || `${process.env.NORDVPN_PASSWORD}`;
conf.vpnServer = conf.vpnServer || "https://uk1785.nordvpn.com:89";

module.exports = conf