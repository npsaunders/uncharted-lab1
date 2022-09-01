// =======================
//     DEPENDENCIES
// =======================
// -- packages
const express = require('express');
const app = express();
//include the method-override package
const methodOverride = require("method-override");


// Data location
// const budgets = require("./models/budget.js");
const scientists = require("./models/scientist.js");


// -- config
const port = 3000;

// =======================
//     MIDDLEWARE
// =======================
// static files
app.use(express.static('public'));

// For parsing the incoming request
app.use(express.urlencoded({ extended: false }));

// Use methodOverride.  
app.use(methodOverride("_method"))


// =======================
//       ROUTES
// =======================
// I NDEX
app.get("/uncharted/", (req, res) => {
  res.render("index.ejs", {
    scientist: scientists,
  })
})

// N EW
app.get("/uncharted/new", (req, res) => {
  res.render("new.ejs")
})

// D ELETE
app.delete("/uncharted/:indexOfScientist", (req, res) => {
  scientists.splice(req.params.indexOfScientist, 1) //remove the item from the array
  res.redirect("/uncharted") //redirect back to index route
})

// U PDATE
app.put("/uncharted/:indexOfScientist", (req, res) => {
  //:indexOfScientist is the index of our scientists array that we want to change
  scientists[req.params.indexOfScientist] = req.body;
  //in our scientists array, find the index that is specified in the url (:indexOfScientist).  Set that element to the value of req.body (the input data)
  res.redirect("/uncharted"); //redirect to the index page
})

// C REATE
app.post("/uncharted", (req, res) => {
  scientists.push(req.body);
  res.redirect("/uncharted")
})

// E DIT
app.get("/uncharted/:indexOfScientist/edit", (req, res) => {
  res.render("edit.ejs", {
    scientist: scientists[req.params.indexOfScientist],
    index: req.params.indexOfScientist,
  })
})

// S HOW
app.get("/uncharted/:indexScientist", (req, res) => {
  res.render("show.ejs", {
    scientist: scientists[req.params.indexScientist]
  })
})


// =======================
//       LISTENER
// =======================
app.listen(port, () => {
  console.log("Listening...port=", port);
})