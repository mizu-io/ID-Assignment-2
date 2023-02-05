function updateProgressBar(progressBar, value) {
    value = Math.round(value);
    progressBar.querySelector(".progress-fill").style.width = `${value}%`;
    progressBar.querySelector(".progress-text").textContent = `${value}%`;
}

