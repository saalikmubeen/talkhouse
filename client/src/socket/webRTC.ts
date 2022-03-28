import Peer from "simple-peer";
import { setLocalStream } from "../actions/videoChatActions";
import { store } from "../store";


export const getLocalStreamPreview = (audioOnly: boolean, callback?: () => void) => {
    
    const constraints = { audio: true, video: audioOnly ? false : true };

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {

        store.dispatch(setLocalStream(stream) as any);

        if (callback) {
            callback();
        }
        
    }).catch((err) => {
        console.log(err);
        console.log("Error getting local stream");
    })
}


const peerConfiguration = () => {
    const turnIceServers = null;

    if (turnIceServers) {
        // TODO use TURN server credentials
    } else {
        console.warn("Using only STUN server");
        return {
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302",
                },
            ],
        };
    }
};


export const newPeerConnection = (initiator: boolean) => {
    
    const stream = store.getState().videoChat.localStream

    if (!stream) {
        throw new Error("No local stream");

    }
    
    console.log("from web ", stream);
    
    const configuration = peerConfiguration();
    const peer = new Peer({
        initiator: initiator,
        trickle: false,
        config: configuration,
        stream: stream,
    });

    
    
    return peer;
}