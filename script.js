const bubbles=[...document.querySelectorAll(".bubble")];
const caption=document.getElementById("activeCaption");
const cssSource=`.bubble-nav{display:flex;align-items:center;gap:14px}
.bubble{width:48px;height:48px;flex:0 0 48px;border-radius:999px;display:flex;align-items:center;gap:9px;overflow:hidden;transition:width .42s cubic-bezier(.2,.8,.2,1),background .35s,border-color .35s}
.bubble .label{opacity:0;max-width:0;transition:opacity .22s,max-width .4s}
.bubble.active{width:116px;flex-basis:116px;background:var(--tone);color:white;box-shadow:0 0 0 3px color-mix(in srgb,var(--tone) 22%,transparent)}
.bubble.active .label{opacity:1;max-width:75px}
.bubble.blue{--tone:#348bff}.bubble.purple{--tone:#a855f7}.bubble.green{--tone:#16c79a}.bubble.orange{--tone:#f59e0b}`;
function activate(item,keep=true){
  bubbles.forEach(b=>{b.classList.toggle("active",b===item);if(b===item&&keep)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current")});
  caption.textContent=item.dataset.label+" selected";
}
bubbles.forEach(item=>{
  item.addEventListener("click",()=>activate(item));
  item.addEventListener("mouseenter",()=>{bubbles.forEach(b=>b.classList.remove("active"));item.classList.add("active");caption.textContent=item.dataset.label+" preview"});
  item.addEventListener("mouseleave",()=>{const selected=bubbles.find(b=>b.getAttribute("aria-current")==="page")||bubbles[0];activate(selected)});
  item.addEventListener("focus",()=>{bubbles.forEach(b=>b.classList.remove("active"));item.classList.add("active")});
  item.addEventListener("blur",()=>{const selected=bubbles.find(b=>b.getAttribute("aria-current")==="page")||bubbles[0];activate(selected)});
});
document.getElementById("replay").addEventListener("click",()=>{
  const selected=bubbles.find(b=>b.getAttribute("aria-current")==="page")||bubbles[0];
  bubbles.forEach(b=>{b.classList.remove("active");b.style.transform="scale(.82)"});
  setTimeout(()=>{bubbles.forEach(b=>b.style.transform="");activate(selected)},180);
});
document.getElementById("copyCode").addEventListener("click",async()=>{
  const btn=document.getElementById("copyCode");
  try{await navigator.clipboard.writeText(cssSource);btn.textContent="Copied!";}catch{btn.textContent="Clipboard unavailable";}
  setTimeout(()=>btn.textContent="Copy CSS",1400);
});