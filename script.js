document.addEventListener("DOMContentLoaded", () => {
    const namaTimInput = document.getElementById("namaTim");
    const nextBtn1 = document.getElementById("nextBtn1");
    const nextBtn2 = document.getElementById("nextBtn2");
    const submitBtn = document.getElementById("submitBtn");
    const logoInput = document.getElementById("logoTim");
    
    namaTimInput.addEventListener("input", () => {
        if (namaTimInput.value.trim() !== "") {
            nextBtn1.removeAttribute("disabled");
        } else {
            nextBtn1.setAttribute("disabled", true);
        }
    });

    nextBtn1.addEventListener("click", () => {
        document.querySelector(".step-1").classList.add("hidden");
        document.querySelector(".step-2").classList.remove("hidden");
    });

    nextBtn2.addEventListener("click", () => {
        document.querySelector(".step-2").classList.add("hidden");
        document.querySelector(".step-3").classList.remove("hidden");
    });

    logoInput.addEventListener("change", () => {
        if (logoInput.files.length > 0) {
            submitBtn.removeAttribute("disabled");
        } else {
            submitBtn.setAttribute("disabled", true);
        }
    });

    submitBtn.addEventListener("click", () => {
        document.querySelector(".step-3").classList.add("hidden");
        document.querySelector(".step-4").classList.remove("hidden");
    });
});
