import { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../../constants/constants";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

const Home = (props) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log("useeeffect de home");
        axios.get(`${API_BASE_URL}/message`)
            .then(response => {
                console.log(response.data);
                setMessages(response.data.messages);
            })
            .catch(err => {
                console.log(err.response);
                if (err.response.status == 401 && err.response.data.message == "Token is not valid") {
                    localStorage.removeItem(ACCESS_TOKEN_NAME);
                    props.history.push("/login");
                }
            });
    }, []);

    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN_NAME);
        setAuthToken();
        props.history.push("/login");
    };

    return (
        <div>
            <h1>HOME PAGE</h1>
            {messages.map(mes => {
                return (
                    <Link key={mes._id} to={`/mensaje/${mes._id}`}>
                        <h2>{mes.title}</h2>
                    </Link>
                );
            })}
            <button onClick={() => logout()}>LOGOUT</button>
        </div>
    );
};

export default withRouter(Home);