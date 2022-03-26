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