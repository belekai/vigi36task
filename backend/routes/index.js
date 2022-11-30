var express = require("express");
var router = express.Router();
var { isLoggedIn } = require("../middleware/auth");

// Controllers
var {
  createGroup,
  addAccountToGroup,
  addBill,
  getGroups,
  getAccounts,
  getBills,
  getGroupName
} = require("../controllers/indexController");

// GET pages
router.get("/groups", isLoggedIn, getGroups);
router.get("/accounts", isLoggedIn, getAccounts);
router.get('/bills/:id', getBills)
router.get('/group/:id', getGroupName)


// POST pages
router.post("/groups", isLoggedIn, createGroup);
router.post("/accounts", isLoggedIn, addAccountToGroup);
router.post("/bills", isLoggedIn, addBill);

module.exports = router;
