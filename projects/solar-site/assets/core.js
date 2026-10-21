/* Solar estimate math, ported from the original report.php / ajax.php logic with editable assumptions. */
(function(){
var KEY='cm-solar-site';
var DEF={state:'',zip:'',kwhMonthly:'',kwhDaily:'',bill:160,utility:'',roof:'',shade:'',pitch:'',time:'',name:'',
  rate:0.19,sun:5,costW:3,panelW:400,inc:0,esc:3,apr:8,term:20};
var SHADE={none:1,partFix:0.9,part:0.8,severe:0.65}, PITCH={flat:0.9,slight:0.97,medium:1,steep:0.95};
var LOSS=0.14, DEG=0.005, GROUND=2000, YEARS=25;
function load(){try{var s=JSON.parse(localStorage.getItem(KEY)||'null');if(s&&s.answers)return s}catch(e){}return null}
function save(a){var o={answers:a,created:Date.now()};try{localStorage.setItem(KEY,JSON.stringify(o))}catch(e){}return o}
function n(v){v=parseFloat(v);return isFinite(v)&&v>=0?v:0}
function compute(a){
  var rate=n(a.rate),sun=n(a.sun),bill=n(a.bill),usage,src;
  if(n(a.kwhMonthly)>0){usage=n(a.kwhMonthly);src='from'}else if(n(a.kwhDaily)>0){usage=n(a.kwhDaily)*30.4;src='from'}else{usage=rate>0?bill/rate:0;src='bill'}
  var f=(SHADE[a.shade]||1)*(PITCH[a.pitch]||1);
  var perKw=sun*365*(1-LOSS)*f;                       /* kWh per kW per year */
  var needKw=perKw>0?usage*12/perKw:0;
  var pw=n(a.panelW)||400, panels=Math.max(1,Math.ceil(needKw*1000/pw)), kw=panels*pw/1000;
  var prod=kw*perKw, ground=a.roof==='ground'?GROUND:0;
  var cost=kw*1000*n(a.costW)+ground, inc=cost*n(a.inc)/100, net=cost-inc;
  var esc=n(a.esc)/100, use12=usage*12, rows=[], cumBill=0, cumSave=0, payback=null;
  for(var y=1;y<=YEARS;y++){
    var r=rate*Math.pow(1+esc,y-1), p=prod*Math.pow(1-DEG,y-1);
    var billY=use12*r, saveY=Math.min(p,use12)*r;
    cumBill+=billY; cumSave+=saveY;
    if(payback===null&&cumSave>=net){var prev=cumSave-saveY;payback=y-1+(net-prev)/saveY}
    rows.push({y:y,bill:billY,save:saveY,cumBill:cumBill,cumSolar:net+(cumBill-cumSave),net:cumSave-net});
  }
  var mr=n(a.apr)/1200, nm=Math.round(n(a.term)*12)||1;
  var loan=mr>0?net*mr/(1-Math.pow(1+mr,-nm)):net/nm;
  return {usage:usage,usageSrc:src,factor:f,kw:kw,panels:panels,panelW:pw,prod:prod,ground:ground,cost:cost,inc:inc,net:net,
    save1:rows[0].save,payback:payback,s10:rows[9].net,s25:rows[24].net,loan:loan,bill:bill,offset:use12>0?Math.min(1,prod/use12):0,rows:rows};
}
window.SolarCore={KEY:KEY,DEF:DEF,load:load,save:save,compute:compute,LOSS:LOSS,DEG:DEG,GROUND:GROUND};
})();
