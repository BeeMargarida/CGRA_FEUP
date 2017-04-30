/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
    CGFobject.call(this,scene);
   
    this.slices = slices;
    this.stacks = stacks;
 
    this.initBuffers();
 };
 
 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;
 
 MyPrism.prototype.initBuffers = function() {
    /*
    * TODO:
    * Replace the following lines in order to build a prism with a **single mesh**.
    *
    * How can the vertices, indices and normals arrays be defined to
    * build a prism with varying number of slices and stacks?
    */
   
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];
    
    var height = 0;
    var z = 1/this.stacks;
    for(var s = 0; s < this.stacks; s++){
      //SIDE
      var last = 0;
      var angle = (2*Math.PI)/this.slices;

      for(var i = 0; i < this.slices; i++){   
          this.vertices.push(Math.cos(last),Math.sin(last),height);
          this.vertices.push(Math.cos(last + angle),Math.sin(last + angle),height);
          this.vertices.push(Math.cos(last),Math.sin(last),height + z);
          this.vertices.push(Math.cos(last + angle),Math.sin(last + angle),height + z);
          this.texCoords.push(i/this.slices, s/this.stacks);
          this.texCoords.push((i+1)/this.slices, s/this.stacks);
          this.texCoords.push(i/this.slices, (s+1)/this.stacks);
          this.texCoords.push((i+1)/this.slices, (s+1)/this.stacks);
          last += angle;
      }

      var indice = s*4*this.slices;
      for(var i = 0; i < this.slices; i++){
          this.indices.push(indice,indice + 1, indice + 3);
          this.indices.push(indice, indice + 3, indice + 2);
          indice += 4;
      }


      //NORMALS
      last = 0
      for(var i = 0; i < this.slices; i++){
        this.normals.push(Math.cos(last + angle/2),Math.sin(last + angle/2),0);
        this.normals.push(Math.cos(last + angle/2),Math.sin(last + angle/2),0);
        this.normals.push(Math.cos(last + angle/2),Math.sin(last + angle/2),0);
        this.normals.push(Math.cos(last + angle/2),Math.sin(last + angle/2),0);
        last += angle;
      }
      height += z;
    }
      

    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
 };