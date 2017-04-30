function MyTriangle(scene){
	CGFobject.call(this,scene);
	this.initBuffers();
};

MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor=MyTriangle;

MyQuad.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,
			];

	this.indices = [
            0, 1, 2, 
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;

	 this.normals = [
          0, 0, 1,
          0, 0, 1,
          0, 0, 1,
      ];

     /* this.texCoords = [
		0,1
		1,0,
		1,
      ];*/

    this.initGLBuffers();
};