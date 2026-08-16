import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function UserHome() {

    const navigate = useNavigate();

    const [songs, setSongs] = useState([]);

    useEffect(() => {

        getSongs();

    }, []);

    const getSongs = async () => {

        try {

            const res = await api.get("/api/music/all");

            setSongs(res.data.musics);

        } catch (error) {

            console.log(error);

            alert("Songs Load Failed");

        }

    };

    // const logout = async () => {

    //     try {

    //         await api.post("/api/auth/logout");
    //         alert("Logout Successful");

    //         navigate("/");

    //     } catch (error) {

    //         console.log(error);
    //         alert("Logout Failed");

    //     }

    // };

    return (

        <div>

            <Navbar />

            <div className="home">

                <h2>Welcome User 🎵</h2>

                {/* <button onClick={logout}>Logout</button> */}

                <h3>All Songs</h3>

                {
                    songs.length === 0 ?

                        <p>No Songs Found</p>

                        :

                        songs.map((song) => (

                            <div className="song-card" key={song._id}>

                                <h4>{song.title}</h4>

                                <p>Artist : {song.artist?.username || "Unknown Artist"}</p>

                                <audio controls>

                                    <source
                                        src={song.uri}
                                        type="audio/mpeg"
                                    />
                                    Your browser does not support the audio element.
                                </audio>

                            </div>

                        ))
                }

            </div>

        </div>

    );

}

export default UserHome;