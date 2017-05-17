 function MyEqualSidedTriangle(scene,minS,maxS,minT,maxT) {
 	CGFobject.call(this,scene);
	this.minS = minS || 0;
	this.maxS = maxS || 1;
	this.minT = minT || 0;
	this.maxT = maxT || 1;

	this.initBuffers();
 };

 MyEqualSidedTriangle.prototype = Object.create(CGFobject.prototype);
 MyEqualSidedTriangle.prototype.constructor = MyEqualSidedTriangle;

 MyEqualSidedTriangle.prototype.initBuffers = function () {
 	this.vertices = [
 		0, 0, 0,
 		0.5, 0, 0,
 		0, Math.sqrt(0.75), 0,
 		-0.5, 0, 0		
 	];


 	this.indices = [
 		0, 1, 2,
 		3, 0, 2
 	];

	 this.normals = [
          0, 0, 1,
          0, 0, 1,
          0, 0, 1,
          0, 0, 1,
      ];

      this.texCoords = [
		this.minS, this.maxT,
		this.maxS, this.minT,
		this.maxS, this.maxT,
		this.minS, this.minT	
      ];

	this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
 };