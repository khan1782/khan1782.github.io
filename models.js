//game constructor
function Game() {

	this.ship;
	this.config = {
		fps: 50,
		dt: (1/50)
	};
};


//will set up the canvas size and the position for ships and invaders
//will run the listeners for key strokes
Game.prototype.initialize = function(gameBoardTag){

	gameBoardTag.height = 600;
	gameBoardTag.width = 550;

	this.gameBoard =gameBoardTag;
	this.ctx = gameBoardTag.getContext("2d")

	//set width and height
	this.width = gameBoardTag.width;

	this.height = gameBoardTag.height;
	

	//set default position for the ship
	this.defaultShipPosition = {x: this.width/2.2, y: this.height/1.4}

	//create new ship with coordinates
	this.ship = new Ship(this.defaultShipPosition.x, this.defaultShipPosition.y);


	//set default position for invader
	this.defaultInvaderPosition = {x:this.width/3, y: this.height/9}
	
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
        self.ship.x += 3;
        console.log("swoosh")
        };

        //check for left
        if(event.keyCode === 37) {
        	self.ship.x -=3;
        	console.log("schweee")
        };

        //check for up
        if(event.keyCode === 38) {
        	self.ship.y -= 3;
        	console.log("vroom")
    		};

    		//check for down
    		if(event.keyCode === 40) {
    			self.ship.y += 3;
    			console.log("sqqueaaa")
    		};


    }, false);

    document.addEventListener('keyup', function(event) {

    		//check for space bar
    		if(event.keyCode === 32) {
    			console.log("pew");
    			self.ship.fire()
    		};
    });

};


//populate convas with default ship and invader locations
Game.prototype.populate = function(){

	//Populate board with ship
	this.ctx.fillStyle = "#ffffff";
	this.ctx.fillRect(this.ship.x, this.ship.y, this.ship.size, this.ship.size);	

	//populate board with invaders
	this.ctx.font = "bold 24px arial, sans-serif";
	var text = "Hello Galaxy";
	this.ctx.fillStyle = "#ffffff";
	this.ctx.fillText(text, this.defaultInvaderPosition.x, this.defaultInvaderPosition.y )
};


//start the game current FPS
Game.prototype.start = function() {

	// start the game loop
	var game = this;
	this.intervalId = setInterval(function() { 
		// console.log("Frames")
		game.draw()
	}, 1000/ this.config.fps);

};


//clears at the start and draws updated location ship or invaders
Game.prototype.draw = function() {
	
	//clear board
	this.ctx.clearRect(0, 0, this.width, this.height);

	//draw ship in it's location
	this.ctx.fillStyle = "#fffffff";
	this.ctx.fillRect(this.ship.x, this.ship.y, this.ship.size, this.ship.size);

	var self = this;
	//draw any missiles that have been shot out of the missile bay
	for(var i=0; i < this.ship.missileBay.length; i++) {
 
		//all missiles will always move foward
		var currentMissile = self.ship.missileBay[i]
		currentMissile.y -= 5
		this.ctx.fillRect(currentMissile.x, currentMissile.y, 1, 20);

		};
};


function Ship(x,y) {

	this.y = y;
	this.x = x;
	this.size = 16 ;
	this.missileBay = [];

	var self = this;

	this.fire = function() {
		self.missileBay.push(new Missile(self.x, self.y));
	};

};


function Missile(x,y) {
	this.x = x;
	this.y = y;
	this.velocity;
	this.size;
};




function Invader(x,y) {
	this.x = x;
	this.y = y;
	this.bodyText = "";

};


