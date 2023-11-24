import AdblockDetector from "../src/adblock-detector";

const spanEl = document.getElementById("result");

new AdblockDetector().check().then((result) => {
    spanEl!.textContent = `Блокировщик${result ? "" : " не"} обнаружен`;
    spanEl!.style.color = result ? "red" : "green";
});
