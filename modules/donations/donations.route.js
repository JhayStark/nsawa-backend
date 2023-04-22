const router = require("express").Router;
const { createDonation } = require("./donations.controller");

const donationRouter = router();

donationRouter.post("/create", createDonation);

module.exports = { donationRouter };
