/// "use strict";

// <!--    hide all this crap if no-scripts
const  UTIL_JS=666;

//==================================================================================================
/*  https://www.w3schools.com/cssref/css_selectors.asp
      tag         (tag tag  |  tag, tag  |  tag > tag  ...
     #id
     .class       (tag.class=value  ...
     [attribute]  ([attribute=value]  |  [attribute~=containsValue]  |  tag[attribute=value]  ...
     :allKindsOfStuff
/* */
function byId(q)       { return document.getElementById(q); }
function byTag(q)      { return document.getElementsByTagName(q); }
function byClass(q)    { return document.getElementsByClassName(q); }
function byNames(q)    { return document.querySelectorAll('[name='+ q +']'); }
function byCSS(q)      { return document.querySelector(q); }
function byCSSAll(q)   { return document.querySelectorAll(q); }

/// function idNum(id, a) { return Number(byId(id).getAttribute(a)); }
/// function aNum(elt, a) { return Number(elt.getAttribute(a)); }


//==================================================================================================
var BUG = true;
var bugElt = false;                              //  write to a textArea registered by BUGTO()
var bugConsole = false;
var bugStr="";
var BUGWhere = null;    //  byId("idTextOut");
var BUGSep = "";
var BUGPreInitStr = "";

function BUGTO(bw, clrq=true)  {
  bugElt = true;
  BUGWhere = bw;
  if(clrq) BUGWhere.value = "";
  BUGWhere.onclick = function (event) { if(1 == event.button) bugln(); }
  if(0 < BUGPreInitStr.length) {
    BUGWhere.value = BUGPreInitStr;
    BUGWhere.value += "\n  ---------------------------------------------------------------------------  \n";
    }
  ///??? BUGPreInitStr = undefined;
}

var BUGNF = false,   BUGNFF=3, BUGNFf=BUGNFF,   BUGNFL=8, BUGNFl=BUGNFL;    //  f8.3
function bugnf(f, l=BUGNFl) {
  if((undefined === f) || (false == f) || (Number(f) < 0)) { BUGNF = false;  BUGNFf=BUGNFF;  BUGNFl=BUGNFL; return; }
  BUGNF  = true;
  BUGNFf = f;
  BUGNFl = l;
}


// var bugwho=false;
//-----------------------------------------------|-------------------------------------------------
function bug() {
  if(! BUG) return;
  // if(bugwho) { bugwho=false; EMsg("Who???", 666) }
  for(let i=0, l=arguments.length; i<l; i++) {
    let q = BUGNF ? nf(arguments[i]) : arguments[i];
    if(bugElt) {
      if(BUGWhere) {
        if(bugTabX) { BUGWhere.value += bugTab; bugTabX = false; }   //  tab at start of line
        BUGWhere.value += q;                     //  write immediately to #BUGWhere
        BUGWhere.value += BUGSep;
        }
       else
        BUGPreInitStr += q;
      }
    if(bugConsole) {
      bugStr += q;                               //  accumulate for a bugln() to console.log()
      bugStr += BUGSep;
      }
    }
}
//-----------------------------------------------|-------------------------------------------------
function bugln()  {
  if(! BUG) return;
  bug.apply(this, arguments);
  if(bugElt) {
    if(BUGWhere) {
      BUGWhere.value += "\n";
      if(undefined != BUGWhere.scrollTop)
        BUGWhere.scrollTop += BUGWhere.scrollHeight;       //  scroll to bottom
      }
     else
      BUGPreInitStr += "\n";
    }
  if(bugConsole)
    console.log(bugStr);
  /// let bsw = bugStr.slice();
  bugStr = bugTab;                                         ///???  this is premature in some circs
  bugTabX = true;                                          //  tab at start of next line
  /// return bsw;
}

//-----------------------------------------------|-------------------------------------------------
function bugsp() {
  if(! BUG) return;
  BUGSep = " ";
  bug.apply(this, arguments);
  BUGSep = "";
}
function buglnsp() {
  if(! BUG) return;
  BUGSep = " ";
  bugln.apply(this, arguments);
  BUGSep = "";
}
function bugcs() {
  if(! BUG) return;
  BUGSep = ", ";
  bug.apply(this, arguments);
  BUGSep = "";
}
function buglncs() {
  if(! BUG) return;
  BUGSep = ", ";
  bugln.apply(this, arguments);
  BUGSep = "";
}
function println() {
  if(! BUG) return;
  bugln.apply(this, arguments);
}

//-----------------------------------------------|-------------------------------------------------
function LOG()  {
  let bugwas = BUG;
  BUG = true;
  bugln.apply(this, arguments);
  BUG = bugwas;
}
function ERR()  {
  LOG("\n---------------------------------------------------------------------------------------");
  LOG.apply(this, arguments);
  LOG("---------------------------------------------------------------------------------------\n");
  BUGWhere.style.backgroundColor = "#FF000022";
}

//-----------------------------------------------|-------------------------------------------------
var bushWas = [];
function bush(tf) {                              //  portmanteau of bug and push :-)
  if(undefined != tf) { bushWas.push(BUG);  BUG = tf; }    //  Usage: bush(true|false);  bug()-ed code;  bush();
   else               { BUG = bushWas.pop(); }
}

//-----------------------------------------------|-------------------------------------------------
var bugTab="", bugTabX=true;
function bugTabIn() {
  bugTab += "|  ";                               //  N.B. (3 ch)
  bug.apply(this, arguments);
}
function bugTabOut() {
  bugTab = bugTab.substr(3);                     //  N.B. ("|  ")
  bug.apply(this, arguments);
}


//==================================================================================================
function nfs(num, s) {                           //  round to next *s; (13, 5)->15
  let q = Number(s);
  return Math.round(Math.floor(Number(num) + q/2)/q)*q;
}
  /// var NFBUG=false;
//==================================================================================================
function nf(num, f=BUGNFf, l=BUGNFl, eq=false) {           //  nf(123.4567, [3, [8, [exp?]]])
  let rtn;
  try {
      /// if(NFBUG) bugsp(" num:", num);
    if(null == num) return "null";
    if("\n" === num) return "\n";
    if('boolean' == typeof num) return (num ? 'true' : 'false');
    rtn = Number(num).toString();
      /// if(NFBUG) bugsp(" rtn:[", rtn, "]");
    if(! isFinite(rtn)) return num;
    if(0 == f)
      rtn = Math.round(num).toString();
     else {
      if((Math.abs(num) < eval("1e-"+f)) || (1e6 < Math.abs(num))) eq = true;    //  override!?
      rtn = (eq ? parseFloat(num).toExponential(f) : parseFloat(num).toFixed(f));
      if(("NaN" == rtn) || (NaN == rtn)) return num;       //  one last chance
      }
      /// if(NFBUG) bugsp(" rtn:[", rtn, "]");
    /// if(("undefined" !== typeof l) && (0<l) && (q.length < l))        //  bulk it UP!
    if(rtn.length < l)                                       //  bulk it UP!
      rtn = ("                    ").substr(0, (l-rtn.length)) + rtn;
      /// if(NFBUG) buglnsp(" rtn:", rtn);
    return rtn;
    } catch(err) { nf(" nf:"+ num); return num; }
}

nfStack = [];
//==================================================================================================
function nfpush(f, l=BUGNFl) {
  nfStack.push([BUGNF, BUGNFf, BUGNFl]);
  if(! f)
    BUGNF = false;
   else {
   BUGNF = true;
   [BUGNFf, BUGNFl] = [f, l];
   }
}
function nfpop() {
  [BUGNF, BUGNFf, BUGNFl] = nfStack.pop();
}


//==================================================================================================
function sprintf() {
  let str = "";
  for(let i=0, l=arguments.length; i<l; i++) {
    let q = BUGNF ? nf(arguments[i]) : arguments[i];
    str += q;
    str += BUGSep;
    }
  return str;
}
//==================================================================================================
function sprintfsp() {
  let str,  bsw = BUGSep;  BUGSep = " ";
  str = sprintf.apply(null, arguments);
  BUGSep = bsw;
  return str;
}
//==================================================================================================
function sprintfcs() {
  let str,  bsw = BUGSep;  BUGSep = ", ";
  str = sprintf.apply(null, arguments);
  BUGSep = bsw;
  return str;
}

/*
//==================================================================================================
function newTicker(_id, w)
{
  let Q = document.createNode("textArea");
  Q.id = _id;  Q.width = w;
  Ticker(Q);
  return Q;
}    /* */
var DoTkrSeq=false;
//==================================================================================================
function Ticker(q, ro=true) {
  try {
  q.readOnly = ro;
  q.value = "";

  let seq=0;
  function trunc() {
    let c = Number(q.cols-1);
    if(c < q.value.length) q.value = q.value.slice(-c);
    }

  q.sprintf = function () {
    if(DoTkrSeq) { q.value += seq +":";  seq++; }
    q.value += sprintf.apply(this, arguments) +" ";  trunc(); }

  q.sprintfcs = function () {  let bsw = BUGSep;  BUGSep = ", ";
    q.sprintf.apply(this, arguments);  BUGSep = bsw; }
  q.sprintfsp = function () {  let bsw = BUGSep;  BUGSep = " ";
    q.sprintf.apply(this, arguments);  BUGSep = bsw; }

  return q.sprintf;
  } catch(err) { EMsg("Ticker:"+q+":", err);  return; }
}

//==================================================================================================
var EMA, EME,  EMS;
function EMsg(msg, errq) {
    EMA=arguments;  EME=errq;
  msg = msg.toString();
  if(undefined != errq) {                                   //  augment msg, and dump call
    let stk="\n???\n";
    if("object" == typeof errq) {                          //  prolly a real error
      msg += " <"+ errq.name +">: "+ errq.lineNumber +": "+ errq.message;
      stk = errq.stack; }
     else {                                                 //  errq = anything forces a stack trace
      try{ kaBLOOEY("ERR"); }
        catch(err) { stk = err.stack;                       //  got stack trace
          let q=stk.indexOf('\n');                          //  but ...
          stk = stk.substr(q+1); }                          //  lose 1st line, which is at kaBLOOEY
      }
    msg += "\n"+ stk;   EMS = stk;
    }
  ERR(msg);
  console.error(msg);
  /// console.trace();
  return msg;
}


/*
var TTStart = Date.now();
//==================================================================================================
function TT(twas=0)  {
  if(twas) {
    if(Number.isFinite(twas))
      return Date.now() - twas;
    else if("now" == twas)
      return Date.now();
     else
      return("TT(", twas, ") says what?");
    }
   else
    return Date.now() - TTStart;
}
/* */
//==================================================================================================
function TT(twas) {                             //  timer stuff
  if("undefined" === typeof twas)
    return [new Date().valueOf(), 0];
   else {
    let d = new Date().valueOf();
    return [d, d-twas];
    }
}


//==================================================================================================
function Targs(evt, func, bgClr="#CCCCFF")
{
  function Z(t, q)  { t.style.zIndex = q; }
  ///??? function D(t, q)  { t.style.display    = ((666 == q) ? "block" : "none"); }
  function V(t, q)  { t.style.visibility = ((666 == q) ? "visible" : "hidden"); }
  function VZ(t, q) { V(t.q);  Z(t.q); }

  let targ, arg;
  let elt = evt.target;

  if(elt.hasAttribute("tabTarget")) {            //  tab stuff
    let tq=false;
    let tabs=elt.parentNode.children;            //  tabs can be seperately grouped
    for(let i=0, l=tabs.length; i<l; i++) {
      if(tabs[i].hasAttribute("tabtarget")) {    //  prolly be other-than-"tab"s in mom
        try {
          let ttStr = tabs[i].getAttribute("tabTarget");    //  <tag... tabTarget="ttStr"> -> <... id="ttStr">
          targ = byId(ttStr);
          let q, bg;
          if(elt == tabs[i]) {  tq = true;       //  the chosen one!!!
            q = 666;  bg = bgClr; }
           else {                                //  the rest
            q = i;  bg = "#EEEEEE"; }
          tabs[i].style.background = bg;
          eval( func +"(targ, "+ q +")" );
            //  any other elts to drag along with the tabTarget?
            //    buddys can be anywhere in document
          let buds = byCSSAll("[tabBuddy="+ ttStr +"]");
          for(let b=0; b<buds.length; b++) {
            V( buds[i], q ); }
          }
        catch(err) { EMsg("Targs:"+ ttStr +": ", err);  return; }
        }
      }
    if(tq) return;
    }

   else if(elt.hasAttribute("boolTarget")) {     //  checkbox stuff
    try {
      targ = byId(elt.getAttribute("boolTarget"));
      let arg;
      if("button" == elt.getAttribute("type"))
        arg = (elt.checked) ? 666 : 0;
       else if("checkbox" == elt.getAttribute("type"))
        arg = (elt.checked) ? 666 : 0;
       else if("radio" == elt.getAttribute("type"))
        arg = (elt.checked) ? 666 : 0;
       else
        arg = "Bad'BoolTarget'";
      eval( func +"("+ arg +")");
      }
     catch(err) { EMsg("Targs:"+arg+":", err);  return; }
    return;
    }

/*
   else if(elt.hasAttribute("numTarget")) {        //  number input
    let str = elt.getAttribute("numTarget") +" = Number("+ elt.value +");";
    eval(str);
    Resize();
    return;
    }
/* */

  EMsg("Targs: Hit default for "+ elt.id);
}    //  Targs();

var NTevt;
//==================================================================================================
function numTarget(evt, targ, after) {
NTevt = evt;
  let B=false;
    if(B) buglncs(evt.target.name, evt.target.getAttribute("onchange"), evt.target.onchange.toString() );
  let str = targ +" = "+ evt.target.value;  if(B) bugln(str);
  eval(str);
  if(undefined != after) {
      if(B) bugln("after"+ after);
    eval(after);
    }
    if(B) bugln("  <numTarget>");
}    //  numTarget();


/* ///???
//==================================================================================================
function asrt(Q) {
  console.trace();
  console.log(Q.length, Q);
  let rtn = false;
  let f = Q[0];
  bugln("f="+ f)
  bugln("  123?"+ f(123))
  for(let i=1, l=Q.length; i<l; i++) {
    let a = Q[i];
    console.log(i, ":",  a);
    try {
      if(! f(a)) {
        ERR(a +' fails "'+ f.name +'".  called from (see log) (F12)');
        ERR(" from: "+ asrt.caller.name);
        rtn = true;
        }
      }
     catch(err) {
      ERR("  asrt: err="+ err);
      rtn = true;
      }
    }
  rtn = false;
}
//==================================================================================================
function asrtTstr() {
  let q = arguments;
  console.log("q=",  q);
  for(let i=0, l=q.length; i<l; i++)
    console.log(i, ":",  q[i]);
  return asrt(q);
}
/* */


//  override firefox's caching(?) of settings like checkboxes and textareas, to restart "clean"
//==================================================================================================
function InitTo() {    //  <tag ... data-InitTo="attrib='default'"> ... e.g. "checked='false'"
  try {
    let B=false;
    let Qs;
    Qs = document.querySelectorAll("[data-InitTo1st]");
    for(let i=0, l=Qs.length; i<l; i++) {
      let q = Qs[i];
      let a = q.getAttribute("data-InitTo1st").trim();
        if(B) bugln("data-InitTo1st: q."+ a +"; ");
      eval(" q."+ a +"; ");
      }

    Qs = document.querySelectorAll("[data-InitTo]");
    for(let i=0, l=Qs.length; i<l; i++) {
      let q = Qs[i];
      let a = q.getAttribute("data-InitTo").trim();
      let str = "q."+ a +"; ";
        if(B) bug("data-InitTo: ["+ str +"]  q.v="+ q.value +",  q.c="+ q.checked  );
      eval( str );
        if(B) bugln(" => q.v="+ q.value +",  q.c="+ q.checked  );
      }
    if(B) bugln();
  } catch(err) { EMsg("InitTo", err); }
}


//  let an html elt exec its own js
//==================================================================================================
function DoRunRun() {    //  <tag ... data-RunRun[1|2|...]="arbitrary_js"> ... e.g. "func(this, ...); [...]"
  try {
    let B=false;
    let Qs;
    const rstr="data-RunRun";
    let rr = rstr;
    for(let ir=1; ir<5; ir++) {
      Qs = document.querySelectorAll("["+ rr +"]");
      let l = Qs.length;    if(B) bugln(" #("+ rr +")="+ l)
      if(0 == l) break;
      for(let iq=0; iq<l; iq++) {
        let q = Qs[iq];
        let a = q.getAttribute(rr).trim();
          if(B) bugln(" #", q.id, " => ["+ a +"]");
        eval( a );
        }
      if(B) bugln();
    rr = rstr + ir;    ///   if(B) bug(" next="+ rr)
    }
    if(B) bugln();
  } catch(err) { EMsg("InitTo", err); }
}


//  override style="height:xx" as a "suggestion"
//==================================================================================================
var nsetht=0;
function SetHts()     //  <tag ... data-SetHts=[height, margin, padding]>
{
  let Qs;
  Qs = document.querySelectorAll("[data-SetHts]");
  bugln("SetHts:"+ Qs.length);
  nsetht = 0;
  for(let i=0, l=Qs.length; i<l; i++) {
    let q = Qs[i];
    let a = q.getAttribute("data-SetHts");    bug("SetHts: ", q.id, a);
    let h, m, p;
    let hmp = eval(a);                        buglncs(" => ", hmp);
    hmp = setHt(i, q, hmp);
    q.setAttribute("height",  Math.max(q.getAttribute("height"),  hmp[0]+"px"));
    bugln(" SetHts: ", i);
    }
}
//==================================================================================================
function setHt(j, q, hmp)
{
  nsetht++;  let qsetht = 10*j;
  let h = hmp[0];
  let X = q.children;
  bugTabIn("setHt "+ (qsetht) +": "+ q.tagName +"/"+ q.id +"("+ X.length +"), "+ hmp);  bugln();
  if(0 < X.length) {
    for(let i=0, l=X.length; i<l; i++) {
      hmp = setHt(qsetht+i, X[i], hmp);
      h = Math.max(h, hmp[0]);
      }
    hmp[0] = Math.max(q.getAttribute("height"), h+2);
    }
  bugln("| "+ (qsetht) +": => "+ hmp);
  bugTabOut();

  q.style.height  = hmp[0]+"px";
  q.style.margin  = hmp[1]+"px";
  q.style.padding = hmp[2]+"px";

  return hmp;
}

//==================================================================================================
var NMinOut = [];
function NewtonMin(func,  xf,  TOL=.000001, MITER=100) {
  let i=0,  converged=false,   B=false;
    if(B) buglncs(i +": ",  xf);
  while((i<MITER) && (! converged)) {  i++;
      if(B) { pushStyle(ctxF, 1, "#FF0000");    //  ticks
              line(ctxF,  x2F(xf), FY0-8,  x2F(xf), FY0+8);
              popStyle(ctxF); }
    let yf,  xt, yt,  dx=TOL,  dy,  xs, xsw=0;
    yf = func(xf);
    xt = xf + dx,  yt = func(xt),  dy = yt-yf;
    xs = dx/dy*yf;
      if(B) bugcs(i +": ",  xf, yf,  xt, yt,  dy, " xs= "+ nf(xs, 6));
    xf -= xs;
      if(B) buglncs(" => "+ nf(xf, 6));
    converged = (Math.abs(xs) < TOL);
    NMinOut = [i,  xf, yf,  xs, xs-xsw];
    xsw = xf;
    }
    if(B) bugln(i +": x= "+ nf(xf, 8), " y= "+ nf(yf, 8));
    if(B) tkr(" NewtonMin: i="+ i);
  if(! converged) EMsg("NewtonMin: not converged. NMinOut="+ NMinOut);
  return xf;
}


/* ///
//==================================================================================================
function qSub(str) {
  bug(" str=", str);
  as = str.split(",");
  buglncs(" => ", as)
  let q="{";
  for(let i=0, l=as.length; i<l; i++) {
    let qq = " "+ as[i] +":"+ as[i] +", ";  bugln(qq);
    q += qq;
    }
  q += "}";
  bugln("  => "+ q);
}
//==================================================================================================
function qTest(a, b, c) {
  eval(numtest
}
/* */

//==================================================================================================
function flist() {

}

var numTestThrow=true, numTestStr="",  NTA;
//==================================================================================================
function numTestL() {
  NTA = numTestL.arguments;
  let rtn=false, str="", strR="", cma="",  B=false;
  numTestThrow= false;
  numTestStr = "";
  let lv=0, lvs="";

  function nt() {
    let nan=false;
    if(B) str += " L"+ lv +":";
    let a = nt.arguments[0],  t = (typeof a);
    buglncs(lvs+" "+ t, String(a), Number(a));
    str += cma;
    switch(t) {
      case "number":    str+="N"; str+=nf(a); nan|=numTest(a); break;
      case "object":   if(B) str+=a.length+":";
        str+=lv+"[";  cma="";
        for(let ii=0, l=a.length; ii<l; ii++) {  if(B) str += " ii"+ ii +":";
          let lvsw=lvs;  lv++;  lvs+="| ";  /// cma = "! ";
          /// buglncs(lvs+" "+  ii+"/"+l,  (typeof a[ii]), a[ii]);
          nan |= nt(a[ii]);
          lvs = lvsw;  lv--;  /// cma = "X ";
          /// buglncs("3"+ lvs+" "+ lv +" "+ ii);  bugln();
          }
        str+="]"+lv;
        break;
      case "string":    str+="S"; str+='"'+a+'"'; nan|=numTest(Number(a)); break;
      case "boolean":   str+="B"; str+=a; nan|=true; break;
      case "undefined": str+="U"; str+=a; nan|=true; break;
      default: str+="D"; str+=a+"=<Default!>"; nan|=true; break;
      }    //  switch()
    if(nan) str += "<<NaN>>";
    cma = ", ";                                  //  no dangling ","s !!!
    return nan;
    }
  rtn = nt.call(null, numTestL.arguments);
  numTestStr += str;

  numTestThrow = true;
  if(rtn)
    EMsg("numTestL("+ numTestStr +") << not finite number[s]");
  return [numTestStr, rtn];
}

//==================================================================================================
function numTest(n, tq=numTestThrow) {
try {
  if((null == n) || (! isFinite(n))) {
    if(tq) throw "numTest: "+ n +" is not a finite number!"; else return true;}
  return false;
} catch(err) { EMsg("numTest: "+ n +" is not a finite number!", err); }
}


//====== 1 ======= 2 ======= 3 ======= 4 ======= 5 ======= 6 ======= 7 ======= 8 ======= 9 ======= 0
function sq(n) { return n*n; }
function rss() {
  let qq=0;
  function q(dum, n) {qq += n*n; return qq};
  function Q(dum, n) { let ret=0;
    if("number" == (typeof n))                             //  scaler
      ret = q(dum, n);
     else                                                  //  AssYouMe(!) it's an array
      ret = Object.values(n).reduce(Q, 0);
    return ret; }
  let rtn = Math.sqrt(Object.values(arguments).reduce(Q, 0));
  return rtn; }
  ///  rssTest=[rss(3, 4), rss([3, 4]),  rss([0, 3, 0], 4), rss(3, [0, 4, 0]),   rss([3], [4]),   rss([[3], [4]]),   rss([3, [4]]),   rss([[3], 4])]
  ///  rssTest=rss([1, 2], 3, [4, 5, 6], 7, 8, [9, [10, 11]])  /// =? 22.494

function pdiv(n, d, lim=1e6) { return (1/lim < Math.abs(d)) ? (n/d) : lim; }

//==================================================================================================
var MMA, MMAA;
function mm() {                                  //  MinMax
try {
  MMA=arguments,  MMAA=Object.values(arguments);
  let qn="QN", qx="QX";
  qn=Math.min.apply(null, MMAA),  qx=Math.max.apply(null, MMAA);
  try {
    if(numTest(qn) || numTest(qx)) { EMsg("mm: ["+ String(MMAA) +"]"); }
  } catch(err) {
    if("string" == typeof err)
      EMsg("EMM: ["+ String(MMAA) +"]: => "+ err,  true);
     else
      EMsg("EMM:"+ err.lineNumber +" ["+ String(MMAA) +"]: => ", err);
  }
  return [qn, qx];
} catch(err) { EMsg("mm", err); }
}
//-----------------------------------------------|-------------------------------------------------
function mmm() {                                           //  => [min(arg[s]), max(arg[s])]
  LOG("Looks like you're using mmm()?  I can help you with that."); }
//-----------------------------------------------|-------------------------------------------------
function MM() {                                            //  => [min(arg[s]), max(arg[s])]
  let qqn=666666, qqx=-qqn;
  function qn(dum, n) {qqn = Math.min(qqn, n); return qqn};
  function qx(dum, n) {qqx = Math.max(qqx, n); return qqx};
  function Q(dum, n) { let ret=[];
    if("number" == (typeof n))                             //  scaler
      ret = [qn(dum, n), qx(dum, n)];
     else                                                  //  AssYouMe(!) it's a sub-array
      ret = Object.values(n).reduce(Q, 0);
    return ret; }
  return Object.values(arguments).reduce(Q, 0);
}
  ///  mmTester=MM(3, 7, 42, [17, 666, 71], 71, -2)  //? [-2, 666]

//-----------------------------------------------|-------------------------------------------------
function MMM(qn, q, qx) {
  /// function mmn(nn, num) { nn=Math.max(nn, num); return nn;}
  /// function mmx(nx, num) { nx=Math.min(nx, num); return nx;}
  return [Math.min(qn, q), Math.max(q, qx)];
}
//-----------------------------------------------|-------------------------------------------------
function Q(qn, q, qx) {                //  force q between limits
  q = Math.max(qn, q); q = Math.min(q, qx); return q;
  }


//==================================================================================================
Object.prototype.key2vec = function(key) {        //  extract the Object.key:value's OR the Array[:][ndx]'s
  let l=this.length, vec=[];
  vec.length=l;
  let ndx, arr=false;
  if(Array.isArray(this[0])) { ndx = Number(key);  arr = true; }     //  AssYouMe all this.elts same as 1st
  for(let i=0; i<l; i++) {
    if(arr)
      eval("vec[i] = this[i]["+ ndx +"]");       //  extract ndx'th column
     else
      eval("vec[i] = this[i]."+ key);            //  extract the key:value
    }
	return vec;
  // qob=[{x:11, y:12, z:13}, {x:21, y:22, z:23}, {x:31, y:32, z:33}];  qob.key2vec("y")   //  -> [12, 22, 32]
  /* qar=[[11, 12, 13],
          [21, 22, 23],
          [31, 32, 33]];  qar.key2vec(1)    //  -> [12, 22, 32]    /* */
  /* qmt=[[[111, 112, 113], [121, 122, 123], [131, 132, 133]],
          [[211, 212, 213], [221, 222, 223], [231, 232, 233]],
          [[311, 312, 313], [321, 322, 323], [331, 332, 333]]];  qmt.key2vec(1)   //  -> [[12x], [22x], [32x]]
  /* */
}
//-----------------------------------------------|-------------------------------------------------
Object.prototype.vec2key = function(key, vec) {       //  insert vec as "key"
  try {
  let l=this.length;
  if(l != vec.length) {
    EMsg("this.length != vec.length", true); return; }
  /// let ndx = Number(key), col=true;
  /// if(! isFinite(ndx)) col=false; else if(ndx<0) col=false;  NDX=ndx; COL=col
  for(let i=0; i<l; i++) {
    if(! this[i])  this[i] = {};
    eval("this[i]."+ key +" = vec[i]");                  //  adds key:value
    }
  return this;
  } catch(err) { EMsg("AddKey", err); }
  // qob=[{x:11,  z:13}, {x:21,  z:23}, {x:31,  z:33}];  qob.vec2key("y", [12, 22, 32]);  qob[1]
  // qob={}; qob.length=4;  qob.vec2key("test1", [10, 11, 12, 13]);  qob.vec2key("test2", [20, 21, 22, 23]);  qob[1]
}



//==================================================================================================
Array.prototype.sprintf = function(f=BUGNFf, l=BUGNFl) {
  nfpush(f, l);
  let str="";
  for(e of this)
    str += nf(e);
  nfpop();
  return str;
}
//==================================================================================================
Array.prototype.print = function(str="",  f=BUGNFf, l=BUGNFl) {
  str += "("+ this[0].length, +","+this.length, "): "+ this.sprintf();
  bug(str);
  return str;
}
//==================================================================================================
Array.prototype.println = function(str="",  f=BUGNFf, l=BUGNFl) {
  nfpush(f, l);
  str += sprintf("("+ this[0].length +", "+ this.length +"): ", this.toString());
  bugln(str);
  nfpop();
  return str;
}
//==================================================================================================
Array.prototype.matprt = function(str="",  f=BUGNFf, l=BUGNFl) {
  nfpush(f, l);
  if("undefined" == (typeof this[0]))
    str += sprintf("(1?, "+ this.length +"):");
   else if("number" == (typeof this[0]))
    str += sprintf("(1, "+ this.length +"):");
   else
    str += sprintf("("+ this[0].length +", "+ this.length +"):");
  bugln(str);

  str = "[ ";
  for(let i=0; i<this.length; i++) {
    if("undefined" == (typeof this[i]))
      str += "U?"+nf(this[i]) +", \n";
     else if("number" == (typeof this[i]))
      str += nf(this[i]) +", \n";
     else {
      str += "[ ";
      for(let j=0; j <this[i].length; j++)
        str += nf(this[i][j]) +", ";
      str += "] \n";
      }
    }
  str += "] \n";
  bug(str);
  nfpop();
  return str;
}
//-----------------------------------------------|-------------------------------------------------
Object.prototype.oprint = function(f=BUGNFf,  l=BUGNFl) {
  let B=false;
  nfpush(f, l);
  const ARR="ARR", KV="KV";
  let flag=0, keys;
  /// if(this.hasOwnProperty("0"))
  if(Array.isArray(this[0])) /// { ndx = Number(key);  arr = true; }
    flag = ARR;
   else {
    keys = Object.keys(this);
      if(B) bug(" kl="+keys.length);
    if(0 < keys.length)
      flag = KV;
     else {
      EMsg("Object.prototype.oprint:  Print what?", true);
      return;
      }
    }
    if(B) bug(" flag="+flag);
  if(ARR == flag) {
    for(let i=0, l=this.length; i<l; i++)
      bug(this[i]);
    }
   else if(KV == flag) {
      if(B) bug(" kl="+keys.length);
    for(let i=0; i<keys.length; i++) {
      let val, str=("val = this."+ keys[i]);  if(B) bug("<"+str+">");
      eval(str);
      bug(keys[i] +":"+ nf(val, f, l) +"  ");
      }
    }
   else
    EMsg("oprint: flag="<+flag+">", true);
  nfpop();
}


//====== 1 ======= 2 ======= 3 ======= 4 ======= 5 ======= 6 ======= 7 ======= 8 ======= 9 ======= 0
function R2D(q) { return q*180/Math.PI; }
function D2R(q) { return q*Math.PI/180; }


//==================================================================================================
/*                            Handy?

    /*  go through html elts id=["X0" : "X9"]  where some might not exist
    let c;
    try { eval("c = X"+ i +".value"); coefs[i] = Number( c ); }
    catch(err) { coefs[i] = 0; continue; }    ///  bugln(err);
    /* */

/*                   -------- TODO ----------
setLineDash
 let .*;.

/* */
//  hide all this crap if no-scripts  -->

