var BaconAndEggs={VERSION:0.1,PRECISION:1e-6};function Matrix(){}Matrix.prototype={add:function(B){B=B.elements||B;if(typeof(B)=='number'){return this.mapSingle(function(X){return X+B})}if(this.areSameSize(B)){return this.mapMultiple(function(X,Y){return X+Y},B)}return null},areSameSize:function(B){B=B.elements||B;if(typeof(B[0][0])=='undefined'){return false}return(this.cols()==B.length&&this.rows()==B[0].length)},augment:function(B){var _augment=B.elements||B;var _elements=this.elements;var i,j;for(i=0;i<this.rows();i++){_elements[i]=_elements[i].concat(_augment[i])}return Matrix.create(_elements)},canMultiply:function(B){B=B.elements||B;return this.cols()==B.length},checkPrecision:function(){fn=function(X){if(Math.abs(X)<BaconAndEggs.PRECISION){return 0}else{return X}};return this.mapSingle(fn)},cols:function(){return this.elements[0].length},determinant:function(){if(!this.isSquare()){return null}if(this.rows()==2){return(this.elementAt(1,1)*this.elementAt(2,2))-(this.elementAt(2,1)*this.elementAt(1,2))}if(this.rows()==3){return((this.elementAt(1,1)*this.elementAt(2,2)*this.elementAt(3,3))+(this.elementAt(1,2)*this.elementAt(2,3)*this.elementAt(3,1))+(this.elementAt(1,3)*this.elementAt(2,1)*this.elementAt(3,2))-(this.elementAt(3,1)*this.elementAt(2,2)*this.elementAt(1,3))-(this.elementAt(3,2)*this.elementAt(2,3)*this.elementAt(1,1))-(this.elementAt(3,3)*this.elementAt(2,1)*this.elementAt(1,2)))}var i,m=this.rows(),det=1;var LU=this.luDecompose();LU.L=LU.P.multiply(LU.L);for(i=1;i<=m;i++){det=det*LU.L.elementAt(i,i);det=det*LU.U.elementAt(i,i)}return(Math.pow(-1,LU.S)*det)},diagonals:function(){var n=Math.min(this.rows(),this.cols());var _dias=[],i;for(i=0;i<n;i++){_dias[i]=this.elementAt(i+1,i+1)}return Vector.create(_dias)},duplicate:function(){return Matrix.create(this.elements)},elementAt:function(i,j){if(i>this.rows()||j>this.cols())return null;return this.elements[i-1][j-1]},equals:function(B){B=B.elements||B;if(!this.areSameSize(B))return false;var m=this.rows(),n=this.cols(),i,j;for(i=0;i<m;i++){for(j=0;j<n;j++){if(this.elements[i][j]!=B[i][j])return false}}return true},getCol:function(n){if(n>this.cols()||n<1){return null}var C=[],m=this.rows(),i;for(i=0;i<m;i++){C[i]=this.elements[i][n-1]}return Vector.create(C)},getRow:function(m){if(m>this.rows()||m<1)return null;return Vector.create(this.elements[m-1])},indexOf:function(V){if(typeof(V)!='number')return null;var i,j,_elements=this.elements;for(i=0;i<this.rows();i++){for(j=0;j<this.cols();j++){if(_elements[i][j]===V){return{i:i+1,j:j+1}}}}return null},inverse:function(){if(!this.isSquare())return null;if(this.rows()==2){if(this.determinant()!=0){var s=(1/(this.elementAt(1,1)*this.elementAt(2,2)-this.elementAt(2,1)*this.elementAt(1,2)));var M=Matrix.create([[this.elementAt(2,2),-this.elementAt(1,2)],[-this.elementAt(2,1),this.elementAt(1,1)]]);return M.multiply(s)}}var i,j,m=this.rows(),n=this.cols(),det=1;var LU=this.luDecompose();var L=LU.P.multiply(LU.L);var U=LU.U;for(i=1;i<=m;i++){det=det*L.elementAt(i,i)*U.elementAt(i,i)}if(det==0)return null;var Li=LU.P.duplicate();var Ui=Matrix.ident(Li.rows());var ju,jl,iu,il;var u,l,El,Eu;for(ju=n,jl=1;ju>0;ju--,jl++){u=U.elementAt(ju,ju);l=L.elementAt(jl,jl);Eu=Matrix.ident(m);Eu.setElement(ju,ju,1/u);El=Matrix.ident(m);El.setElement(jl,jl,1/l);for(iu=ju-1,il=jl+1;iu>0;iu--,il++){Eu.setElement(iu,ju,-U.elementAt(iu,ju)/l);El.setElement(il,jl,-L.elementAt(il,jl)/u)}Ui=Eu.multiply(Ui);Li=El.multiply(Li)}return Ui.multiply(Li)},isSquare:function(){return this.cols()==this.rows()},luDecompose:function(){if(!this.isSquare())return null;var i,j,k,max_i,S=0;var m=this.rows(),n=this.cols();var U=this.duplicate();var I=Matrix.ident(m),P=I.duplicate(),L=I.duplicate();for(j=1;j<n;j++){max_i=j;max_v=Math.abs(U.elementAt(j,j));for(i=j+1;i<=m;i++){var v=Math.abs(U.elementAt(i,j));if(v>max_v){max_i=i;max_v=v}}var tmpP=I.duplicate();if(max_i!=j){tmpP=tmpP.swapRows(max_i,j);S++}U=tmpP.multiply(U);L=L.multiply(tmpP.transpose());P=tmpP.multiply(P);if(Math.abs(U.elementAt(j,j))>BaconAndEggs.PRECISION){var E=I.duplicate();var L1=I.duplicate();for(i=j+1;i<=n;i++){E.setElement(i,j,-U.elementAt(i,j)/U.elementAt(j,j));L1.setElement(i,j,U.elementAt(i,j)/U.elementAt(j,j))}U=E.multiply(U);L=L.multiply(L1)}}return{L:L,U:U,P:P,S:S}},mapMultiple:function(fn,Arg){var m=this.rows(),n=this.cols();var i,j;var _elements=[];for(i=0;i<m;i++){_elements[i]=[];for(j=0;j<n;j++){_elements[i][j]=fn(this.elements[i][j],Arg[i][j])}}return Matrix.create(_elements)},mapSingle:function(fn){var m=this.rows(),n=this.cols();var i,j;var _elements=[];for(i=0;i<m;i++){_elements[i]=[];for(j=0;j<n;j++){_elements[i][j]=fn(this.elements[i][j])}}return Matrix.create(_elements)},minor:function(sm,sn,em,en){var m=this.rows(),n=this.cols();if(sm>m||em>m||sn>n||en>n)return null;if(sm>em||sn>en)return null;var i,j,M=[];for(i=sm-1;i<em;i++){M[i-sm+1]=[];for(j=sn-1;j<en;j++){M[i-sm+1][j-sn+1]=this.elements[i][j]}}return Matrix.create(M)},multiply:function(B){var isVector=false;B=B.elements||B;if(typeof(B)=='number')return this.mapSingle(function(X){return X*B});if(!this.canMultiply(B))return null;if(typeof(B[0][0])=='undefined'){var tmp=[];for(var z=0;z<B.length;z++){tmp[z]=[B[z]]}B=Matrix.create(tmp);B=B.elements;isVector=true}var m=this.rows(),n=this.cols();var Bm=B.length,Bn=B[0].length;var _elements=[];for(var i=0;i<m;i++){_elements[i]=[];for(var j=0;j<Bn;j++){var tmp=0;for(var k=0;k<n;k++){tmp+=this.elements[i][k]*B[k][j]}_elements[i][j]=tmp}}if(isVector){var _els=[];for(i=0;i<m;i++){_els[i]=_elements[i][0]}return Vector.create(_els)}return Matrix.create(_elements)},qrDecompose:function(){return null},round:function(){var _elements=this.elements;var i,j;for(i=0;i<this.rows();i++){for(j=0;j<this.cols();j++){_elements[i][j]=Math.round(_elements[i][j])}}return Matrix.create(_elements)},rows:function(){return this.elements.length},setCol:function(j,C){C=C.elements||C;var i,m=this.rows();for(i=0;i<m;i++){this.elements[i][j]=C[i]}return this},setElement:function(i,j,V){if(i>this.rows()||j>this.cols()||i<1||j<1)return;if(typeof(V)=='number')this.elements[i-1][j-1]=V;else this.elements[i-1][j-1]='undefined'},setElements:function(_els){_els=_els.elements||_els;if(typeof(_els[0][0])=='undefined'){var tmp=[];for(var z=0;z<_els.length;z++){tmp[z]=[_els[z]]}this.elements=tmp;return this}var m=_els.length,i;this.elements=[];for(i=0;i<m;i++){this.elements[i]=_els[i].slice(0)}return this},solve:function(b){if(this.isSquare())return this.solveWithLU(b);else if(this.rows()>this.cols())return this.solveWithQR(b);else return null},size:function(){return{rows:this.rows(),cols:this.cols()}},solveWithLU:function(b){b=Vector.create(b.elements||b);if(this.rows()!=b.size())return null;var m=this.rows(),n=this.cols();var i,j;var LU=this.luDecompose();LU.L=LU.P.multiply(LU.L);b=LU.P.multiply(b).elements;var _y=[];for(j=1;j<=n;j++){if(Math.abs(LU.L.elementAt(j,j))<BaconAndEggs.PRECISION){return null}_y[j-1]=b[j-1]/LU.L.elementAt(j,j);for(i=j+1;i<=m;i++){b[i-1]=b[i-1]-LU.L.elementAt(i,j)*_y[j-1]}}var _x=[];for(j=m;j>0;j--){if(Math.abs(LU.U.elementAt(j,j))<BaconAndEggs.PRECISION){return null}_x[j-1]=_y[j-1]/LU.U.elementAt(j,j);for(i=1;i<j;i++){_y[i-1]=_y[i-1]-LU.U.elementAt(i,j)*_x[j-1]}}return Vector.create(_x)},solveWithQR:function(b){var i,j,k,m=this.rows(),n=this.cols();var R=this.duplicate();var currR;var akk,alpha,beta,gamma;var Aj,Ak,Vk;for(k=1;k<=n;k++){currR=R.minor(k,k,m,n);Ak=currR.getCol(1);akk=Ak.elementAt(1);if(Math.abs(akk)>BaconAndEggs.PRECISION)alpha=-(akk/Math.abs(akk))*Ak.length();else alpha=Ak.length();Vk=R.getCol(k);for(j=1;j<k;j++){Vk.setElement(j,0)}Vk=Vk.subtract(Vector.zeros(m).setElement(k,alpha));beta=Vk.dot(Vk);if(Math.abs(beta)>BaconAndEggs.PRECISION){for(j=k;j<=n;j++){Aj=R.getCol(j);gamma=Vk.dot(Aj);Aj=Aj.subtract(Vk.scale(2*gamma/beta));R.setCol(j-1,Aj)}gamma=Vk.dot(b);b=b.subtract(Vk.scale(2*gamma/beta))}}R=R.checkPrecision();var x=Vector.zeros(n);for(j=n;j>0;j--){if(Math.abs(R.elementAt(j,j))<BaconAndEggs.PRECISION){return null}x.setElement(j,b.elementAt(j)/R.elementAt(j,j));for(i=1;i<j;i++){b.setElement(i,b.elementAt(i)-R.elementAt(i,j)*x.elementAt(j))}}return x},subtract:function(B){B=B.elements||B;if(typeof(B)=='number')return this.mapSingle(function(X){return X-B});if(this.areSameSize(B))return this.mapMultiple(function(X,Y){return X-Y},B);return null},swapCols:function(i,j){if(i>this.cols()||j>this.cols()||i<1||j<1)return null;var _elements=this.elements,tmp;var m=this.rows(),k;for(k=0;k<m;k++){tmp=_elements[k][i-1];_elements[k][i-1]=_elements[k][j-1];_elements[k][j-1]=tmp}return Matrix.create(_elements)},swapRows:function(i,j){if(i>this.rows()||j>this.rows()||i<1||j<1)return null;var _elements=this.elements;var tmp=_elements[i-1];_elements[i-1]=_elements[j-1];_elements[j-1]=tmp;return Matrix.create(_elements)},toString:function(){var m=this.rows(),n=this.cols(),str="";for(i=0;i<m;i++){for(j=0;j<n;j++){str+=this.elements[i][j]+", "}str+="<br>"}return str},trace:function(){var m=Math.max(this.rows(),this.cols());var tmp=0,i;for(i=0;i<m;i++){tmp+=this.elements[i][i]}return tmp},transpose:function(){var _elements=this.elements;var i,j,m=this.rows(),n=this.cols();var result=[];for(j=0;j<n;j++){result[j]=[];for(i=0;i<m;i++){result[j][i]=_elements[i][j]}}return Matrix.create(result)}};Matrix.create=function(_elements){if(_elements==null)return null;var newMatrix=new Matrix();return newMatrix.setElements(_elements)};Matrix.ident=function(n){if(n==null)return null;var _elements=[];for(var i=0;i<n;i++){_elements[i]=[];for(var j=0;j<n;j++){_elements[i][j]=(i==j)?1:0}}return Matrix.create(_elements)};Matrix.fill=function(m,n,N){if(m==null||n==null||N==null)return null;var _elements=[];for(var i=0;i<m;i++){_elements[i]=[];for(var j=0;j<n;j++){_elements[i][j]=N}}return Matrix.create(_elements)};Matrix.zeros=function(m,n){if(m==null)return null;if(n==null)n=m;return Matrix.fill(m,n,0)};function Vector(){};Vector.prototype={add:function(B){B=B.elements||B;if(typeof(B)=='number')return this.mapSingle(function(X){return X+B});else return this.mapMultiple(function(X,Y){return X+Y},B)},canMultiply:function(B){B=B.elements||B;if(typeof(B)=='number'){return true}else if(B.length=this.size()){return true}return false},checkPrecision:function(){fn=function(X){if(Math.abs(X)<BaconAndEggs.PRECISION)return 0;else return X};return this.mapSingle(fn)},dot:function(B){var _elements=B.elements||B;var result=0,n=this.size();if(_elements.length!=n)return null;for(i=0;i<n;i++){result+=this.elements[i]*_elements[i]}return result},elementAt:function(i){if(i<1||i>this.size())return null;return this.elements[i-1]},euclidLength:function(){return this.norm(2)},mapMultiple:function(fn,Arg){var i,n=this.size();var _elements=[];for(i=0;i<n;i++){_elements[i]=fn(this.elements[i],Arg[i])}return Vector.create(_elements)},mapSingle:function(fn){var i,n=this.size();var _elements=[];for(i=0;i<n;i++){_elements[i]=fn(this.elements[i])}return Vector.create(_elements)},multiply:function(B){B=B.elements||B;if(typeof(B)=="Number"){return this.scale(B)}else{return this.dot(B)}},norm:function(p){var i,result=0,n=this.size();for(i=0;i<n;i++){result+=Math.pow(this.elements[i],p)}return Math.pow(result,1/p)},round:function(){return this.mapSingle(function(X){return Math.round(X)})},scale:function(B){return this.mapSingle(function(X){return X*B})},setElement:function(i,N){if(i>this.size()||i<1)return;this.elements[i-1]=N;return this},setElements:function(_elements){_elements=_elements.elements||_elements;this.elements=_elements.slice(0);return this},size:function(){return this.elements.length},sum:function(){return this.norm(1)},squaredLength:function(){return this.mapSingle(function(X){return X*X}).norm(1)},subtract:function(B){B=B.elements||B;if(typeof(B)=='number')return this.mapSingle(function(X){return X-B});else return this.mapMultiple(function(X,Y){return X-Y},B)},toString:function(){var str="",i,n=this.size();for(i=0;i<n;i++){str+=this.elements[i]+", "}return str}};Vector.create=function(elements){var newVector=new Vector();return newVector.setElements(elements)};Vector.fill=function(n,N){var _elements=[],i;for(i=0;i<n;i++){_elements[i]=N}return Vector.create(_elements)};Vector.zeros=function(n){return Vector.fill(n,0)};var $V=Vector.create;var $M=Matrix.create;
