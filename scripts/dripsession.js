var canvas;
var end_radius = 5;
var line_width = end_radius*2;
var drips;

function init(){
    canvas = new Canvas('dripper');
    drips = new Array();
    setInterval(run, 50);
}

function run(){
    var ndrips = new Array();
    var dlen = drips.length;
    for(var i=0; i<dlen; i++){
        if(drips[i].update()){
            ndrips.push(drips[i]);
        }
    }
    drips = ndrips;
}

function clear_and_stop(){
    stopDemo();
    drips = new Array();
    canvas.clear();
}

function Drip(p){
    this.l = Math.random()*(80);
    this.w = Math.random()*(end_radius/4)+1;
    this.x = p;
    this.fy = p.elementAt(2)+this.l;
}

Drip.prototype.update = function(){
    this.w = Math.random()<0.5?this.w/1.01:this.w;
    this.x = this.x.add( [ (Math.random()<0.1?0.2:0) , Math.random()+0.5]);
    if(this.w < 0.5 || !canvas.isInside(this.x) || this.x.elementAt(2)>this.fy){
        return false;
    }else{
        canvas.circle(this.x,this.w);
        return true;
    }
}

function getMouseCoords(event){
    if(event == null){
        event = window.event;
    }
    if(event!=null &&(event.pageX || event.pageY)){
        return $V([event.pageX,event.pageY]);
    }
    return null;
}

document.onmousedown = function(event){
    var mc = getMouseCoords(event);
    if(mc != null && canvas.isInside(mc)){
        var previous_pos = mc;
        canvas.circle(previous_pos,end_radius);
        document.onmousemove = function(event){
            var nmc = getMouseCoords(event);
            if(nmc != null && canvas.isInside(nmc)){
                canvas.line(previous_pos, nmc,line_width);
                if(Math.random()<0.3){
                    drips.push(new Drip(nmc));
                }
            }
            previous_pos = nmc;
        }
    }
}
document.onmouseup = function(event){
    document.onmousemove = function(){};
}

