import { actionTypes } from "./types";

export const setLocalStream = (stream: MediaStream | null) => {
    return {
        type: actionTypes.setLocalStream,
        payload: stream,
    };
}
