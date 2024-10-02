let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-IN"; // Setting default language to Hindi

    // Ensure voices are loaded before using them
    let voices = window.speechSynthesis.getVoices();
    let femaleVoice = voices.find(voice => voice.lang === "hi-IN" && voice.name.includes("Female"));

    if (femaleVoice) {
        text_speak.voice = femaleVoice;
    } else {
        // Fallback to any Hindi voice if specific female voice is not found
        let hindiVoice = voices.find(voice => voice.lang === "hi-IN");
        if (hindiVoice) {
            text_speak.voice = hindiVoice;
        }
    }

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good morning sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon sir");
    } else {
        speak("Good evening sir");
    }
}

// Uncomment to use the wishMe function on load
// window.addEventListener('load', () => {
//     wishMe();
// });

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

recognition.onerror = (event) => {
    console.error(event.error);
    btn.style.display = "block";
    voice.style.display = "none";
};

recognition.onend = () => {
    btn.style.display = "block";
    voice.style.display = "none";
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Purvi.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://www.facebook.com", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com", "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator");
        window.open("calculator://");
    } else if (message.includes("open whatsapp")) {
        speak("Opening whatsapp");
        window.open("https://www.whatsapp.com", "_blank");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(date);
    } else {
        let finalText = "This is what I found on the internet regarding " + message.replace("shifra", "").replace("shipra", "");
        speak(finalText);
        window.open(`https://www.bing.com/search?q=${message.replace("shipra", "")}`, "_blank");
    }
}

// Ensure voices are loaded before using them
window.speechSynthesis.onvoiceschanged = () => {
    let voices = window.speechSynthesis.getVoices();
    console.log(voices); // This will log the available voices to the console

    // Automatically call wishMe function once voices are loaded
    wishMe();
};
