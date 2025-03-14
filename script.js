document.addEventListener("DOMContentLoaded", () => {
    let currentStep = 1;

    const next1 = document.getElementById("next1");
    const next2 = document.getElementById("next2");
    const submit = document.getElementById("submit");

    next1.addEventListener("click", () => {
        const teamName = document.getElementById("teamName").value;
        if (teamName.trim() === "") {
            document.getElementById("teamNameError").textContent = "Silakan isi nama tim.";
        } else {
            document.getElementById("step1").style.display = "none";
            document.getElementById("step2").style.display = "block";
        }
    });

    next2.addEventListener("click", () => {
        document.getElementById("step2").style.display = "none";
        document.getElementById("step3").style.display = "block";
    });

    submit.addEventListener("click", () => {
        alert("Pendaftaran berhasil! Data akan dikirim ke Discord.");
        document.getElementById("step3").style.display = "none";
        document.getElementById("thankYou").style.display = "block";

        // Kirim data ke Discord menggunakan Webhook
        sendToDiscord();
    });
});

function sendToDiscord() {
    const webhookURL = "DISCORD_WEBHOOK_URL"; // Ganti dengan Webhook kamu

    const teamName = document.getElementById("teamName").value;
    const teamLogo = document.getElementById("teamLogo").files[0];

    const formData = new FormData();
    formData.append("content", `Pendaftaran Baru: ${teamName}`);
    formData.append("file", teamLogo);

    fetch(webhookURL, {
        method: "POST",
        body: formData,
    }).then(response => {
        if (response.ok) {
            console.log("Data berhasil dikirim ke Discord!");
        } else {
            console.error("Gagal mengirim data ke Discord.");
        }
    });
}
