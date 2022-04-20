import React, { useEffect } from "react";
import { 
    Link,
    useNavigate,
    Navigate
} from "react-router-dom";
import "./SignIn.css";

interface CurrentUser{
    firstName?:string
    lastName?:string
    readonly email?:string
    readonly password?:string
    birthDate?:string
    isConnected?:boolean
}

export function SignIn(){
    var navigate = useNavigate();

    var currentUser:CurrentUser = {}
    const [email, setEmail]:any = React.useState();
    const [password, setPassword]:any = React.useState();
    const [singInErrorMessage, setSingInErrorMessage]:any = React.useState();
    const [hasFailedToSignIn, setSignInError]:any = React.useState(true);
    const [isConnected, setUserConnX]:any = React.useState(false);

    const verifyCurrentUser = () => {
        fetch(`http://localhost:3306/sign_in/user?email=${email}&password=${password}`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {  email,  password, currentEmail: email }
                )
            }
        )
        .then(res => {
            console.log(res)
           return res.json()
        })
        .then(res => {
            localStorage.setItem('currentUser', `${res[0].email}`);
            console.log("Welcome buddy", res);
           setUserConnX(true)
        })
        .then(_=> navigate('/homepage'))
        .catch(e => {
            console.log("Something went went ", e);
            setSingInErrorMessage('Email or password is invalid')
            
            setTimeout( () => {
                setSingInErrorMessage('')
            }, 5000);
            setSignInError(!hasFailedToSignIn)
        })
    }

    const validate = () => {
        verifyCurrentUser()
    }

    useEffect(() => {
        currentUser  ={
            ...currentUser, email,  password,  
        }

        console.log(currentUser)
    }, [email, password, currentUser])

    return (
        <>
           {
               !isConnected ?
               <div className="container__sign__in centered">
                    <form className="--form__modal ">
    
                        <div className="header">
                            <h1 className="sign__in__title">
                                SIGN IN 
                            </h1>
                        </div>
                    <div className="content">
                        { 
                        !hasFailedToSignIn && <em 
                            className="error">
                            {singInErrorMessage}
                        </em>}
                            <input 
                                type="text" 
                                placeholder="Email" 
                                onInput={(e) => setEmail(e.currentTarget.value)}/>
                            <input 
                                type="password" 
                                placeholder="Password"  
                                onInput={(e) => setPassword(e.currentTarget.value)}/>
                            <input
                                id="sign__in--btn"
                                className="sign__in-btn" 
                                type="button" 
                                value="Sign In" 
                                onClick={ validate}/>
    
                            <a className="reset--anchor centered"
                                onClick={() => {validate()}}>
                                <Link to="/sign-up">
                                    Sign Up  
                                </Link>
                            </a>
                        
                        </div>
                    </form>
                </div>
                :
                <Navigate to="/homepage" replace={true}/>
           } 
        </>
    )
}