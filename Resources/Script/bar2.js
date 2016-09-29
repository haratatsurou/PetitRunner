var bar2 = function() {};
bar2.prototype = new Sbt.Gadget();
bar2.prototype.doInitialize = function() {
    if (this.canvas.createBar) {
        this.canvas.createBar(this);
    }
};
