import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import { Typography } from '@mui/material'
import { styled } from "@mui/system";
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import AuthBox from '../components/AuthBox'
import {validateLoginForm} from "../utils/validators"
import {loginUser} from "../actions/authActions";
import { useAppSelector } from '../store';


const Wrapper = styled("div")({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
});

const Label = styled("p")({
    color: "#b9bbbe",
    textTransform: "uppercase",
    fontWeight: "600",
    fontSize: "16px",
});

const Input = styled("input")({
    flexGrow: 1,
    height: "40px",
    border: "1px solid black",
    borderRadius: "5px",
    color: "#dcddde",
    background: "#35393f",
    margin: 0,
    fontSize: "16px",
    padding: "0 5px",
    outline: "none",
});


const RedirectText = styled("span")({
    color: "#00AFF4",
    fontWeight: 500,
    cursor: "pointer",
});

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch ();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [isFormValid, setIsFormValid] = useState(false); 

    const {error, errorMessage, userDetails} = useAppSelector(state => state.auth) 


    const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = () => {
        dispatch(loginUser(credentials))
    }


    useEffect(() => {
        setIsFormValid(validateLoginForm(credentials))
    }, [credentials])


    useEffect(() => {
        
        if (userDetails?.token) {
            navigate("/dashboard")
        }

    }, [userDetails, navigate])

  return (
      <AuthBox>
          <Typography variant="h5" sx={{ color: "white" }}>
              Welcome Back!
          </Typography>
          <Typography sx={{ color: "#b9bbbe" }}>
              Happy to see you again!
          </Typography>

          <Wrapper>
              <Label>Email</Label>
              <Input type="email" placeholder="Enter your email" name='email' value={credentials.email} onChange={handleChange}/>
          </Wrapper>

          <Wrapper>
              <Label>Password</Label>
              <Input type="password" placeholder="Enter password" name="password" value={credentials.password} onChange={handleChange}/>
          </Wrapper>

          <Tooltip title={isFormValid ? "Proceed to Login" : "Enter correct email address and password should be greater than six characters"}>
              <div>
                  <Button
                      variant="contained"
                      sx={{
                          bgcolor: "#5865F2",
                          color: "white",
                          textTransform: "none",
                          fontSize: "16px",
                          fontWeight: 500,
                          width: "100%",
                          height: "40px",
                          margin: "20px 0px",
                      }}
                      disabled={!isFormValid}
                      onClick={handleLogin}
                  >
                      Log In
                  </Button>
              </div>
          </Tooltip>

          <Typography sx={{ color: "#72767d" }} variant="subtitle2">
              {`Don't have an account? `}
              <RedirectText onClick={() => navigate("/register")}>Register here</RedirectText>
          </Typography>

      </AuthBox>
  );
}

export default Login