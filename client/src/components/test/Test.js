import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../../constants/constants";
import axios from "axios";

const Test = (props) => {

    const [message, setMessage] = useState({});

    useEffect(() => {
        const id = props.match.params.id;

        axios.get(`${API_BASE_URL}/message/${id}`)
            .then(response => {
                console.log(response.data);
                setMessage(response.data.message);
            })
            .catch(err => {
                console.log(err.response);
                if (err.response.status == 401 && err.response.data.message == "Token is not valid") {
                    localStorage.removeItem(ACCESS_TOKEN_NAME);
                    props.history.push("/login");
                }
            });
    }, []);

    return (
        <div>
            <h1>{props.match.params.id}</h1>
            <h2>{message.title}</h2>
            <p>{message.message}</p>
        </div>
    );

};

export default Test;