var isRecording = false;
var selectedLanguage = 'en-US'; // Default language is English

function speechToTextConversion(language) {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    var recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.lang = language;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    var diagnostic = document.getElementById('text');
    var micImage = document.getElementById('playButton');
    var instruction = document.querySelector('.instruction');

    document.getElementById("playButton").onclick = function () {
        if (!isRecording) {
            micImage.src = "pic-2.png"; 
            instruction.textContent = "Recording..."; 
            recognition.start();
            isRecording = true;
        } else {
            micImage.src = "pic-1.png"; 
            instruction.textContent = "Click on the mic to start recording"; 
            recognition.stop();
            isRecording = false;
        }
    }

    recognition.onresult = function (event) {
        var last = event.results.length - 1;
        var convertedText = event.results[last][0].transcript;
        diagnostic.value = convertedText;
        console.log('Confidence: ' + event.results[0][0].confidence);
    }

    recognition.onnomatch = function (event) {
        diagnostic.value = 'I didn\'t recognise that.';
    }

    recognition.onerror = function (event) {
        diagnostic.value = 'Error occurred in recognition: ' + event.error;
    }
}

document.getElementById("englishBtn").addEventListener("click", function () {
    selectedLanguage = 'en-US';
    speechToTextConversion(selectedLanguage);
});

document.getElementById("bengaliBtn").addEventListener("click", function () {
    selectedLanguage = 'bn-BD';
    speechToTextConversion(selectedLanguage);
});

document.getElementById("hindiBtn").addEventListener("click", function () {
    selectedLanguage = 'hi-IN';
    speechToTextConversion(selectedLanguage);
});
speechToTextConversion(selectedLanguage);

