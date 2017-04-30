function MyPaperPlane(scene,x,y,z) {
	CGFobject.call(this,scene);
	this.x = x;
	this.y = y;
	this.z = z;
	this.isUpSideDown = 0;
	this.initBuffers();
};

MyPaperPlane.prototype = Object.create(CGFobject.prototype);
MyPaperPlane.prototype.constructor=MyPaperPlane;

MyPaperPlane.prototype.initBuffers = function () {
	this.vertices = [
            0, 0, 0,
            0, 0, 0,
            1, 0, -0.5,
            1, 0, -0.5,
            1, 0, 0.5,
            1, 0, 0.5,
            1, 0, 0,
            1, 0, 0,
            1, -0.5, 0,
            1, -0.5, 0
			];

	this.indices = [ 
			4, 2, 0,
			1, 3, 5,
			8, 6, 0,
			1, 7, 9
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;

	 this.normals = [
          0, 1, 0,
          0, -1, 0,
          0, 1, 0,
          0, -1, 0,
          0, 1, 0,
          0, -1, 0,
          0, 0, 1,
          0, 0, -1,
          0, 0, 1,
          0, 0, -1
      ];

    this.initGLBuffers();
};

MyPaperPlane.prototype.update = function() {
	if(this.x >= 0.2){
		this.x -= 0.2/2;
		this.y += 0.05/2;
	}
	else {
		if(this.isUpSideDown === 0){
			this.isUpSideDown = 1;
		}
		if(this.y >= 0.2){
			this.y -= 0.2/2;
		}
	}
}