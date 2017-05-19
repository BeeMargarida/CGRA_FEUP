/**
 * MyCylinder
 * @constructor
 */
 function MyCylinderInside(scene, slices, stacks) {
    CGFobject.call(this,scene);
   
    this.slices = slices;
    this.stacks = stacks;
 
    this.initBuffers();
 };
 
 MyCylinderInside.prototype = Object.create(CGFobject.prototype);
 MyCylinderInside.prototype.constructor = MyCylinderInside;
 
 MyCylinderInside.prototype.initBuffers = function() {

    var angle = (2*Math.PI)/this.slices;
 	var last = 0;


    this.vertices = [];
 	this.indices = [];
 	this.normals = [];
	this.texCoords = [];
 	indice = 0;

 	for(s = 0; s <= this.stacks; s++)
	{
		this.vertices.push(1, 0, s / this.stacks);
		this.normals.push(-1, 0, 0);
		this.texCoords.push(0, s / this.stacks);
		indice += 1;

		for(i = 1; i <= this.slices; i++)
		{
			last += angle;
			this.vertices.push(Math.cos(last), Math.sin(last), s / this.stacks);
			this.normals.push(-Math.cos(last), -Math.sin(last), 0);
			this.texCoords.push(i / this.slices, s / this.stacks);
			indice++;

			if(s > 0 && i > 0)
			{
				this.indices.push(indice-this.slices-2, indice-2, indice-1);
				this.indices.push(indice-2, indice-this.slices-2, indice-this.slices-3);
			}
		}
		last = 0;
	}
	
	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
 }