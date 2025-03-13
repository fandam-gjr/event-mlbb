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

            // **Kirim Data ke Discord Webhook**
            const webhookURL = "https://discord.com/api/webhooks/1349853633453490267/PFA6gGfDnTCjOIaIkE3XlMl-Ps_vLR3W6EXGg7G80YBbBfd2JzeC_k5qMhNog5Uz7e_a"; // Ganti dengan Webhook milikmu!

            let membersList = "";
            memberDcInputs.forEach((input, index) => {
                membersList += `**Anggota ${index + 1}:**\nDiscord: ${input.value}\nMLBB: ${memberMlbbInputs[index].value}\n\n`;
            });

            const payload = {
                content: "**Pendaftaran Tim Baru!** 🎮",
                embeds: [{
                    title: "Detail Pendaftaran",
                    description: `**Nama Tim:** ${teamName.value}\n\n${membersList}`,
                    color: 3447003 // Warna biru Discord
                }]
            };

            fetch(webhookURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (response.ok) {
                    document.querySelector(".step-3").classList.add("hidden");
                    document.querySelector(".step-4").classList.remove("hidden");
                } else {
                    alert("Gagal mengirim data ke Discord.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Terjadi kesalahan.");
            });
        }
    });
});
