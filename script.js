document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    const steps = document.querySelectorAll(".step");
    const nextButtons = document.querySelectorAll(".next-btn");
    const registerButton = document.getElementById("register-btn");
    const webhookURL = "https://discord.com/api/webhooks/https://discord.com/api/webhooks/1349853633453490267/PFA6gGfDnTCjOIaIkE3XlMl-Ps_vLR3W6EXGg7G80YBbBfd2JzeC_k5qMhNog5Uz7e_a";

    function showStep(index) {
        steps.forEach((step, i) => {
            step.classList.toggle("active", i === index);
        });
    }

    function validateStep(stepIndex) {
        const inputs = steps[stepIndex].querySelectorAll("input");
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                isValid = false;
                input.nextElementSibling.style.display = "block";
            } else {
                input.nextElementSibling.style.display = "none";
            }
        });
        return isValid;
    }

    nextButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            if (validateStep(index)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    registerButton.addEventListener("click", function () {
        if (validateStep(steps.length - 1)) {
            const teamName = document.getElementById("team-name").value;
            const members = [];
            for (let i = 1; i <= 5; i++) {
                members.push({
                    discord: document.getElementById(`discord-${i}`).value,
                    mlbb: document.getElementById(`mlbb-${i}`).value
                });
            }
            const logoFile = document.getElementById("team-logo").files[0];
            
            const formData = new FormData();
            formData.append("content", `Team: ${teamName}\nMembers: ${members.map(m => `${m.discord} (ID: ${m.mlbb})`).join("\n")}`);
            if (logoFile) {
                formData.append("file", logoFile);
            }
            
            fetch(webhookURL, {
                method: "POST",
                body: formData
            }).then(response => {
                if (response.ok) {
                    currentStep++;
                    showStep(currentStep);
                } else {
                    alert("Failed to send data to Discord.");
                }
            }).catch(error => {
                console.error("Error:", error);
                alert("Error sending data.");
            });
        }
    });

    showStep(currentStep);
});
