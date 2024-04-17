class Square {
    constructor(ctx, listId, length, x, y, color) {
      this.ctx = ctx;
      this.listId = listId;
      this.length = length;
      this.x = x;
      this.y = y;
      this.color = color;
      this.name = 'Patrat';
    }
  
    draw() {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.length, this.length);
    }
  
    reportArea() {
      let listItem = document.createElement('li');
      // 1px = 0.0264583333 cm
      listItem.innerHTML = `${this.name}: aria este ${this.length * this.length}px<sup>2</sup> = ${this.length * 0.0264583333 * this.length * 0.0264583333} cm <sup>2</sup> `
  
      let list = document.getElementById(this.listId);
      list.appendChild(listItem);
    }
  
    reportPerimeter() {
      let listItem = document.createElement('li');
      listItem.textContent = `${this.name}: perimetrul este ${this.length * 4}px.`
  
      let list = document.getElementById(this.listId);
      list.appendChild(listItem);
    }
  }
  
  export { Square };