function nextStep(step) {
    const currentStep = document.querySelector('.form-step:not(.hidden)');
    const inputs = currentStep.querySelectorAll('input');
    let valid = true;

    inputs.forEach(input => {
        if (!input.value) {
            valid = false;
        }
    });

    if (!valid) {
        currentStep.querySelector('.error-message').classList.remove('hidden');
        return;
    }

    currentStep.classList.add('hidden');
    document.getElementById(`step-${step}`).classList.remove('hidden');
}
function submitForm() {
    const teamName = document.getElementById('team-name').value;
    const members = [];
    const memberInputs = document.querySelectorAll('.member');
    const mlbbIds = document.querySelectorAll('.mlbb-id');

    for (let i = 0; i < memberInputs.length; i++) {
        members.push({
            discord: memberInputs[i].value,
            mlbb: mlbbIds[i].value
        });
    }

    const logo = document.getElementById('team-logo').files[0];
    if (!logo) {
        document.getElementById('error-team-logo').classList.remove('hidden');
        return;
    }

    const webhookURL = "https://discord.com/api/webhooks/YOUR_WEBHOOK_URL";
    const formData = new FormData();
    formData.append("content", `📌 **Pendaftaran Baru**:\n\n🔹 **Nama Tim:** ${teamName}\n\n👥 **Anggota Tim:**\n${members.map(m => `- ${m.discord} (ID MLBB: ${m.mlbb})`).join('\n')}`);
    formData.append("file", logo);

    fetch(webhookURL, {
        method: "POST",
        body: formData
    }).then(response => {
        if (response.ok) {
            document.getElementById('step-3').classList.add('hidden');
            document.getElementById('step-4').classList.remove('hidden');
        } else {
            alert("⚠️ Gagal mengirim data ke Discord. Cek kembali webhook URL.");
        }
    }).catch(error => {
        alert("❌ Terjadi kesalahan: " + error);
    });
}
