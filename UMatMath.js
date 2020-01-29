//==================================================================================================
Array.prototype.min = function() {
  let l=this.length, mn;
  if("number" == (typeof this[0])) mn = 666666; else mn = [];    ///  ASS-YOU-ME
  for(let i=0; i<l; i++) {
    if("number" == (typeof this[i]))
      mn = Math.min(mn, this[i]);
     else
      mn = mn.concat(this[i].min());
    }
    /// { if("number" == (typeof this[i])) mn = Math.min(mn, this[i]); else mn = this[i].min(); }
	return mn;
}
//-----------------------------------------------|-------------------------------------------------
Array.prototype.max = function() {
  let l=this.length, mx;
  if("number" == (typeof this[0])) mx = -666666; else mx = [];    ///  ASS-YOU-ME
  for(let i=0; i<l; i++) {
    if("number" == (typeof this[i]))
      mx = Math.max(mx, this[i]);
     else
      mx = mx.concat(this[i].max());
    }
    /// { if("number" == (typeof this[i])) mx = Math.max(mx, this[i]); else mx = this[i].max(); }
	return mx;
}
//-----------------------------------------------|-------------------------------------------------
Array.prototype.mm = function() {                //  MinMax of vector
/*
  let l=this.length, mn=666666, mx=-mn;
  for(let i=0; i<l; i++)
    [mn, mx] = [ Math.min(mn, this[i]),  Math.max(mx, this[i]) ];
    /*                                           //  will work on "mixed" array, but not col-wise, so ???
    if("number" == (typeof this[i]))
      [mn, mx] = [ Math.min(mn, this[i]),  Math.max(mx, this[i]) ];
     else
      [mn, mx] = this[i].mm();   /* */
  let mn = this.min(),  mx = this.max();
	return [mn, mx];
}

//-----------------------------------------------|-------------------------------------------------
Array.prototype.resize = function(nrb, ncb) {
  if(undefined == this[0]) { test(); return; }
  let nr, nc;
  nr=this[0].length, nc=this.length;             //  [[col0], [col1], ... ]

  function test() {}
  return undefined;    ///<<<
}

//-----------------------------------------------|-------------------------------------------------
Array.prototype.trans = function() {             //  pose
  if(undefined == this[0]) { test(); return; }
  let nr, nc;
  if("number" == (typeof this[0])) {             //  treat as list->rowvec; [1, 2, ...]->[[1], [2], ...]
    return( [this] ); }
   else {
    nr=this[0].length, nc=this.length; }     //  [[col0], [col1], ... ]

  let P=[];  P.length = nr;
  for(let r=0; r<nr; r++) {
    P[r] = [];  P[r].length = nc;
    for(let c=0; c<nc; c++) {
      P[r][c] = this[c][r];
      }
    }

	function test() {    let qar, str;
  	qarc = [[11, 21, 31, 41]];        str=qarc.trans().println("[[11, 21, 31, 41]] -> ");  console.log(str)
  	qarr = [[11], [12], [13], [14]];  str=qarr.trans().println("[[11], [12], [13], [14]] -> ");  console.log(str)
	  qar = [[11, 21, 31, 41],  [12, 22, 32, 42],  [13, 23, 33, 43]];  str=qar.trans().println("[[11, 21, 31, 41],  [12, 22, 32, 42],  [13, 23, 33, 43]] -> ");  console.log(str)
    qar = [111, 121, 131, 141];  str=qar.trans().println("[111, 121, 131, 141] -> ");  console.log(str)
    }
	return P;
}

var c=0, ci=0, r=0
//-----------------------------------------------|-------------------------------------------------
function matMul(a, b) {
  let nra, nca,  nrb, ncb;
/*
  if(1 == a.length && ("number" == (typeof a[0]))) aa = a[0];
   else aa = a;
  if((1 == b.length) && ("number" == (typeof b[0]))) bb = b[0];
   else bb = b;
/* */
  if(undefined == a) { test(); return; }

  nra=a[0].length, nca=a.length;             //  [[col0] [col1] ... ]
  nrb=b[0].length, ncb=b.length;
  if(nca != nrb) {
    /// let str = "! matMul: ("+ a.matprt() +") & ("+ b.matprt() +") not conformable";  EMsg(str, true);  return(str); }
    let str = "! matMul: a("+ nra +","+ nca +") & b("+ nrb +","+ ncb +") not conformable";  EMsg(str, true);  return(str); }

  ab=[];  ab.length = ncb;
  for(c=0; c<ncb; c++) {
    ab[c] = [];  ab[c].length = nra;   ab[c].fill(0);
    for(r=0; r<nra; r++) {
      for(ci=0; ci<nca; ci++) {
       ab[c][r] += a[ci][r] * b[c][ci];
        }
      }
    }
	return ab;

  function test() {
    let i=0,  bcwas = bugConsole;  bugConsole = false;
    tst( "matMul([[1, 2, 3, 4]],  [[10], [20], [30]])" );
    tst( "matMul([[10], [20], [30], [40]],  [[1, 2, 3, 4]])" );    //  [300]
    tst( "matMul([[11, 21],  [12, 22],  [13, 23]],   [[11, 21, 31], [21, 22, 23], [31, 32, 33], [41, 42, 43]])" );

    function tst(ms) {
      bugln( i++ +":  "+ ms +" -> ");
      let m = eval( ms );
      if("number" == (typeof m)) bugln(m); else m.matprt();
      bugln();
      }

    bugConsole = bcwas;
    return;    //  test2()
    }

}


//==================================================================================================
Array.prototype.sum = function() {
  try {
  let S;
  if("number" == (typeof this[0]))               //  assume 1st elt represents all
    S = 0;
   else {
    S=[]; S.length=this.length;}
  for(let i=0, l=this.length; i<l; i++) {
    if("number" == (typeof S))
      S += this[i];
     else {
      let q = this[i];
      S[i] = this[i].sum();
      }
    }
  return S;
  } catch(err) { EMsg("Array.prototype.sum", err); }
}
  // qar=[11, 12, 13];  qar.sum()  //  36
  // qar=[[11, 12, 13], [21, 22, 23], [31, 32, 33]];  qar.sum()  //  [ 36, 66, 96 ]
  // qar=[[[111, 112], [121, 122], [131, 132]],  [[211, 212], [221, 222], [231, 232]]];  qar.sum()  //  [ [223, 243, 263], [423, 443, 463] ]

//-----------------------------------------------|-------------------------------------------------
Array.prototype.mean = function() {
  try {
  let S=this.sum();
  if("number" == (typeof S))
    S /= this.length;
   else
    S.mul(1/this.length);
  return S;
  } catch(err) { EMsg("Array.prototype.mean", err); }
  // qar=[11, 12, 13];  qar.mean()  //  12
  // qar=[[11, 12, 13], [21, 22, 23], [31, 32, 33]];  qar.mean()  //  [ 12, 22, 32 ]
}
//-----------------------------------------------|-------------------------------------------------
const DOPADD=0, DOPSUB=1,  DOPMUL=10, DOPDIV=11,  DOPSQR=20, DOPPOW=22,   DOPSQRT=25;
const DOPSIN=40, DOPCOS=41, DOPTAN=42,  DOPASIN=45, DOPACOS=46, DOPATAN=47, DOPATAN2=48;
let ndotop=0, ndotopx=0;
//-----------------------------------------------|-------------------------------------------------
function dotOp(a, b,  op) {                      //  dot-operate on 2 of anything that're remotely conformable
  let aa, bb,  rr;
  if("undefined" == (typeof a)) { test(); return; }
  /*
  if("number" == (typeof a)) aa = a;
   else if(1 == a.length && ("number" == (typeof a[0]))) aa = a[0];
   else aa = a;
  if("number" == (typeof b)) bb = b;
   else if((1 == b.length) && ("number" == (typeof b[0]))) bb = b[0];
   else bb = b;
/* */

  /* if(("string" == (typeof a)) || ("string" == (typeof b))) {
    EMsg("! dotOp(", a, b,  op, "): a/b == string");  return; }  /* */
  if(0 == ndotop) ndotopx = 0;
  ndotop++;  ndotopx++;
  if(50 < ndotop) { str = EMsg("! dotOp(", a, b,  op, "): 50 < ndotop"); return str; }

  if(1 == a.length && ("number" == (typeof a[0]))) aa = a[0];
   else aa = a;
  if((1 == b.length) && ("number" == (typeof b[0]))) bb = b[0];
   else bb = b;

  if("number" == (typeof bb)) {
    if("number" == (typeof aa)) {
      switch(op) {
        case DOPADD:  rr = aa + bb; break;
        case DOPSUB:  rr = aa - bb; break;
        case DOPMUL:  rr = aa * bb; break;
        case DOPDIV:  rr = aa / bb; break;
        case DOPSQR:  rr = (aa * aa) * bb; break;
        case DOPPOW:  rr = Math.pow(aa, bb); break;
        case DOPSQRT: rr = Math.sqrt(aa); break;

        case DOPSIN:   rr = Math.sin(aa) * bb;   break;
        case DOPCOS:   rr = Math.cos(aa) * bb;   break;
        case DOPTAN:   rr = Math.tan(aa) * bb;   break;
        case DOPASIN:  rr = Math.asin(aa) * bb;  break;
        case DOPACOS:  rr = Math.acos(aa) * bb;  break;
        case DOPATAN:  rr = Math.atan(aa) * bb;  break;
        case DOPATAN2: rr = Math.atan2(aa, bb); break;

        default:      rr = ["! dotOp error: case = "+ op];
        }
      }
     else {
      rr = []; rr.length = aa.length;
      for(let i=0; i<aa.length; i++)
        rr[i] = dotOp(aa[i], bb,  op);           //  [aa] op bb
      }
    }

   else {                                        //  bb is array
    if("number" == (typeof aa)) {
      rr = []; rr.length = bb.length;
      for(let j=0; j<bb.length; j++)
        rr[j] = dotOp(aa, bb[j],  op);           //  aa op [bb]
      }
     else {
      if(aa.length == bb.length) {
        rr = []; rr.length = aa.length;
        for(let k=0; k<bb.length; k++)
          rr[k] = dotOp(aa[k], bb[k],  op);
        }
       else
        rr = EMsg("! dotOp() error:  Lengths: aa:"+ aa +", bb:"+ bb,  true);
      }
    }

  ndotop--;
  if(ndotop < 0) { str = EMsg("! dotOp(", a, b,  op, "): ndotop < 0"); return str; }

  function test() {
    let i=0,  bcwas = bugConsole;  bugConsole = false;
    tst( "dotOp(532, 134, DOPADD)" );    //  101
    tst( "dotOp([11, 12, 13],  100,  DOPADD)" ); //  [111, 112, 113]
    tst( "dotOp(100,  [11, 12, 13],  DOPADD)" ); //  [11, 112, 113]
    tst( "dotOp([[11, 12, 13],  2,  [31, 32, 33]], 100,  DOPADD)" ); //  [[111, 112, 113],  102,  [131, 132, 133] ]
    tst( "dotOp([[11, 12, 13], [21, 22, 23], [31, 32, 33]],  [100, 200, 300],  DOPADD)" ); //  [[111, 112, 113], [221, 222, 223], [331, 332, 333]]]
    tst( "dotOp([100, 200, 300],  [[11, 12, 13], [21, 22, 23], [31, 32, 33]],  DOPADD)" ); //  [[111, 112, 113], [221, 222, 223], [331, 332, 333]]]
    tst( "dotOp([[11, 12, 13],  2,  [31, 32, 33]],  [100, 200, 300],  DOPADD)" ); //  [[111, 112, 113],  202,  [331, 332, 333] ]
    tst( "dotOp([100, 200, 300],  [[11, 12, 13],  2,  [31, 32, 33]],  DOPADD)" ); //  [[111, 112, 113],  202,  [331, 332, 333] ]
    tst( "dotOp(10000,  [[[111, 112], [121, 122],  [131, 132], [141, 142]],  [[211, 212], [221, 222], [121, 232], [241, 242]]],  DOPADD)" ); //  [[111, 112, 113],  202,  [331, 332, 333] ]
    tst( "dotOp([10000, 20000],  [[[111, 112], [121, 122],  [131, 132], [141, 142]],  [[211, 212], [221, 222], [221, 232], [241, 242]]],  DOPADD)" ); //  [[10111, 10112],  ... ]
    tst( "dotOp([[[111, 112], [121, 122],  [131, 132], [141, 142]],  [[211, 212], [221, 222], [221, 232], [241, 242]]],  [10000, 20000],  DOPADD)" ); //  [[10111, 10112],  ... ]
    tst( "dotOp([[[111, 112], [121, 122],  [131, 132], [141, 142]],  [[211, 212], [221, 222], [221, 232], [241, 242]]],  [10000, 20000],  DOPADD)" ); //  [[10111, 10112],  ... ]

    function tst(ms) {
      bugln( i++ +":  "+ ms +"    ("+ ndotop +" / "+ ndotopx +") -> ");
      let m = eval( ms );
      if("number" == (typeof m)) bugln(m); else m.matprt();
      bugln();
      }
    bugConsole = bcwas;
    return;    //  test()
    }

  return rr;
}
//-----------------------------------------------|-------------------------------------------------
Array.prototype.dotadd = function(b, inPlace=false) {
  /// if(! isFinite(b)) EMsg("Array.prototype.mul: ! isFinite(b)", true)
  let P=[];  if(inPlace) P=this;  /// else  P.length=this.length;
  P = dotOp(this, b, DOPADD);
  return P;
  // qar=[[11, 12, 13], [21, 22, 23], [31, 32, 33]];  q2=qar.dotadd(3);  q2===qar;
  // qar=[[11, 12, 13], [21, 22, 23], [31, 32, 33]];  q2=qar.dotadd(3, true);   q2===qar;
}
//-----------------------------------------------|-------------------------------------------------
Array.prototype.dotsub = function(b, inPlace=false) {
  /// if(! isFinite(b)) EMsg("Array.prototype.mul: ! isFinite(b)", true)
  let P=[];  if(inPlace) P=this;  /// else  P.length=this.length;
  P = dotOp(this, b, DOPSUB);
  return P;
  // qar=[[11, 12, 13], [21, 22, 23], [31, 32, 33]];  q2=qar.dotsub(3);  q2===qar;
  // qar=[[11, 12, 13], [21, 22, 23], [31, 32, 33]];  q2=qar.dotsub(3, true);   q2===qar;
}
//-----------------------------------------------|-------------------------------------------------
Array.prototype.dotmul = function(b, inPlace=false) {
  /// if(! isFinite(b)) EMsg("Array.prototype.mul: ! isFinite(b)", true)
  let P=[];  if(inPlace) P=this;  /// else  P.length=this.length;
  P = dotOp(this, b, DOPMUL);
  return P;
  // qar=[[11, 12, 13], [21, 22, 23], [31, 32, 33]];  q2=qar.dotmul(3);  q2===qar;
  // qar=[[11, 12, 13], [21, 22, 23], [31, 32, 33]];  q2=qar.dotmul(3, true);   q2===qar;
}
//-----------------------------------------------|-------------------------------------------------
Array.prototype.dotdiv = function(b, inPlace=false) {
  /// if(! isFinite(b)) EMsg("Array.prototype.mul: ! isFinite(b)", true)
  let P=[];  if(inPlace) P=this;  /// else  P.length=this.length;
  P = dotOp(this, b, DOPDIV);
  return P;
  // qar=[[11, 12, 13], [21, 22, 23], [31, 32, 33]];  q2=qar.dotdiv(3);  q2===qar;
  // qar=[[11, 12, 13], [21, 22, 23], [31, 32, 33]];  q2=qar.dotdiv(3, true);   q2===qar;
}

//-----------------------------------------------|-------------------------------------------------
Array.prototype.sqr = function(b=1.0, inPlace=false) {
  /// if(! isFinite(b)) EMsg("Array.prototype.mul: ! isFinite(b)", true)
  let P=[];  if(inPlace) P=this;  /// else  P.length=this.length;
  P = dotOp(this, b, DOPSQR);
  return P;
  // qar=[[11, 12, 13], [21, 22, 23], [31, 32, 33]];  q2=qar.sqr(2);
  // qar=[[11, 12, 13], [21, 22, 23], [31, 32, 33]];  q2=qar.sqr(3);
}
//-----------------------------------------------|-------------------------------------------------
Array.prototype.pow = function(b, inPlace=false) {
  /// if(! isFinite(b)) EMsg("Array.prototype.mul: ! isFinite(b)", true)
  let P=[];  if(inPlace) P=this;  /// else  P.length=this.length;
  P = dotOp(this, b, DOPPOW);
  return P;
  // qar=[[11, 12, 13], [21, 22, 23], [31, 32, 33]];  q2=qar.pow(2);
  // qar=[[11, 12, 13], [21, 22, 23], [31, 32, 33]];  q2=qar.pow(3);
}


//-----------------------------------------------|-------------------------------------------------
Array.prototype.sin = function(b=1.0, inPlace=false) {    //  b*sin(this)
  let P=[];  if(inPlace) P=this;  /// else  P.length=this.length;
  P = dotOp(this, b, DOPSIN);
  return P;
  // qar=[Math.asin(1/2), Math.asin(1/3), Math.asin(1/4), ];  qar.sin(10);    //  [5, 3.33, 2.5]
}
//-----------------------------------------------|-------------------------------------------------
Array.prototype.cos = function(b=1.0, inPlace=false) {
  let P=[];  if(inPlace) P=this;  /// else  P.length=this.length;
  P = dotOp(this, b, DOPCOS);
  return P;
  //  qar=[Math.acos(1/2), Math.acos(1/3), Math.acos(1/4), ];  qar.cos(10);
}
//-----------------------------------------------|-------------------------------------------------
Array.prototype.tan = function(b=1.0, inPlace=false) {
  let P=[];  if(inPlace) P=this;  /// else  P.length=this.length;
  P = dotOp(this, b, DOPTAN);
  return P;
  // qar=[[11, 12, 13], [21, 22, 23], [31, 32, 33]];  q2=qar.tan(3);  q2===qar;
  // qar=[[11, 12, 13], [21, 22, 23], [31, 32, 33]];  q2=qar.tan(3, true);   q2===qar;
}

//-----------------------------------------------|-------------------------------------------------
Array.prototype.isin = function(b=1.0, inPlace=false) {    //  b/sin(this)
  let P=[];  if(inPlace) P=this;  /// else  P.length=this.length;
  P = dotOp(b, dotOp(this, 1.0, DOPSIN), DOPDIV);
  return P;
  // qar=[Math.asin(1/2), Math.asin(1/3), Math.asin(1/4), ];  qar.isin(10);    //  [20, 30, 40]
  // qar=[Math.asin(1/2), Math.asin(1/3), Math.asin(1/4), ];  dotOp([1, 10, 100], dotOp(qar, 1.0, DOPSIN), DOPDIV);   //  [2, 30, 400]
}
//-----------------------------------------------|-------------------------------------------------
Array.prototype.icos = function(b=1.0, inPlace=false) {
  let P=[];  if(inPlace) P=this;  /// else  P.length=this.length;
  P = dotOp(b, dotOp(this, 1.0, DOPCOS), DOPDIV);
  return P;
  // qar=[Math.acos(1/2), Math.acos(1/3), Math.acos(1/4), ];  qar.icos(10);    //  [20, 30, 40]
}
//-----------------------------------------------|-------------------------------------------------
Array.prototype.itan = function(b=1.0, inPlace=false) {
  let P=[];  if(inPlace) P=this;  /// else  P.length=this.length;
  P = dotOp(b, dotOp(this, 1.0, DOPTAN), DOPDIV);
  return P;
  // qar=[[11, 12, 13], [21, 22, 23], [31, 32, 33]];  q2=qar.itan(3);  q2===qar;
  // qar=[[11, 12, 13], [21, 22, 23], [31, 32, 33]];  q2=qar.itan(3, true);   q2===qar;
}

//-----------------------------------------------|-------------------------------------------------
Array.prototype.asin = function(b=1.0, inPlace=false) {    //  b/sin(this)
  let P=[];  if(inPlace) P=this;  /// else  P.length=this.length;
  P = dotOp(this, b, DOPASIN);
  return P;
  // qar=[Math.asin(1/2), Math.asin(1/3), Math.asin(1/4), ];  qar.asin(10);    //  [20, 30, 40]
}
//-----------------------------------------------|-------------------------------------------------
Array.prototype.acos = function(b=1.0, inPlace=false) {
  let P=[];  if(inPlace) P=this;  /// else  P.length=this.length;
  P = dotOp(this, b, DOPACOS);
  return P;
  // qar=[Math.acos(1/2), Math.acos(1/3), Math.acos(1/4), ];  qar.acos(10);    //  [20, 30, 40]
}
//-----------------------------------------------|-------------------------------------------------
Array.prototype.atan = function(b=1.0, inPlace=false) {
  let P=[];  if(inPlace) P=this;  /// else  P.length=this.length;
  P = dotOp(this, b, DOPATAN);
  return P;
  // qar=[[11, 12, 13], [21, 22, 23], [31, 32, 33]];  q2=qar.atan(3);  q2===qar;
}
//-----------------------------------------------|-------------------------------------------------
Array.prototype.atan2 = function(b, inPlace=false) {
  let P=[];  if(inPlace) P=this;  /// else  P.length=this.length;
  P = dotOp(this, b, DOPATAN2);
  return P;
  // qar=[[11, 12, 13], [21, 22, 23], [31, 32, 33]];  q2=qar.atan2(3);  q2===qar;
}

