var degToRad = Math.PI / 180.0;

function MyTorpedo(scene, x, y, z, angle, vertAngle) {
    CGFobject.call(this, scene);
    this.x = x;
    this.y = y;
    this.z = z;
    this.lastX = x;
    this.lastY = y;
    this.lastZ = z;
    this.diffX = this.x + this.lastX;
    this.diffY = this.y + this.lastY;
    this.diffZ = this.x + this.lastZ;
    this.angle = angle;
    this.vertAngle = vertAngle;

    this.target = null;
    this.targetInd = null;
    this.time = 0;
    this.torpTargInd = 0;
    	
    var d = new Date();
	this.startTime = d.getTime();

    this.cylinderBody = new MyCylinder(this.scene,8,7);
    this.frontBumper = new MyLamp(this.scene,8,7);
    this.rearBumper = new MyLamp(this.scene,8,7);
    this.barb = new MyTrap(this.scene);

    this.p1;
    this.p2;
    this.p3;
    this.p4;
}

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.display = function() {

    this.scene.pushMatrix();
    this.scene.translate(this.x, this.y, this.z);

    this.scene.rotate(this.angle + Math.PI, 0, 1, 0);
    this.scene.rotate(this.vertAngle, 1, 0, 0);

    this.scene.pushMatrix();
    this.scene.scale(0.2, 0.2, 2);
    this.cylinderBody.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(180 * degToRad, 0, 1, 0);
    this.scene.scale(0.2, 0.2, 0.2);
    this.frontBumper.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 2);
    this.scene.scale(0.2, 0.2, 0.2);
    this.rearBumper.display();
    this.scene.popMatrix();

    //barbatana vertical de tras
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 2);
    this.scene.scale(0.5, 0.35, 0.3);
    this.barb.display();
    this.scene.popMatrix();

    //barbatana horizontal de tras
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 2);
    this.scene.scale(0.35, 0.5, 0.3);
    this.scene.rotate(90 * degToRad, 0, 0, 1);
    this.barb.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
}

MyTorpedo.prototype.bezier = function(time) {
    this.qx = Math.pow(1 - time, 3) * this.p1[0] + 3 * time * Math.pow(1 - time, 2) * this.p2[0] + 3 * Math.pow(time, 2) * (1 - time) * this.p3[0] + Math.pow(time, 3) * this.p4[0];
    this.qy = Math.pow(1 - time, 3) * this.p1[1] + 3 * time * Math.pow(1 - time, 2) * this.p2[1] + 3 * Math.pow(time, 2) * (1 - time) * this.p3[1] + Math.pow(time, 3) * this.p4[1];
    this.qz = Math.pow(1 - time, 3) * this.p1[2] + 3 * time * Math.pow(1 - time, 2) * this.p2[2] + 3 * Math.pow(time, 2) * (1 - time) * this.p3[2] + Math.pow(time, 3) * this.p4[2];
    this.qb = [];
    this.qb.push(this.qx, this.qy, this.qz);
    return this.qb;
}

MyTorpedo.prototype.updatePoints = function() {
    this.p1 = [this.x, this.y, this.z];
    this.p2 = [this.x + 6 * Math.cos(this.angle + Math.PI / 2), this.y + 6 * Math.sin(this.vertAngle), this.z - 6 * Math.sin(this.angle + Math.PI / 2)];
    this.p3 = [this.target.x, this.target.y + 3, this.target.z];
    this.p4 = [this.target.x, this.target.y, this.target.z];
}

MyTorpedo.prototype.update = function(currTime) {
    var deltaTime = currTime - this.startTime;
    this.startTime = currTime;
    console.log(deltaTime);
    this.lastX = this.x;
    this.lastY = this.y;
    this.lastZ = this.z;
    if (this.time != 1) {
        this.qb = this.bezier(this.time);
        this.time += 0.01*deltaTime/100;

        this.x = this.qb[0];
        this.y = this.qb[1];
        this.z = this.qb[2];

        this.diffX = this.x - this.lastX;
        this.diffY = this.y - this.lastY;
        this.diffZ = this.z - this.lastZ;

        
        this.angle = Math.atan(this.diffX / this.diffZ) + (this.diffZ<0 ? Math.PI : 0);
        this.vertAngle = Math.atan(this.diffY / (Math.sqrt(this.diffX * this.diffX + this.diffY * this.diffY + this.diffZ * this.diffZ)));
    }
}
