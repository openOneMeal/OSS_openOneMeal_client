import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "styled-components";

const BoxWrapper = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: white;
    border: 2px solid purple;
    border-radius: 15px;
    padding: 30px;
    display: flex;
    flex-direction: column;
`;

const BtnWrapper = styled(Button)`
    background-color: purple;
    display: flex;
    color: white;
    margin-top: 30px;
    &:hover {
        background-color: #bf80ff;
    }
`;

export default function SignupModal({ open, closeModal }) {
    return (
        <div>
            <Modal
                open={open} // open={true} 대신 open prop 사용
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <BoxWrapper>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        가입에 성공하셨습니다!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        로그인을 해주시기 바랍니다.
                    </Typography>
                    <BtnWrapper onClick={closeModal}>확인</BtnWrapper>
                </BoxWrapper>
            </Modal>
        </div>
    );
}
