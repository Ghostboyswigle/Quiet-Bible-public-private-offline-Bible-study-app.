// Fake Android bridges injected before the app loads. "disk" is the native
// SharedPreferences file: it is handed from one launch to the next, while the
// web view's own localStorage is thrown away each time (a new browser context).
module.exports.bridges = (disk) => `
(function(){
  var disk = ${JSON.stringify(disk)};
  window.__nativeDisk = disk;
  function syncGet(p){ var x=new XMLHttpRequest(); x.open('GET','/'+p,false); x.send(null); return x.status===200?x.responseText:null; }
  window.QuietBibleNative   = { isNative: function(){ return true; } };
  window.QuietBibleAssets   = { read: function(p){ p=String(p).replace(/^\\//,''); return p.indexOf('bible/')===0 ? syncGet(p) : null; } };
  window.QuietBibleStorage  = {
    getItem: function(k){ return Object.prototype.hasOwnProperty.call(disk,k) ? disk[k] : null; },
    setItem: function(k,v){ disk[k]=String(v); }, commitItem: function(k,v){ disk[k]=String(v); },
    removeItem: function(k){ delete disk[k]; } };
  window.__spoken = []; var t=null;
  window.QuietBibleSpeech = { ready: function(){ return true; },
    speak: function(text,rate,id){ window.__spoken.push(id); clearTimeout(t);
      t=setTimeout(function(){ window.__onQbSpeechEnd && window.__onQbSpeechEnd(id); }, window.__verseMs||150); },
    stop: function(){ clearTimeout(t); t=null; } };
  window.QuietBibleTransport = { update: function(){}, stop: function(){}, theme: function(){} };
})();`;

module.exports.topVerse = () => {
  const vs=[...document.querySelectorAll('[id^="v-"]')]; if(!vs.length) return null;
  let sc=vs[0].parentElement; while(sc && !(sc.scrollHeight>sc.clientHeight && getComputedStyle(sc).overflowY!=='visible')) sc=sc.parentElement;
  const top=(sc?sc.getBoundingClientRect().top:0)+8;
  const v=vs.find(el=>el.getBoundingClientRect().bottom>top);
  return { verse: v?parseInt(v.id.slice(2),10):null, scrollTop: sc?sc.scrollTop:null,
           heading: (document.querySelector('h1')||{}).textContent };
};
