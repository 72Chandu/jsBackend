const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


io.on("connection", (socket) => {
    console.log("New client connected");
    
    socket.on("signalingMessage", (message) => {
        socket.broadcast.emit("signalingMessage", message);
    });

    socket.on("chatMessage", (message) => {
        io.emit("chatMessage", message); // Broadcast chat messages to all clients
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});




















/*
WebRTC (Web Real-Time Communication) is a technology that allows audio, video, and data sharing between browser 
clients (peers) without the need for an intermediary server. It's designed to enable peer-to-peer communication, 
which can be useful for applications like video conferencing, voice calls, and real-time data sharing.

ICE (Interactive Connectivity Establishment) is a framework used by WebRTC to facilitate peer-to-peer connectivity 
over the Internet. ICE candidates ar network endpoints (IP addresses and ports) gathered by each peer to determine 
the best route for data transmission, ensuring that direct communication can be established even when both peers 
are behind NAT (Network Address Translation) devices or firewalls.

local => khud ki screen
remote=>dusra ka screen

In WebRTC, the "offer" and "answer" are SDP (Session Description Protocol) messages exchanged between peers to 
negotiate and establish a connection. The "offer" describes the media capabilities and network Information of the 
sending peer, while the "answer" is sent in response, indicating the agreed- upon parameters for the connection. 
This negotiation process allows WebRTC applications to determine the best settings for audio, video, and data 
transmission between peers.

ICE (Interactive Connectivity Establishment) is the technology used by WebRTC to establish direct peer-to-peer 
connections over the internet. It enables WebRTC to work even when both peers are behind NAT (Network Address Translation) 
devices or firewalls by discovering and utilizing the best available network path for communication.

=>The first step in setting up a WebRTC application is to establish signaling channels. Signaling is the process of exchanging control messages, network information, and media configurations between peers. This is necessary for peers to discover each other and negotiate the connection before creating RTCPeerConnection objects and setting up media streams.

=>WebSocket is commonly used to signal the backend server about incoming WebRTC connections. It provides a full-duplex communication channel over a single, long-lived connection, allowing real-time messaging between the client and server, which is essential for signaling and establishing WebRTC connections.

WebRTC connection setup involves multiple steps to establish a peer-to-peer (P2P) connection, including signaling,
peer negotiation, and candidate discovery through the ICE (Interactive Connectivity Establishment) framework.

WebRTC Connection Setup Steps
Signaling:

WebRTC peers must first exchange network information to initiate a connection. This process is known as signaling.
Signaling is done using an external mechanism (e.g., WebSocket, HTTP) because WebRTC does not define its own signaling protocol.
Peers exchange three types of information during signaling:
Session Description Protocol (SDP): Contains media format, codec info, etc.
ICE Candidates: Information about network interfaces, such as public/private IP addresses and ports.
Other session-specific metadata.

Offer/Answer Model:
The connection starts when one peer creates an SDP offer using RTCPeerConnection.createOffer().
The offer is sent to the other peer via the signaling channel.
The receiving peer generates an SDP answer using RTCPeerConnection.createAnswer(), which is also sent back via the signaling channel.

ICE Framework:
Once the offer/answer exchange is done, the peers use ICE to discover the best path for communication.
ICE gathers a list of possible network interfaces (ICE candidates) that can be used to connect to the peer.

ICE Candidates
ICE candidates represent possible methods by which two WebRTC peers can connect. They are network address endpoints
and are critical for setting up a direct connection between peers. WebRTC uses these to find the best route for 
communication.

Types of ICE candidates:

Host Candidate:

Local IP addresses, such as a LAN IP (192.168.x.x).
Typically used when peers are on the same network.
Server-Reflexive Candidate (srflx):

Represents the public IP address of the peer, discovered through a STUN (Session Traversal Utilities for NAT) server.
Used when peers are behind NATs (Network Address Translators) but don’t share the same local network.
Relay Candidate:

Used when direct communication isn’t possible, such as when both peers are behind restrictive NATs or firewalls.
Relayed through a TURN (Traversal Using Relays around NAT) server, which acts as a proxy.
ICE Candidate Gathering and Negotiation

Gathering:Each peer collects ICE candidates using RTCPeerConnection.onicecandidate and shares them with the remote peer via 
the signaling channel.

ICE Connectivity Checks:WebRTC checks all candidate pairs to see which one provides the best connection by trying to send connection requests across various network paths.
Connectivity Establishment:Once the best path is found, the peers finalize the connection using the selected ICE candidate.
*/