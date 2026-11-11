/* ===== CONFIG: replace everything marked REPLACE ===== */
const CONFIG={name:"LUXORA",address:"REPLACE: Street, City, PIN",hours:"Daily 9:00 AM – 11:00 PM",phone:"+91XXXXXXXXXX",email:"hello@REPLACE.com",instagram:"https://instagram.com/REPLACE",map:"https://www.google.com/maps/search/?api=1&query=REPLACE"};
/* REAL PHOTOS: your uploaded images are in the assets folder. */
const A=f=>"assets/"+f;
/* MENU "Name:Description:Price(₹):photo". Descriptions and prices are SAMPLES. Items with no photo show a plain card. */
const CATS={"Hot Coffee":["Espresso:Dark, syrupy single shot:150:menu-espresso.jpg","Cappuccino:Velvet foam, double shot:220","Flat White:Silky microfoam:230","Caramel Latte:House caramel:250"],
"Cold Coffee":["Iced Cinnamon Coffee:Chilled coffee dusted with cinnamon:240:menu-iced-cinnamon.jpg","Cold Brew:Steeped 18 hours:260","Iced Latte:Smooth over ice:240","Coffee Tonic:Bright and sparkling:280"],
"Special Coffee":["Smoked Maple:Applewood smoke:360","Spanish Latte:Condensed milk:300","Hazelnut Latte:Roasted hazelnut:320","Gold Leaf Latte:Finished with edible gold:420"],
"Tea & Refreshments":["Saffron Chai:Kashmiri saffron:220","Jasmine Pearl:Hand-rolled tea:240","Peach Iced Tea:Fresh peach:210","Sparkling Lemonade:Mint and lime:190"],
"Milkshakes":["Belgian Chocolate:Dark and thick:290","Salted Caramel:Sea salt finish:290","Pistachio Dream:Roasted pistachio:320","Berry Velvet:Mixed berries:280"],
"Desserts":["Caramel Berry Waffle:Waffles, ice cream, berries and caramel:260:menu-waffle.jpg","Tiramisu:Espresso-soaked layers:340","Molten Lava Cake:Warm chocolate heart:320","Basque Cheesecake:Burnt top, creamy centre:330"],
"Bakery":["Chocolate Croissant:Buttery and flaky, served with chai:190:menu-croissant.jpg","Almond Danish:Frangipane:200","Sourdough Toast:Whipped butter and honey:190","Cinnamon Roll:Cream cheese glaze:210"],
"Snacks":["White Sauce Penne Pasta:Creamy white sauce with olives and veggies:280:menu-pasta-white.jpg","Pink Sauce Penne Pasta:Tomato-cream sauce with olives:290:menu-pasta-pink.jpg","Pasta with Garlic Bread:Penne in rosé sauce with toasted garlic bread:320:menu-pasta-garlic-bread.jpg","Veg Grilled Sandwich:Grilled bread with fresh vegetables and cheese:200:menu-sandwich.jpg","Truffle Fries:Parmesan and herbs:290","Burrata Toast:Tomato and basil:340"],
"Special Combos":["Pasta and Shakes Combo:Rosé pasta, garlic bread and two chocolate shakes:520:menu-combo-shakes.jpg","Mojito, Shake and Pasta Platter:Mint mojito, sprinkle shake and two pastas:640:menu-combo-platter.jpg","Morning Ritual:Latte and croissant:360","Afternoon Tea:Chai and two sweets:420"]};
const SPEC=[["S'mores Frappe","Iced coffee crowned with toasted marshmallow and chocolate drizzle, served with a S'mores cookie.","sig-smores-frappe.jpg"],["Cinnamon Cream Coffee","A hot cup under a swirl of whipped cream and cinnamon.","sig-cinnamon-cream.jpg"],["Chocolate Affogato","Ice cream melting into rich coffee with chocolate sauce.","sig-affogato.jpg"],["Cocoa Cream Espresso","Espresso under a cloud of cream, dusted with cocoa.","sig-cocoa-espresso.jpg"]];
const GALL=[["gal-interior-window.jpg", "Sunlit café interior with croissants and coffee", 720, 1280], ["gal-rooftop-night.jpg", "Rooftop seating under string lights at night", 1600, 1080], ["gal-moments-collage.jpg", "Café moments: croissants, latte and window reflections", 819, 1024], ["gal-barista.jpg", "Barista pouring milk into a cup", 612, 408], ["gal-cheers.jpg", "Two coffees clinking cheers", 612, 408]];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],RED=matchMedia("(prefers-reduced-motion:reduce)").matches,TOUCH=matchMedia("(hover:none)").matches;
$("#h1").innerHTML=[..."LUXORA"].map(c=>`<span>${c}</span>`).join("");
$("#strip").innerHTML=SPEC.map((s,i)=>`<article class="sc"><div class="art"><img src="${A(s[2])}" alt="${s[0]}" width="800" height="1000" loading="lazy"></div><h3>${s[0]}</h3><p>${s[1]}</p></article>`).join("");
$("#mas").innerHTML=GALL.map((g,i)=>`<button data-i="${i}" aria-label="Open photo: ${g[1]}"><img src="${A(g[0])}" alt="${g[1]}" width="${g[2]}" height="${g[3]}" loading="lazy"></button>`).join("");
const GAL=GALL.map(g=>({s:A(g[0]),a:g[1]}));
/* menu */
let cat="Hot Coffee";const mt=$("#mt");
$("#tabs").innerHTML=Object.keys(CATS).map(c=>`<button class="tab ${c==cat?"on":""}" role="tab">${c}</button>`).join("");
function renderMenu(){const k=Object.keys(CATS).indexOf(cat);mt.innerHTML=CATS[cat].map((s,i)=>{const[n,d,p,f]=s.split(":");return`<article class="card${f?"":" np"}" tabindex="0" aria-label="${n}, ₹${p}">${f?`<img src="${A(f)}" alt="${n}" width="600" height="800" loading="lazy">`:`<span class="mono" aria-hidden="true">${n[0]}</span>`}<div class="in"><h3>${n}</h3><span class="p">₹${p}</span><p class="d">${d}</p></div></article>`}).join("");mt.scrollLeft=0;prog();if(window.gsap&&!RED)gsap.from(".card",{y:40,opacity:0,stagger:.08,duration:.6})}
$("#tabs").onclick=e=>{if(e.target.matches(".tab")){cat=e.target.textContent;$$(".tab").forEach(t=>t.classList.toggle("on",t==e.target));renderMenu()}};
const prog=()=>$("#mb").style.width=(mt.scrollWidth>mt.clientWidth?(mt.scrollLeft+mt.clientWidth)/mt.scrollWidth*100:100)+"%";
mt.onscroll=prog;$("#mp").onclick=()=>mt.scrollBy({left:-280,behavior:"smooth"});$("#mn").onclick=()=>mt.scrollBy({left:280,behavior:"smooth"});
let dg=0,dx=0,ds=0;mt.onpointerdown=e=>{if(e.pointerType=="mouse"){dg=1;dx=e.clientX;ds=mt.scrollLeft}};addEventListener("pointerup",()=>{dg=0;mt.style.scrollSnapType=""});mt.onpointermove=e=>{if(dg){mt.style.scrollSnapType="none";mt.scrollLeft=ds-(e.clientX-dx)}};
mt.addEventListener("wheel",e=>{if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){const end=e.deltaY>0?mt.scrollLeft+mt.clientWidth>=mt.scrollWidth-2:mt.scrollLeft<=0;if(!end){e.preventDefault();mt.scrollLeft+=e.deltaY}}},{passive:false});
if(!TOUCH&&!RED)document.addEventListener("pointermove",e=>{const c=e.target.closest&&e.target.closest(".card,.sc .art");$$(".card,.sc .art").forEach(k=>{if(k!=c)k.style.transform=""});if(c){const r=c.getBoundingClientRect();c.style.transform=`perspective(700px) rotateY(${((e.clientX-r.left)/r.width-.5)*14}deg) rotateX(${-((e.clientY-r.top)/r.height-.5)*14}deg)`}});
renderMenu();
/* lightbox */
let gi=0,lf;const show=i=>{gi=(i+GAL.length)%GAL.length;$("#li").onerror=()=>{$("#li").onerror=null;$("#li").src=GAL[gi].f};$("#li").src=GAL[gi].s;$("#li").alt=GAL[gi].a};
$("#mas").onclick=e=>{const b=e.target.closest("button");if(b){lf=b;show(+b.dataset.i);$("#lb").hidden=false;$("#lx").focus()}};
const close=()=>{$("#lb").hidden=true;lf&&lf.focus()};$("#lx").onclick=close;$("#lp").onclick=()=>show(gi-1);$("#ln").onclick=()=>show(gi+1);
addEventListener("keydown",e=>{if($("#lb").hidden)return;if(e.key=="Escape")close();if(e.key=="ArrowLeft")show(gi-1);if(e.key=="ArrowRight")show(gi+1);if(e.key=="Tab"){const f=$$("#lb button");const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement==a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement==z){e.preventDefault();a.focus()}}});
/* footer */
$("#f1").innerHTML=`<p>${CONFIG.address}</p><p>${CONFIG.hours}</p><a href="${CONFIG.map}" target="_blank" rel="noopener">Google Maps location</a>`;
$("#f2").innerHTML=`<a href="tel:${CONFIG.phone}">${CONFIG.phone}</a><a href="mailto:${CONFIG.email}">${CONFIG.email}</a><a href="${CONFIG.instagram}" target="_blank" rel="noopener">Instagram</a>`;$("#yr").textContent=new Date().getFullYear();
/* cursor (desktop only) */
if(!TOUCH){const c=$("#cur");let x=innerWidth/2,y=innerHeight/2,cx=x,cy=y;addEventListener("pointermove",e=>{x=e.clientX;y=e.clientY;const t=e.target.closest?e.target.closest("a,button,.card,.tab,input"):0;c.classList.toggle("h",!!t&&!e.target.closest(".masonry"));const g=e.target.closest&&e.target.closest(".masonry button");c.classList.toggle("v",!!g);$("#curT").textContent=g?"VIEW":""});(function f(){cx+=(x-cx)*.18;cy+=(y-cy)*.18;c.style.transform=`translate(${cx}px,${cy}px)`;requestAnimationFrame(f)})()}
/* GSAP + smooth scroll */
if(window.gsap&&window.ScrollTrigger&&!RED){gsap.registerPlugin(ScrollTrigger);
if(window.Lenis&&!TOUCH){const L=new Lenis();L.on("scroll",ScrollTrigger.update);gsap.ticker.add(t=>L.raf(t*1000));gsap.ticker.lagSmoothing(0)}
gsap.from("#h1 span",{yPercent:110,opacity:0,rotateX:-80,stagger:.09,duration:1.1,ease:"power4.out",delay:.3});gsap.from(".tag,.eyebrow",{opacity:0,y:20,delay:1.3,duration:1});
$$(".rv").forEach(e=>gsap.from(e,{y:50,opacity:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:e,start:"top 88%"}}));
$$(".ir").forEach(e=>gsap.fromTo(e,{clipPath:"inset(0 0 100% 0)"},{clipPath:"inset(0 0 0% 0)",duration:1.4,ease:"power3.inOut",scrollTrigger:{trigger:e,start:"top 85%"}}));
$$("[data-d]").forEach(e=>gsap.to(e,{yPercent:+e.dataset.d,ease:"none",scrollTrigger:{trigger:e.parentElement,scrub:true,start:"top bottom",end:"bottom top"}}));
gsap.from("#mas button",{y:60,opacity:0,stagger:.1,duration:.9,scrollTrigger:{trigger:"#mas",start:"top 85%"}});
ScrollTrigger.matchMedia({"(min-width:801px) and (min-height:561px)":()=>{const s=$("#strip");gsap.to(s,{x:()=>-(s.scrollWidth-innerWidth+innerWidth*.12),ease:"none",scrollTrigger:{trigger:".pin",pin:true,scrub:1,end:()=>"+="+s.scrollWidth,invalidateOnRefresh:true}})}})}
/* 3D cup + beans + particles (Three.js), mouse-responsive, paused off-screen */
(function(){const hero=$(".hero");try{if(!window.THREE)throw 0;const r=new THREE.WebGLRenderer({canvas:$("#cv"),alpha:true,antialias:true});r.setPixelRatio(Math.min(devicePixelRatio,1.5));const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(40,1,.1,60);cam.position.set(0,1.6,8);
sc.add(new THREE.AmbientLight(0xffffff,.6));const L=new THREE.DirectionalLight(0xffd9a0,1.4);L.position.set(4,6,5);sc.add(L);
const M=(c,o={})=>new THREE.MeshStandardMaterial({color:c,roughness:.35,...o}),g=new THREE.Group();
g.add(new THREE.Mesh(new THREE.CylinderGeometry(1.2,.85,1.6,48,1,true),M(0xf4ead9,{side:2})));const cf=new THREE.Mesh(new THREE.CircleGeometry(1.12,48),M(0x3a2012));cf.rotation.x=-Math.PI/2;cf.position.y=.6;g.add(cf);
const h=new THREE.Mesh(new THREE.TorusGeometry(.5,.12,16,32),M(0xf4ead9));h.position.x=1.25;g.add(h);const sa=new THREE.Mesh(new THREE.CylinderGeometry(1.9,1.5,.15,48),M(0xd8b878,{metalness:.7}));sa.position.y=-.85;g.add(sa);sc.add(g);
const beans=[];for(let i=0;i<(innerWidth<800?14:28);i++){const b=new THREE.Mesh(new THREE.SphereGeometry(.14,12,10),M(0x4a2a18));b.scale.set(1,.65,.7);b.position.set((Math.random()-.5)*14,(Math.random()-.5)*7,(Math.random()-.5)*5-1);b.userData={s:Math.random()+.3,o:Math.random()*6};beans.push(b);sc.add(b)}
const size=()=>{const w=hero.clientWidth,hh=hero.clientHeight;r.setSize(w,hh,false);cam.aspect=w/hh;cam.updateProjectionMatrix();g.scale.setScalar(Math.min(1,w/700))};size();if(window.ResizeObserver)new ResizeObserver(size).observe(hero);else addEventListener("resize",size);
let mx=0,my=0,run=true,t0=Date.now();addEventListener("pointermove",e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
new IntersectionObserver(e=>{run=e[0].isIntersecting;if(run)loop()}).observe(hero);
function loop(){if(!run)return;const t=(Date.now()-t0)/1000,k=Math.min(t/1.6,1),e=1-Math.pow(1-k,3);g.position.y=-3+3*e+(RED?0:Math.sin(t)*.12);g.rotation.y=(RED?0:t*.35)+mx*1.2+(1-e)*6;g.rotation.x=my*.4;g.rotation.z=.12;
beans.forEach(b=>{if(!RED){b.position.y+=Math.sin(t*b.userData.s+b.userData.o)*.003;b.rotation.x+=.01*b.userData.s;b.rotation.y+=.012}});r.render(sc,cam);requestAnimationFrame(loop)}loop()}catch(e){hero.classList.add("nogl")}})();
