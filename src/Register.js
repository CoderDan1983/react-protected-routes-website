import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//* first character must be upper/lowercase letter.  Next must a combination fo 3-23 uppercase/lowerase
//* letters/numbers - or _.
const USER_REGEX = /^[azA-Z][a-zA-Z0-9-_]{3,23}$/; 
//* password must be 8-24 characters containing at least 1 lowercase letter, one uppercase letter, one number, and one special character :)
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [ user, setUser ] = useState(''); //tied to user input
    const [validName, setValidName ] = useState(false); //whether name is valid or not
    const [ userFocus, setUserFocus ] = useState(false); //whether we have focus on that input or not.

    const [ pwd, setPwd ] = useState('');
    const [validPwd, setValidPwd ] = useState(false);

    const [ matchPwd, setMatchPwd ] = useState('');
    const [ validMatch, setValidMatch ] = useState(false);
    const [ matchFocus, setMatchFocus ] = useState(false);

    const [ errMsg, setErrMsg ] = useState('');
    const [ success, setSuccess ] = useState(false);
    
    return (
        <div></div>
    )
}

export default Register;