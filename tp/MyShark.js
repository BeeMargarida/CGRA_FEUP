function MyShark(scene, x, y, z, tex){
    CGFobject.call(this,scene);
	this.scene = scene;

	this.x = x;
 	this.y = y;
 	this.z = z;
 	this.tex = tex;

 	this.shark = new MyQuad(this.scene,0,1,0,1);


	this.sharkAppearance1 = new CGFappearance(this.scene);
	this.sharkAppearance1.loadTexture("../resources/images/shark1.png");
	this.sharkAppearance1.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

	this.sharkAppearance2 = new CGFappearance(this.scene);
	this.sharkAppearance2.loadTexture("../resources/images/shark2.png");
	this.sharkAppearance2.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
		
	this.sharkAppearance3 = new CGFappearance(this.scene);
	this.sharkAppearance3.loadTexture("../resources/images/shark3.png");
	this.sharkAppearance3.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
}

MyShark.prototype = Object.create(CGFobject.prototype);
MyShark.prototype.constructor = MyShark;

MyShark.prototype.display = function() {

	this.scene.pushMatrix();
		switch(this.tex){
			case 1:this.sharkAppearance1.apply();break;
			case 2:this.sharkAppearance2.apply();break;
			case 3:this.sharkAppearance3.apply();break;
			default:break;
		}
		
		this.scene.translate(this.x,this.y,this.z);
		this.scene.scale(7,3,1);
		this.shark.display();
	this.scene.popMatrix();

}

MyShark.prototype.update = function(currTime) {
	if(this.tex === 2){
		if(this.x >= 50){
			this.x = -50;
		}
		this.x += 0.05;
	}
	else{
		if(this.x <= -50){
			this.x = 50;
		}
		this.x -= 0.05;
	}

}