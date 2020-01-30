
const SXN=-10, SXX=10,  SYN=-10, SYX=10;
var SXn, SXx,  SYn, SYx;

var ctxA,  cvsW, cvsH;


var  Ts, D, K, W, d;
  Ts  = [90, 75, 60, 45]                         //   Blade tilt  angles

//=================================================================================================
function HandleBodyLoad() {
  try {

  /// Ticker(Tkr);
  /// tkr = Tkr.sprintf;

  DiamIn.value  = D  = 7.25;                     //  Diameter of blade
  ThickIn.value = K  = 8/8;                      //  Kerf width
  WidthIn.value = W  = 2;                        //  Width of cove Ring
  DepthIn.value = d  = 3/8;                      //  Depth of cove
  TiltIn.value = Ts.toString();

  DiamIn.step  = 1/4;
  ThickIn.step = 1/16;
  WidthIn.step = 1/8;
  DepthIn.step = 1/16;

  WidthIn.title = "Desired width of cove";
  DepthIn.title = "Desired depth of cove";
  DiamIn.title  = "Blade diameter";
  ThickIn.title = "Blade thickness";
  TiltIn.title  = "Blade (table :-) tilts";


  ctxA = cvsA.getContext("2d");
  cvsA.ctx = ctxA;
  ctxA.PS = new ScaleStuff(ctxA,  [SXN, SXX,  SYN, SYX]);
  ctxA.lineJoin = "round";

  /// MouStuff(ctxM);

  x2S = x2Z;
  y2S = y2Z;
  u2S = u2Z;
  S2x = Z2x;
  S2y = Z2y;
  S2u = Z2u;

  bugln(document.lastModified);

  CalcCove();

  HandleResize();
  } catch(err) { EMsg("HandleBodyLoad", err); }
}


//=================================================================================================
function HandleResize() {
  try {
/*
  let ctop = numBar.getBoundingClientRect().bottom;
  cvsW = Math.floor(body.clientWidth - 2);
  cvsH = Math.floor(ftr.getBoundingClientRect().top - ctop - 2);

    //  reset dims. cvs "border" adds to outer dim. width/height are inner graphics dims
    //    so a cvs with a border will be bigger
  cvsA.style.top = ctop +"px";
  bugsp(numBar.getBoundingClientRect().bottom, ctop, cvsA.style.top);
  cvsA.setAttribute("width",  cvsW);                       //  inner, graphics, dims
  cvsA.setAttribute("height", cvsH);
  buglnsp("  cvs = ", cvsH, cvsA.getAttribute("height"),  cvsA.getBoundingClientRect().height);
/* */

  let m = 4, bp = 1;    //  margin:4,  border:1 + padding:0
  let cboxT = Math.round(numBar.getBoundingClientRect().bottom) + m;
  let cboxW = Math.floor(body.clientWidth);                     //  always full width
  let cboxH = Math.floor(ftr.getBoundingClientRect().top - cboxT - 1*m - 2*bp);
  CvsBox.style.top    = cboxT +"px";
  CvsBox.style.width  = cboxW +"px";
  CvsBox.style.height = cboxH +"px";

  cvsW = CvsBox.clientWidth - 2*bp;
  cvsH = CvsBox.clientHeight - 2*bp;
    /// if(B) buglnsp("cvs:", cvsW, cvsH);

/// console.log("pre cvsA.setAttribute()")
  cvsA.setAttribute("width", cvsW);
  cvsA.setAttribute("height", cvsH);
  cvsA.ctx.PS.SetCvsDims(cvsW, cvsH);
  cvsA.ctx.PS.SetPltLims();
  buglnsp(" cvs=", cvsW, cvsH);

  ///??? SSetScale(cvsW, cvsH,  .05);

  PlotCove();

  } catch(err) { EMsg("HandleResize", err); }
}

var  pwn, pwx,  pzn, pzx,  ppad;
var tilts, PHIstr;
//=================================================================================================
function CalcCove(func) {
  try {

  let RePlot=false,  B=false,  bb = function () { if(B) bugsp.apply(this, arguments); }

  if(undefined != func) {
    RePlot = true;
    let ff = func.toLowerCase();
      bb(" ", ff +":");

    if(ff.startsWith("width")) {
      bb(":", W);  W = Number(WidthIn.value);  bb("-> ", W); }
     else if(ff.startsWith("depth")) {
      bb(d);  d = Number(DepthIn.value);  bb("-> ", d); }

     else if(ff.startsWith("diam")) {
      bb(D);  D = Number(DiamIn.value);  bb("-> ", D); }
     else if(ff.startsWith("thick")) {
      bb(K);  K = Number(ThickIn.value);  bb("-> ", K); }
     else if(ff.startsWith("tilt")) {
      bb(Ts.toString());
      tilts = TiltIn.value.split(",");
      Ts = [];
      for(t of tilts)
        Ts = Ts.concat(Q(45, Number(t), 90));
      bb(" ->", Ts.toString());
      }

     else {
      RePlot = false;
      EMsg("! CC: unknown func:"+ func,  666);  return; }
    bb("\n");
    }

  R   = D/2;
  ts = Ts.dotmul(Math.PI/180, true);   ///???  true
  // Re  = d./sin(T)
  Re = ts.isin(d);                                //  blade exposure
  // phi = acos((R-Re)/R);                       //  half-angle of exposed blade segment
  let RRe = dotOp(R, Re, DOPSUB);
  phi = dotOp(dotOp(RRe, R, DOPDIV), 1.0, DOPACOS);    //  half-angles of exposed blade
  phi = [phi].trans();                           //  list->rowvec; [1, 2, 3, ]->[[1], [2], [3], ]
  //   PHI = phi*180/pi                          //    in degrees
    PHI = phi.dotmul(180/Math.PI);    /// PHIstr=[PHI].matprt("half-angles = ", 1);

  // khat = K/2./sin(T);
  khat = ts.isin(K/2);
  // Ye  = 2*R*sin(phi);
  Ye = phi.sin(2*R);                             //  exposed blade width
  // Yc  = sqrt(Ye.^2 + khat.^2)
  Yc = Ye.sqr().dotadd(khat.sqr()).pow(1/2);     //  diagonal blade width including kerf

  // az  = asin(W./Yc);
  az = dotOp(W, Yc, DOPDIV).asin();              //  approach angle to blade, from straight cut = 0
  //   Az  = az*180/pi
    Az = az.dotmul(180/Math.PI);                 //    in degrees

  // for(c=1: cols(Yc)) {
  for(let c=0; c<Yc.length; c++) {
    if(Yc[c] < W) {
      str = sprintf("Width="+ W +" & Depth="+ d +" at Tilt="+ Ts[c] +" not feasible. Blade exposure (=", Yc[c], ") is less than desired cove width (W=", W, ") \n");
      EMsg( str );
      return;
      }
     else if(60 < Az[c]) {
      str = sprintf("Width="+ W +" & Depth="+ d +" at Tilt=", Ts[c], " iffy; Approach angle (=", Az[c], ") is greater then 60 degrees \n");
      EMsg( str );
      }
    }

  pqqi=0, pqq=[]; for(let i=-1; i<=1; i+=.1) { pqq[pqqi] = i;  pqqi++; }
  p  = matMul(pqq.trans(), phi);       //  p=0 at top of blade
    /// p.trans().matprt("p = ");

    //  x, y, z are wrt shaft;  Origin at center of blade
//*
  // xc = (R - Re).*cos(T);       //  x under table
  xc = dotOp(RRe, ts.cos(), DOPMUL)
  // xe = R*cos(T) - xc;          //  x exposure
  xe = dotOp(ts.cos(R), xc, DOPSUB);
  // x  = R*cos(p).*cos(T) - xc;
  x = dotOp(dotOp(p.cos(R), ts.cos(), DOPMUL), xc, DOPSUB)
  /// x.trans().matprt("x = ");

  // y  = R*sin(p);
  y = p.sin(R);
  // ys = [min(min(y)) max(max(y))];
  /// y.trans().matprt("y = ");

  // zn = (R - Re).*sin(T);        //  height of table from blade center
  zn = dotOp(RRe, ts.sin(), DOPMUL);
  // z  = R*cos(p).*sin(T) - zn;
  z = dotOp(dotOp(p.cos(R), ts.sin(), DOPMUL), zn, DOPSUB)
  /// z.trans().matprt("z = ");

  // r  = sqrt(x.^2 + (y.^2));
  r = dotOp( dotOp( dotOp(x, 1, DOPSQR), dotOp(y, 1, DOPSQR), DOPADD), 0, DOPSQRT);
  // b  = asin(y./r);
  b = dotOp(y, r, DOPDIV).asin();
    /// b.trans().matprt("b = ");

  // w = r.*cos(b-az);
  w = dotOp(r, dotOp(b, az, DOPSUB).cos(), DOPMUL);
    /// w.trans().matprt("w = ");
  // sp = subplot('position', [.1 .05   .8 .6]);  hold on;  axis equal
  // plot(w, z,  'linewidth', 1.5);    %  ,  'g')

  pwn = w.min().min();  pwx = w.max().max();
  pzn = z.min().min();  pzx = z.max().max();
  let pdw = pwx - pwn,  pdz = pzx - pzn;
  ppad = Math.max(pdw, pdz)/10;

  if(RePlot)  PlotCove();

  } catch(err) { EMsg("CalcCove", err); }
}

pxy=[];
//=================================================================================================
function PlotCove() {
  try {

  // stdfig(1);

  cvsA.ctx.PS.SetPltLims(pwn, pwx,  pzn, pzx,  ppad);

  ctxA.clearRect(0, 0,  cvsW, cvsH);

    //  origin circle
  // plot(0, 0, 'bo', 'markersize', 5);
  pushStyle(ctxA,  1, "#aaa");
  pr = u2Z(.01);
  ctxA.moveTo(x2Z(0) + pr,  y2Z(0));
  ctxA.arc(x2Z(0),  y2Z(0),  pr,  0, 2*Math.PI);
  ctxA.stroke();
  popStyle(ctxA);

    //  axes, duh
  ctxA.PS.ZDrawAxes(ctxA,  1, .25,   .05, .5,   1, "#aaa")

    //  plot profiles
  for(let t=0; t<ts.length; t++) {
    pushStyle(ctxA,  1.5, "#000");
    let who = (Ts[t]-45)/45;                     //  angle -> color;
    ctxA.strokeStyle = "hsl("+ (240*who) +", 100%, 25%)";    //  90 -> 45 =>   darker blue -> darker red
    ctxA.moveTo(x2Z(w[t][0]),  y2Z(z[t][0]));
    for(let i=1; i<w[t].length; i++) {
      ctxA.lineTo(x2Z(w[t][i]),  y2Z(z[t][i]));
      }
    ctxA.stroke();
    popStyle(ctxA);
    }

    //  title banner
  let ttl = "Coverama Cove Profiles";
  pushStyle(ctxA, 1, "#000");
  let fh = 2*(cvsH/30)/16,  yff = fh*16+fh*16/3;     bugln("fh, yff=", fh, yff);
  ctxA.font = "bold "+ fh +"rem Arial";
  let tw = ctxA.measureText(ttl).width;  buglnsp("  tw, th=", tw, ctxA.measureText(ttl).height);
  let xff = (cvsW - tw)/2;
  ctxA.fillText(ttl,  xff,  yff);   //  approx baseline
  popStyle(ctxA);                                       //  [un-BOLD]

    //  title block
  pushStyle(ctxA,  .5, "#000000");
  /// ctxA.rect(cvsW-450, cvsH-140, 450, 140);
  /// let TitleLine = new TitleBlock(ctxA,  -300,  -6,  1.0, "Arial");
  fh = Math.min(1,  cvsH/8 / 16 / 6);   bug("fh=", fh);
  let TitleLine = new TitleBlock(ctxA,  -cvsW/4, 0,  -6,  fh, "Arial");
  TitleLine(0,  "COVERAMA");
  TitleLine(1,  "Cove  Width:"+ nf(W, 3) +"  Depth:"+nf(d, 3));
  TitleLine(2,  "Blade  Diam:"+ nf(D, 3) +"  Thick:"+ nf(K, 3));
  TitleLine(3,  "    Tilts:   "+ Ts.sprintf(1, 6));
  TitleLine(4,  "   Angles:"+ Az.sprintf(1, 6));
  TitleLine(5,  document.lastModified);
  TitleLine(5,  "Pgm: Saintrain",  -1);
  /// ctxA.stroke();
  popStyle(ctxA);

  } catch(err) { EMsg("PlotCove", err); }
}
