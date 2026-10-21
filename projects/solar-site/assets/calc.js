(function(){
var I=SolarI18N,C=SolarCore,D=window.SOLAR_DATA;
var prev=C.load(), a=Object.assign({},C.DEF,prev?prev.answers:{}), cur=0;
var IMG='../img/';
function opts(name,list,img){return '<div class="choices" role="radiogroup">'+list.map(function(o){
  return '<label class="choice'+(img?'':' txt')+'"><input type="radio" name="'+name+'" value="'+o[0]+'"'+(a[name]===o[0]?' checked':'')+'>'+
  (img?'<img src="'+IMG+o[1]+'.webp" alt="" width="96" height="96" loading="lazy" decoding="async">':'')+'<span>'+I.t(o[2])+'</span></label>'}).join('')+'</div>'}
function fld(id,lab,val,extra,help){return '<label for="'+id+'">'+I.t(lab)+'<input id="'+id+'" name="'+id+'" inputmode="decimal" type="number" step="any" min="0" value="'+(val===''?'':val)+'"'+(extra||'')+'>'+(help?'<span class="help">'+I.t(help)+'</span>':'')+'</label>'}
var STEPS=[
 {t:'s1.t',r:function(){return '<div class="fields"><label for="state">'+I.t('s1.state')+'<select id="state" name="state"><option value="">'+I.t('s1.choose')+'</option>'+
   D.states.map(function(s){return '<option value="'+s[0]+'"'+(a.state===s[0]?' selected':'')+'>'+s[1]+'</option>'}).join('')+'</select></label>'+
   '<label for="zip">'+I.t('s1.zip')+'<input id="zip" name="zip" inputmode="numeric" autocomplete="postal-code" maxlength="5" value="'+a.zip+'"><span class="help">'+I.t('s1.zipHelp')+'</span></label></div>'},
  v:function(){a.state=val('state');a.zip=val('zip').trim();if(!a.state)return 'err.state';if(a.zip&&!/^\d{5}$/.test(a.zip))return 'err.zip'}},
 {t:'s2.t',r:function(){return '<p class="help">'+I.t('s2.help')+'</p><div class="fields">'+fld('kwhMonthly','s2.monthly',a.kwhMonthly)+fld('kwhDaily','s2.daily',a.kwhDaily)+'</div>'},
  v:function(){a.kwhMonthly=val('kwhMonthly');a.kwhDaily=val('kwhDaily');if(bad(a.kwhMonthly)||bad(a.kwhDaily))return 'err.num'}},
 {t:'s3.t',r:function(){return '<label for="bill">'+I.t('s3.label')+'<span class="big" id="billOut">'+I.money(+a.bill)+'</span><input id="bill" name="bill" type="range" min="20" max="1000" step="5" value="'+a.bill+'"></label>'},
  v:function(){a.bill=+val('bill');if(!(a.bill>0))return 'err.bill'},
  a:function(){var b=document.getElementById('bill');b.addEventListener('input',function(){document.getElementById('billOut').textContent=I.money(+b.value)})}},
 {t:'s4.t',r:function(){var u=(D.utilities[a.state]||[]);return '<p class="help">'+I.t('s4.help')+'</p><label for="utility">'+I.t('s4.label')+'<select id="utility" name="utility"><option value="">'+I.t('s4.other')+'</option>'+
   u.map(function(n){return '<option'+(a.utility===n?' selected':'')+'>'+n.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</option>'}).join('')+'</select></label>'},
  v:function(){a.utility=val('utility')}},
 {t:'s5.t',r:function(){return opts('roof',[['metal','roof-metal','roof.metal'],['shingles','roof-shingles','roof.shingles'],['concrete','roof-concrete','roof.concrete'],['clay','roof-clay','roof.clay'],['slate','roof-slate','roof.slate'],['flat','roof-flat','roof.flat'],['ground','roof-ground','roof.ground']],1)},v:function(){return pick('roof')}},
 {t:'s6.t',r:function(){return '<p class="help">'+I.t('s6.help')+'</p>'+opts('shade',[['none','shade-none','shade.none'],['partFix','shade-part-fix','shade.partFix'],['part','shade-part','shade.part'],['severe','shade-severe','shade.severe']],1)},v:function(){return pick('shade')}},
 {t:'s7.t',r:function(){return opts('pitch',[['flat','pitch-flat','pitch.flat'],['slight','pitch-slight','pitch.slight'],['medium','pitch-medium','pitch.medium'],['steep','pitch-steep','pitch.steep']],1)},v:function(){return pick('pitch')}},
 {t:'s8.t',r:function(){return opts('time',[['weeks','','time.weeks'],['months','','time.months'],['none','','time.none']],0)},v:function(){return pick('time')}},
 {t:'s9.t',r:function(){return '<p class="help">'+I.t('s9.help')+'</p><div class="fields"><label for="name">'+I.t('s9.name')+'<input id="name" name="name" autocomplete="name" maxlength="80" value="'+esc(a.name)+'"></label>'+
   fld('rate','s9.rate',a.rate,' step="0.01"')+fld('sun','s9.sun',a.sun,' step="0.1"','s9.sunHelp')+fld('costW','s9.cost',a.costW,' step="0.05"')+fld('panelW','s9.panel',a.panelW,' step="5"')+
   fld('inc','s9.inc',a.inc,' step="1" max="100"','s9.incHelp')+fld('esc','s9.esc',a.esc,' step="0.1"')+fld('apr','s9.apr',a.apr,' step="0.1"')+fld('term','s9.term',a.term,' step="1"')+'</div>'},
  v:function(){a.name=val('name').trim();['rate','sun','costW','panelW','inc','esc','apr','term'].forEach(function(k){a[k]=val(k)});
   if(['inc','esc','apr'].some(function(k){return bad(a[k])||a[k]===''}))return 'err.num';
   if(!(+a.rate>0))return 'err.rate';if(!(+a.sun>=1&&+a.sun<=10))return 'err.sun';if(!(+a.costW>0))return 'err.cost';if(!(+a.panelW>=100&&+a.panelW<=800))return 'err.panel';if(!(+a.term>=1&&+a.term<=30))return 'err.term';
   ['rate','sun','costW','panelW','inc','esc','apr','term'].forEach(function(k){a[k]=+a[k]})}}
];
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')}
function val(id){var e=document.getElementById(id);return e?e.value:''}
function bad(v){return v!==''&&!(parseFloat(v)>=0)}
function pick(n){var e=document.querySelector('input[name="'+n+'"]:checked');if(!e)return 'err.choice';a[n]=e.value}
var box,err,cnt,bar,back,next;
function render(){var s=STEPS[cur];
  box.innerHTML='<h2 id="stepH" tabindex="-1">'+I.t(s.t)+'</h2>'+s.r();if(s.a)s.a();
  cnt.textContent=I.t('calc.step',{n:cur+1,t:STEPS.length});bar.style.width=((cur+1)/STEPS.length*100)+'%';
  back.hidden=cur===0;next.textContent=I.t(cur===STEPS.length-1?'calc.finish':'calc.next');err.textContent=''}
function capture(){var s=STEPS[cur];var e=s.v();return e}
document.addEventListener('DOMContentLoaded',function(){
  box=document.getElementById('stepBox');err=document.getElementById('stepErr');cnt=document.getElementById('stepCount');bar=document.getElementById('progBar');back=document.getElementById('backBtn');next=document.getElementById('nextBtn');
  var q=new URLSearchParams(location.search);if(q.get('step'))cur=Math.min(STEPS.length-1,Math.max(0,(+q.get('step')||1)-1));
  next.addEventListener('click',function(){var e=capture();if(e){err.textContent=I.t(e);return}
    if(cur<STEPS.length-1){cur++;render();document.getElementById('stepH').focus({preventScroll:true});scrollTo({top:0})}
    else{C.save(a);location.href='../report/'}});
  back.addEventListener('click',function(){STEPS[cur].v();if(cur>0){cur--;render()}});
  document.getElementById('resetBtn').addEventListener('click',function(){a=Object.assign({},C.DEF);cur=0;render()});
  I.on(function(){var e=err.textContent;STEPS[cur].v();render()});
  render()});
})();
