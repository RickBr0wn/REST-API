'use strict'
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sandbox");

var db = mongoose.connection;

db.on("error", function (error) {
	console.log("CONNECTION ERROR:", err);
});

db.once("open", function () {
	console.log("DB CONNECTION SUCCESSFUL!");
	// all database communication goes here

	var Schema = mongoose.Schema;
	var AnimalSchema = new Schema({
		type: {
			type: String,
			default: "goldfish"
		},
		size: String,
		color: {
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

	AnimalSchema.pre("save", function(next){
		if(this.mass >= 100){
			this.size = "big";
		}else if(this.mass >= 5 && this.mass < 100){
			this.size = "medium";
		}else{
			this.size = "small";
		}
		next();
	});

	AnimalSchema.statics.findSize = function(size, callback){
		// this == Animal
		return this.find({ size: size }, callback);
	}

	var Animal = mongoose.model("Animal", AnimalSchema);

	var elephant = new Animal({
		type: "elephant",
		color: "grey",
		mass: 6000,
		name: "Lawerence"
	});

	var animal = new Animal({}); // goldfish
	var whale = new Animal({
		type: "whale",
		mass: 190500,
		name: "Biggie"
	});
	
	var animalData = [
		{
			type: "mouse",
			color: "grey",
			mass: 0.035,
			name: "Marvin"
		},
		{
			type: "Nutria",
			color: "brown",
			mass: 6.35,
			name: "Gretchin"
		},
		{
			type: "wolf",
			color: "grey",
			mass: 45,
			name: "Wolfenstein"
		},
		elephant,
		animal,
		whale
	];

	Animal.remove({}, function(err){
		if(err) console.error(err);
		Animal.create(animalData, function(err, animals){
			if(err) console.error(err);
			Animal.findSize("medium", function(err, animals){
				animals.forEach(function(animal){
					console.log(animal.name + " the " + animal.color + " " +  animal.type + " is a " + animal.size + "-sized animal");
				});
				db.close(function(){
					console.log("DB CONNECTION CLOSED");
				});
			});
		});
	});

});