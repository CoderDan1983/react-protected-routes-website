import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//* first character must be upper/lowercase letter.  Next must a combination fo 3-23 uppercase/lowerase
//* letters/numbers - or _.
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
//* password must be 8-24 characters containing at least 1 lowercase letter, one uppercase letter, one number, and one special character :)
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [ user, setUser ] = useState(''); //tied to user input
    const [ validName, setValidName ] = useState(false); //whether name is valid or not
    const [ userFocus, setUserFocus ] = useState(false); //whether we have focus on that input or not.

    const [ pwd, setPwd ] = useState('');
    const [ validPwd, setValidPwd ] = useState(false);
    const [ pwdFocus, setPwdFocus ] = useState(false); 

    const [ matchPwd, setMatchPwd ] = useState('');
    const [ validMatch, setValidMatch ] = useState(false);
    const [ matchFocus, setMatchFocus ] = useState(false);

    const [ errMsg, setErrMsg ] = useState('');
    const [ success, setSuccess ] = useState(false);

    useEffect(()=>{
        userRef.current.focus();
    }, []);

    useEffect(() =>{
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(()=>{
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(()=>{
        const result = PWD_REGEX.test(pwd);
        // console.log(result);
        // console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(()=>{
        setErrMsg('');
    }, [user, pwd, matchPwd]); 
    //* it's fine and great to display error messages, but if the user input changes,
    //* set the error message to blank.  ie - we aren't creating error messages here,
    //* we are clearing them due to a change of user input.  :)


    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} 
            aria-live="assertive">{errMsg}</p>
            {/* aria-live="assertive" means that when this element gets the 
            focus it will be announced with the screen reader :) */}
            <h1>Register</h1>
            <form>
                <label htmlFor="username">
                    Username:
                    {/* this is in case the screen reader is not working.  It looks similar :) */}
                    <span className={ validName ? "valid" : "hide" }>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={ validName || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label> {/* htmlFor needs to match the id of the input :) */}
                <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={ (e) => setUser(e.target.value) }
                    required
                    aria-invalid={ validName ? "false" : "true" } 
                    aria-describedby="uinote"
                    onFocus={ () => setUserFocus(true) }
                    onBlur={ () => setUserFocus(false) }
                />
                <p id="uidnote" className={userFocus && user && 
                !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={ faInfoCircle } />
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>

                <label htmlFor="password">
                    Password:
                    <FontAwesomeIcon icon={faCheck} className={ validPwd? "valid" : "hide" } />
                    <FontAwesomeIcon icon={faTimes} className={ validPwd || !pwd ? "hide" : "invalid" } />
                </label>
                <input 
                    type="password"
                    id="password"
                    onChange={ (e) => setPwd(e.target.value) }
                    required
                    aria-invalid={validPwd ? "false" : "true" }
                    aria-describedby="pwdnote"
                    onFocus={ () => setPwdFocus(true) }
                    onBlur={ () => setPwdFocus(false) }
                />
                <p id="pwdnote" className={ pwdFocus && !validPwd ? "instructions" : "offscreen" }>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number, and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span>
                    <span aria-label="hashtag">#</span>
                    <span aria-label="dollar sign">$</span>
                    <span aria-label="percent">%</span>
                </p>
            </form>
        </section>
    )
}

export default Register;

//aria-invalid lets formreader announce if the form needs adjustment before submission
//aria-describedby lets us provide another element which describes the input field :)
//we can put the requirements needed by a screen reader here :)
//"offscreen" means it is moved to an absolute position off screen.  It is different than display: none
//...which would remove it from the... dom?
//"hide" will set the display to none.
//we use a bunch of span aria-label (attribute) so that the screen reader can read the special character, so to speak :)
