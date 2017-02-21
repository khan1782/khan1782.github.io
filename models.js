//game constructor
function Game() {

	this.ship;
	this.invaders = [];
	this.shrapnel = [];
	this.stage = 0;
	this.banner = "";
	this.bannerWidth = this.banner.length*14;
	this.config = {
		fps: 50,
		dt: (1/50)
	};

	this.keyStrokes = {
		right: false,
		left: false,
		up: false,
		down: false
	};

};


//will set up the canvas size and the position for ships and invaders
//will run the listeners for key strokes
Game.prototype.initialize = function(gameBoardTag){

	gameBoardTag.height = 1000;
	gameBoardTag.width = 900;

	this.gameBoard =gameBoardTag;
	this.ctx = gameBoardTag.getContext("2d")

	//set width and height
	this.width = gameBoardTag.width;
	this.height = gameBoardTag.height;

	//set default position for the ship
	this.defaultShipPosition = {x: this.width/2.2, y: this.height/1.3};

	//create new ship with coordinates
	this.ship = new Ship(this.defaultShipPosition.x, this.defaultShipPosition.y);


	//set default position for invader
	this.defaultInvaderPosition = {x:this.width/3, y: this.height/10};

	//create new invader with coordinates
	this.wordsToInvaders("Press Space to Begin!")

	//add listeners to key presses
	var game = this;
	game.addListeners();	
};

//run inside of initialize function
Game.prototype.addListeners = function() {

	//save scope for reference
	var self = this;

	//set up listener for keydowns
  document.addEventListener('keydown', function(event) {
    //check for right
    if(event.keyCode === 39) {
    	self.keyStrokes.right = true;
	  };

    //check for left
    if(event.keyCode === 37) {
    	self.keyStrokes.left = true
    };

    //check for up
    if(event.keyCode === 38) {
    	self.keyStrokes.up = true;

		};

		//check for down
		if(event.keyCode === 40) {
			self.keyStrokes.down = true;
		};

  	}, false);

  document.addEventListener('keyup', function(event) {

		//check for space bar
		if(event.keyCode === 32) {
			console.log("pew");
			self.ship.fire(self.ship.numCannons)
		};

  	//check for right
    if(event.keyCode === 39) {
    	self.keyStrokes.right = false;
	  };
	  if(event.keyCode === 37) {
	  	self.keyStrokes.left = false;
	  };
	  if(event.keyCode === 38) {
	  	self.keyStrokes.up = false;
	  };
	  if(event.keyCode === 40) {
	  	self.keyStrokes.down = false;
	  };
  });

};

Game.prototype.multipleKeyStrokeDetection = function() {
	var self = this;
	if(this.keyStrokes.right === true) {
		if (self.ship.x > self.width -55) {
			console.log("schrweee");
		} else {
			self.ship.x += 7;
			console.log("shwoooo")
		};
	};
	if(this.keyStrokes.left === true) {
		if(self.ship.x < 25) {
    		console.log("Weeee");
    	} else {
    		self.ship.x -=7;
    		console.log("vroooooo")
    	};
	};
	if(this.keyStrokes.up === true) {
		if (self.ship.y < self.height/2) {
			console.log("sweeedd")
    } else {
    	self.ship.y -= 7;
    	console.log("vroom");
		};
	};
	if(this.keyStrokes.down === true) {
		if (self.ship.y > self.height - 42) {
			console.log("wreeeee")
		} else {
			self.ship.y += 7;
			console.log("sqqueaaa")
		};
	}
};
//function to wait and listen for any collisions
Game.prototype.invaderCollisions = function() {
	var self = this;

	//iterate through invaders and compare each invader to each missle for collision
	for(var i=0; i < this.invaders.length; i++) {
		var invader = self.invaders[i];
		
	//iterate through missiles and compare each missle to given invader
		for(var j=0; j < self.ship.missileBay.length; j++) {
			var missile = self.ship.missileBay[j];
			if(missile.y > invader.y - 15 && missile.y < invader.y && (missile.x > invader.x && missile.x < invader.x + invader.width )) {
				console.log("Hit!")

				//over here create new shrapnel items
				var letterArray = invader.bodyText.split('')
				letterArray.forEach(function(shrap) {
					self.shrapnel.push(new Shrapnel((invader.x +(invader.width)/2), invader.y, shrap, self)) //x, y, text) 
				});
				self.ship.missileBay.splice(j--, 1);
				self.invaders.splice(i--,1);
			};
		};
	};       
};



Game.prototype.invaderSlide = function () {
	var self = this;

	//to through each invader and have them shift in a given direction based on their direction attribute
	this.invaders.forEach(function(invader){
		invader.y += 0.5
		if (invader.x >= self.width - invader.width) {
			self.invaders.forEach(function(invader) {
				invader.direction = "left"
			});
		};
		if (invader.x <= 0) { 
			self.invaders.forEach(function(invader) {
				invader.direction = "right"
			});
		};
		if(invader.direction === "right") { 
			invader.x += 1
		};
		if(invader.direction == "left") {
			invader.x -= 1
		};
	});
};



//start the game current FPS
Game.prototype.start = function() {

	// start the game loop
	var game = this;
	this.intervalId = setInterval(function() { 
		// console.log("Frames")
		game.draw()
		game.invaderCollisions();
		game.invaderSlide();
		game.multipleKeyStrokeDetection();
		game.stages();

	}, 1000/ this.config.fps);

};

Game.prototype.stages = function() {

		if (this.ultimateTriumph()) {
			this.powerDownShields()
			this.stage += 1


			if (this.stage === 1) {
				this.ship.numCannons = 2;
				this.wordsToInvaders("Resume Invaders: An Interactive Resume");
			} else if (this.stage === 2) {
				this.wordsToInvaders("by Kevin Han");
			} else if (this.stage === 3) {
				this.wordsToInvaders("Has a love for practical and eye catching applications")
			} else if (this.stage === 4) {
				this.wordsToInvaders("Thinks programs should be equally intuitive and beautiful")
			} else if (this.stage === 5) {
				this.wordsToInvaders("Experienced in Ruby on Rails")
			} else if (this.stage === 6) {
				this.wordsToInvaders("Javascript, HTML5, CSS")
			} else if (this.stage === 7) {
				this.wordsToInvaders("Email me at khan1782@gmail.com")
			} else if (this.stage === 8) {
				this.banner = "Email me at khan1782@gmail.com"
			}
		};

};





Game.prototype.ultimateTriumph = function() {
	var invadersLeft = [];
	var self = this;
	this.invaders.forEach(function(invader){
		if(invader.shield === false){
			invadersLeft.push(invader)
		};
	});

	if(invadersLeft.length === 0) {
		return true;
	} else {
		return false;
	};
};

Game.prototype.powerDownShields = function() {
	this.invaders.splice(0,this.invaders.length);	
};


//clears at the start and draws updated location ship or invaders
Game.prototype.draw = function() {
	//save scope for reference
	var self = this;
	
	//clear board
	this.ctx.clearRect(0, 0, this.width, this.height);

	//draw banners
	this.ctx.fillText(this.banner, (this.width/2)-(this.bannerWidth/2), this.height/3)

	//draw ship in it's location
	this.ctx.drawImage(this.ship.image, this.ship.x, this.ship.y)

	//draw shrapnel
	for(var i=0; i < this.shrapnel.length; i++){
		var currentShrapnel = this.shrapnel[i];
		currentShrapnel.fly()
		self.ctx.fillStyle="#ede06f"
		self.ctx.fillText( currentShrapnel.letter,currentShrapnel.x, currentShrapnel.y)
	};


	//draw any existing invaders
	for(var i=0; i < this.invaders.length; i ++) {
		var currentInvader = this.invaders[i];
		this.ctx.fillStyle = "#ffffff";
		this.ctx.fillText(currentInvader.bodyText, currentInvader.x, currentInvader.y)
	};

	//draw any missiles that have been shot out of the missile bay
	for(var i=0; i < this.ship.missileBay.length; i++) {
		var currentMissile = self.ship.missileBay[i]
		
		//all missiles will always move foward
		currentMissile.y -= currentMissile.direction.y
		currentMissile.x -= currentMissile.direction.x

		//if missile reaches top of the screen, delete it
		if (currentMissile.y < 0) {
			console.log("lost to depths of space");
      self.ship.missileBay.splice(i--, 1);
		};

		//ctx draw on canvas
		this.ctx.fillStyle="#ffffff";
		this.ctx.fillRect(currentMissile.x, currentMissile.y, 2, 15);
		};
};


function Ship(x,y) {

	this.y = y;
	this.x = x;
	this.size = 16 ;
	this.missileBay  =[];
	this.numCannons = 1;
	this.image = document.getElementById("ship");

};

Ship.prototype.fire = function(numCannons) {

	if (numCannons === 1){
		this.missileBay.push(new Missile(this.x + 20, this.y));
	} else if (numCannons === 2){
		this.missileBay.push(new Missile(this.x + 5, this.y));
		this.missileBay.push(new Missile(this.x + 35, this.y));
	}
};

function Missile(x,y) {
	
	this.x = x;
	this.y = y;
	// this.velocity;
	this.size;
	this.direction = {
		x:0,
		y:5
	};
};


function Invader(x, y, width, bodyText) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.bodyText = bodyText;
	this.direction = "right";
	this.shield = false;
};

function Shrapnel(x,y,letter, game){
	this.x = x;
	this.y = y;
	this.letter = letter;
	this.game = game;
	this.xFly = (Math.floor(Math.random()*20)) * (Math.round(Math.random()) * 2 - 1) 
	this.yFly = (Math.floor(Math.random()*20)) * (Math.round(Math.random()) * 2 - 1)
	this.persistence = (Math.floor(Math.random()*3))
	this.destructionTimer()
};

Shrapnel.prototype.destructionTimer = function() {
	var game = this.game;
	var shrap = this;
	console.log(game.shrapnel.length)
	setTimeout(function() {
		var shrapIndex = game.shrapnel.indexOf(shrap);
		game.shrapnel.splice(shrap,1);
	}, 500*shrap.persistence);
};

Shrapnel.prototype.fly = function() {
	this.x += this.xFly;
	this.y += this.yFly;
}

//takes in a sentence, breaks it into an array, then creates an invader for each word
Game.prototype.wordsToInvaders = function(sentence) {
	arrayOfWords = sentence.split(" ");

	//starting point for first invader
	var trackLength = 50
	var barrierStart = trackLength;
	var level = this.defaultInvaderPosition.y

	var self = this;
	this.ctx.font="18px Courier"

	//iterate through all words
	for(var i=0; i < arrayOfWords.length; i++) {
		var currentWord = arrayOfWords[i];
		var currentWordWidth = (currentWord.length * 14)



		//edge case for first invader
		if(i === 0) { 
			self.invaders.push(new Invader(trackLength, this.defaultInvaderPosition.y, currentWordWidth, currentWord ));

			//creates new invaders and defines their hit box
		} else {
			var previousWord = arrayOfWords[i-1];
			var previousWidth = (previousWord.length * 15)
			trackLength += (previousWidth + 10)
			// console.log(trackLength)
			self.invaders.push(new Invader(trackLength, this.defaultInvaderPosition.y, currentWordWidth, currentWord));
		};

		//create barrier for the new invaders
		for(var j=0; j< (currentWord.length);j++) {
			newInvader =	new Invader(barrierStart, level + 20, 9 , "_" );
			newInvader.shield = true;
			self.invaders.push(newInvader)
			barrierStart += 15;
		};

	};
};







// create shrapnel class x y letter =======
// put shrapnel on the draw =========
// create method to create shrapnel for each words
// create method that moves shrapnel (need random coordinates)
// create method that will delete shrapnel 
