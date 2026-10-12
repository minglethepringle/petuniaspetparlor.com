(function () {
    // Mobile nav
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("nav");
    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            var open = nav.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", String(open));
        });
    }

    // Footer year
    document.querySelectorAll("[data-year]").forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });

    // Scroll reveal
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: "0px 0px -8% 0px" });
        reveals.forEach(function (el) { io.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add("is-visible"); });
    }

    // Facebook feed: the page plugin renders at a fixed width, so size it to fit
    var feed = document.querySelector(".fb-feed iframe");
    if (feed) {
        var width = Math.max(180, Math.min(500, Math.floor(feed.parentNode.clientWidth)));
        if (width !== 500) {
            feed.width = width;
            feed.src = feed.src.replace("width=500", "width=" + width);
        }
    }
})();
