import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const MatchingForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        department: "",
        interests: "",
        age: "",
        gender: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 매칭 로직 추가
        navigate("/chat", { state: formData });
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                name="name"
                label="이름"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="department"
                label="학과"
                value={formData.department}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="interests"
                label="관심사"
                value={formData.interests}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="age"
                label="나이"
                value={formData.age}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="gender"
                label="성별"
                value={formData.gender}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                매칭 시작
            </Button>
        </form>
    );
};

export default MatchingForm;
