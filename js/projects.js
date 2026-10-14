(()=>{const c=document.querySelectorAll('.proj-card');if(!c.length)return;
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('is-live',e.isIntersecting&&!rm)),{rootMargin:'80px'});c.forEach(x=>io.observe(x))}
if(rm||!matchMedia('(hover:hover)').matches)return;
c.forEach(x=>{x.addEventListener('pointermove',e=>{const r=x.getBoundingClientRect();x.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*10+'deg');x.style.setProperty('--rx',(.5-(e.clientY-r.top)/r.height)*8+'deg')});x.addEventListener('pointerleave',()=>{x.style.setProperty('--rx','0deg');x.style.setProperty('--ry','0deg')})})})();
