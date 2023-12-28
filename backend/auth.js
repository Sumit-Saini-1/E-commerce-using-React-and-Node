const { verifyToken } = require("./utils/jsontokens")
const isLogin = function (req, res, next) {
    // if (!req.session.isLoggedIn) {
    //     res.status(401).send("not loggedin");
    //     return;
    // }
    let token = req.headers.authorization;
    // console.log(req.url);
    // console.log(token);
    verifyToken(token).then(result => {
        // console.log(result);
        if (result.role = 'customer') {
            req.body.userId=result.userId;
            req.body.username=result.username;
            req.body.role=result.role;
            next();
        }
        else {
            res.status(401).send("not loggedin");
            return;
        }
    }).catch(err => {
        console.log(err);
        res.status(401).send("not loggedin");
    });
    // next();
}

const isAdmin = function (req, res, next) {
    // if (!req.session.isLoggedIn) {
    //     res.status(401).send("not loggedin");
    //     return;
    // }
    // if (req.session.role != "admin") {
    //     res.status(401).send("not authorized to use this page");
    //     return;
    // }
    let token = req.headers.authorization;
    console.log(req.url);
    console.log(token);
    verifyToken(token).then(result => {
        console.log(result);
        if (result.role = "admin") {
            next();
        }
        else {
            res.status(401).send("not authorized to use this page");
            return;
        }
    }).catch(err => {
        console.log(err);
        res.status(401).send("not loggedin");
    });
    // next();
}

const isSeller = function (req, res, next) {
    if (!req.session.isLoggedIn) {
        res.status(401).send("not loggedin");
        return;
    }
    if (req.session.role != "seller") {
        res.status(401).send("not authorized to use this page");
        return;
    }
    next();
}

const isDistributor = function (req, res, next) {
    if (!req.session.isLoggedIn) {
        res.status(401).send("not loggedin");
        return;
    }
    if (req.session.role != "distributor") {
        res.status(401).send("not authorized to use this page");
        return;
    }
    next();
}
const isDeliveryPerson = function (req, res, next) {
    if (!req.session.isLoggedIn) {
        res.status(401).send("not loggedin");
        return;
    }
    if (req.session.role != "delivery") {
        res.status(401).send("not authorized to use this page");
        return;
    }
    next();
}
module.exports = {
    isLogin,
    isAdmin,
    isSeller,
    isDistributor,
    isDeliveryPerson
}