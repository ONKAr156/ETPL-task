import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        // default password value
        initialValues: {
            email: 'john@gmail.com',
            password: 'Pass@123',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:3000/api/user/login', values, {
                    withCredentials: true
                });
                if (response.status === 200) {
                    toast.success("Login successful");
                    localStorage.setItem('User-login', JSON.stringify(response.data));
                    navigate("/home");
                } else {
                    toast.error("Something went wrong, please try again.");
                }
            } catch (error) {
                console.error("Error during login:", error);
                toast.error("Login failed. " + (error.response && error.response.data.message ? error.response.data.message : ""));
            }
        },
    });

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className='min-h-screen bg-gradient-to-b from-slate-500 to-gray-300 relative'>
                <h2 className='absolute top-[21%] right-[47%] z-50 text-slate-600 bg-white text-center font-bold mb-4  py-1 px-4'>SIGN IN</h2>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-cyan-900 shadow-md rounded text-slate-50 py-6 md:py-10 px-8 md:px-14 relative">
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                            <i className="bi bi-person-circle text-6xl text-white"></i>
                        </div>
                        <form onSubmit={formik.handleSubmit} className="mt-12 bg-slate-500 p-4">
                            <div className="mb-4 relative">
                                <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        className={`shadow text-black appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
                                    />
                                </div>
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-end text-red-500 text-xs italic">{formik.errors.email}</p>
                                )}
                            </div>
                            <div className="mb-6 relative">
                                <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
                                    />
                                    <i className="bi bi-eye absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400 cursor-pointer" onClick={toggleShowPassword}></i>
                                </div>
                                {formik.touched.password && formik.errors.password && (
                                    <p className="text-end text-red-500 text-xs italic">{formik.errors.password}</p>
                                )}
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <button
                                    type="submit"
                                    className=" w-full bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Sign In
                                </button>
                            </div>
                            <div className="flex flex-col items-end mt-4">
                                <Link to="/register" className="font-bold text-sm text-white">
                                    Register
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;