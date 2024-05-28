import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from "axios";
import LoginModal from "../components/LoginModal";

const SignIn = () => {
    const [emailErrors, setEmailErrors] = useState(true);
    const [passwordErrors, setPasswordErrors] = useState(true);
    const [sendData, setSendData] = useState({
        email: "",
        password: "",
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess || modalMessage !== "") {
            setShowModal(true); 
        }
    }, [isSuccess, modalMessage]);

    const onchange = (e) => {
        setSendData({
            ...sendData,
            [e.target.name]: e.target.value,
        });
    };

    const checkEmail = (e) => {
        var regExp =
            /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
        setEmailErrors(!regExp.test(e.target.value));
    };

    const checkPassword = (e) => {
        var regExp2 =
            /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
        setPasswordErrors(!regExp2.test(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/sign/in/",
                sendData
            );

            if (response.data.status === 200) {
                setIsSuccess(true);
                setModalMessage("You have successfully logged in!");
                setShowModal(true); 
                navigate("/main", {
                    state: { userEmail: sendData.email },
                });
            } else if (response.data.status === 401) {
                setIsSuccess(false);
                setModalMessage(
                    "You have entered the wrong username or password"
                );
                setShowModal(true); 
            }
        } catch (error) {
            console.log(error);
            setIsSuccess(false);
            setModalMessage("An error occurred during login");
            setShowModal(true); 
        }
    };

    const handleCloseModal = () => {
        setIsSuccess(false);
        setModalMessage("");
        setShowModal(false); 
    };

    const HorizonLine = ({ text }) => {
        return (
            <div
                style={{
                    width: "100%",
                    textAlign: "center",
                    borderBottom: "1px solid #aaa",
                    lineHeight: "0.1em",
                    margin: "10px 0 20px",
                    color: "gray",
                    fontSize: "10px",
                }}
            >
                <span style={{ background: "#fff", padding: "0 10px" }}>
                    {text}
                </span>
            </div>
        );
    };

    return (
        <div className="SignIn">
            <div>
                <div className="head">
                    <h2>Sign In</h2>
                    <h5>Purgo e-CRF System</h5>
                </div>
                <HorizonLine text="GLOBAL NO.1" />
                <form onSubmit={handleSubmit}>
                    <div className="email_textfield">
                        <TextField
                            value={sendData.email}
                            label="Email"
                            required
                            name="email"
                            autoComplete="email"
                            autoFocus
                            margin="normal"
                            color="secondary"
                            fullWidth
                            error={emailErrors && sendData.email !== ""}
                            onChange={(e) => {
                                onchange(e);
                                checkEmail(e);
                            }}
                            helperText={
                                emailErrors && sendData.email !== ""
                                    ? "Correct email is required"
                                    : null
                            }
                        />
                    </div>
                    <div className="password_textfield">
                        <TextField
                            value={sendData.password}
                            label="Password"
                            type="password"
                            required
                            name="password"
                            autoComplete="current-password"
                            margin="normal"
                            color="secondary"
                            fullWidth
                            error={passwordErrors && sendData.password !== ""}
                            onChange={(e) => {
                                onchange(e);
                                checkPassword(e);
                            }}
                            helperText={
                                passwordErrors && sendData.password !== ""
                                    ? "Correct password is required"
                                    : null
                            }
                        />
                    </div>
                    <div className="forgot_password">
                        <Link to="/SearchPassword" target={"_blank"}>
                            Forgot password?
                        </Link>
                    </div>
                    <Button
                        className="submit_button"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        login
                    </Button>
                    <Button
                        className="submit_button"
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => navigate("/matching")}
                    >
                        Go to Matching
                    </Button>
                </form>
                <Grid className="signup_link">
                    Not a member yet? <Link to="/SignUp">Sign up</Link>
                </Grid>
                <footer className="footer">
                    Contact Us: 070-4827-1572 / ecrf@purgobio.com
                </footer>
                {showModal && (
                    <LoginModal
                        isSuccess={isSuccess}
                        modalMessage={modalMessage}
                        handleClose={handleCloseModal}
                    />
                )}
            </div>
        </div>
    );
};

export default SignIn;
