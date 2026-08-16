import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "user"
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            
            setLoading(true);
            
            const res = await api.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData);
            console.log(res.data);

            alert(res.data.message || "Registration Successful");

            navigate("/");

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Registration Failed"
                
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container">

            <form className="form" onSubmit={handleSubmit}>

                <h2>Register</h2>

                <input
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >

                    <option value="user">User</option>

                    <option value="artist">Artist</option>

                </select>

                <button type="submit">

                    {loading ? "Registering..." : "Register"}

                </button>

                <p>

                    Already have an account?

                    <Link to="/"> Login</Link>

                </p>

            </form>

        </div>

    );

}

export default Register;