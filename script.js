document.addEventListener("DOMContentLoaded", function () {
    const step1 = document.querySelector(".step-1");
    const step2 = document.querySelector(".step-2");
    const step3 = document.querySelector(".step-3");
    const step4 = document.querySelector(".step-4");

    const namaTim = document.getElementById("namaTim");
    const errorNamaTim = document.getElementById("error-namaTim");
    const nextBtn1 = document.getElementById("nextBtn1");

    const playerList = document.getElementById("playerList");
    const nextBtn2 = document.getElementById("nextBtn2");
    const errorPlayers = document.getElementById("error-players");

    const logoTim = document.getElementById("logoTim");
    const submitBtn = document.getElementById("submitBtn");
    const errorLogoTim = document.getElementById("error-logoTim");

    nextBtn1.addEventListener("click", function () {
        if (namaTim.value.trim() === "") {
            errorNamaTim.textContent = "Silakan isi nama tim!";
        } else {
            step1.classList.add("hidden");
            step2.classList.remove("hidden");
            generatePlayerForm();
        }
    });

    function generatePlayerForm() {
        playerList.innerHTML = "";
        for (let i = 1; i <= 5; i++) {
            playerList.innerHTML += `
                <label>Nama Discord Player ${i}:</label>
                <input type="text" id="dcPlayer${i}" placeholder="Nama Discord">
                <label>Nama MLBB Player ${i}:</label>
                <input type="text" id="mlbbPlayer${i}" placeholder="Nama MLBB">
                <p class="error-message" id="error-dcPlayer${i}"></p>
            `;
        }
    }

    nextBtn2.addEventListener("click", function () {
        step2.classList.add("hidden");
        step3.classList.remove("hidden");
    });

    submitBtn.addEventListener("click", function () {
        const file = logoTim.files[0];
        if (!file) {
            errorLogoTim.textContent = "Silakan upload logo!";
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        fetch("DISCORD_WEBHOOK_URL", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            step3.classList.add("hidden");
            step4.classList.remove("hidden");
        });
    });
});
