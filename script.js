/* Sin dependencias. Cada interacción está aislada y los datos viven en config.js. */
(() => {
'use strict';
const C = window.WEDDING_CONFIG;
const $ = id => document.getElementById(id);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const params = new URLSearchParams(location.search);
const guest = (params.get('invitado') || '').trim().slice(0,100);
const rawPasses = params.get('pases');
const passes = rawPasses && /^\d+$/.test(rawPasses) ? Math.min(C.maxPasses, Math.max(1, Number(rawPasses))) : C.defaultPasses;
// Los parámetros personalizan la presentación, no autentican una invitación.
if (guest) { $('guest-greeting').textContent = guest; $('guest-name').value = guest; }
if (guest || rawPasses) $('guest-passes').textContent = `Hemos reservado ${passes === 1 ? '1 lugar de honor para ti' : `${passes} lugares de honor para ustedes`}.`;
$('guest-count').replaceChildren(...Array.from({length:passes}, (_, i) => new Option(`${i+1} ${i ? 'personas' : 'persona'}`,String(i+1))));
$('guest-count').value = String(passes);
document.querySelectorAll('[data-photo]').forEach(img => {const source=C.photos[img.dataset.photo];if(source)img.src=source;});
for (const key of ['ceremony','reception']) {
 const place=C[key]; $(key+'-name').textContent=place.name; $(key+'-address').textContent=place.address;
 $(key+'-maps').href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(place.query);
 $(key+'-waze').href='https://waze.com/ul?q='+encodeURIComponent(place.query)+'&navigate=yes';
}
$('map').src='https://maps.google.com/maps?q='+encodeURIComponent(C.ceremony.query)+'&output=embed';
// Un pequeño nocturno original sintetizado; no depende de un enlace de audio externo.
let audioContext, master, sequenceTimer, isPlaying=false, audioFile;
const melody=[60,64,67,71,69,67,64,62,57,60,64,67,65,64,60,59,53,57,60,64,62,60,57,55,55,59,62,67,65,62,59,62];
function playPhrase(){
 const start=audioContext.currentTime+.05;
 melody.forEach((note,i)=>{
  const time=start+i*.75,osc=audioContext.createOscillator(),gain=audioContext.createGain();
  osc.type='sine';osc.frequency.value=440*Math.pow(2,(note-69)/12);
  gain.gain.setValueAtTime(0,time);gain.gain.linearRampToValueAtTime(.18,time+.025);gain.gain.exponentialRampToValueAtTime(.001,time+2.6);
  osc.connect(gain);gain.connect(master);osc.start(time);osc.stop(time+2.8);
 });
}
function updateSound(){ $('sound').classList.toggle('playing',isPlaying);$('sound').setAttribute('aria-pressed',String(isPlaying));$('sound').setAttribute('aria-label',isPlaying?'Pausar música':'Activar música'); }
async function toggleSound(){
 try{
  if(C.audio.url){audioFile ||= Object.assign(new Audio(C.audio.url),{loop:true,volume:C.audio.volume});if(isPlaying)audioFile.pause();else await audioFile.play();}
  else {
   if(!audioContext){audioContext=new (window.AudioContext||window.webkitAudioContext)();master=audioContext.createGain();master.gain.value=C.audio.volume;master.connect(audioContext.destination);playPhrase();sequenceTimer=setInterval(()=>{if(audioContext.state==='running')playPhrase();},24000);}
   if(isPlaying)await audioContext.suspend();else await audioContext.resume();
  }
  isPlaying=!isPlaying;updateSound();
 }catch{isPlaying=false;updateSound();$('sound').setAttribute('aria-label','Audio no disponible; toca para reintentar');}
}
$('sound').addEventListener('click',toggleSound);
// Apertura accesible: el contenido queda fuera del foco hasta terminar la animación.
document.body.classList.add('locked');$('site').inert=true;
$('open-invitation').addEventListener('click',()=>{
 $('open-invitation').disabled=true;$('welcome').classList.add('opening');toggleSound();
 setTimeout(()=>{$('welcome').classList.add('dismissed');$('site').inert=false;document.body.classList.remove('locked');$('inicio').setAttribute('tabindex','-1');$('inicio').focus({preventScroll:true});setTimeout(()=>$('welcome').hidden=true,850);},reduceMotion?0:1850);
});
$('open-invitation').focus({preventScroll:true});
if(!reduceMotion && 'IntersectionObserver' in window){
 document.documentElement.classList.add('js-motion');
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.1});
 document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
function updateCountdown(){
 const remaining=Math.max(0,new Date(C.date).getTime()-Date.now());const s=Math.floor(remaining/1000);
 const values=[Math.floor(s/86400),Math.floor(s/3600)%24,Math.floor(s/60)%60,s%60];
 ['days','hours','minutes','seconds'].forEach((id,i)=>$(id).textContent=String(values[i]).padStart(2,'0'));
 if(!remaining)$('countdown-note').textContent='El día llegó. Gracias por ser parte de nuestra historia.';
}
updateCountdown();setInterval(updateCountdown,1000);
if(!reduceMotion){let pending=false;addEventListener('scroll',()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{const el=document.querySelector('.photo-interlude'),r=el.getBoundingClientRect();if(r.bottom>0 && r.top<innerHeight)el.firstElementChild.style.transform=`translateY(${(r.top-innerHeight/2)*.08}px)`;pending=false;});},{passive:true});}
function icsDate(date){return new Date(date).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');}
function icsEscape(text){return text.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');}
$('calendar').addEventListener('click',()=>{
 const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Atelier//Wedding//ES','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:sofia-carlos-${icsDate(C.date)}@atelier.local`,`DTSTAMP:${icsDate(new Date())}`,`DTSTART:${icsDate(C.date)}`,`DTEND:${icsDate(C.endDate)}`,`SUMMARY:${icsEscape('Boda de '+C.couple)}`,`LOCATION:${icsEscape(C.ceremony.name+', '+C.ceremony.address)}`,`DESCRIPTION:${icsEscape('Ceremonia y celebración. Recepción: '+C.reception.name+'. '+C.reception.address)}`,'END:VEVENT','END:VCALENDAR'];
 const url=URL.createObjectURL(new Blob([lines.join('\r\n')+'\r\n'],{type:'text/calendar;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='Sofia-y-Carlos.ics';a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);
});
document.querySelectorAll('.swatches button').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.swatches button').forEach(b=>b.setAttribute('aria-pressed','false'));button.setAttribute('aria-pressed','true');$('color-name').textContent=button.dataset.color;}));
const gallery=[...document.querySelectorAll('.gallery-item')];let activePhoto=0;
function showPhoto(index){activePhoto=(index+gallery.length)%gallery.length;const image=gallery[activePhoto].querySelector('img');$('lightbox-image').src=image.src;$('lightbox-image').alt=image.alt;$('lightbox-caption').textContent=image.alt;}
gallery.forEach((button,i)=>button.addEventListener('click',()=>{showPhoto(i);$('lightbox').showModal();}));
$('close-lightbox').addEventListener('click',()=>$('lightbox').close());$('previous-photo').addEventListener('click',()=>showPhoto(activePhoto-1));$('next-photo').addEventListener('click',()=>showPhoto(activePhoto+1));
$('lightbox').addEventListener('keydown',e=>{if(e.key==='ArrowRight')showPhoto(activePhoto+1);if(e.key==='ArrowLeft')showPhoto(activePhoto-1);});
$('lightbox').addEventListener('click',e=>{if(e.target===$('lightbox'))$('lightbox').close();});
C.registries.forEach(registry=>{const valid=/^https:\/\//.test(registry.url);const element=document.createElement(valid?'a':'button');if(valid){element.href=registry.url;element.target='_blank';element.rel='noopener';}else{element.type='button';element.addEventListener('click',()=>{element.querySelector('small').textContent='LISTA DE DEMOSTRACIÓN · ENLACE PENDIENTE';});}const title=document.createElement('strong'),label=document.createElement('small');title.textContent=registry.name;label.textContent=registry.label+' ↗';element.append(title,label);$('gift-links').append(element);});
const validBank=/^\d{18}$/.test(C.bank.clabe);
$('bank-details').textContent=validBank?`${C.bank.name} · ${C.bank.holder}`:'Los datos bancarios se compartirán aquí cuando estén disponibles.';
$('clabe').textContent=validBank?C.bank.clabe:'— — —';$('copy-clabe').disabled=!validBank;
async function copyText(text){if(!navigator.clipboard)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(text);}
$('copy-clabe').addEventListener('click',async()=>{try{await copyText(C.bank.clabe);$('bank-status').textContent='¡Copiado con éxito!';}catch{$('bank-status').textContent='No se pudo copiar. Selecciona la CLABE y cópiala manualmente.';}});
document.querySelectorAll('[name=attendance]').forEach(input=>input.addEventListener('change',()=>{$('attending-fields').hidden=input.value==='no';}));
let preparedMessage='';
$('rsvp-form').addEventListener('submit',e=>{
 e.preventDefault();const name=$('guest-name').value.trim();if(!name){$('guest-name').setCustomValidity('Escribe tu nombre.');$('guest-name').reportValidity();return;}
 const attending=document.querySelector('[name=attendance]:checked').value==='yes';
 preparedMessage=`¡Hola, ${C.couple}!\n\nSoy ${name}.\n${attending?'Con mucho gusto les acompañaré.':'Lamento no poder acompañarles.'}`;
 if(attending){preparedMessage+=`\nAsistentes: ${$('guest-count').value} de ${passes} pases.\nAlimentación: ${$('diet').value}.`;if($('diet-details').value.trim())preparedMessage+='\nDetalles: '+$('diet-details').value.trim();}
 if($('message').value.trim())preparedMessage+='\n\n'+$('message').value.trim();
 if(/^\d{10,15}$/.test(C.whatsapp)){window.open('https://wa.me/'+C.whatsapp+'?text='+encodeURIComponent(preparedMessage),'_blank','noopener,noreferrer');$('form-status').textContent='Revisa y envía el mensaje en WhatsApp para completar tu confirmación.';}
 else{$('message-preview').textContent=preparedMessage;$('copy-message-status').textContent='';$('demo-dialog').showModal();}
});
$('guest-name').addEventListener('input',()=>$('guest-name').setCustomValidity(''));
$('close-demo').addEventListener('click',()=>$('demo-dialog').close());
$('copy-message').addEventListener('click',async()=>{try{await copyText(preparedMessage);$('copy-message-status').textContent='Mensaje copiado.';}catch{$('copy-message-status').textContent='Selecciona el texto de arriba para copiarlo manualmente.';}});
})();
