'use strict'
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sandbox");

var db = mongoose.connection;

db.on("error", function (error) {
	console.log("connection error:", err);
});

db.once("open", function () {
	console.log("database connection successful");
	// all database communication goes here

	var Schema = mongoose.Schema;
	var AnimalSchema = new Schema({
		type: {
			type: String,
			default: "goldfish"
		},
		color: {
			type: String,
			default: "small"
		},
		size: {
			type: String,
			default: "golden"
		},
		mass: {
			type: Number,
			default: "0.007"
		},
		name: {
			type: String,
			default: "Angela"
		}
	});

	var Animal = mongoose.model("Animal", AnimalSchema);

	var elephant = new Animal({
		type: "elephant",
		size: "big",
		color: "grey",
		mass: 6000,
		name: "Lawerence"
	});

	var animal = new Animal({}); // goldfish
	var whale = new Animal({
		type: "whale",
		size: "big",
		mass: 190500,
		name: "biggie"
	});

	Animal.remove({}, () => {
		elephant.save((err) => {
			if (err) {
				console.error('save failed', err);
			} else {
				console.log("saved!");
			}
			animal.save((err) => {
				if (err) {
					console.error('save failed', err);
				} else {
					console.log("saved!");
				}
				whale.save((err) => {
					if (err) {
						console.error('save failed', err);
					} else {
						console.log("saved!");
					}
					Animal.find({
						"size": "big"
					}, function (err, animals) {
						animals.forEach(function (animal) {
							console.log(animal.name + " the " + animal.color + " " + animal.type);
						});
						db.close(() => {
							console.log("db connection closed");
						});
					});
				});
			});
		});
	});

});