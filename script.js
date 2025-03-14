// script.js
let currentStep = 1;

function nextStep(step) {
    if (step === 1) {
        let teamName = document.getElementById("teamName").value;
        if (!teamName) {
            document.getElementById("teamError").style.display = "block";
            return;
        }
        document.getElementById("teamError").style.display = "none";
        document.getElementById("step1").style.display = "none";
        document.getElementById("step2").style.display = "block";
    } else if (step === 2) {
        let players = [
            document.getElementById("player1").value,
            document.getElementById("player2").value,
            document.getElementById("player3").value,
            document.getElementById("player4").value,
            document.getElementById("player5").value
        ];
        
        if (players.some(player => !player)) {
            document.getElementById("playersError").style.display = "block";
            return;
        }
        document.getElementById("playersError").style.display = "none";
        document.getElementById("step2").style.display = "none";
        document.getElementById("step3").style.display = "block";
    }
}

function submitForm() {
    let logo = document.getElementById("teamLogo").files[0];
    if (!logo) {
        document.getElementById("logoError").style.display = "block";
        return;
    }
    document.getElementById("logoError").style.display = "none";
    document.getElementById("step3").style.display = "none";
    document.getElementById("confirmation").style.display = "block";
    
    sendToDiscord();
}

function sendToDiscord() {
    const webhookURL = "YOUR_DISCORD_WEBHOOK_URL";
    let teamName = document.getElementById("teamName").value;
    let players = [];
    for (let i = 1; i <= 5; i++) {
        players.push(document.getElementById("player" + i).value);
    }
    
    let message = {
        content: "New team registered!",
        embeds: [{
            title: `Tim: ${teamName}`,
            description: `Anggota:\n${players.join("\n")}`,
            color: 3447003
        }]
    };
    
    fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message)
    });
}
