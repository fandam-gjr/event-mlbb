// mlbb_event.js

// Struktur dasar HTML akan menggunakan div-container dengan step-by-step form.
// Akan ada validasi input sebelum bisa lanjut ke step berikutnya.
// Koneksi ke Discord Webhook akan mengirim data pendaftaran dengan logo tim.

// Inisialisasi variabel
let currentStep = 1;
const totalSteps = 4;

// Fungsi untuk menangani tombol next dan validasi input
function nextStep() {
    const currentForm = document.querySelector(`#step${currentStep} input, #step${currentStep} file`);
    if (!validateForm(currentForm)) {
        showErrorMessage("Lengkapi form terlebih dahulu");
        return;
    }
    document.getElementById(`step${currentStep}`).style.display = 'none';
    currentStep++;
    document.getElementById(`step${currentStep}`).style.display = 'block';
}

// Fungsi validasi input
function validateForm(inputs) {
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    return isValid;
}

// Fungsi untuk mengunggah logo dan validasi format file
function uploadLogo(event) {
    const file = event.target.files[0];
    if (!file || !(file.type === "image/png" || file.type === "image/jpeg")) {
        showErrorMessage("Format file harus JPG atau PNG");
        return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("logoPreview").src = e.target.result;
    }
    reader.readAsDataURL(file);
}

// Fungsi untuk mengirim data ke Discord Webhook
function sendToDiscord() {
    const formData = {
        namaTim: document.getElementById("namaTim").value,
        anggota: [
            {dc: document.getElementById("dcKetua").value, mlbb: document.getElementById("mlbbKetua").value},
            {dc: document.getElementById("dc1").value, mlbb: document.getElementById("mlbb1").value},
            {dc: document.getElementById("dc2").value, mlbb: document.getElementById("mlbb2").value},
            {dc: document.getElementById("dc3").value, mlbb: document.getElementById("mlbb3").value},
            {dc: document.getElementById("dc4").value, mlbb: document.getElementById("mlbb4").value}
        ],
        logo: document.getElementById("logoPreview").src
    };
    
    fetch('https://discord.com/api/webhooks/1349853633453490267/PFA6gGfDnTCjOIaIkE3XlMl-Ps_vLR3W6EXGg7G80YBbBfd2JzeC_k5qMhNog5Uz7e_a', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: JSON.stringify(formData, null, 2) })
    }).then(() => alert("Pendaftaran berhasil!"));
}

// Fungsi untuk menampilkan error message
function showErrorMessage(message) {
    document.getElementById("error-message").innerText = message;
}
