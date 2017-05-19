/**
 * MyLamp
 * @constructor
 */
 function MyLamp(scene, slices, stacks) {
    CGFobject.call(this,scene);
   
    this.slices = slices;
    this.stacks = stacks;
 
    this.initBuffers();
 };
 
 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;
 
 MyLamp.prototype.initBuffers = function() {
  
    var angle = (2*Math.PI)/this.slices;
 	var last = 0;
    var angle2 = (Math.PI/2)/this.stacks;
    var last2 = 0;

    this.vertices = [];
 	this.indices = [];
 	this.normals = [];
	this.texCoords = [];
 	indice = 0;

 	for(s = 0; s <= this.stacks; s++)
	{
		this.vertices.push(Math.cos(last)*Math.cos(last2), Math.sin(last)*Math.cos(last2), Math.sin(last2));
		this.normals.push(Math.cos(last)*Math.cos(last2), Math.sin(last)*Math.cos(last2), Math.sin(last2));
		this.texCoords.push(Math.asin(Math.cos(last2))/Math.PI+0.5, 0.5);
		indice += 1;

		for(i = 1; i <= this.slices; i++)
		{
			last += angle;
			this.vertices.push(Math.cos(last)*Math.cos(last2), Math.sin(last)*Math.cos(last2), Math.sin(last2));
			this.normals.push(Math.cos(last)*Math.cos(last2), Math.sin(last)*Math.cos(last2), Math.sin(last2));
			this.texCoords.push(Math.asin(Math.cos(last2))/Math.PI+0.5, Math.asin(Math.sin(last) * (Math.cos(last2)))/Math.PI +0.5);
			indice++;

			if(s > 0 && i > 0)
			{
				this.indices.push(indice-1, indice-2, indice-this.slices-2);
				this.indices.push(indice-this.slices-3, indice-this.slices-2, indice-2);
			}
		}
		last = 0;
		last2 += angle2;
	}
	
	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
 };