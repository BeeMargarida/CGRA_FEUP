function MyTriangle(scene,minS,maxS,minT,maxT) {
	CGFobject.call(this,scene);
	this.minS = minS || 0;
	this.maxS = maxS || 1;
	this.minT = minT || 0;
	this.maxT = maxT || 1;

	this.initBuffers();
};

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor=MyTriangle;

MyTriangle.prototype.initBuffers = function () {
	this.vertices = [
 		-0.5, -0.5, 0,
 		0.5, -0.5, 0,
 		-0.5, 0.5, 0,
 	];

<<<<<<< HEAD
	this.indices = [
            0, 1, 2, 
        ];
		
	
=======
 	this.indices = [
 		0, 1, 2,
 	];
>>>>>>> 8af7aa2cb301e0ff329c61a4d98c35c4d1295d58

 	
		
	 this.normals = [
          0, 0, 1,
          0, 0, 1,
          0, 0, 1,
      ];
<<<<<<< HEAD
      
	//this.primitiveType=this.scene.gl.TRIANGLES;
=======

      this.texCoords = [
		this.minS, this.maxT,
		this.maxS, this.maxT,
		this.minS, this.minT,
		this.maxS, this.minT
      ];

	this.primitiveType = this.scene.gl.TRIANGLES;
>>>>>>> 8af7aa2cb301e0ff329c61a4d98c35c4d1295d58
    this.initGLBuffers();
};