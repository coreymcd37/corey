(function(){
var I=SolarI18N,C=SolarCore;
function e(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
function kpi(k,v,hi){return '<div class="kpi'+(hi?' hi':'')+'"><span>'+I.t(k)+'</span><strong>'+v+'</strong></div>'}
function stateName(c){var s=(window.SOLAR_DATA.states||[]).find(function(x){return x[0]===c});return s?s[1]:c}
function chart(r){var W=720,H=260,P=40,max=Math.max.apply(null,r.rows.map(function(x){return Math.max(x.cumBill,x.cumSolar)}))||1;
  var bw=(W-P-10)/r.rows.length, out='';
  for(var g=0;g<=4;g++){var y=H-24-(H-44)*g/4;out+='<line x1="'+P+'" x2="'+W+'" y1="'+y+'" y2="'+y+'" stroke="#272b40"/><text x="'+(P-6)+'" y="'+(y+4)+'" fill="#a3a9c2" font-size="11" text-anchor="end">'+e(I.money(max*g/4/1000))+'k</text>'}
  r.rows.forEach(function(x,i){var x0=P+4+i*bw,h1=(H-44)*x.cumBill/max,h2=(H-44)*Math.max(0,x.cumSolar)/max;
    out+='<rect x="'+x0+'" y="'+(H-24-h1)+'" width="'+(bw*.42)+'" height="'+h1+'" fill="#f87171"><title>'+e(I.t('rep.chart.year',{n:x.y})+': '+I.money(x.cumBill))+'</title></rect>';
    out+='<rect x="'+(x0+bw*.45)+'" y="'+(H-24-h2)+'" width="'+(bw*.42)+'" height="'+h2+'" fill="#fbbf24"><title>'+e(I.t('rep.chart.year',{n:x.y})+': '+I.money(x.cumSolar))+'</title></rect>';
    if(x.y%5===0||x.y===1)out+='<text x="'+(x0+bw*.45)+'" y="'+(H-8)+'" fill="#a3a9c2" font-size="11" text-anchor="middle">'+x.y+'</text>'});
  return '<svg class="chart" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+e(I.t('rep.chart.h'))+'">'+out+'</svg>'}
function render(){var root=document.getElementById('rep'),s=C.load();
  if(!s){root.innerHTML='<div class="panel"><p>'+I.t('rep.none')+'</p><p><a class="btn btn-p" href="../calculator/">'+I.t('rep.go')+'</a></p></div>';return}
  var a=s.answers,r=C.compute(a),T=I.t;
  var who=a.name?T('rep.for',{name:e(a.name)}):T('rep.forAnon');
  var pay=r.payback==null?T('u.never'):T('u.yr',{v:I.num(r.payback,1)});
  var rows=[1,5,10,15,20,25].map(function(y){var x=r.rows[y-1];return '<tr><td>'+y+'</td><td>'+I.money(x.bill)+'</td><td>'+I.money(x.save)+'</td><td>'+I.money(x.net)+'</td></tr>'}).join('');
  var loc=stateName(a.state)+(a.zip?' '+e(a.zip):'');
  root.innerHTML=
  '<p class="kicker">'+who+' · '+T('rep.date',{date:I.date(s.created)})+'</p>'+
  '<div class="kpis">'+kpi('k.size',T('u.kw',{v:I.num(r.kw,1)}),1)+kpi('k.panels',T('u.panels',{v:r.panels,w:r.panelW}))+kpi('k.prod',T('u.kwh',{v:I.num(r.prod)}))+kpi('k.offset',I.num(r.offset*100)+'%')+
   kpi('k.cost',I.money(r.cost))+kpi('k.inc',I.money(r.inc))+kpi('k.net',I.money(r.net),1)+kpi('k.save1',I.money(r.save1),1)+
   kpi('k.payback',pay)+kpi('k.s10',I.money(r.s10))+kpi('k.s25',I.money(r.s25),1)+kpi('k.loan',T('u.mo',{v:I.money(r.loan)}))+kpi('k.bill',T('u.mo',{v:I.money(r.bill)}))+'</div>'+
  '<section class="panel" style="margin-top:18px"><h2>'+T('rep.chart.h')+'</h2>'+chart(r)+'<div class="legend"><span><i style="background:#f87171"></i>'+T('rep.chart.a')+'</span><span><i style="background:#fbbf24"></i>'+T('rep.chart.b')+'</span></div></section>'+
  '<section class="panel" style="margin-top:18px"><h2>'+T('rep.tbl.h')+'</h2><div class="tscroll"><table class="tbl"><thead><tr><th>'+T('rep.tbl.y')+'</th><th>'+T('rep.tbl.bill')+'</th><th>'+T('rep.tbl.save')+'</th><th>'+T('rep.tbl.cum')+'</th></tr></thead><tbody>'+rows+'</tbody></table></div></section>'+
  '<div class="grid" style="margin-top:18px"><section class="panel"><h2>'+T('rep.home.h')+'</h2><dl class="kv">'+
   '<dt>'+T('rep.loc')+'</dt><dd>'+e(loc)+'</dd><dt>'+T('rep.util')+'</dt><dd>'+(a.utility?e(a.utility):T('s4.other'))+'</dd>'+
   '<dt>'+T('rep.roof')+'</dt><dd>'+e(T('roof.'+a.roof))+'</dd><dt>'+T('rep.shade')+'</dt><dd>'+e(T('shade.'+a.shade))+'</dd><dt>'+T('rep.pitch')+'</dt><dd>'+e(T('pitch.'+a.pitch))+'</dd><dt>'+T('rep.time')+'</dt><dd>'+e(T('time.'+a.time))+'</dd>'+
   '<dt>'+T('rep.usage')+'</dt><dd>'+T(r.usageSrc==='from'?'rep.usage.from':'rep.usage.bill',{v:I.num(r.usage)})+'</dd></dl></section>'+
  '<section class="panel"><h2>'+T('rep.ass.h')+'</h2><dl class="kv">'+
   '<dt>'+T('rep.ass.rate')+'</dt><dd>'+T('rep.ass.rateV',{v:I.money(a.rate,2)})+'</dd><dt>'+T('rep.ass.sun')+'</dt><dd>'+T('rep.ass.sunV',{v:I.num(a.sun,1)})+'</dd>'+
   '<dt>'+T('rep.ass.cost')+'</dt><dd>'+T('rep.ass.perW',{v:I.money(a.costW,2)})+'</dd><dt>'+T('rep.ass.panel')+'</dt><dd>'+a.panelW+' W</dd>'+
   '<dt>'+T('rep.ass.inc')+'</dt><dd>'+(a.inc>0?T('rep.ass.pct',{v:I.num(a.inc,1)}):T('rep.ass.none'))+'</dd><dt>'+T('rep.ass.esc')+'</dt><dd>'+T('rep.ass.yr',{v:I.num(a.esc,1)})+'</dd>'+
   '<dt>'+T('rep.ass.loss')+'</dt><dd>'+T('rep.ass.lossV')+'</dd><dt>'+T('rep.ass.deg')+'</dt><dd>'+T('rep.ass.degV')+'</dd><dt>'+T('rep.ass.fact')+'</dt><dd>'+I.num(r.factor*100)+'%</dd>'+
   (r.ground?'<dt>'+T('rep.ass.ground')+'</dt><dd>'+I.money(r.ground)+'</dd>':'')+
   '<dt>'+T('rep.ass.loan')+'</dt><dd>'+T('rep.ass.loanV',{apr:I.num(a.apr,2),term:e(+a.term)})+'</dd></dl></section></div>'+
  '<section class="panel" style="margin-top:18px"><h2>'+T('rep.next.h')+'</h2><ul class="ck">'+[1,2,3,4,5].map(function(i){return '<li>'+T('rep.next.'+i)+'</li>'}).join('')+'</ul>'+
   '<p><a href="../quote/">'+T('rep.cta')+'</a></p></section>'+
  '<p class="note" style="margin-top:18px">'+T('rep.disc')+'</p>'+
  '<div class="acts" style="margin-top:18px"><a class="btn" href="../calculator/?step=9">'+T('rep.edit')+'</a><button class="btn btn-p" type="button" id="printBtn">'+T('rep.print')+'</button></div>';
  document.getElementById('printBtn').addEventListener('click',function(){print()});
}
document.addEventListener('DOMContentLoaded',function(){render();I.on(render)});
})();
