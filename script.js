// Log that the script has loaded
console.log("Script loaded");

// Initialize timer variables
let remainingTime = 1200; // Default to 20 minutes in seconds
let isRunning = false;
let interval;
let totalDuration;
let firstSoundInterval;
let secondSoundInterval;

// Function to handle the confirm button click
function handleConfirmClick() {
    console.log("Confirm button clicked");

    const totalDurationSelect = document.getElementById('total-duration-select');
    const firstSoundSelect = document.getElementById('first-sound-select');
    const secondSoundSelect = document.getElementById('second-sound-select');

    totalDuration = parseInt(totalDurationSelect.value) * 60; // Convert minutes to seconds
    firstSoundInterval = parseInt(firstSoundSelect.value);
    secondSoundInterval = parseInt(secondSoundSelect.value);

    console.log(`Total Duration: ${totalDuration}`);
    console.log(`First Sound Interval: ${firstSoundInterval}`);
    console.log(`Second Sound Interval: ${secondSoundInterval}`);

    if (!isNaN(totalDuration) && !isNaN(firstSoundInterval) && !isNaN(secondSoundInterval) &&
        totalDuration > 0 && firstSoundInterval > 0 && secondSoundInterval > 0 &&
        firstSoundInterval < totalDuration && secondSoundInterval < totalDuration) {

        remainingTime = totalDuration;
        updateDisplay();

        // Hide the popup
        document.getElementById('popup').classList.add('hidden');

        // Show and enable the start button
        const startStopBtn = document.getElementById('start-stop-btn');
        startStopBtn.style.display = 'block'; // Make sure it's visible
        startStopBtn.disabled = false;

        console.log("Settings confirmed and popup hidden");
    } else {
        alert("Please enter valid settings.");
        console.log("Invalid input values");
    }
}

// Function to handle the start/stop button click
function handleStartStopClick() {
    const startStopBtn = document.getElementById('start-stop-btn');
    if (isRunning) {
        clearInterval(interval);
        startStopBtn.textContent = "Start";
        isRunning = false;
        console.log("Timer stopped");

        // Show the set timer button again
        document.getElementById('open-popup-btn').style.display = 'block';
    } else {
        startTimer();
        startStopBtn.textContent = "Stop";
        isRunning = true;
        console.log("Timer started");

        // Hide the set timer button while the timer is running
        document.getElementById('open-popup-btn').style.display = 'none';
    }
}

// Function to start the timer
function startTimer() {
    let elapsedTime = 0;
    interval = setInterval(function () {
        if (remainingTime <= 0) {
            clearInterval(interval);
            remainingTime = 0;
            updateDisplay();
            console.log("Timer ended");

            // Show the set timer button again
            document.getElementById('open-popup-btn').style.display = 'block';
            return;
        }

        remainingTime--;

        // Update elapsed time
        elapsedTime++;
        
        // Play sounds at specified intervals
        if (elapsedTime % firstSoundInterval === 0) {
            document.getElementById('first-sound').play();
            console.log("First sound played");
        }
        
        if (elapsedTime % (firstSoundInterval + secondSoundInterval) === 0) {
            document.getElementById('second-sound').play();
            console.log("Second sound played");
        }

        updateDisplay();
    }, 1000);
}

// Function to update the timer display
function updateDisplay() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    
    // Update timer display
    document.getElementById('timer-display').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    console.log(`Time updated: ${minutes}:${seconds}`);
}

// Add event listeners once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");

    // Set up event listener for the confirm button
    document.getElementById('confirm-settings-btn').addEventListener('click', handleConfirmClick);

    // Set up event listener for the open popup button
    document.getElementById('open-popup-btn').addEventListener('click', () => {
        document.getElementById('popup').classList.remove('hidden');
    });

    // Set up event listener for the close popup button
    document.getElementById('close-popup-btn').addEventListener('click', () => {
        document.getElementById('popup').classList.add('hidden');
    });

    // Set up event listener for the start/stop button
    document.getElementById('start-stop-btn').addEventListener('click', handleStartStopClick);

    // Make the popup draggable
    makeDraggable(document.getElementById('popup'));
});

// Function to make an element draggable
function makeDraggable(element) {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    element.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = element.offsetLeft;
        initialY = element.offsetTop;
        element.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            let dx = e.clientX - startX;
            let dy = e.clientY - startY;
            element.style.left = `${initialX + dx}px`;
            element.style.top = `${initialY + dy}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        element.style.cursor = 'move';
    });
}
