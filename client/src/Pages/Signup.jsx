import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        name: '',
        dob: '',
        email: '',
        password: '',
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            dob: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            dob: Yup.date().required('Date of Birth is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:3000/api/user/register', values);
                if (response.status === 201) {
                    toast.success("Registration successful!!");
                    localStorage.setItem("User-login", JSON.stringify(values))
                    navigate("/");
                } else {
                    toast.error("Something went wrong, please try again.");
                }
            } catch (error) {
                console.error("Error during registration:", error);
                toast.error("Registration failed. " + (error.response && error.response.data.message ? error.response.data.message : ""));
            }
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        formik.handleChange(e);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-500 to-gray-300">
            <h2 className='my-2 font-semibold text-xl uppercase text-slate-50 shadow-lg bg-slate-500 px-4 py-1'>Sign UP</h2>
            <div className="w-full max-w-xs shadow-sm">
                <form onSubmit={formik.handleSubmit} className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                            value={formValues.name}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''
                                }`}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-500 text-xs italic">{formik.errors.name}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                            Date of Birth
                        </label>
                        <input
                            id="dob"
                            name="dob"
                            type="date"
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                            value={formValues.dob}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.dob && formik.errors.dob ? 'border-red-500' : ''
                                }`}
                        />
                        {formik.touched.dob && formik.errors.dob && (
                            <p className="text-red-500 text-xs italic">{formik.errors.dob}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                            value={formValues.email}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                                }`}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                            value={formValues.password}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''
                                }`}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-xs italic">{formik.errors.password}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <button
                            type="submit"
                            className="bg-gray-500 w-full hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;