const socket = io();

let localStream; // Variable to hold the local media stream
let remoteStream; // Variable to hold the remote media stream
let peerConnection; // Variable to hold the RTCPeerConnection instance
let videoEnabled = true; // Track if video is enabled or disabled
let audioEnabled = true; // Track if audio is enabled or disabled

const rtcConfig = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }] // Configuration for ICE servers
};

const initialize = async () => {
    socket.on("signalingMessage", handleSignalingMessage); // Listen for signaling messages from the server
    socket.on("chatMessage", displayMessage); // Listen for chat messages from the server

    try {
        // Get user media (audio and video)
        localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        document.querySelector("#localVideo").srcObject = localStream; // Set local video element's source to the local stream
        initiateOffer(); // Start the WebRTC handshake process
    } catch (error) {
        console.error("Error accessing media devices.", error); // Handle errors in accessing media devices
    }

    // Attach click event handlers to the camera and microphone buttons
    document.getElementById("cameraButton").addEventListener("click", toggleCamera);
    document.getElementById("micButton").addEventListener("click", toggleMicrophone);
    document.getElementById("sendMessageButton").addEventListener("click", sendMessage);

    // Handle Enter key press for sending messages
    document.getElementById("chatInput").addEventListener("keypress", (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
};

const initiateOffer = async () => {
    await createPeerConnection(); // Create a new RTCPeerConnection
    const offer = await peerConnection.createOffer(); // Create an SDP offer
    await peerConnection.setLocalDescription(offer); // Set the local description with the offer
    socket.emit("signalingMessage", JSON.stringify({ type: "offer", offer })); // Send the offer to the signaling server
};

const createPeerConnection = async () => {
    peerConnection = new RTCPeerConnection(rtcConfig); // Create a new RTCPeerConnection instance

    // Create a new MediaStream for the remote video
    remoteStream = new MediaStream();
    document.querySelector("#remoteVideo").srcObject = remoteStream; // Set remote video element's source to the remote stream

    // Add all tracks (audio and video) from the local stream to the peer connection
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
    });

    // Handle incoming remote tracks
    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => remoteStream.addTrack(track));
    };

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit(
                "signalingMessage",
                JSON.stringify({ type: "candidate", candidate: event.candidate })
            );
        }
    };
};

const handleSignalingMessage = async (message) => {
    const { type, offer, answer, candidate } = JSON.parse(message);
    if (type === "offer") handleOffer(offer); // Handle incoming offer
    if (type === "answer") handleAnswer(answer); // Handle incoming answer
    if (type === "candidate" && peerConnection) {
        await peerConnection.addIceCandidate(candidate); // Add ICE candidate to peer connection
    }
};

const handleOffer = async (offer) => {
    await createPeerConnection(); // Create a new RTCPeerConnection
    await peerConnection.setRemoteDescription(offer); // Set the remote description with the offer
    const answer = await peerConnection.createAnswer(); // Create an SDP answer
    await peerConnection.setLocalDescription(answer); // Set the local description with the answer
    socket.emit("signalingMessage", JSON.stringify({ type: "answer", answer })); // Send the answer to the signaling server
};

const handleAnswer = async (answer) => {
    if (!peerConnection.currentRemoteDescription) {
        await peerConnection.setRemoteDescription(answer); // Set the remote description with the answer
    }
};

// Toggle camera (video stream)
const toggleCamera = async () => {
    const videoTrack = localStream.getVideoTracks()[0]; // Get the video track from the local stream

    if (videoEnabled) {
        // Turn off the video by stopping the track and removing it from peer connection
        videoTrack.stop(); // Stop the video track completely
        peerConnection.getSenders().forEach(sender => {
            if (sender.track.kind === 'video') {
                peerConnection.removeTrack(sender); // Remove the video track from the peer connection
            }
        });

        localStream.removeTrack(videoTrack); // Remove the video track from the local stream
        document.getElementById("localVideo").srcObject = null; // Remove video from the local video element
        videoEnabled = false;
        document.getElementById("cameraButton").style.backgroundColor = "#666"; // Update button color to indicate camera is off
    } else {
        // Turn on the video by getting a new video track and adding it to peer connection
        const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
        const newVideoTrack = newStream.getVideoTracks()[0];

        localStream.addTrack(newVideoTrack); // Add the new video track to the local stream
        peerConnection.addTrack(newVideoTrack, localStream); // Add the new video track to the peer connection

        document.getElementById("localVideo").srcObject = localStream; // Display the local stream in the video element
        videoEnabled = true;
        document.getElementById("cameraButton").style.backgroundColor = "#3bf622"; // Update button color to indicate camera is on
    }
};


// Toggle microphone (audio stream)
const toggleMicrophone = async () => {
    const audioTrack = localStream.getAudioTracks()[0]; // Get the audio track from the local stream

    if (audioEnabled) {
        audioTrack.enabled = false; // Disable the audio track
        audioEnabled = false;
        document.getElementById("micButton").style.backgroundColor = "#666"; // Update button color to indicate microphone is off
    } else {
        audioTrack.enabled = true; // Enable the audio track
        audioEnabled = true;
        document.getElementById("micButton").style.backgroundColor = "#3bf622"; // Update button color to indicate microphone is on
    }
};

// Send a chat message
const sendMessage = () => {
    const messageInput = document.getElementById("chatInput");
    const message = messageInput.value.trim();
    if (message) {
        socket.emit("chatMessage", message); // Send the message to the server
        messageInput.value = ''; // Clear the input field
        displayMessage(`You: ${message}`, true); // Display the sent message locally
    }
};

// Display a chat message
const displayMessage = (message, isOwnMessage = false) => {
    const messagesDiv = document.getElementById("messages");
    const messageDiv = document.createElement("div");
    messageDiv.className = isOwnMessage ? 'own-message' : 'received-message';
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
};

initialize(); // Start the initialization process
