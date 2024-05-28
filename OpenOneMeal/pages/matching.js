import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid } from "@mui/material";
import MatchingForm from "../components/MatchingForm";

const Matching = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        department: "",
        interests: "",
        age: "",
        gender: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        navigate("/chat");
    };

    return (
        <div className="Matching">
            <h2>Matching Page</h2>
            <MatchingForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    );
};

export default Matching;
