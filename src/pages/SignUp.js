import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import { RadioGroup, Radio } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

const initialSendData = {
    email: "",
    password: "",
    repeatPassword: "",
    name: "",
    gender: "",
};

const SignUp = () => {
    const [errors, setErrors] = useState({
        name: true,
        email: true,
        password: true,
        repeatPassword: true,
    });

    const [isSuccess, setIsSuccess] = useState(false);
    const [sendData, setSendData] = useState(initialSendData);
    const [showModal, setShowModal] = useState(false);

    const validateEmail = (email) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    const validatePassword = (password) =>
        /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/.test(
            password
        );

    const validateField = (name, value) => {
        switch (name) {
            case "email":
                return validateEmail(value);
            case "password":
            case "repeatPassword":
                return validatePassword(value);
            case "name":
                return /^[가-힣a-zA-Z]+$/.test(value);
            default:
                return true;
        }
    };

    const checkField = (e) => {
        const { name, value } = e.target;
        const isValid = validateField(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: !isValid,
            repeatPassword:
                name === "repeatPassword"
                    ? value !== sendData.password
                    : prevErrors.repeatPassword,
        }));
        setSendData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidForm = Object.values(errors).every((error) => !error);
        if (isValidForm) {
            // 서버 요청 전송 코드 추가
            // 성공 시
            setIsSuccess(true);
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        nav("/");
        // 성공 모달 닫은 후 다른 작업 수행
    };

    const nav = useNavigate();

    return (
        <div className="SignUp">
            <div className="whole">
                <div className="head">
                    <h2>📝 오픈한끼 회원가입</h2>
                    <h5>오픈한끼로 친구를 만드세요</h5>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="signup_name_texfield">
                        <p>이름</p>
                        <TextField
                            value={sendData.name}
                            label="이름"
                            required
                            name="name"
                            margin="normal"
                            color="secondary"
                            fullWidth
                            autoFocus
                            error={errors.name && sendData.name !== ""}
                            onChange={checkField}
                            helperText={
                                errors.name && sendData.name !== ""
                                    ? "올바른 이름을 입력하세요"
                                    : null
                            }
                        />
                    </div>
                    <div className="signup_name_texfield">
                        <p>이메일</p>
                        <TextField
                            value={sendData.email}
                            label="이메일"
                            required
                            name="email"
                            margin="normal"
                            color="secondary"
                            fullWidth
                            autoFocus
                            error={errors.email && sendData.email !== ""}
                            onChange={checkField}
                            helperText={
                                errors.email && sendData.email !== ""
                                    ? "올바른 이메일을 입력하세요"
                                    : null
                            }
                        />
                    </div>
                    <div className="signup_name_texfield">
                        <p>비밀번호</p>
                        <TextField
                            value={sendData.password}
                            label="비밀번호"
                            required
                            name="password"
                            type="password"
                            margin="normal"
                            color="secondary"
                            fullWidth
                            autoFocus
                            error={errors.password && sendData.password !== ""}
                            onChange={checkField}
                            helperText={
                                errors.password && sendData.password !== ""
                                    ? "특수 문자, 숫자를 포함하여 8자 이상이어야 합니다"
                                    : null
                            }
                        />
                    </div>
                    <div className="signup_name_texfield">
                        <p>비밀번호 확인</p>
                        <TextField
                            value={sendData.repeatPassword}
                            label="비밀번호 확인"
                            type="password"
                            required
                            name="repeatPassword"
                            margin="normal"
                            color="secondary"
                            fullWidth
                            autoFocus
                            error={
                                errors.repeatPassword &&
                                sendData.repeatPassword !== ""
                            }
                            onChange={checkField}
                            helperText={
                                errors.repeatPassword &&
                                sendData.repeatPassword !== ""
                                    ? "비밀번호가 일치하지 않습니다"
                                    : null
                            }
                        />
                    </div>
                    <div className="signup_name_texfield">
                        <p>성별</p>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="gender"
                            color="secondary"
                            defaultValue="CT"
                            value={sendData.gender}
                            onChange={(e) =>
                                setSendData({
                                    ...sendData,
                                    gender: e.target.value,
                                })
                            }
                        >
                            <FormControlLabel
                                value="남성"
                                control={<Radio />}
                                label="남성"
                            />
                            <FormControlLabel
                                value="여성"
                                control={<Radio />}
                                label="여성"
                            />
                            <FormControlLabel
                                value="없음"
                                control={<Radio />}
                                label="없음"
                            />
                        </RadioGroup>
                    </div>

                    <Button
                        className="submit_button"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        가입하기
                    </Button>
                </form>
                <Grid className="signup_link">
                    이미 계정이 있으신가요???{" "}
                    <Link to="/">로그인하러 가기</Link>{" "}
                </Grid>
                <Modal
                    open={showModal}
                    onClose={closeModal}
                    aria-labelledby="login-success-modal"
                >
                    <div className="modal-content">
                        <h2 id="login-success-modal">가입이 완료되었습니다!</h2>
                        <Button onClick={closeModal}>닫기</Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default SignUp;
