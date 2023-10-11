async function startCapture(displayMediaOptions) {
    let captureStream = null;

    try {
        captureStream =
            await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    } catch (err) {
        console.error(`Error: ${err}`);
    }
    return captureStream;
}


function startCapture(displayMediaOptions) {
    return navigator.mediaDevices
        .getDisplayMedia(displayMediaOptions)
        .catch((err) => {
            console.error(err);
            return null;
        });
}
//   const gdmOptions = {
//     video: true,
//     audio: true,
//   };

const gdmOptions = {
    video: {
        displaySurface: "window",
    },
    audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
        suppressLocalAudioPlayback: true,
    },
    surfaceSwitching: "include",
    selfBrowserSurface: "exclude",
    systemAudio: "exclude",
};


const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");

// Options for getDisplayMedia()

const displayMediaOptions = {
    video: {
        displaySurface: "window",
    },
    audio: false,
};

// Set event listeners for the start and stop buttons
startElem.addEventListener(
    "click",
    (evt) => {
        startCapture();
    },
    false,
);

stopElem.addEventListener(
    "click",
    (evt) => {
        stopCapture();
    },
    false,
);


console.log = (msg) => (logElem.textContent = `${logElem.textContent}\n${msg}`);
console.error = (msg) =>
    (logElem.textContent = `${logElem.textContent}\nError: ${msg}`);


async function startCapture() {
    logElem.innerHTML = "";

    try {
        videoElem.srcObject =
            await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        dumpOptionsInfo();
    } catch (err) {
        console.error(err);
    }
}


function stopCapture(evt) {
    let tracks = videoElem.srcObject.getTracks();

    tracks.forEach((track) => track.stop());
    videoElem.srcObject = null;
}


function dumpOptionsInfo() {
    const videoTrack = videoElem.srcObject.getVideoTracks()[0];

    console.log("Track settings:");
    console.log(JSON.stringify(videoTrack.getSettings(), null, 2));
    console.log("Track constraints:");
    console.log(JSON.stringify(videoTrack.getConstraints(), null, 2));
}


// Permissions-Policy: display-capture=(self)
