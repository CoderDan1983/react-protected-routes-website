import { useState, useEffect } from "react";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom";
// import axios from "../api/axios";
// import useRefreshToken from "../hooks/useRefreshToken";



const Users = () => {
    const [ users, setUsers ] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    // const refresh = useRefreshToken();

    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            console.log('Users.js, running getUsers: ')
            try {
                console.log('trying again...')
                const response = await axiosPrivate.get('/users', { // ./users
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data) //if isMounted, then setUsers :D
            }
            catch (err){
                console.log("I'm gonna log an error!")
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true })
            }
        }
        getUsers();

        return () =>{ //* cleanup function ^_^
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Users List</h2>
            {
                users?.length ?
                (
                   <ul>
                        { users.map((user, i) => <li key={i}>{ user?.username }</li>) }
                   </ul> 
                )
                : <p>No users to display</p>
            }
            {/* <button onClick={ () => refresh() }>Refresh</button> 
            <br />*/}
        </article>
    )
}

export default Users