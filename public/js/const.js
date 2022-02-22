class Const {
    static get APP_NAME() {return "My Super App";}
    static get AUTHOR() {return "Anthony BOUCHEREAU";}
    static get APP_PORT() {return 3615;}
    static get SOCKET_PORT() {return 3616;}
}
//class both for Node and Front
if (typeof module != "undefined") {
    module.exports = Const;
}
