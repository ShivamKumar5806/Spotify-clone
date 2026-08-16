import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function ArtistHome() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async (e) => {

        e.preventDefault();

        if (!title || !file) {
            alert("Please fill all fields");
            return;
        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("title", title);
            formData.append("file", file);

            const res = await api.post(
                `${import.meta.env.VITE_API_URL}/api/music/create`,
                formData
            );

            alert(res.data.message);

            setTitle("");
            setFile(null);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Upload Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    // const logout = async () => {

    //     await api.post("/api/auth/logout");

    //     navigate("/");

    // };

    return (

        <div>

            <Navbar />

            <div className="home">

                <h2>Welcome Artist 🎵</h2>

                {/* <button onClick={logout}>
                    Logout
                </button> */}

                <h3>Upload Song</h3>

                <form onSubmit={handleUpload}>

                    <input
                        type="text"
                        placeholder="Song Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    <button type="submit">

                        {
                            loading
                                ? "Uploading..."
                                : "Upload Song"
                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default ArtistHome;