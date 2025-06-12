// Wait for the DOM to load
window.addEventListener("DOMContentLoaded", () => {
    // Get DOM elements
    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");
    const question = document.getElementById("question");
    const noAudio = document.getElementById("noAudio");

    // Questions and button texts
    const questions = [
        "sure naka boss?",
        "SURE NAJUD?:(",
        "LOOY KAAYO KO ANI:(",
        "SURE BA??"
    ];
    const noButtonLoopTexts = [
        "Di lagi ko",
        "Wakoy pake diko",
        "DI LAGI",
        "SURE KONG DILI NAKO"
    ];

    // State variables
    let questionIdx = 0;
    let noTextIdx = 0;
    let noClickCount = 0;
    let grow = true;
    const fontSizeStep = 50; // Change this value to control the amount of increase/decrease
    const minFontSize = 18;

    // Handle 'No' button click (change question, button text, play sound, grow Yes button only)
    noButton.addEventListener("click", () => {
        noClickCount++;
        // Get current font size
        let currentFontSize = parseInt(window.getComputedStyle(yesButton).fontSize);
        // Only grow the Yes button
        yesButton.style.fontSize = `${currentFontSize + fontSizeStep}px`;
        // Cycle through questions
        questionIdx = (questionIdx + 1) % questions.length;
        question.textContent = questions[questionIdx];
        // Cycle through No button texts
        noButton.textContent = noButtonLoopTexts[noTextIdx];
        noTextIdx = (noTextIdx + 1) % noButtonLoopTexts.length;
        // Play sound
        if (noAudio) {
            noAudio.currentTime = 0;
            noAudio.play();
        }
    });

    // Handle 'No' button movement (avoid Yes button)
    noButton.addEventListener("click", function () {
        const container = document.querySelector(".container");
        const yesBtn = document.getElementById("yesButton");
        const nRect = container.getBoundingClientRect();
        const yRect = yesBtn.getBoundingClientRect();
        const btnWidth = this.offsetWidth;
        const btnHeight = this.offsetHeight;
        const maxX = nRect.width - btnWidth;
        const maxY = nRect.height - btnHeight;
        let tries = 0;
        let a, c, overlap;
        do {
            a = Math.floor(Math.random() * maxX);
            c = Math.floor(Math.random() * maxY);
            const noBtnRect = {
                left: nRect.left + a,
                top: nRect.top + c,
                right: nRect.left + a + btnWidth,
                bottom: nRect.top + c + btnHeight
            };
            const yesBtnRect = yesBtn.getBoundingClientRect();
            overlap = !(
                noBtnRect.right < yesBtnRect.left ||
                noBtnRect.left > yesBtnRect.right ||
                noBtnRect.bottom < yesBtnRect.top ||
                noBtnRect.top > yesBtnRect.bottom
            );
            tries++;
        } while (overlap && tries < 100);
        this.style.position = "absolute";
        this.style.left = `${a}px`;
        this.style.top = `${c}px`;
    });

    // Handle 'Yes' button click (go to thank you page)
    yesButton.addEventListener("click", () => {
        window.location.href = "thankyou.html";
    });
});