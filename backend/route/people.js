const express = require("express");

const PeopleController = require('../controllers/people');
const router = express.Router();

router.get("/search/:id", PeopleController.StarWarsApiSearch);

module.exports = router;
