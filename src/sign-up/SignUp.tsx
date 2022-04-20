import React, { MutableRefObject, useEffect, useRef } from "react";
import { Link, useNavigate} from "react-router-dom";
import "./SignUp.css";

interface NewUser{
    firstName?:string
    lastName?:string
    email?:string
    password?:string
    birthDate?:string
}

export function SignUp(){
    var newUser:NewUser = {}
    const navigate = useNavigate()

    const [firstName, setFirstName]:any = React.useState();
    const [lastName, setLastName]:any = React.useState();
    const [email, setEmail]:any = React.useState();
    const [confirmEmail, setConfirmEmail]:any = React.useState();
    const [password, setPassword]:any = React.useState();
    const [confirmPassword, setConfirmPassword]:any = React.useState();
    const [birthDate, setBirthDate]:any = React.useState();
    
    const [firstNameErrorMessage, setFirstNameErrorMessage]:any = React.useState();
    const [lastNameErrorMessage, setLastNameErrorMessage]:any = React.useState();
    const [emailErrorMessage, setEmailErrorMessage]:any = React.useState();
    const [ageErrorMessage, setBirthDateErrorMessage]:any = React.useState();
    const [passwordErrorMessage, setPasswordErrorMessage]:any = React.useState();
    
    var formInfo = [
        {
            ref: useRef(firstName),
         },  {
            ref: useRef(lastName),
         },
         {
            ref: useRef(email),
         },
         {
            ref: useRef(confirmEmail),
         },
         {
            ref: useRef(password),
         },
         {
            ref: useRef(confirmPassword),
         },
         {
            ref: useRef(birthDate),
         },
    ]

    const validateUserName = (fName:string, lName:string) => {

        if (!fName || fName.trim().length <= 1){
            errorLogger([formInfo[0].ref], setFirstNameErrorMessage,  "First name At least 2 characters")
            return false;
        }
        errorLogger([formInfo[0].ref], setFirstNameErrorMessage, "")

        if (!lName || lName.trim().length <= 1){
            errorLogger([formInfo[1].ref ],setLastNameErrorMessage,"Last name must be at least 2 characters")
            return false;
        }
        errorLogger([formInfo[1].ref], setLastNameErrorMessage, "");

        return true;
    }

    const validateEmail = (userEmail: string) =>{
        if (!userEmail || userEmail.trim() !== confirmEmail?.trim()){
            errorLogger([formInfo[2].ref, formInfo[3].ref], setEmailErrorMessage, "Emails don't much")
            return false;
        }

        if (!userEmail.includes('@')){
            errorLogger([formInfo[2].ref, formInfo[3].ref], setEmailErrorMessage, "Not a valid email")
            return false
        } 
        if (userEmail.length < 3){
            errorLogger([formInfo[2].ref, formInfo[3].ref], setEmailErrorMessage, "Email must be at least 3 characters")
            
            return false;
        }
        errorLogger([formInfo[2].ref, formInfo[3].ref], setEmailErrorMessage, "")
        return true
    }

    const validateDateOfBirth = (dob: any) => {
        if (!dob){
            errorLogger([formInfo[6].ref], setBirthDateErrorMessage, "You must select a birth date")
            return false;
        } 
        
        var currentYear:number = new Date().getFullYear();
        var bornYear = currentYear - parseInt(dob.substr(0,4));
        
        if ( bornYear <= 17){
            errorLogger([formInfo[6].ref], setBirthDateErrorMessage, "Your must be 17 years old or older!")
            return false;
        }
           
        errorLogger([formInfo[6].ref], setBirthDateErrorMessage, "");

        return true;
    }

    const validatePassword = (passCode:string) => {
        var specialCharacters = 
            [
                "!", "@", "$", 
                '%', '&', '*', 
                '+', '-', '/',
                '=', '?','^', 
                '_', '|'
            ]
        //If a password contains any special character(s)
        var containsSC = false

        if (!passCode || passCode.trim() !== confirmPassword?.trim()){
            errorLogger([formInfo[4].ref, formInfo[5].ref], setPasswordErrorMessage, "Passwords don't match")
            return false;
        } 
     
        if (passCode.length <= 9 && passCode.length<=20){
            errorLogger([formInfo[4].ref, formInfo[5].ref], setPasswordErrorMessage, "Password must be at least 9 characters")
            return false;
        }

        for (const specialC of specialCharacters) {
            //At least one special character needs to match
            if (passCode.includes(specialC)){
                containsSC = true;
                break
            } 
        }

        if (!containsSC){
            errorLogger([formInfo[4].ref, formInfo[5].ref], setPasswordErrorMessage, 'Password must include: \n'+ specialCharacters)
            return false
        }

        errorLogger([formInfo[4].ref, formInfo[5].ref], setPasswordErrorMessage, '')
        return true
    }

    /**
     * 
     * @returns 
     * Can't push add a new user to MySQL database server if all the the conditions
     * don't satisfy
     */
    const validate = () => {

        if (!validateUserName(firstName, lastName) || 
            !validateEmail(email) || !validatePassword(password)
            || !validateDateOfBirth(birthDate)){
            return;
        }
        addNewUser()
        
    }
    
    const addNewUser = async() => {
        await fetch(`http://localhost:3306/add/user?firstName=${firstName}&lastName=${lastName}&passCode=${password}&email=${email}&birthDate=${birthDate}`)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            for (const field of formInfo) {
                field.ref.current.value = ''
                field.ref.current.style.border = "none"
            }
            setFirstName('')
            setLastName('')
            setEmail('')
            setBirthDate('')
            setPassword('')
        })
        .then(_=> {
            navigate('/homepage')
        }).
        catch(e => console.log("Something went went ", e))
    }

    useEffect(() => {
        newUser  ={
            ...newUser,
            firstName, lastName, email,  password,  birthDate
        }
        // return () => {
        //   cleanup
        // }
    }, [firstName, lastName, email, confirmEmail, password, confirmPassword])

    return (
        <div className="container__sign__up centered">
            <div className="--form__modal">

                <div className="header centered">
                    <h1 className="sign__in__title ">
                        SIGN UP 
                    </h1>
                </div>

                <div className="content">
                        
                    <label htmlFor="first__name">
                        <em className="error">
                        {firstNameErrorMessage} <br />
                        </em>
                        <input 
                            ref={formInfo[0].ref}
                            id="first__name"
                            type="text"
                            placeholder="First Name"
                            onInput={(e) => setFirstName( e.currentTarget.value)}
                            maxLength={25}
                            minLength={2}
                            required/>
                    </label>
                    <label htmlFor="last__name">
                        <em className="error">
                        {lastNameErrorMessage} <br />
                        </em>
                        <input 
                            ref={formInfo[1].ref}
                            id="last__name"
                            type="text"
                            placeholder="Last Name"
                            onInput={(e) => setLastName(e.currentTarget.value)}
                            maxLength={25}
                            minLength={2}
                            required/>
                    </label>
                
                    <label htmlFor="email">
                        <em className="error">
                            {emailErrorMessage} <br />
                        </em>
                        <input 
                            ref={formInfo[2].ref}
                            id="email"
                            type="email"
                            placeholder="Email"
                            onInput={(e) => setEmail( e.currentTarget.value)}
                            maxLength={50}
                            minLength={3}
                            required/>
                    </label>
                    <label htmlFor="confirm__email">
                        <em className="error">
                            {emailErrorMessage} <br />
                        </em>
                        <input 
                            ref={formInfo[3].ref}
                            id="confirm__email"
                            type="email"
                            placeholder="Confirm Email"
                            onInput={(e) => setConfirmEmail(e.currentTarget.value)}
                            maxLength={50}
                            minLength={3}
                            required/>
                    </label>
                
                    <label htmlFor="password">
                        <input 
                            ref={formInfo[4].ref}
                            id="password"
                            type="password"
                            placeholder="Password"
                            onInput={(e) => setPassword( e.currentTarget.value)}
                            maxLength={20}
                            minLength={10}
                            required/> <br />
                            <em className="error">
                                {passwordErrorMessage}
                            </em>
                    </label>
                    <label htmlFor="confirm__password">
                        <input 
                            ref={formInfo[5].ref}
                            id="confirm__password"
                            type="password"
                            placeholder="Confirm Password"
                            onInput={(e) => setConfirmPassword(e.currentTarget.value)}
                            maxLength={20}
                            minLength={10}
                            required/> <br /> 
                            <em className="error">
                        {passwordErrorMessage}
                        </em>
                    </label>
        
                    <span className="centered">
                        Date of Birth: 
                    </span>
                    <label 
                        className="birth__date space__between" 
                        htmlFor="birth__date">
                        <input 
                            ref={formInfo[6].ref}
                            id="birth__date"
                            type="date"
                            onChange={(e) => setBirthDate(e.currentTarget.value )}
                            maxLength={20}
                            minLength={10}
                            required/> <br />
                            <em className="error">
                                {ageErrorMessage} 
                            </em> 
                    </label>
                    <div className="sign_in_or_up centered space__around">
                        <button 
                            className="sign__up--btn"
                            onClick={() => validate() }>
                            Sign Up  
                        </button>
                        <a className="__sign__in--anchor item__centered">
                            <Link 
                                to="/sign-in">
                                Sign In 
                            </Link>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}


/**
 * 
 * @param ref This will allow us to access and manipulate DOM
 * @param setMessage This will be called to set new states
 * @param message new state message value
 */
export function errorLogger( ref: MutableRefObject<any>[], setMessage: Function, message: string) {
   
    var messLen:boolean = message.trim().length === 0

    ref.map(r => r.current.style.border = !messLen ? "2px solid red": 'none');
   
    setMessage(message)
}