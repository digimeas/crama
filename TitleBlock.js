//=========================================================|=======================================
function TitleBlock(ctx,  w=-350, hp=-1,  nl=-5,  fh=.8, ft="Arial") {    //  "-" => right; bottom 5 lines
  var x=0, y=0,  dy=0,  font=fh+"rem "+ft;
  try {
    dy = fh*16*1.3;  buglnsp("  fh, dy=", fh, dy,  "  font= ",font);
      /// buglncs(nl, dy);
    if(hp < 0) {        x = Math.min(cvsW, x2S(SXX)) - w; }          //  right w pxls
     else if(0 == hp)   x = (Math.min(cvsW, x2S(SXX)) - w)/2;        //  centered
         else {         x = Math.max(   0, x2S(SXN)) + 2; }          //  left
      /// buglncs(x, y,  w, h);
    let h = Math.abs(nl)*dy;
    if(nl < 0) { nl = -nl;  y = Math.min(cvsH, y2S(SYN)) - h; }      //  bottom nl lines
     else {                 y = Math.max(   0, y2S(SYX)) + 2; }      //  top
    ctx.clearRect(x, y,  w, h);   buglnsp("cvs, y=", cvsW, cvsH, cvsH-y);
    rect(ctx,  x, y,  w, h,  2, "#000000");
    pushStyle(ctx,  .5, "#000000");
    for(let i=0, l=nl; i<l; i++) {
      let yl = y + (i+1)*dy;
      line(ctx,  x , yl,      x+w,   yl);
      }
    popStyle(ctx);

    return Line;
    } catch(err) { EMsg("TitleBlock/Box", err); }

  //-------------------------------------------------------|---------------------------------------
  function Line(l,  txt,  xf=0,  xt=w,  bg=0) {           //  line#, "txt", xFrom, xTo, bgClr
    try {
      let xff,  xpad=5,  tw;
      let xtt = (0 < xt) ? xt : w;
      pushStyle(ctx);                                      //  for the potential BOLD font
      ctx.font = (0 == l) ? ("bold " + font) : (font);     //  set font before measure
      tw = ctx.measureText(txt).width;
        //  set text start x-coord
      if(0 == l)                                           //  top line centered; others left-justified
        xff = (w - tw)/2;                                  //  centered
       else {
        if(xf < -1)        xff = w - (-xf);                //  pxls from right
         else if(-1 == xf) xff = w - tw - 2*xpad;         //  right-justified
         else if(xf < 0)   xff = w - (-xf*w);             //  frac from right
         else if(xf < 1)   xff = xf*w;                    //  frac from left
         else              xff = xf;                      //  pxls from left
        }
      let yl = y + (l+1)*dy;                              //  line y-coord
      if(0 == bg)
        ctx.clearRect(x+xff+1, yl-dy+1,   xtt-xff-2, dy-2);    //  +1/-2 for 1px divider lines
       else {
        pushStyle(ctx,  0, 0,  bg);
        ctx.fillRect(x+xff+1, yl-dy+1,   xtt-xff-2, dy-2);    //  +1/-2 for 1px divider lines
        popStyle(ctx);
        }
      pushStyle(ctx,  .5, "#000000");
      ctx.fillText(txt,  x+xff+xpad,  yl - fh*16/3);       //  approx baseline
      popStyle(ctx);
      if(0 != l) {                                         //  vert bars, except on top line
        line(ctx,  x+xff, yl-dy,   x+xff, yl);
        }
      popStyle(ctx);                                       //  [un-BOLD]
      } catch(err) { EMsg("TitleBlock/Line", err); }
  }    //  function Line()

}    //  function TitleBlock() 
