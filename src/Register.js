import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from './api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign In</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Register



























// import { useRef, useState, useEffect } from "react";
// import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import axios from './api/axios';

// //* first character must be upper/lowercase letter.  Next must a combination fo 3-23 uppercase/lowerase
// //* letters/numbers - or _.
// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// //* password must be 8-24 characters containing at least 1 lowercase letter, one uppercase letter, one number, and one special character :)
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const REGISTER_URL = '/register';

// const Register = () => {
//     const userRef = useRef();
//     const errRef = useRef();

//     const [ user, setUser ] = useState(''); //tied to user input
//     const [ validName, setValidName ] = useState(false); //whether name is valid or not
//     const [ userFocus, setUserFocus ] = useState(false); //whether we have focus on that input or not.

//     const [ pwd, setPwd ] = useState('');
//     const [ validPwd, setValidPwd ] = useState(false);
//     const [ pwdFocus, setPwdFocus ] = useState(false); 

//     const [ matchPwd, setMatchPwd ] = useState('');
//     const [ validMatch, setValidMatch ] = useState(false);
//     const [ matchFocus, setMatchFocus ] = useState(false);

//     const [ errMsg, setErrMsg ] = useState('');
//     const [ success, setSuccess ] = useState(false);

//     useEffect(()=>{
//         userRef.current.focus();
//     }, []);

//     useEffect(() =>{
//         const result = USER_REGEX.test(user);
//         console.log(result);
//         console.log(user);
//         setValidName(result);
//     }, [user]);

//     useEffect(()=>{
//         setValidName(USER_REGEX.test(user));
//     }, [user])

//     useEffect(()=>{
//         const result = PWD_REGEX.test(pwd);
//         // console.log(result);
//         // console.log(pwd);
//         setValidPwd(result);
//         const match = pwd === matchPwd;
//         setValidMatch(match);
//     }, [pwd, matchPwd])

//     useEffect(()=>{
//         setErrMsg('');
//     }, [user, pwd, matchPwd]); 
//     //* it's fine and great to display error messages, but if the user input changes,
//     //* set the error message to blank.  ie - we aren't creating error messages here,
//     //* we are clearing them due to a change of user input.  :)

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         //* if button enabled through JavaScript hack
//         const v1 = USER_REGEX.test(user);
//         const v2 = PWD_REGEX.test(pwd);

//         if(!v1 || !v2){
//             setErrMsg("Invalid Entry");
//             return;
//         }
//         // console.log(user, pwd); //* we'll submit using axios :D
//         // setSuccess(true);
//         try {
//             const response = await axios.post(REGISTER_URL, 
//                 JSON.stringify({ user, pwd }), 
//                 {
//                     headers: { 'Content-Type': 'application/json'},
//                     withCredentials: true,
//                 }
//             );
//             console.log(response.data);
//             console.log(response.accessToken);
//             console.log(JSON.stringify(response));
//             setSuccess(true);
//             //clear the input fields (if you want to):)
//             setUser('');
//             setPwd('');
//             setMatchPwd('');
//         } catch(err){
//             if (!err?.response) {
//                 setErrMsg('No Server Response');
//             } else if (err.response?.status === 409) {
//                 setErrMsg('Username Taken');
//             } else {
//                 setErrMsg('Registration Failed')
//             }
//             errRef.current.focus(); //* set the focus to this for screen readers :)

//             //* 409 -  this means that the name was already taken :D
//         }
//     }

//     return (
//         <>
//             { success ? (
//                 <section>
//                     <h1>Success!</h1>
//                     <p>
//                         <a href="#">Sign In</a>
//                     </p>
//                 </section>
//             ) : (
//                 <section>
//                     <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} 
//                     aria-live="assertive">{errMsg}</p>
//                     {/* aria-live="assertive" means that when this element gets the 
//                     focus it will be announced with the screen reader :) */}
//                     <h1>Register</h1>
//                     <form onSubmit={handleSubmit}>
//                         <label htmlFor="username">
//                             Username:
//                             {/* this is in case the screen reader is not working.  It looks similar :) */}
//                             <span className={ validName ? "valid" : "hide" }>
//                                 <FontAwesomeIcon icon={faCheck} />
//                             </span>
//                             <span className={ validName || !user ? "hide" : "invalid"}>
//                                 <FontAwesomeIcon icon={faTimes} />
//                             </span>
//                         </label> {/* htmlFor needs to match the id of the input :) */}
//                         <input 
//                             type="text"
//                             id="username"
//                             ref={userRef}
//                             autoComplete="off"
//                             onChange={ (e) => setUser(e.target.value) }
//                             required
//                             aria-invalid={ validName ? "false" : "true" } 
//                             aria-describedby="uinote"
//                             onFocus={ () => setUserFocus(true) }
//                             onBlur={ () => setUserFocus(false) }
//                         />
//                         <p id="uidnote" className={userFocus && user && 
//                         !validName ? "instructions" : "offscreen"}>
//                             <FontAwesomeIcon icon={ faInfoCircle } />
//                             4 to 24 characters.<br />
//                             Must begin with a letter.<br />
//                             Letters, numbers, underscores, hyphens allowed.
//                         </p>

//                         <label htmlFor="password">
//                             Password:
//                             <FontAwesomeIcon icon={faCheck} className={ validPwd? "valid" : "hide" } />
//                             <FontAwesomeIcon icon={faTimes} className={ validPwd || !pwd ? "hide" : "invalid" } />
//                         </label>
//                         <input 
//                             type="password"
//                             id="password"
//                             onChange={ (e) => setPwd(e.target.value) }
//                             required
//                             aria-invalid={validPwd ? "false" : "true" }
//                             aria-describedby="pwdnote"
//                             onFocus={ () => setPwdFocus(true) }
//                             onBlur={ () => setPwdFocus(false) }
//                         />
//                         <p id="pwdnote" className={ pwdFocus && !validPwd ? "instructions" : "offscreen" }>
//                             <FontAwesomeIcon icon={faInfoCircle} />
//                             8 to 24 characters.<br />
//                             Must include uppercase and lowercase letters, a number, and a special character.<br />
//                             Allowed special characters: <span aria-label="exclamation mark">!</span>
//                             <span aria-label="at symbol">@</span>
//                             <span aria-label="hashtag">#</span>
//                             <span aria-label="dollar sign">$</span>
//                             <span aria-label="percent">%</span>
//                         </p>

//                         <label htmlFor="confirm_pwd">
//                             Confirm Password:
//                             <span className={validMatch && matchPwd ? "valid" : "hide" }>
//                                 <FontAwesomeIcon icon={faCheck} />
//                             </span>
//                             <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
//                                 <FontAwesomeIcon icon={faTimes} />
//                             </span>
//                         </label>
//                         <input 
//                             type="password"
//                             id="confirm_pwd"
//                             onChange= { (e) => setMatchPwd(e.target.value) }
//                             required
//                             aria-invalid={ validMatch ? "false" : "true" }
//                             aria-describedby="confirmnote"
//                             onFocus = { ()=> setMatchFocus(true) }
//                             onBlur={ ()=> setMatchFocus(false) }
//                         />
//                         <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
//                             <FontAwesomeIcon icon={faInfoCircle} />
//                             Must match the first password input field.
//                         </p>

//                         <button disabled={ !validName || !validPwd || !validMatch ? true : false }>Sign Up</button>
//                     </form>
//                     <p>
//                         Already registered?<br />
//                         <span className="line">
//                             {/* put router link here */}
//                             <a href="#">Sign In</a>
//                         </span>
//                     </p>
//                 </section>
//             )}
//         </>
//     )
// }

// export default Register;

// //aria-invalid lets formreader announce if the form needs adjustment before submission
// //aria-describedby lets us provide another element which describes the input field :)
// //we can put the requirements needed by a screen reader here :)
// //"offscreen" means it is moved to an absolute position off screen.  It is different than display: none
// //...which would remove it from the... dom?
// //"hide" will set the display to none.
// //we use a bunch of span aria-label (attribute) so that the screen reader can read the special character, so to speak :)
