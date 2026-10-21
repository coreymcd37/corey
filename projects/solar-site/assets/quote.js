(function(){
var I=SolarI18N,C=SolarCore,KEY='cm-solar-quote';
function form(){return document.getElementById('qform')}
function restore(){var d;try{d=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){d={}}var f=form();
  Object.keys(d).forEach(function(k){var els=f.querySelectorAll('[name="'+k+'"]');els.forEach(function(el){if(el.type==='checkbox'||el.type==='radio')el.checked=[].concat(d[k]).indexOf(el.value)>-1;else el.value=d[k]})})}
function collect(){var f=form(),d={};new FormData(f).forEach(function(v,k){if(k in d)d[k]=[].concat(d[k],v);else d[k]=v});return d}
function summary(){var d=collect(),T=I.t,L=[T('quote.summary'),''];
  [['first','f.first'],['last','f.last'],['email','f.email'],['phone','f.phone'],['zip','f.zip'],['bill','f.bill']].forEach(function(x){if(d[x[0]])L.push(T(x[1])+': '+d[x[0]])});
  var need=[].concat(d.need||[]);if(need.length)L.push(T('f.need').replace(/\s*\(.*\)/,'')+': '+need.map(function(n){return T('need.'+n)}).join(', '));
  if(d.contact)L.push(T('f.contact')+': '+T('f.c.'+d.contact));if(d.notes)L.push(T('f.notes')+': '+d.notes);
  if(d.attach){var s=C.load();if(s){var r=C.compute(s.answers);L.push('',T('rep.h1')+' ('+I.date(s.created)+')',T('k.size')+': '+T('u.kw',{v:I.num(r.kw,1)}),T('k.panels')+': '+T('u.panels',{v:r.panels,w:r.panelW}),T('k.prod')+': '+T('u.kwh',{v:I.num(r.prod)}),T('k.net')+': '+I.money(r.net),T('k.save1')+': '+I.money(r.save1),'',T('rep.disc'))}else L.push('',T('quote.noest'))}
  return L.join('\n')}
document.addEventListener('DOMContentLoaded',function(){var f=form(),out=document.getElementById('qout'),st=document.getElementById('qstatus');
  restore();
  f.addEventListener('input',function(){try{localStorage.setItem(KEY,JSON.stringify(collect()))}catch(e){}});
  f.addEventListener('submit',function(ev){ev.preventDefault();if(!f.reportValidity())return;var t=summary();out.textContent=t;out.hidden=false;
    (navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(t):Promise.reject()).then(function(){st.textContent=I.t('quote.copied')},function(){st.textContent=I.t('quote.copyFail')})});
  document.getElementById('qclear').addEventListener('click',function(){f.reset();try{localStorage.removeItem(KEY)}catch(e){}out.hidden=true;st.textContent=''});
  I.on(function(){if(!out.hidden)out.textContent=summary();st.textContent=''})});
})();
