const  UGRAPH_JS=666;

//==================================================================================================
/*
var SX0, SY0,  Sff, SPad=0;
function x2S(x) { return SX0 + x*Sff; }          //  unit to Screen
function y2S(y) { return SY0 - y*Sff; }
function u2S(u)  { return u*Sff; }
function S2x(x) { return  (x - SX0)/Sff; }       //  Screen to unit
function S2y(y) { return -(y - SY0)/Sff; }
function S2u(s) { return  s/Sff; }
/* */

/// function Q(qn, q, qx) { q = Math.max(qn, q); q = Math.min(q, qx); return q; }

/*
//==================================================================================================
function SSetScale(W, H,  pad=0) {               //  pxls, pxls,  units
  SPad = pad;
  Sff = Math.min(W/(SXx-SXn),  H/(SYx-SYn));
  SX0 = W/2 - u2S((SXx+SXn)/2);  SY0 = H/2 + u2S((SYx+SYn)/2);
}
//==================================================================================================
function SSetLims(xn, xx,  yn, yx) {
  try {
     ///  bugcs("   SL: IN:", SXn, SXx,  SYn, SYx,  " 1> ",  xn, xx,  yn, yx);
    if(((xx-xn)<=0) || ((yx-yn)<=0)) { EMsg("SSetLims1: "+ String([xn, xx,  yn, yx])); return; }
    xn = Q(SXN, xn, SXX-SPad),  xx = Q(SXN+SPad, xx, SXX);
    yn = Q(SYN, yn, SYX-SPad),  yx = Q(SYN+SPad, yx, SYX);
      ///  bugcs(" =2> ", xn, xx,  yn, yx);
    if(((xx-xn)<=0) || ((yx-yn)<=0)) { EMsg("SSetLims2: "+ String([xn, xx,  yn, yx])); return; }
    [SXn, SXx,  SYn, SYx] = [xn, xx,  yn, yx];
      ///  buglncs(" =3> ", SXn, SXx,  SYn, SYx);
  } catch(err) { EMsg("line", err); }
}

var SZoomF = 1.5;
//==================================================================================================
function SZoomIn(ctx,  pxf, pyf,  pxt, pyt) {
  try {
    let xn, xx,  yn, yx;
    let xf = Q(SXN, S2x(pxf), SXX),   xt = Q(SXN, S2x(pxt), SXX);
    let yf = Q(SYN, S2y(pyf), SYX),   yt = Q(SYN, S2y(pyt), SYX);
      /// bugcs("  ZI:",   pxf, pxt,  pyf, pyt, " => ",  xf, xt,  yf, yt)
    if((Math.abs(pxf-pxt) < 2) || (Math.abs(pyf-pyt) < 2)) {    //  click
      let s = 1/SZoomF/2,  dx = s*(SXx - SXn),  dy = s*(SYx - SYn);
      xn = xt - dx;  xx = xt + dx;
      yn = yt - dy;  yx = yt + dy;
      }
     else {                                        //  box
        /// bugcs(" Dg:", SXn, SXx,  SYn, SYx);
      [xn, xx]  = MM(xf, xt);       /// Math.min(xf, xt);  xx = Math.max(xf, xt);
      [yn, yx]  = MM(yf, yt);       /// yn = Math.min(yf, yt);  yx = Math.max(yf, yt);
      }
      /// bugcs(" => ",   xn, xx,  yn, yx);
    SSetLims(xn, xx,  yn, yx);
      /// bugln("  SZoomIn");
  } catch(err) { EMsg("SZoomIn", err); }
}
//==================================================================================================
function SZoomOut(ctx,  px, py) {
  try {
    let xn, xx,  yn, yx,  q;
     /// bugcs("   ZO:", SXn, SXx,  SYn, SYx,  "=1>",  px, py);
    let x = Q(SXN, S2x(px), SXX),  y = Q(SYN, S2y(py), SYX);
     /// bugcs(" =2> ",  x, y);
    let s = SZoomF;
    xn = x - s*(x - SXn);  xx = x + s*(SXx - x);
    yn = y - s*(y - SYn);  yx = y + s*(SYx - y);
     /// bugcs(" =3> ",  xn, xx,  yn, yx);
    SSetLims(xn, xx,  yn, yx);
     /// bugln("  SZoomOut");
  } catch(err) { EMsg("SZoomOut", err); }
}
/* */

//==================================================================================================
function moveTo(ctx,  pxf, pyf,  lw=ctx.lineWidth, clr=ctx.strokeStyle,  beginPath=true ) {
  try {
    if(beginPath) ctx.beginPath();
    pushStyle(ctx,  lw, clr);
    ctx.moveTo(pxf, pyf);
    popStyle(ctx);
    if(beginPath) ctx.beginPath();
  } catch(err) { EMsg("moveTo", err); }
}
//==================================================================================================
function lineTo(ctx,  pxt, pyt,  lw=ctx.lineWidth, clr=ctx.strokeStyle,  beginPath=true ) {
  try {
    if(beginPath) ctx.beginPath();
    pushStyle(ctx,  lw, clr);
    ctx.lineTo(pxt, pyt);
    popStyle(ctx);
    if(beginPath) ctx.beginPath();
  } catch(err) { EMsg("lineTo", err); }
}
//==================================================================================================
function moveToS(ctx,  xf, yf,  lw=ctx.lineWidth, clr=ctx.strokeStyle,  beginPath=true ) {
  try {
    if(beginPath) ctx.beginPath();
    pushStyle(ctx,  lw, clr);
    ctx.moveTo(x2S(xf), y2S(yf));
    popStyle(ctx);
    if(beginPath) ctx.beginPath();
  } catch(err) { EMsg("moveToS", err); }
}
//==================================================================================================
function lineToS(ctx,  xt, yt,  lw=ctx.lineWidth, clr=ctx.strokeStyle,  beginPath=true ) {
  try {
    if(beginPath) ctx.beginPath();
    pushStyle(ctx,  lw, clr);
    ctx.lineTo(x2S(xt), y2S(yt));
    popStyle(ctx);
    if(beginPath) ctx.beginPath();
  } catch(err) { EMsg("lineToS", err); }
}


//==================================================================================================
function line(ctx,  pxf, pyf,  pxt, pyt,   tikStep=0, tikLen=10,   tx0=pxf, ty0=pyf) {
  try {
    ctx.beginPath();
    ctx.moveTo(pxf, pyf);                                  //  draw line
    ctx.lineTo(pxt, pyt);

    if(0 < tikStep) {
      let len,  dx, dy,  tx0, ty0,  tx, ty,  lx2, ly2;
      len = rss((pxt-pxf), (pyt-pyf));
      tx0 = tx = x2Z(0) - Math.round((x2Z(0)-pxf)/tikStep)*tikStep;       //  x pos of tik
      ty0 = ty = y2Z(0) - Math.round((y2Z(0)-pyf)/tikStep)*tikStep;       //  y pos of tik
      dx  = tikStep*(pxt-pxf)/len;  dy  = tikStep*(pyt-pyf)/len;     //  xy components of tikStep
      lx2 = tikLen*dy/tikStep/2;  ly2 = tikLen*dx/tikStep/2;
      for(let l=0; l<=len; l+=tikStep) {
        let qxf = Math.max(   0, tx-lx2),  qyf = Math.min(cvsH, ty-ly2);
        let qxt = Math.min(cvsW, tx+lx2),  qyt = Math.max(   0, ty+ly2);
        ///ctx.moveTo(qxf, qyf);
        ///ctx.lineTo(qxt, qyt);
        ctx.moveTo(tx-lx2, ty-ly2);
        ctx.lineTo(tx+lx2, ty+ly2);
        tx += dx;  ty += dy;
        }
      }
    ctx.stroke();
    return [tx0, ty0];
  } catch(err) { EMsg("line", err); }
}
//==================================================================================================
function lineS(ctx,  xf, yf,  xt, yt,   tikStep=1, tikLen=.1,   tx0=xf, ty0=yf) {
  line(ctx,  x2S(xf), y2S(yf),  x2S(xt), y2S(yt),   u2S(tikStep), u2S(tikLen),   x2S(tx0), y2S(ty0));
}
//==================================================================================================
function arc(ctx,  px=100, py=100,  pr=22,  tf=-.3, tt=.3,  PP=true) {
  if(PP) ctx.beginPath();
  ctx.arc(px, py,  pr,  -tf, -tt,  true);             //  RHR!  CCW, the way god intended
  if(PP) ctx.stroke();
}
//==================================================================================================
function arcS(ctx,  x=.5, y=.5,  r=-.22,  tf=-.3, tt=.3,  PP=true) {
  if(r<0) r = u2S(-r);
  if(PP) ctx.beginPath();
  ctx.arc(x2S(x), y2S(y),  r,  -tf, -tt,  true);
  if(PP) ctx.stroke();
}

//==================================================================================================
function circleN(ctx,  px=100, py=100,  pr=22) {           //  nekid
  ctx.moveTo(px+pr, py);
  ctx.arc(px, py,  pr,  0, 2*Math.PI);
}
//==================================================================================================
function circle(ctx,  px=100, py=100,  pr=22,  lw=ctx.lineWidth,  clr=ctx.strokeStyle,  PP=true) {
  if(PP) pushStyle(ctx,  lw, clr);
  ctx.moveTo(px+pr, py);
  ctx.arc(px, py,  pr,  0, 2*Math.PI);
  if(PP) popStyle(ctx);
}
//==================================================================================================
function circleS(ctx,  x=.5, y=.5,  r=-.22,  lw=ctx.lineWidth,  clr=ctx.strokeStyle,  PP=true) {
  if(r < 0) r = u2S(-r);                         //  pxls or -units
  if(lw < 0) lw = u2S(-lw); else if(0 == lw) lw = ctx.lineWidth;
  if(0 == clr) clr = ctx.strokeStyle;
  if(PP) pushStyle(ctx,  lw, clr);
  ctx.moveTo(x2S(x)+r, y2S(y));
  ctx.arc(x2S(x), y2S(y),  r,  0, 2*Math.PI);
  if(PP) popStyle(ctx);
}
//==================================================================================================
function rect(ctx,  px=100, py=100,  pw=50, ph=50,  plw=ctx.lineWidth,  clr=ctx.strokeStyle) {
  pushStyle(ctx,  plw, clr);
  ctx.strokeRect(px, py,  pw, ph);
  popStyle(ctx);
}
//==================================================================================================
function rectS(ctx,  xf=.5, yf=.5,  w=1, h=1,  lw=ctx.lineWidth,  clr=ctx.strokeStyle) {
  if(lw<0) lw = u2S(-lw);             //  assume lineWidth in pxl unless "-"
  pushStyle(ctx,  lw, clr);
  ctx.strokeRect(x2S(xf), y2S(yf),  u2S(w), u2S(h));
  popStyle(ctx);
}
//==================================================================================================
function rectC(ctx,  pxf=50, pyf=50,  pxt=100, pyt=100,  lw=ctx.lineWidth,  clr=ctx.strokeStyle) {
  /// let w = Math.abs(pxt - pxf);  h = math.min(pyt - pyf);
  /// pxf = Math.min(pxf, pxt);  pyf = Math.min(pyf, pyt);
  if(lw<0) lw = u2S(-lw);
  pushStyle(ctx,  lw, clr);
  ctx.strokeRect(pxf, pyf,  (pxt-pxf), (pyt-pyf));
  popStyle(ctx);
}
//==================================================================================================
function rectCS(ctx,  xf=.5, yf=.5,  xt=1, yt=1,  lw=ctx.lineWidth,  clr=ctx.strokeStyle) {
  if(lw<0) lw = u2S(-lw);
  pushStyle(ctx,  lw, clr);
  ctx.moveTo(x2S(xf), y2S(yf));
  ctx.strokeRect(x2S(xf), y2S(yf),  u2S(xt-xf), -u2S(yt-yf));
  popStyle(ctx);
}


//====== 1 ======= 2 ======= 3 ======= 4 ======= 5 ======= 6 ======= 7 ======= 8 ======= 9 ======= 0
var PLOTX0=0, PLOTY0=0,  PLOTXSF=1.0,  PLOTYSF=1.0;
function SetPlotScale(x0, y0,  xsf, ysf=xsf) { PLOTX0=x0; PLOTY0=y0;  PLOTXSF=xsf; PLOTYSF=ysf; }
function x2P(xu) { return PLOTX0 + xu*PLOTXSF; }
function y2P(yu) { return PLOTY0 - yu*PLOTYSF; }
function u2P(uu) { return uu*PLOTXSF; }            /// ??? X/Y ???
function P2x(xp) { return (xp - PLOTX0)/PLOTXSF; }
function P2y(yp) { return (yp - PLOTY0)/PLOTYSF; }

//====== 1 ======= 2 ======= 3 ======= 4 ======= 5 ======= 6 ======= 7 ======= 8 ======= 9 ======= 0
function Pnt(_x, _y) {
  try {
    this.x = _x;  this.y = _y
    /// this.draw = function (r) { pushStyle(); noStroke(); ellipseMode(CENTER); ellipse(x, y, r, r); popStyle(); }
    this.draw  = function (ctx, r=1) { circle(ctx, x2P(this.x), y2P(this.y), r); }
    this.drawr = function (ctx, r=1) { this.draw(ctx, u2P(r)); }
    this.txt = function (d=2) { return "("+ nf(this.x, d) +", "+ nf(this.y, d) +")"; }
  } catch(err) { EMsg("Pnt", err); }
}
/// function pnt(x, y) { return new Pnt(x, y); }
//====== 1 ======= 2 ======= 3 ======= 4 ======= 5 ======= 6 ======= 7 ======= 8 ======= 9 ======= 0
function Lin (_x0,  _y0, _x1, _y1) {
  try {
    // float x0, y0,  x1, y1,  m, b,  len;
    this.x0 = _x0;  this.y0 = _y0;   this.x1 = _x1;  this.y1 = _y1;
    this.m = (1e-6 < Math.abs(this.x1-this.x0)) ? (this.y1-this.y0)/(this.x1-this.x0) : 1e6;
    this.b = this.y0 - this.m*this.x0;
    this.len = Math.sqrt(sq(this.x1-this.x0) + sq(this.y1-this.y0));
    this.p0 = new Pnt(_x0, _y0);  this.p1 = new Pnt(_x1, _y1);

    this.draw = function (ctx,  tikStep, tikLen,  tx0, ty0,  lw=ctx.lineWidth,  clr=ctx.strokeStyle) {
      if(lw<0) lw = u2P(-lw);
      pushStyle(ctx,  lw, clr);
      line(ctx,  x2P(this.x0), y2P(this.y0),   x2P(this.x1), y2P(this.y1),  tikStep, tikLen,  tx0, ty0);
      popStyle(ctx);
      }
    this.midl = function () { return [(this.x0+this.x1)/2, (this.y0+this.y1)/2]; }
    this.txt  = function (d=3) {
      return "[("+ nf(this.x0, d) +", "+ nf(this.y0, d) +"), ("+ nf(this.x1, d) +", "+ nf(this.y1, d) +")]"; }
    this.txtx = function (d=3) {
      return "["+ this.txt(d) +" m="+ nf(this.m, d) +", b="+ nf(this.b, d) +"]"; }
  } catch(err) { EMsg("Lin", err); }
}
/*
Lin lin(float _x0, float _y0,   float x1, float _y1) {
  return new Lin(_x0, _y0, x1, _y1); }
Lin lin(Pnt p0,  Pnt p1) {
  return lin(p0.x, p0.y,   p1.x, p1.y); }
Lin lin(Dir d0, float len) {
  return lin(d0.x, d0.y,   d0.x+len*cos(atan(d0.m)), d0.y+len*sin(atan(d0.m))); }
/* */


//====== 1 ======= 2 ======= 3 ======= 4 ======= 5 ======= 6 ======= 7 ======= 8 ======= 9 ======= 0
function pushStyle(ctx,  lineWidth=1, strokeStyle="#000000", fillStyle=strokeStyle,  beginPath=true) {
  try {
    /// if(lineWidth < 0) return;
    if(! isFinite(Number("0x"+ strokeStyle.substr(1)))) { EMsg("strokeStyle '"+ strokeStyle +"' isn't hexatic", true); }
    if(! isFinite(Number("0x"+ fillStyle.substr(1))))   { EMsg("fillStyle '"+ fillStyle +"' isn't hexatic", true); }
    ctx.save();
      /// if(strokeStyle != fillStyle) buglnsp(" pS:", strokeStyle, fillStyle);
    if(0 < lineWidth) ctx.lineWidth = lineWidth;    //  else just changing color?
    ctx.strokeStyle = strokeStyle;
    if(0 != fillStyle) ctx.fillStyle  = fillStyle;   //  else no beginPath?
      /// bugln(" LS?=", Object.getOwnPropertyDescriptors(ctxA)["lineStyle"]);
    if("undefined" == typeof Object.getOwnPropertyDescriptors(ctx)["lineStyle"]) {  /// buglncs(" LS:", ctx.valueOf().canvas.id)
      Object.defineProperty(ctx, "LSCnt", {value: 0, writable: true, enumerable: true,
        get function () { return this.value;}, set function (n) { this.value = n; } } );
      Object.defineProperty(ctx, "lineStyle",
        { /// Cnt: 0,
          set : function (value) { ctx.strokeStyle = value;  if(0==this.LSCnt)
            EMsg(ctx.canvas.id +".lineStyle="+ value +":         <<< It's 'strokeStyle', MORON!!!", true);
            ctx.LSCnt++;
            }
          });
      }
      ///   else    bugln(" LSD")
    if(beginPath) ctx.beginPath();

    /*    old
    if(undefined == ctx.pushStyles) ctx.pushStyles = [];
    let ss = [ctx.strokeStyle, ctx.fillStyle, ctx.lineWidth, ctx.font, ctx.getLineDash()];
    ctx.pushStyles.push(ss);    /* */
    if(undefined == ctx.pushStyleIn) { ctx.pushStyleIn = 0; }
    ctx.pushStyleIn++;
    if(5 < ctx.pushStyleIn)
      EMsg("5 < ctx.pushStyleIn", 666);
  } catch(err) { EMsg("pushStyle", err); }
}
//====== 1 ======= 2 ======= 3 ======= 4 ======= 5 ======= 6 ======= 7 ======= 8 ======= 9 ======= 0
function popStyle(ctx,  endPath=true) {
  try {
    if(endPath) { /* ctx.closePath(); */ ctx.stroke(); }
    ctx.restore();
    /*    old
    let ss = ctx.pushStyles.pop();
    if(undefined == ss) { console.error("Too many 'popStyle(ctx)'s for "+ ctx.valueOf().canvas.id); return; }
    ctx.strokeStyle = ss[0];  ...   /* */
    ctx.pushStyleIn--;
    if(ctx.pushStyleIn < 0)
      EMsg("ctx.pushStyleIn < 0", 666);
  } catch(err) { EMsg("popStyle", err); }
}
/*
//==================================================================================================
const lineStyle = 666;
function lineStyleError() {
try {0/0} catch(err) { EMsg("It's strokeStyle, moron!!!", err); }
}
/* */



//==================================================================================================
function clr2rgb(clr) {                                    //  clr = "#rrggbb"
  try {
    if(! isFinite(Number("0x"+ clr.substr(1)))) { EMsg("'"+ clr +"' can't be RGB-ed", true); return; }
    let num=Number(clr),  r, g, b, a;
    r = Number("0x"+ clr.substr(1, 2));
    g = Number("0x"+ clr.substr(3, 2));
    b = Number("0x"+ clr.substr(5, 2));
    return [r, g, b];
  } catch(err) { EMsg("clr2rgba", err); }
}
var crgb;
//==================================================================================================
function rgba2clr(r, g, b, a=255) {                        //  vals = [0: rgba : 255]
  try {
    let rgba = 0x100000000 + r*0x1000000 + g*0x10000 + b*0x100 + a;
    crgba=rgba
    return '#'+ rgba.toString(16).substr(1);
  } catch(err) { EMsg("rgba2clr", err); }
}
//==================================================================================================
function rgbaf2clr(r, g, b, a=255) {                        //  facts = [0: rgba : 1.0]
  try {
    let clr = 0x100000000 + r*255*0x1000000 + g*255*0x10000 + b*255*0x100 + a*255;
    return '#'+ clr.toString(16).substr(1);
  } catch(err) { EMsg("rgba2clr", err); }
}
//==================================================================================================
function clrf2clr(clr,  rf=1, gf=1, bf=1, af=1) {          //  facts = [0: rgba+f : 1.0]
  try {
    if(! isFinite(Number("0x"+ clr.substr(1)))) { EMsg("'"+ clr +"' can't be RGB-ed", true); return; }
    let  r, g, b, a;
    [r, g, b, a] = clr2rgba(clr);
    return rgba2clr(Math.round(r*rf), Math.round(g*gf), Math.round(b*bf), Math.round(a*af));
  } catch(err) { EMsg("clrf2clr", err); }
}



//==================================================================================================
function title(ctx, txt, font="2rem Arial") {              //  ala Octave
  try {
    pushStyle(ctx);
    ctx.font = font;
    let m = ctx.measureText(txt);
    ctx.fillText(txt,  (x2S(0) - m.width/2),  (u2S(SPad) + 18));    ///  2*m.actualBoundingBoxAscent);
    popStyle(ctx);
  } catch(err) { EMsg("title", err); }
}


//=================================================================================================
function refDim(ctx,  x0, y0,  r,  xk, yk,  kl,  lab,  al=kl/2) {
  try {
    pushStyle(ctx, 1, "#000000");
    let m, t;
      //  (xk, yk) is coord of "knee", unless ...
    if(r < 0) { r = -r;  xk = x0 + (yk-y0)/xk; }             //  then xk is slope to knee
    lineS(ctx,  x0, y0,  xk,    yk);
    lineS(ctx,  xk, yk,  xk+kl, yk);
    ctx.fillText(lab,  x2S(xk+kl), y2S(yk)+3);
    m = (yk-y0)/(xk-x0);
    t = Math.atan(m);
      /// buglncs(x0, y0,  xk, yk,  m,  t);
    let xa = x0 + r*Math.cos(t),  ya = y0 + r*Math.sin(t);
    let xal = xa + al*Math.cos(t - 5*Math.PI/6),  yal = ya + al*Math.sin(t - 5*Math.PI/6);
    let xar = xa + al*Math.cos(t + 5*Math.PI/6),  yar = ya + al*Math.sin(t + 5*Math.PI/6);
    lineS(ctx,  xal, yal,  xa,  ya);
    lineS(ctx,  xa,  ya,   xar, yar);
    popStyle(ctx);
    return  m;
  } catch(err) { EMsg("refDim", err); }
}




//==================================================================================================
function SDrawAxes(ctx,  T=1,  t=0,  twid=.05,  mfac=.5,  lw=ctx.lineWidth, clr=ctx.strokeStyle) {
  try {
    pushStyle(ctx,   lw, clr);
    twid = u2S(twid);
    line(ctx,  x2S(SXN), y2S(0),  x2S(SXX), y2S(0),   u2S(T), twid,   x2S(Math.ceil(SXN)), y2S(0) );  //  X + ticks
    line(ctx,  x2S(0), y2S(SYN),  x2S(0), y2S(SYX),   u2S(T), twid,   x2S(0), y2S(Math.ceil(SYN)) );  //  Y
    if(0 < t) {
      line(ctx,  x2S(SXN), y2S(0),  x2S(SXX), y2S(0),   u2S(t), twid*mfac,   x2S(Math.ceil(SXN)), y2S(0) );  //  X + minor ticks
      line(ctx,  x2S(0), y2S(SYN),  x2S(0), y2S(SYX),   u2S(t), twid*mfac,   x2S(0), y2S(Math.ceil(SYN)) );  //  Y
      }
    popStyle(ctx);
  } catch(err) { EMsg("SDrawAxes", err); }
}

//==================================================================================================
function getOffsets(elt) {
  try {
      //  find total left/top position offsets.
  /*
    let mom,  posBug=false;
    mom = elt;
    let left=0, top=0;
    while(null != mom) {                           //  until mom is the document root
      left += mom.offsetLeft;
      top += mom.offsetTop;
      if(posBug) {
        bug("  ", id(mom), "  osLeft=", mom.offsetLeft, " => ", left,
                          "    osTop=", mom.offsetTop,  " => ", top);
        bug("    cLeft=", mom.clientLeft, "  cTop=", mom.clientTop);
        bugln("    oMom=", id(mom.offsetParent));
        }
      mom = mom.offsetParent;
      }
    return {Left:left, Top:top,  Right:left+elt.offsetLeft, Bottom:top+elt.offsetHeight};
  /* */
    LOG("getOffsets(elt): Use elt.getBoundingClientRect() instead.");
    let q=elt.getBoundingClientRect();
    return {Left:q.left, Top:q.top,  Right:q.right, Bottom:q.bottom};
  } catch(err) { EMsg("getOffsets", err); }
}

