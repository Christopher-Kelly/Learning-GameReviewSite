import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Typography } from '@mui/material';
import { Link } from 'react-router';
import { AuthContext } from '../../../components/AuthContext';
import { loginUser } from '../../../api/users';
import { ApiErrorAlert, FormTextField, FormTitle, FormWrapper, SubmitButton, SuccessAlert } from '../../../styles/form.styles';

export const LoginForm = () => {
    const navigate = useNavigate();
    const { setIsLogged } = useContext(AuthContext);
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const { state, pathname } = useLocation();

    const validateForm = (data) => {
        const newErrors = {};
        if (!data.username) newErrors.userName = "Username is required";
        if (!data.password) newErrors.password = "Password is required";
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
        setErrors((prev) => ({ ...prev, [name]: validationErrors[name] || "" }));
    };

    const postRegistrationDetails = async (formData) => {
        console.log(formData);
        console.log(process.env);
        const response = await loginUser(formData);
        console.log(response);
        return response;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (state?.message) state.message = "";

        const allTouched = { username: "", password: true };
        setTouched(allTouched);

        const validationErrors = validateForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            alert("Please solve your errors:\n" + Object.values(validationErrors).join("\n"));
            return;
        }

        console.log("Form submitted:", formData);
        try {
            const response = await postRegistrationDetails(formData);
            console.log(response);
            console.log("successful sign in");
            localStorage.setItem("token", response.token);
            setIsLogged(true);
            navigate("../firstPage");
        } catch (error) {
            console.log(error);
            setErrors({ apiError: error.data });
        }
    };

    useEffect(() => {
        if (state?.message) navigate(pathname, { replace: true });
    }, [state, pathname, navigate]);

    return (
        <FormWrapper>
            <FormTitle>Sign In</FormTitle>
            <SuccessAlert message={state?.message} />
            <ApiErrorAlert error={errors.apiError} />
            <form onSubmit={handleSubmit}>
                <FormTextField
                    name="username"
                    label="Username"
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                />
                <FormTextField
                    name="password"
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                />
                <Typography sx={{ textAlign: 'center', color: '#9090b0', mt: 1, mb: 1, fontSize: '0.9rem' }}>
                    Don't have an account?{' '}
                    <Link to="/registration" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 600 }}>
                        Sign up
                    </Link>
                </Typography>
                <SubmitButton>Sign In</SubmitButton>
            </form>
        </FormWrapper>
    );
};
