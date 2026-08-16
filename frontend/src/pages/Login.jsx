import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
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

            const res = await api.post("/api/auth/login", formData);

            alert(res.data.message || "Login Successful");

            // Backend se role aayega
            const role = res.data.user.role;
            console.log("User role:", role);

            if (role === "artist") {

                navigate("/artist");
               

            } else {

                 navigate("/user");

            }

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container">

            <form className="form" onSubmit={handleSubmit}>

                <h2>Login</h2>

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

                <button type="submit">

                    {loading ? "Logging in..." : "Login"}

                </button>

                <p>

                    Don't have an account?

                    <Link to="/register"> Register</Link>

                </p>

            </form>

        </div>

    );

}

export default Login;