document.addEventListener("DOMContentLoaded", function () {
    const next1 = document.getElementById("next1");
    const next2 = document.getElementById("next2");
    const submit = document.getElementById("submit");
    const teamName = document.getElementById("teamName");
    const errorTeamName = document.getElementById("errorTeamName");
    const teamMembersDiv = document.getElementById("teamMembers");
    const errorMembers = document.getElementById("errorMembers");
    const teamLogo = document.getElementById("teamLogo");
    const errorLogo = document.getElementById("errorLogo");

    // Buat input untuk 5 anggota
    for (let i = 1; i <= 5; i++) {
        const memberDiv = document.createElement("div");
        memberDiv.innerHTML = `<input type="text" placeholder="Nama Discord Anggota ${i}" class="member-dc">
                               <input type="text" placeholder="Nama MLBB Anggota ${i}" class="member-mlbb">`;
        teamMembersDiv.appendChild(memberDiv);
    }

    const memberDcInputs = document.querySelectorAll(".member-dc");
    const memberMlbbInputs = document.querySelectorAll(".member-mlbb");

    next1.addEventListener("click", function () {
        if (teamName.value.trim() === "") {
            errorTeamName.classList.remove("hidden");
        } else {
            errorTeamName.classList.add("hidden");
            document.querySelector(".step-1").classList.add("hidden");
            document.querySelector(".step-2").classList.remove("hidden");
        }
    });

    next2.addEventListener("click", function () {
        let allFilled = true;
        memberDcInputs.forEach(input => { if (input.value.trim() === "") allFilled = false; });
        memberMlbbInputs.forEach(input => { if (input.value.trim() === "") allFilled = false; });

        if (!allFilled) {
            errorMembers.classList.remove("hidden");
        } else {
            errorMembers.classList.add("hidden");
            document.querySelector(".step-2").classList.add("hidden");
            document.querySelector(".step-3").classList.remove("hidden");
        }
    });

    submit.addEventListener("click", function () {
        if (!teamLogo.files.length) {
            errorLogo.classList.remove("hidden");
        } else {
            errorLogo.classList.add("hidden");
            document.querySelector(".step-3").classList.add("hidden");
            document.querySelector(".step-4").classList.remove("hidden");

            // Kirim data ke Discord
            sendToDiscord();
        }
    });

    function sendToDiscord() {
        const webhookURL = "YOUR_DISCORD_WEBHOOK_URL"; // Ganti dengan webhook Discord

        const teamData = {
            content: "Pendaftaran Baru!",
            embeds: [{
                title: "Pendaftaran Event MLBB",
                fields: [
                    { name: "Nama Tim", value: teamName.value },
                    ...Array.from(memberDcInputs).map((input, index) => (
                        { name: `Anggota ${index + 1}`, value: `Discord: ${input.value} | MLBB: ${memberMlbbInputs[index].value}` }
                    ))
                ]
            }]
        };

        fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(teamData)
        }).then(response => {
            if (response.ok) {
                console.log("Data terkirim ke Discord");
            } else {
                console.error("Gagal mengirim ke Discord");
            }
        });
    }
});

