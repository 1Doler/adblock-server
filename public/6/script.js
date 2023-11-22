const dValue = 1;
function showMessage() {
    document.getElementById("ads").style.display = "none";
    document.getElementById("alt").style.display = "block";
}

const createBanner = () => {
    
    const banner = document.createElement("div");

    banner.style.height = dValue + "px";
    banner.style.width = dValue + "px";
    banner.style.opacity = dValue;
    banner.style.zIndex = dValue;
    banner.style.position = "absolute"

    const bannerStyle = window.getComputedStyle(banner);
    banner.id = "adriverAdBanner";
    document.body.append(banner);
    
    const classes = "content-list__ad-label ad banner adriver tracker analytics ads reklama ad-sidebar adsbox adblock-blocker";
    
    var observer = new MutationObserver(function() {
        const splitClasses = classes.split(" ");
        
        const intervalId = setInterval(() => {
            for (var i = 0; i < splitClasses.length; i++) {
                var styles = window.getComputedStyle(banner, "." + splitClasses[0]);
                if (styles.display === "none") {

                    showMessage();

                    clearInterval(intervalId);
                    clearTimeout(timerId);

                    break;
                }  

            }
        }, 100);

        const timerId = setTimeout(() => {
            clearInterval(intervalId);
            loadImage()
        }, 1000);

    });

    var config = { attributes: true };
    observer.observe(banner, config);

    banner.className = classes;
}
createBanner();

function loadImage() {
    var image = new Image();

    image.addEventListener("error", showMessage);
    image.addEventListener("load", () => {
        console.log("Блокировщик не обнаружен");
    })

    image.src = "https://ad-banner.onrender.com/img/?ev.adriver.ru";
    
    document.body.append(image);
}