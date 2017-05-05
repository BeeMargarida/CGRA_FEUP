var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 1, 0.7);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	this.light1=true; this.light2=true; this.light3=true; this.speed=3;
	this.pause = false;
	this.currSubmarineAppearance = 0;

	// Scene elements
	this.submarine = new MySubmarine(this,8,0,7.5,180*Math.PI/180);
	this.plane = new Plane(this);
	this.pole = new MyCylinder(this,8,7);
	this.clock = new MyClock(this,12,1);

	this.targets = [];
	this.targets.push(new MyTarget(this, 5,0.5,15));
	this.targets.push(new MyTarget(this, 0.5,0.5,0.5));
	

	// Materials
	this.materialDefault = new CGFappearance(this);

	this.oceanAppearance = new CGFappearance(this);
	this.oceanAppearance.loadTexture("../resources/images/ocean.jpg");
	this.oceanAppearance.setTextureWrap('REPEAT','REPEAT');

	//Submarine textures
	this.submarineAppearanceList = ['metal','wood','wool','camo'];

	this.enableTextures(true);
	this.setUpdatePeriod(100);
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0,0,0,0);
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10,8,10,1);
	this.lights[2].setVisible(true);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 0, 1.0);
	this.lights[0].enable();  

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();
	this.lights[2].setAmbient(0,0,0,1);
	this.lights[2].setDiffuse(1.0,1.0,1.0,1.0);
	this.lights[2].setSpecular(1,1,1,1);
	this.lights[2].enable();
};

LightingScene.prototype.updateLights = function() {
	if(this.light1 == true)
		this.lights[0].enable();
	else
		this.lights[0].disable();
	
	if(this.light2 == true)
		this.lights[1].enable();
	else
		this.lights[1].disable();
	
	if(this.light3 == true)
		this.lights[2].enable();
	else
		this.lights[2].disable();

	for (i = 0; i < this.lights.length; i++){
		this.lights[i].update();
	}
}

LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	// ---- BEGIN Primitive drawing section

	this.pushMatrix();
		this.submarine.display();
	this.popMatrix();

	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.oceanAppearance.apply();
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(30, 30, 0.2);
		this.plane.display();
		this.materialDefault.apply();
	this.popMatrix();

	this.pushMatrix();
		this.translate(8,0,0);
		this.rotate(-90*degToRad,1,0,0);
		this.scale(0.2,0.2,4.1);
		this.pole.display();
	this.popMatrix();

	this.pushMatrix();
		this.translate(8,5,0);
		this.scale(1,1,0.2);
		this.materialDefault.apply();
		this.clock.display();
	this.popMatrix();

	for(var i = 0; i < this.targets.length; i++){
		this.pushMatrix();
			this.targets[i].display();
		this.popMatrix();
	}

	// ---- END Primitive drawing section
};

LightingScene.prototype.doSomething = function ()
{ console.log("Doing something..."); };


LightingScene.prototype.update = function(currTime){
	if(this.currSubmarineAppearance == 'metal'){
		this.submarine.textIndex = 0;
	}
	else if(this.currSubmarineAppearance == 'wood'){
		this.submarine.textIndex = 1;
	}
	else if(this.currSubmarineAppearance == 'wool'){
		this.submarine.textIndex = 2;
	}
	else if(this.currSubmarineAppearance == 'camo'){
		this.submarine.textIndex = 3;
	}
	this.clock.update(currTime);
	this.submarine.update(currTime);
}