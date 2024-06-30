import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Dummy data for the table
    const dummyData = [
        {
            name: "John Doe",
            createdAt: "2023-04-15",
            role: "Admin",
            status: "Active"
        },
        {
            name: "Jane Smith",
            createdAt: "2023-02-28",
            role: "Editor",
            status: "Pending"
        },
        {
            name: "Bob Johnson",
            createdAt: "2023-01-10",
            role: "User",
            status: "Inactive"
        },
        {
            name: "Sarah Lee",
            createdAt: "2022-11-20",
            role: "Moderator",
            status: "Active"
        }
    ];

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('User-login'));

        if (!user) {
            navigate('/');
            return;
        }

        setUser(user.user);
    }, [navigate]);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/user/logout', {}, { withCredentials: true });
            if (response.status === 200) {
                localStorage.removeItem('User-login');
                navigate('/');
                toast.success("Logout success!!")
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    if (!user) {
        return <div className='flex justify-center items-center h-full font-bold p-2'>Loading...</div>;
    }

    return (
        <>
            <div className="p-6 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
                <div>
                    <p className="text-xl font-semibold">Welcome, {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Logout
                </button>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow-md sm:rounded-lg">
                            <table className="min-w-full">
                                <thead className="bg-gray-500 text-white">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase ">
                                            #
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase ">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase ">
                                            Created At
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase ">
                                            Role
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase ">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dummyData.map((item, i) => (
                                        <tr key={i} className="bg-white border-b hover:bg-gray-200 cursor-pointer">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.createdAt}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.role}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-full ${
                                                    item.status === "Active" ? "bg-green-100 text-green-800" :
                                                    item.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                                                    "bg-red-100 text-red-800"
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;