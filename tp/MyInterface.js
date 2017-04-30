/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'doSomething');	

	// add a group of controls (and open/expand by defult)
	
	var group=this.gui.addFolder("lights");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	group.add(this.scene, 'light1');
	group.add(this.scene, 'light2');
	group.add(this.scene, 'light3');

	//pause controls
	var group = this.gui.addFolder('Pause Clock');
	group.open();
	group.add(this.scene, 'pause');
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', -5, 5);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (97):	// a
			console.log("Key 'A' pressed");
			break;
		case (100):
			console.log("Key 'D' pressed");
			break;
		case (119):
			console.log("Key 'W' pressed");
			break;
		case(115):
			console.log("Key 'S' pressed");
			break;
	};
};

MyInterface.prototype.processKeyDown = function(event) {
	CGFinterface.prototype.processKeyDown.call(this,event);
	console.log(event);
	switch (event.keyCode)
	{
		case (65):
		case (97):	//a
			this.scene.submarine.a = true;	
			break;
		case (68)://d
		case (100):
			this.scene.submarine.d = true;
			break;
		case (87)://w
		case(119):
			this.scene.submarine.w = true;
			break;
		case(83)://s
		case(115):
			this.scene.submarine.s = true;
			break;
	};
};

MyInterface.prototype.processKeyUp = function(event) {
	CGFinterface.prototype.processKeyUp.call(this,event);
	switch (event.keyCode)
	{
		case (65):	//a
		case (97):
			this.scene.submarine.a = false;
			break;
		case (68):
		case (100):
			this.scene.submarine.d = false;
			break;
		case (87):
		case (119):
			this.scene.submarine.w = false;
			break;
		case(83):
		case (115):
			this.scene.submarine.s = false;
			break;
	};
};


