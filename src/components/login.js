import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate, useParams} from "react-router";
import {AuthContext} from "./AuthContext";
import {loginUser} from "../api/users";

export const LoginForm = () => {
    const navigate = useNavigate();
    const {setIsLogged} = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const { state, pathname } = useLocation();


    const validateForm = (data) => {
        const newErrors = {};


        if (!data.username) newErrors.userName = "Username is required";
        if (!data.password )
            newErrors.password =
                "Password is required";

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
        console.log(formData);
        console.log(process.env)
        const response = await loginUser(formData);
        console.log(response);
        return response;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (state?.message){
            state.message = "";
        };
        const allTouched = {
            username: "",
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
        try {
            const response = await postRegistrationDetails(formData);
            console.log(response);

            console.log("successful sign in");
            window.sessionStorage.setItem("token", response.token);
            setIsLogged(true);
            navigate("../firstPage");

        } catch (error) {
            console.log(error);
            setErrors({apiError:error.data});

        }

    };



    useEffect(() => {
        if (state?.message) {
            navigate(pathname, { replace: true });
        }
    }, [state, pathname, navigate]);

    return (
        <>
        {state?.message && (
            <div className="success">{state.message}</div>
        )}

        <form onSubmit={handleSubmit}>
            <ul>
                {Object.entries(errors)
                    .filter(([field, error]) => (touched[field] && error) || field === "apiError")
                    .map(([field, error]) => (
                        <li key={field}>{error}</li>
                    ))}
            </ul>
            <label>Username</label>
            <input
                type="username"
                name="username"
                value={formData.username}
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
        </>
    );
};