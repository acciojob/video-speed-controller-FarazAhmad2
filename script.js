const video = document.querySelector(".player__video");
const toggleButton = document.querySelector(".toggle");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");
const sliders = document.querySelectorAll("[data-property]")
const skipBtns = document.querySelectorAll("[data-skip]");

function togglePlay() {
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
}

function updateToggleButton() {
  toggleButton.innerHTML = video.paused ? "►" : "❚ ❚";
}

function handleProgress() {
  const progressPercentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${progressPercentage}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleSliderUpdate() {
  // Retrieve the name of the property from the dataset attribute of the slider
  const propertyName = this.dataset.property;
  // Update the corresponding property of the video element
  video[propertyName] = this.value;
}
//...
sliders.forEach((slider) => {
  slider.addEventListener("input", handleSliderUpdate); // Use "input" event instead of "change"
});


function handleSkip() {
  video.currentTime += +this.dataset.skip;
}
//...

// Add this
skipBtns.forEach((btn) => {
  btn.addEventListener("click", handleSkip);
});

toggleButton.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateToggleButton);
video.addEventListener("pause", updateToggleButton);

video.addEventListener("timeupdate", handleProgress);
progress.addEventListener("click", scrub);
let mousedown = false;
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mouseup", () => (mousedown = false));
