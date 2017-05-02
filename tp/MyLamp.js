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
   
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];
    var height = 0;
    var z = 1/this.stacks;
    var angle2 = (Math.PI/2)/this.stacks;
    var last2 = 0

    for(var s = 0; s <= this.stacks; s++){
      //SIDE
        var last = 0;
        var angle = (2*Math.PI)/this.slices;
        
        for(var i = 0; i < this.slices; i++){
            this.vertices.push(Math.cos(last)*Math.cos(last2 - angle2), Math.sin(last)*Math.cos(last2 - angle2),Math.sin(last2 - angle2));
            this.normals.push(Math.cos(last)*Math.cos(last2 - angle2),Math.sin(last)*Math.cos(last2 - angle2),Math.sin(last2 - angle2));
            this.vertices.push(Math.cos(last)*Math.cos(last2), Math.sin(last)*Math.cos(last2), Math.sin(last2));
            this.normals.push(Math.cos(last)*Math.cos(last2),Math.sin(last)*Math.cos(last2),Math.sin(last2));
            this.texCoords.push(i/this.slices, s/this.stacks);
            this.texCoords.push((i+1)/this.slices, s/this.stacks);
            this.texCoords.push(i/this.slices, (s+1)/this.stacks);
            this.texCoords.push((i+1)/this.slices, (s+1)/this.stacks);
            last += angle;
        }

        var indice = s*2*this.slices;
        for(var i = 0; i < this.slices - 1; i++){
            this.indices.push(indice, indice+2, indice+3);
            this.indices.push(indice, indice+3,indice+1);        
            indice += 2; 
        }

        this.indices.push(s*2*this.slices, indice+1,indice);
        this.indices.push(s*2*this.slices+1, indice+1,s*2*this.slices);

         last2 += angle2;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
 };