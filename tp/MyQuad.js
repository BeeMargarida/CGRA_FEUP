 /**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor 
 */
<<<<<<< HEAD
function MyQuad(scene, minS, maxS, minT, maxT) {
=======
 
function MyQuad(scene,minS,maxS,minT,maxT) {
>>>>>>> 8af7aa2cb301e0ff329c61a4d98c35c4d1295d58
	CGFobject.call(this,scene);

	this.minS = minS;
	this.maxS = maxS;
	this.minT = minT;
	this.maxT = maxT;

	this.initBuffers();
};

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor=MyQuad;

MyQuad.prototype.initBuffers = function () {
	this.vertices = [
<<<<<<< HEAD
            -0.5, -0.5, 10.5,
            0.5, -0.5, 10.5,
            -0.5, 0.5, 10.5,
            0.5, 0.5, 10.5
			];

	this.indices = [
            0, 1, 2, 
			3, 2, 1
        ];
=======
 		-0.5, -0.5, 0,
 		0.5, -0.5, 0,
 		-0.5, 0.5, 0,
 		0.5, 0.5, 0
 	];

 	this.indices = [
 		0, 1, 2,
 		3, 2, 1
 	];

 	
		
	 this.normals = [
          0, 0, 1,
          0, 0, 1,
          0, 0, 1,
          0, 0, 1
      ];
>>>>>>> 8af7aa2cb301e0ff329c61a4d98c35c4d1295d58

    this.normals = [
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1
    ];
    
    this.texCoords = [
		this.minS, this.maxT,
		this.maxS, this.maxT,
		this.minS, this.minT,
		this.maxS, this.minT
<<<<<<< HEAD
    ]
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
=======
      ];

	this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
>>>>>>> 8af7aa2cb301e0ff329c61a4d98c35c4d1295d58
};