/* ===== CONFIG ===== */
const CONFIG = {
    name: "LUXORA",
    address: "REPLACE: Street, City, PIN",
    hours: "Daily 9:00 AM – 11:00 PM",
    phone: "+91XXXXXXXXXX",
    email: "hello@REPLACE.com",
    instagram: "https://instagram.com/REPLACE",
    map: "https://www.google.com/maps/search/?api=1&query=REPLACE"
};

/* IMAGES */
const A = f => "assets/" + f;

/* MENU DATA */
const CATS = {
    "Hot Coffee": [
        "Espresso:Dark, syrupy single shot:150:menu-espresso.jpg",
        "Cinnamon Cream Coffee:A hot cup under a swirl of whipped cream and cinnamon:240:sig-cinnamon-cream.jpg",
        "Cocoa Cream Espresso:Espresso under a cloud of cream, dusted with cocoa:220:sig-cocoa-espresso.jpg"
    ],
    "Cold Coffee": [
        "Iced Cinnamon Coffee:Chilled coffee dusted with cinnamon:240:menu-iced-cinnamon.jpg",
        "S'mores Frappe:Iced coffee with toasted marshmallow and chocolate drizzle:320:sig-smores-frappe.jpg"
    ],
    "Special Coffee": [
        "Chocolate Affogato:Ice cream melting into rich coffee with chocolate sauce:280:sig-affogato.jpg"
    ],
    "Desserts": [
        "Caramel Berry Waffle:Waffles, ice cream, berries and caramel:260:menu-waffle.jpg"
    ],
    "Bakery": [
        "Chocolate Croissant:Buttery and flaky, served with chai:190:menu-croissant.jpg"
    ],
    "Snacks": [
        "White Sauce Penne Pasta:Creamy white sauce with olives and veggies:280:menu-pasta-white.jpg",
        "Pink Sauce Penne Pasta:Tomato-cream sauce with olives:290:menu-pasta-pink.jpg",
        "Veg Grilled Sandwich:Grilled bread with fresh vegetables and cheese:200:menu-sandwich.jpg"
    ],
    "Special Combos": [
        "Pasta and Shakes Combo:Rosé pasta, garlic bread and two chocolate shakes:520:menu-combo-pasta-shakes.jpg"
    ]
};

/* ALL MENU ITEMS */
const CATS_ALL = {
    "All Items": Object.values(CATS).flat(),
    ...CATS
};

/* SPECIAL ITEMS */
const SPEC = [
    ["S'mores Frappe", "Iced coffee crowned with toasted marshmallow and chocolate drizzle, served with a S'mores cookie.", "sig-smores-frappe.jpg"],
    ["Cinnamon Cream Coffee", "A hot cup under a swirl of whipped cream and cinnamon.", "sig-cinnamon-cream.jpg"],
    ["Chocolate Affogato", "Ice cream melting into rich coffee with chocolate sauce.", "sig-affogato.jpg"],
    ["Cocoa Cream Espresso", "Espresso under a cloud of cream, dusted with cocoa.", "sig-cocoa-espresso.jpg"]
];

/* GALLERY */
const GALL = [
    ["gal-rooftop-night.jpg", "Rooftop seating under string lights at night", 1600, 1080],
    ["gal-coffee-corner.jpg", "Coffee corner with espresso machine and pour-over setup", 1278, 1600],
    ["gal-moments-collage.jpg", "Café moments: croissants, latte and window reflections", 819, 1024],
    ["gal-barista.jpg", "Barista pouring milk into a cup", 612, 408],
    ["gal-cheers.jpg", "Two coffees clinking cheers", 612, 408]
];

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const RED = matchMedia("(prefers-reduced-motion:reduce)").matches;
const TOUCH = matchMedia("(hover:none)").matches;

/* HERO TITLE */
$("#h1").innerHTML = [..."LUXORA"]
    .map(c => `<span>${c}</span>`)
    .join("");

/* SPECIAL ITEMS */
$("#strip").innerHTML = SPEC.map(s => `
    <article class="sc">
        <div class="art">
            <img src="${A(s[2])}" alt="${s[0]}" width="800" height="1000" loading="lazy">
        </div>
        <h3>${s[0]}</h3>
        <p>${s[1]}</p>
    </article>
`).join("");

/* GALLERY */
$("#mas").innerHTML = GALL.map((g, i) => `
    <button data-i="${i}" aria-label="Open photo: ${g[1]}">
        <img src="${A(g[0])}" alt="${g[1]}" width="${g[2]}" height="${g[3]}" loading="lazy">
    </button>
`).join("");

const GAL = GALL.map(g => ({
    s: A(g[0]),
    a: g[1]
}));

/* MENU */
let cat = "All Items";
const mt = $("#mt");

$("#tabs").innerHTML = Object.keys(CATS_ALL)
    .map(c => `<button class="tab ${c == cat ? "on" : ""}" role="tab">${c}</button>`)
    .join("");

function renderMenu() {

    mt.innerHTML = CATS_ALL[cat].map(s => {

        const [n, d, p, f] = s.split(":");

        return `
            <article class="card${f ? "" : " np"}"
                tabindex="0"
                aria-label="${n}, ₹${p}">

                ${f
                    ? `<img src="${A(f)}" alt="${n}" width="600" height="800" loading="lazy">`
                    : `<span class="mono" aria-hidden="true">${n[0]}</span>`
                }

                <div class="in">
                    <h3>${n}</h3>
                    <span class="p">₹${p}</span>
                    <p class="d">${d}</p>
                </div>

            </article>
        `;

    }).join("");

    mt.scrollLeft = 0;
    prog();

    if (window.gsap && !RED) {
        gsap.from(".card", {
            y: 40,
            opacity: 0,
            stagger: 0.08,
            duration: 0.6
        });
    }
}

/* MENU CATEGORY TABS */
$("#tabs").onclick = e => {

    if (e.target.matches(".tab")) {

        cat = e.target.textContent;

        $$(".tab").forEach(t => {
            t.classList.toggle("on", t == e.target);
        });

        renderMenu();
    }
};

/* MENU PROGRESS */
const prog = () => {

    $("#mb").style.width =
        (mt.scrollWidth > mt.clientWidth
            ? (mt.scrollLeft + mt.clientWidth) / mt.scrollWidth * 100
            : 100) + "%";

};

mt.onscroll = prog;

$("#mp").onclick = () => {
    mt.scrollBy({
        left: -280,
        behavior: "smooth"
    });
};

$("#mn").onclick = () => {
    mt.scrollBy({
        left: 280,
        behavior: "smooth"
    });
};

/* MENU DRAG SCROLL */
let dg = 0, dx = 0, ds = 0;

mt.onpointerdown = e => {

    if (e.pointerType == "mouse") {
        dg = 1;
        dx = e.clientX;
        ds = mt.scrollLeft;
    }

};

addEventListener("pointerup", () => {
    dg = 0;
    mt.style.scrollSnapType = "";
});

mt.onpointermove = e => {

    if (dg) {
        mt.style.scrollSnapType = "none";
        mt.scrollLeft = ds - (e.clientX - dx);
    }

};

/* MOUSE WHEEL TO HORIZONTAL MENU SCROLL */
mt.addEventListener("wheel", e => {

    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {

        const end = e.deltaY > 0
            ? mt.scrollLeft + mt.clientWidth >= mt.scrollWidth - 2
            : mt.scrollLeft <= 0;

        if (!end) {
            e.preventDefault();
            mt.scrollLeft += e.deltaY;
        }

    }

}, { passive: false });

/* CARD TILT EFFECT */
if (!TOUCH && !RED) {

    document.addEventListener("pointermove", e => {

        const c = e.target.closest &&
            e.target.closest(".card,.sc .art");

        $$(".card,.sc .art").forEach(k => {
            if (k != c) k.style.transform = "";
        });

        if (c) {

            const r = c.getBoundingClientRect();

            c.style.transform = `
                perspective(700px)
                rotateY(${((e.clientX - r.left) / r.width - 0.5) * 14}deg)
                rotateX(${-((e.clientY - r.top) / r.height - 0.5) * 14}deg)
            `;

        }

    });

}

renderMenu();

/* LIGHTBOX */
let gi = 0, lf;

const show = i => {

    gi = (i + GAL.length) % GAL.length;

    $("#li").onerror = () => {
        $("#li").onerror = null;
        $("#li").src = GAL[gi].s;
    };

    $("#li").src = GAL[gi].s;
    $("#li").alt = GAL[gi].a;

};

$("#mas").onclick = e => {

    const b = e.target.closest("button");

    if (b) {
        lf = b;
        show(+b.dataset.i);
        $("#lb").hidden = false;
        $("#lx").focus();
    }

};

const close = () => {
    $("#lb").hidden = true;
    lf && lf.focus();
};

$("#lx").onclick = close;
$("#lp").onclick = () => show(gi - 1);
$("#ln").onclick = () => show(gi + 1);

addEventListener("keydown", e => {

    if ($("#lb").hidden) return;

    if (e.key == "Escape") close();
    if (e.key == "ArrowLeft") show(gi - 1);
    if (e.key == "ArrowRight") show(gi + 1);

    if (e.key == "Tab") {

        const f = $$("#lb button");
        const a = f[0];
        const z = f[f.length - 1];

        if (e.shiftKey && document.activeElement == a) {
            e.preventDefault();
            z.focus();
        } else if (!e.shiftKey && document.activeElement == z) {
            e.preventDefault();
            a.focus();
        }

    }

});

/* FOOTER */
$("#f1").innerHTML = `
    <p>${CONFIG.address}</p>
    <p>${CONFIG.hours}</p>
    <a href="${CONFIG.map}" target="_blank" rel="noopener">Google Maps location</a>
`;

$("#f2").innerHTML = `
    <a href="tel:${CONFIG.phone}">${CONFIG.phone}</a>
    <a href="mailto:${CONFIG.email}">${CONFIG.email}</a>
    <a href="${CONFIG.instagram}" target="_blank" rel="noopener">Instagram</a>
`;

$("#yr").textContent = new Date().getFullYear();

/* CUSTOM CURSOR */
if (!TOUCH) {

    const c = $("#cur");

    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let cx = x;
    let cy = y;

    addEventListener("pointermove", e => {

        x = e.clientX;
        y = e.clientY;

        const t = e.target.closest
            ? e.target.closest("a,button,.card,.tab,input")
            : null;

        c.classList.toggle(
            "h",
            !!t && !e.target.closest(".masonry")
        );

        const g = e.target.closest &&
            e.target.closest(".masonry button");

        c.classList.toggle("v", !!g);

        $("#curT").textContent = g ? "VIEW" : "";

    });

    (function f() {

        cx += (x - cx) * 0.18;
        cy += (y - cy) * 0.18;

        c.style.transform = `translate(${cx}px,${cy}px)`;

        requestAnimationFrame(f);

    })();

}

/* ==========================================
   GSAP + LENIS SMOOTH SCROLL
========================================== */

if (window.gsap && window.ScrollTrigger && !RED) {

    gsap.registerPlugin(ScrollTrigger);

    let L = null;

    /* LENIS SMOOTH SCROLL - DESKTOP */
    if (window.Lenis && !TOUCH) {

        L = new Lenis({

            duration: 1.2,

            easing: t =>
                Math.min(1, 1.001 - Math.pow(2, -10 * t)),

            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
            infinite: false

        });

        L.on("scroll", ScrollTrigger.update);

        gsap.ticker.add(time => {
            L.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

    }

    /* HERO TITLE ANIMATION */
    gsap.from("#h1 span", {

        yPercent: 110,
        opacity: 0,
        rotateX: -80,
        stagger: 0.09,
        duration: 1.1,
        ease: "power4.out",
        delay: 0.3

    });

    gsap.from(".tag,.eyebrow", {

        opacity: 0,
        y: 20,
        delay: 1.3,
        duration: 1

    });

    /* SCROLL REVEAL */
    $$(".rv").forEach(e => {

        gsap.from(e, {

            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",

            scrollTrigger: {
                trigger: e,
                start: "top 88%"
            }

        });

    });

    /* IMAGE REVEAL */
    $$(".ir").forEach(e => {

        gsap.fromTo(

            e,

            {
                clipPath: "inset(0 0 100% 0)"
            },

            {
                clipPath: "inset(0 0 0% 0)",
                duration: 1.4,
                ease: "power3.inOut",

                scrollTrigger: {
                    trigger: e,
                    start: "top 85%"
                }

            }

        );

    });

    /* PARALLAX */
    $$("[data-d]").forEach(e => {

        gsap.to(e, {

            yPercent: +e.dataset.d,
            ease: "none",

            scrollTrigger: {
                trigger: e.parentElement,
                scrub: true,
                start: "top bottom",
                end: "bottom top"
            }

        });

    });

    /* GALLERY REVEAL */
    gsap.from("#mas button", {

        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,

        scrollTrigger: {
            trigger: "#mas",
            start: "top 85%"
        }

    });

    /* HORIZONTAL SPECIAL ITEMS SCROLL */
    ScrollTrigger.matchMedia({

        "(min-width:801px)": function () {

            const s = $("#strip");

            gsap.to(s, {

                x: () =>
                    -(s.scrollWidth - innerWidth + innerWidth * 0.12),

                ease: "none",

                scrollTrigger: {

                    trigger: ".pin",
                    pin: true,
                    scrub: 1,

                    end: () => "+=" + s.scrollWidth,

                    invalidateOnRefresh: true

                }

            });

        }

    });

    /* REFRESH AFTER PAGE LOAD */
    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });

}