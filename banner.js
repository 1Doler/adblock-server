const createBanner = () => {
    const banner = document.createElement("img");
    banner.className = "banner ad adriver";
    banner.src = "https://ad-banner.onrender.com/?ev.adriver.ru";

    document.body.append(banner);
};

createBanner();
