(function () {
    function init() {
        document.querySelectorAll(".yourapp-embed").forEach(el => {
            const url = el.dataset.url;
            const allow = el.dataset.allow || "";
            const resize = el.dataset.resize !== "false";

            if (!url) return;

            const iframe = document.createElement("iframe");
            iframe.src = url;
            iframe.allow = allow;
            iframe.style.width = "100%";
            iframe.style.border = "none";
            iframe.style.minHeight = "400px";
            el.innerHTML = "";
            el.appendChild(iframe);

            if (resize) {
                window.addEventListener("message", e => {
                    if (e.data?.type === "EMBED_RESIZE") {
                        iframe.style.height = e.data.height + "px";
                    }
                });
            }
        });
    }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    window.YourAppEmbed = { load: init };
})();
