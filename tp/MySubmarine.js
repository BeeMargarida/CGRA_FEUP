/* MySubmarine*/
var degToRad = Math.PI / 180.0;

function MySubmarine(scene,x,y,z,angle) {
	CGFobject.call(this,scene);
	this.x = x;
	this.y = y;
	this.z = z;
	this.angle = Math.PI;
	this.w = false;
	this.a = false;
	this.s = false;
	this.d = false;
	this.q = false;
	this.e = false;
	this.p = false;
	this.l = false;
	this.speed = 0.0;
	this.vertAngle = 0;
	this.createTorpedo = false;


	this.targetIndice = 0;
	this.tempTargetIndice = 0;

	
	var d = new Date();
	this.startTime = d.getTime();

	this.cylinderBody = new MyCylinder(this.scene,8,7);
	this.frontBumper = new MyLamp(this.scene, 8,7);
	this.rearBumper = new MyLamp(this.scene, 8,7);
	this.cylinderTower = new MyCylinder(this.scene, 8,7);
	this.towerTop = new MyCircle(this.scene,8);

	this.barb = new MyTrap(this.scene);
	this.peri = new MyPeriscope(this.scene);
	this.prop1 = new MyPropeller(this.scene);
	this.prop2 = new MyPropeller(this.scene);

	this.barbAngle = 0;
	this.vertBarbAngle = 0;

	this.propeller = new MyCylinder(this.scene,8,7);
	this.insideProp = new MyCylinderInside(this.scene,8,7);
	this.rightProp = new MyUnitCubeQuad(this.scene);
	this.leftProp = new MyUnitCubeQuad(this.scene);
	this.middleProp = new MyLamp(this.scene,8,7);

	this.torpedo = [];
	this.bubbles = [];
	//textures
	this.submarineAppearances = [];

	this.aluminium = new CGFappearance(this.scene);
	this.aluminium.loadTexture("../resources/images/metal.png");
	this.aluminium.setAmbient(0.8, 0.8, 0.8, 1);
	this.aluminium.setDiffuse(0.8, 0.8, 0.8, 0.3);
	this.aluminium.setSpecular(0.8, 0.8, 0.8, 1);
	this.aluminium.setEmission(0.2,0.2,0.2,1);
	this.aluminium.setShininess(300);
	this.submarineAppearances.push(this.aluminium);

	this.wood = new CGFappearance(this.scene);
	this.wood.loadTexture("../resources/images/table.png");
	this.wood.setTextureWrap('REPEAT','REPEAT');
	this.wood.setAmbient(0.8,0.8,0.8,1);
	this.wood.setDiffuse(0.8, 0.8, 0.8, 0.3);
	this.wood.setSpecular(0.1,0.1,0.1,0.8);
	this.submarineAppearances.push(this.wood);

	this.wool = new CGFappearance(this.scene);
	this.wool.loadTexture("../resources/images/wool.png");
	this.wool.setTextureWrap('REPEAT','REPEAT');
	this.submarineAppearances.push(this.wool);

	this.camo = new CGFappearance(this.scene);
	this.camo.loadTexture("../resources/images/camo.png");
	this.camo.setTextureWrap('REPEAT','REPEAT');
	this.submarineAppearances.push(this.camo);

	this.w95 = new CGFappearance(this.scene);
	this.w95.loadTexture("../resources/images/w95.jpg");
	this.w95.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
	this.submarineAppearances.push(this.w95);

	this.textIndex = 0;

	this.materialDefault = new CGFappearance(this.scene);
	this.initBuffers();
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor=MySubmarine;

MySubmarine.prototype.display = function () {
	this.submarineAppearances[this.textIndex].apply();
	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y+2,this.z);
		this.scene.rotate(this.angle,0,1,0);
		this.scene.rotate(this.vertAngle,1,0,0);
	this.scene.pushMatrix();
		this.scene.translate(0,0,-2);
		this.scene.scale(0.73,1,4.08);
		this.cylinderBody.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    	this.scene.translate(0,0,-2);
    	this.scene.rotate(180*degToRad,0,1,0);
    	this.scene.scale(0.73,1,1);
		this.frontBumper.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    	this.scene.translate(0,0,2.08);
    	this.scene.scale(0.73,1,1);
		this.rearBumper.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    	this.scene.translate(0,1.57,0);
    	this.scene.scale(0.5,1,0.88);
    	this.scene.rotate(90*degToRad,1,0,0);
		this.cylinderTower.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    	this.scene.translate(0,1.57,0);
    	this.scene.scale(0.5,1,0.88);
    	this.scene.rotate(-90*degToRad,1,0,0);
		this.towerTop.display();
    this.scene.popMatrix();

	//periscope
	this.scene.pushMatrix();
		this.scene.translate(0,2.6,-0.7);
		this.peri.display();
	this.scene.popMatrix();

	//barbatana vertical de tras
   	this.scene.pushMatrix();
		this.scene.translate(0,0,2.3);
		this.scene.scale(1,1.5,1);
		this.scene.rotate(this.barbAngle*degToRad,0,1,0);
		this.barb.display();
	this.scene.popMatrix();

	//barbatana horizontal de tras
    this.scene.pushMatrix();
    	this.scene.translate(0,0,2.3);
    	this.scene.scale(1.5,1,1);
    	this.scene.rotate(90*degToRad,0,0,1);
    	this.scene.rotate(this.vertBarbAngle*degToRad,0,1,0);
		this.barb.display();
    this.scene.popMatrix();

	//barbatana horizontal da frente
  	this.scene.pushMatrix();
    	this.scene.translate(0,1.2,0.3);
    	this.scene.rotate(90*degToRad,0,0,1);
    	this.scene.rotate(180*degToRad,1,0,0);
		this.barb.display();
    this.scene.popMatrix();
	
	//Propellers
	//right
	this.scene.pushMatrix();
		this.scene.translate(1,-0.4,1.9);
		this.prop1.display();
	this.scene.popMatrix();

	//left
    this.scene.pushMatrix();
		this.scene.translate(-1,-0.4,1.9);
		this.prop2.display();
	this.scene.popMatrix();
	this.scene.popMatrix();
	
	for(var i = 0; i < this.torpedo.length; i++){
		this.scene.pushMatrix();
			this.submarineAppearances[this.textIndex].apply();
			this.torpedo[i].display();
		this.scene.popMatrix();
	}

	for(var i = 0; i < this.bubbles.length; i++){
		this.bubbles[i].display();
	}
};

MySubmarine.prototype.update = function(currTime) {
	var deltaTime = currTime - this.startTime;
	this.startTime = currTime;
	this.prop1.updateLeft(deltaTime, this.speed);
	this.prop2.updateRight(deltaTime, this.speed);
    if(this.a === true){
		this.angle += 5*Math.PI/180*deltaTime/100;
    }
    if(this.d === true){
        this.angle -= 5*Math.PI/180*deltaTime/100;
    }
    if(this.w === true){
    	this.speed += 0.05*this.scene.speed*deltaTime/100;
    	this.bubbles1 = new MyBubble(this.scene,this.x - 1*Math.sin(this.angle), this.y+Math.sin(this.vertAngle), this.z+3*Math.cos(this.angle), this.angle, this.vertAngle);
   		this.bubbles.push(this.bubbles1);
    }
    if(this.s === true){
        this.speed -= 0.05*this.scene.speed*deltaTime/100;
    }
    if(this.p === true){
    	this.peri.elevatePeriscope(deltaTime/100);
    }
    if(this.l === true){
    	 this.peri.lowerPeriscope(deltaTime/100);
    }
    if(this.q === true && this.vertAngle < 80*degToRad){
    	this.vertAngle += 5*Math.PI/180*deltaTime/100;
    }
    if(this.e === true && this.vertAngle > -80*degToRad){
    	this.vertAngle -= 5*Math.PI/180*deltaTime/100;
    }
    this.x -= this.speed*Math.sin(this.angle)*deltaTime/100;
    this.y += this.speed*Math.sin(this.vertAngle)*deltaTime/100;
    this.z -= this.speed*Math.cos(this.angle)*deltaTime/100;
	
	if(this.createTorpedo === true){
		this.temp = new MyTorpedo(this.scene,this.x,this.y,this.z,this.angle,this.vertAngle);
	   	this.temp.target = this.scene.targets[this.targetIndice];
	   	this.temp.targetInd = this.targetIndice;
	   	this.temp.updatePoints();
	   	this.torpedo.push(this.temp);
	   	this.createTorpedo = false;
	   	this.targetIndice += 1;
	   	this.scene.targtorpRatio -= 1;
	}
    for(var i = 0; i < this.torpedo.length; i++){
    	this.torpedo[i].update(currTime);
    	if(this.torpedo[i].x <= 0.5+this.scene.targets[this.torpedo[i].targetInd].x &&
    	   this.torpedo[i].x >= -0.5+this.scene.targets[this.torpedo[i].targetInd].x &&
    	   this.torpedo[i].y <= 0.5+this.scene.targets[this.torpedo[i].targetInd].y &&
    	   this.torpedo[i].y >= -0.5+this.scene.targets[this.torpedo[i].targetInd].y &&
    	   this.torpedo[i].z <= 0.5+this.scene.targets[this.torpedo[i].targetInd].z &&
    	   this.torpedo[i].z <= 0.5+this.scene.targets[this.torpedo[i].targetInd].z){
    	   this.scene.targets[this.torpedo[i].targetInd].explode();
    	   this.torpedo.splice(0,1);
    	}
    }
    for(var i = 0; i < this.bubbles.length; i++){
    	this.bubbles[i].update(currTime);
    	if(this.bubbles[i].updateTime <= 0){
    		this.bubbles.splice(i, 1);
    	}
    }
};