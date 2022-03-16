import React from "react";
import {useDispatch} from "react-redux";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { hideAlert } from "../actions/alertActions";
import { useAppSelector } from "../store";

const AlertNotification = () => {
    const dispatch = useDispatch();
    const {open, message} = useAppSelector(state => state.alert) 

    const handleClose = () => {
        dispatch(hideAlert())
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={open}
            onClose={handleClose}
            autoHideDuration={6000}
        >
            <Alert severity="info">{message}</Alert>
        </Snackbar>
    );
};

export default AlertNotification
