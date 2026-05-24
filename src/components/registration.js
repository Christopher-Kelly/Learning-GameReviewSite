import React, { useState } from "react";
import axios from "axios";
import {redirect, useNavigate, useNavigate as navigate} from "react-router";
import {createUser} from "../api/users";

export const RegistrationForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validateForm = (data) => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

        if (!data.username) newErrors.username = "Username is required";
        if (!data.email || !emailRegex.test(data.email))
            newErrors.email = "Please enter a valid email";
        if (!data.password || !passwordRegex.test(data.password))
            newErrors.password =
                "Password must be 8+ characters with uppercase, lowercase, and symbol";

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));

        const validationErrors = validateForm(formData);
        setErrors((prev) => ({
            ...prev,
            [name]: validationErrors[name] || ""
        }));
    };

    const postRegistrationDetails = async (formData) => {
        console.log("errors", errors);
        console.log(formData);
        console.log(process.env)
        try {
            console.log("post details", formData)
            await createUser(formData);
            console.log('after details');
            setErrors("");
            navigate("../login", {
                state: { status: "success", message: "Registration successful" }
            });
        } catch (err) {
            console.log(err);
            setErrors({apiError:err.data});
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const allTouched = {
            username: true,
            email: true,
            password: true
        };
        setTouched(allTouched);

        const validationErrors = validateForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            alert(
                "Please solve your errors:\n" +
                Object.values(validationErrors).join("\n")
            );
            return;
        }

        console.log("Form submitted:", formData);
        await postRegistrationDetails(formData);

    };

    return (
        <form onSubmit={handleSubmit}>
            <ul>

                {Object.entries(errors)
                    .filter(([field, error]) => (touched[field] && error) || field === "apiError")
                    .map(([field, error]) => (
                        <li key={field}>{error}</li>
                    ))}
            </ul>


            <label>Username:</label>
            <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <br />


            <label>Email:</label>
            <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <br />

            <label>Password:</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <br />

            <button type="submit">Submit</button>
        </form>
    );
};