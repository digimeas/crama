
function ScaleStuff(ctxPlot,  lims) {

  var ZXN, ZXX, ZYN, ZYX;
    [ZXN, ZXX, ZYN, ZYX] = lims;
/// bugln("ZZZ=", ZXN, ZXX, ZYN, ZYX);
  var ZXn, ZXx, ZYn, ZYx;
    [ZXn, ZXx, ZYn, ZYx] = lims;
/// bugln("Zzz=", ZXn, ZXx, ZYn, ZYx);
  this.Width=(ZXX-ZXN);  this.Height=(ZYX-ZYN);
/// bugln("WH=", this.Width,  this.Height);
  var Zff,  ZX0, ZY0,  ZPad;
    Zff=1;  ZX0=(ZXX+ZXN)/2;  ZY0=(ZYX+ZYN)/2;  ZPad=0;
/// bugln("Zff=", Zff,  ZX0,  ZY0,  ZPad);

  x2Z = function (x) { return Math.round(ZX0 + x*Zff); }    //  work-to Zcreen
  y2Z = function (y) { return Math.round(ZY0 - y*Zff); }
  u2Z = function (u) { return Math.round(u*Zff); }
  Z2x = function (x) { return  (x - ZX0)/Zff; }            //  Zcreen-to-work
  Z2y = function (y) { return -(y - ZY0)/Zff; }
  Z2u = function (z) { return   z/Zff; }

  cvsDims = function () { return [this.Width, this.Height]; };
  cvsLIMS = function () { return [ZXN, ZXX, ZYN, ZYX]; };
  cvsLims = function () { return [ZXn, ZXx, ZYn, ZYx]; };

  /// ctxPlot.Mctx = ctxMouse;


  //==================================================================================================
  this.SetCvsDims = function (W, H,  pad=ZPad) {                      //  pxls
    try {
      this.Width = W;  this.Height = H;
      ZPad = pad;
      ZSetScale(W, H,  pad);
      return[this.Width, this.Height];
    } catch(err) { EMsg("ZSetCvsDims", err); }
  }

  //==================================================================================================
  this.SetPltLims = function (xn=ZXn, xx=ZXx,  yn=ZYn, yx=ZYx,  pad=ZPad) {    //  units
    try {
      let B=false;
        if(B) bugcs("   ZSPL: IN:", ZXn, ZXx,  ZYn, ZYx,  ZPad,  " 1> ",  xn, xx,  yn, yx);
      if(((xx-xn)<=0) || ((yx-yn)<=0)) { EMsg("ZSetPltLims1: "+ String([xn, xx,  yn, yx])); return; }
      ZPad = pad;
      xn = Q(ZXN+ZPad, xn, ZXX),  xx = Q(ZXN, xx, ZXX-ZPad);
      yn = Q(ZYN+ZPad, yn, ZYX),  yx = Q(ZYN, yx, ZYX-ZPad);
        if(B) bugcs(" =2> ", xn, xx,  yn, yx,  pad);
      if(((xx-xn)<=0) || ((yx-yn)<=0)) { EMsg("ZSetPltLims2: "+ String([xn, xx,  yn, yx])); return; }
      /// [ZXn, ZXx,  ZYn, ZYx] = [xn, xx,  yn, yx];
      [ZXn, ZXx,  ZYn, ZYx] = [xn-pad, xx+pad,  yn-pad, yx+pad];
        if(B) buglncs(" =3> ", ZXn, ZXx,  ZYn, ZYx);

      ///??? ZSetLims(xn, xx,  yn, yx);

      Zff = Math.min(this.Width/(ZXx-ZXn),  this.Height/(ZYx-ZYn));
      ZX0 = this.Width/2  - u2Z((ZXx+ZXn)/2);
      ZY0 = this.Height/2 + u2Z((ZYx+ZYn)/2);

        if(B) buglnsp(" ZSPL:", ZXn, ZXx,  ZYn, ZYx,  ZPad,    Zff, ZX0, ZY0);
        if(B) bugln();
/// bugln("Zzz=", ZXn, ZXx, ZYn, ZYx);
      return [ZXn, ZXx,  ZYn, ZYx,  ZPad,    Zff, ZX0, ZY0];
    } catch(err) { EMsg("ZSetPltLims", err); }
  }

//==================================================================================================
function ZSetScale(W, H,  pad=0) {               //  pxls, pxls,  units
  ZPad = pad;
  Zff = Math.min(W/(ZXx-ZXn),  H/(ZYx-ZYn));
  ZX0 = W/2 - u2Z((ZXx+ZXn)/2);  ZY0 = H/2 + u2Z((ZYx+ZYn)/2);
}
//==================================================================================================
function ZSetLims(xn, xx,  yn, yx) {
  try {
     ///  bugcs("   ZSL: IN:", ZXn, ZXx,  ZYn, ZYx,  " 1> ",  xn, xx,  yn, yx);
    if(((xx-xn)<=0) || ((yx-yn)<=0)) { EMsg("ZSetLims1: "+ String([xn, xx,  yn, yx])); return; }
    xn = Q(ZXN, xn, ZXX-ZPad),  xx = Q(ZXN+ZPad, xx, ZXX);
    yn = Q(ZYN, yn, ZYX-ZPad),  yx = Q(ZYN+ZPad, yx, ZYX);
      ///  bugcs(" =2> ", xn, xx,  yn, yx);
    if(((xx-xn)<=0) || ((yx-yn)<=0)) { EMsg("ZSetLims2: "+ String([xn, xx,  yn, yx])); return; }
    [ZXn, ZXx,  ZYn, ZYx] = [xn, xx,  yn, yx];
      ///  buglncs(" =3> ", ZXn, ZXx,  ZYn, ZYx);
  } catch(err) { EMsg("line", err); }
}

  this.ZoomF = 1.5;
  //==================================================================================================
  this.ZoomIn = function (pxf, pyf,  pxt, pyt) {
    try {
      let xn, xx,  yn, yx;
        /// buglncs(" ZI:in",   pxf, pyf,  pxt, pyt)
        /// bugcs("  ZI LIMS:", ZPad,   ZXN, Z2x(pxf), ZXX,
        ///                                   ZYN, Z2y(pyf), ZYX);
      let xf = Q(ZXN+ZPad, Z2x(pxf), ZXX),   xt = Q(ZXN, Z2x(pxt), ZXX-ZPad);
      let yf = Q(ZYN+ZPad, Z2y(pyf), ZYX),   yt = Q(ZYN, Z2y(pyt), ZYX-ZPad);
        /// bugcs(" => ",   pxf, pyf,  pxt, pyt, " => ",  xf, yf,  xt, yt)
      if((Math.abs(pxf-pxt) < 2) && (Math.abs(pyf-pyt) < 2)) {    //  click-to-zoom
        let s = 1/ZoomF/2,  dx = s*(ZXx - ZXn),  dy = s*(ZYx - ZYn);
        xn = xt - dx;  xx = xt + dx;
        yn = yt - dy;  yx = yt + dy;
        }
       else {                                                //  box zoom
          /// bugcs(" Dg:", ZXn, ZXx,  ZYn, ZYx);
        [xn, xx]  = MM(xf, xt);
        [yn, yx]  = MM(yf, yt);
        }
        /// bugcs(" => ",   xn, xx,  yn, yx);
        /// bugln("  ZZoomIn");
      SetPltLims(xn, xx,  yn, yx);
    } catch(err) { EMsg("ZZoomIn", err); }
  }
  //==================================================================================================
  this.ZoomOut = function (px, py) {
    try {
      let xn, xx,  yn, yx,  q;
       /// bugcs("   ZO:", ZXn, ZXx,  ZYn, ZYx,  "=1>",  px, py);
      let x = Q(ZXN, Z2x(px), ZXX),  y = Q(ZYN, Z2y(py), ZYX);
       /// bugcs(" =2> ",  x, y);
      let s = ZoomF;
      xn = x - s*(x - ZXn);  xx = x + s*(ZXx - x);
      yn = y - s*(y - ZYn);  yx = y + s*(ZYx - y);
       /// bugcs(" =3> ",  xn, xx,  yn, yx);
      SetPltLims(xn, xx,  yn, yx);
       /// bugln("  ZZoomOut");
    } catch(err) { EMsg("ZZoomOut", err); }
  }

//==================================================================================================
  this.DragPlot = function (dx, dy) {                      //  pxls
    try {
      SetPltLims(ZXn-Z2u(dx), ZXx-Z2u(dx),
                       ZYn+Z2u(dy), ZYx+Z2u(dy));
    } catch(err) { EMsg("DragPlot", err); }
  }

//==================================================================================================
  this.SPlotAxes = function (ctx,  TkStep=1, tkStep=0,  TkWid=.15, tkFac=.5,  lw=ctx.lineWidth, clr=ctx.strokeStyle) {
    try {
/// bugln("PlotAxes=", Zff,  ZX0,  ZY0,  ZPad);
/// bugln("PlotAxes=", ZXn, ZXx,  ZYn, ZYx);
         /// ,   Math.ceil(ZXn), 0 );
      lineS(ctx,  0, ZYn,  0, ZYx);
      pushStyle(ctx,   lw, clr);
  /*
      TkWid = u2Z(TkWid);
      line(ctx,  x2Z(ZXn), y2Z(0),  x2Z(ZXn), y2Z(0),  //  X + ticks
        u2Z(TkStep), TkWid,   x2Z(Math.ceil(ZXn)), y2Z(0) );
      line(ctx,  x2Z(0), y2Z(ZYn),  x2Z(0), y2Z(ZYx),  //  Y
        u2Z(TkStep), TkWid,   x2Z(0), y2Z(Math.ceil(ZYn)) );
      if(0 < tkStep) {
        line(ctx,  x2Z(ZXn), y2Z(0),  x2Z(ZXx), y2Z(0),  //  X + minor ticks
          u2Z(tkStep), TkWid*tkFac,   x2Z(Math.ceil(ZXn)), y2Z(0) );
        line(ctx,  x2Z(0), y2Z(ZYn),  x2Z(0), y2Z(ZYx),  //  Y
          u2Z(tkStep), TkWid*tkFac,   x2Z(0), y2Z(Math.ceil(ZYn)) );
  /* */
      TkWid = TkWid;
      lineS(ctx,  ZXn, 0,  ZXx, 0,  TkStep, TkWid);  //  X + Major ticks
         /// ,   Math.ceil(ZXn), 0 );
      lineS(ctx,  0, ZYn,  0, ZYx,  TkStep, TkWid);  //  Y
         /// ,   0, Math.ceil(ZYn) );
      if(0 < tkStep) {
        lineS(ctx,  ZXn, 0,  ZXx, 0, tkStep, TkWid*tkFac/2);  //  X + minor ticks
            /// ,   Math.ceil(ZXn), 0 );
        lineS(ctx,  0, ZYn,  0, ZYx,  tkStep, TkWid*tkFac/2);  //  Y
           /// ,   0, Math.ceil(ZYn) );
        }
      popStyle(ctx);
    } catch(err) { EMsg("PlotAxes", err); }
  }    //  PlotAxes()


  ///let PS = {SetCvsDims:SetCvsDims, SetPltLims:SetPltLims, Width:Width, Height:Height};
  /*
  ctxPlot.PS = {};
  ctxPlot.PS.SetCvsDims = SetCvsDims;
  ctxPlot.PS.SetPltLims = SetPltLims;
  ctxPlot.PS.ZoomIn     = ZoomIn;
  ctxPlot.PS.ZoomOut    = ZoomOut;
  ctxPlot.PS.DragPlot   = DragPlot;
  ctxPlot.PS.PlotAxes   = PlotAxes;
  ctxPlot.PS.Width      = Width;
  ctxPlot.PS.Height     = Height;
  /* */
  /// ctxPlot.PS = {SetCvsDims:SetCvsDims, SetPltLims:SetPltLims, Width:Width, Height:Height};



dum=0;
//==================================================================================================
  this.ZDrawAxes = function(ctx,  T=1,  t=0,  tlen=.05,  mfac=.5,  lw=ctx.lineWidth/5, clr=ctx.strokeZtyle) {
    try {
      pushStyle(ctx,   lw, clr);
      lineS(ctx,  ZXn, 0,  ZXx, 0,   T, tlen);  //,   x2Z(Math.ceil(ZXN)), y2Z(0)  X + ticks
      lineS(ctx,  0, ZYn,  0, ZYx,   T, tlen);  //,   x2Z(0), y2Z(Math.ceil(ZYN))  Y + ticks
      if(0 != t) {
        let xlf=x2Z(ZXn), xrt=x2Z(ZXx),  ybt=y2Z(ZYn), ytp=y2Z(ZYx),  px0=x2Z(0), py0=y2Z(0);
        let ptx0, pty0,  ptx, pty;
        let pt = u2Z(Math.abs(t)),  ptl2=u2Z(tlen*mfac)/2;
        ptx0 = x2Z(0) - Math.round((x2Z(0))/pt)*pt;      //  x pos of 1st tik
        pty0 = y2Z(0) - Math.round((y2Z(0))/pt)*pt;      //  y pos of 1st tik
        dum=0;
        while(ptx0 < xlf) {    dum++; if(66 < dum) { EMsg("DUM!", 666); return }
          ptx0 += pt; }
        dum=0;
        while(pty0 < ytp) {    dum++; if(66 < dum) { EMsg("DUM!", 666); return }
          pty0 += pt; }
        if(0 < t) {                              //  just minor tics on axes
          /// lineS(ctx,  ZXn, 0,  ZXx, 0,   t, tlen*mfac );  //,   x2Z(Math.ceil(ZXN)), y2Z(0)  X + minor ticks
          /// lineS(ctx,  0, ZYn,  0, ZYx,   t, tlen*mfac );  //,   x2Z(0), y2Z(Math.ceil(ZYN))  Y + minor ticks
          ptx = ptx0;
          dum=0;
          while(ptx < xrt) {    dum++; if(66 < dum) { EMsg("DUM!", 666); return }
            ctx.moveTo(ptx, py0-ptl2);  ctx.lineTo(ptx, py0+ptl2);
            ptx += pt;
            }
          pty = pty0;
          dum=0;
          while(pty < ybt) {    dum++; if(66 < dum) { EMsg("DUM!", 666); return }
            ctx.moveTo(px0-ptl2, pty);  ctx.lineTo(px0+ptl2, pty);
            pty += pt;
            }
          }
         else if(t < 0) {                        //  grid-o-ticks
          ptx = ptx0;
          dum=0;
          while(ptx < xrt) {
            pty = pty0;
            while(pty < ybt) {    dum++; if(666 < dum) { EMsg("DUM!", 666); return }
              ctx.moveTo(ptx-ptl2, pty);  ctx.lineTo(ptx+ptl2, pty);
              ctx.moveTo(ptx, pty-ptl2);  ctx.lineTo(ptx, pty+ptl2);
              pty += pt;
              }
            ptx += pt;
            }
          }
        }    //  if(0 <!= t)
      popStyle(ctx);
    } catch(err) { EMsg("ZDrawAxes", err); }
  }    //  ZDrawAxes()

}    //  ScaleStuff()

