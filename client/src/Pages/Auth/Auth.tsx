import React, { FC, useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Store/store";
//  components imports
import Login from "./Login";
import Register from "./Register";

// import actions from reduxtoolkit
import { loginUser, registerUser } from "../../Features/auth";

//  css imports
import "./auth.css";

const Auth: FC = () => {
	const dispatch = useDispatch();
	const [singInB, setSingIn] = useState(true);
	const navigate = useNavigate();
	// const [isAuth, setIsAuth] = useState(false);
	const state = useSelector((state: RootState) => state.auth);
	const [FormData, setFormData] = useState({
		email: "",
		password: ""
	});

	const [FormDataS, setFormDataS] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		confirmPassword: ""
	});
	const submitHandler = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();
		console.log("submit");
		singInB ? dispatch(loginUser(FormData)) : dispatch(registerUser(FormDataS));
	};

	useEffect(() => {
		if (state?.isAuthenticated) {
			navigate("/");
		}
	}, [state?.isAuthenticated]);

	console.log(state.isAuthenticated);

	return (
		<div className='auth--container'>
			<div className='auth--form'>
				<div className='auth--title'>
					<FaSignInAlt className='auth--icon' size='40' />
					<h1>{singInB ? "Sing in" : "Sing up"}</h1>
				</div>
				<form>
					<div className='auth--form-group'>
						{singInB ? (
							<Login FormData={FormData} setFormData={setFormData} />
						) : (
							<Register FormDataS={FormDataS} setFormDataS={setFormDataS} />
						)}
						<div className='auth-submit' onClick={submitHandler}>
							<p>{singInB ? "Sing in" : "Sing up"}</p>
						</div>
					</div>
				</form>
				<div className='auth--signin--signup'>
					<div onClick={() => setSingIn(!singInB)}>
						{singInB ? "Don't Have Account Yet!!!" : "Already Have Account!!! "}
					</div>
				</div>
			</div>
		</div>
	);
	// }
};

export default Auth;
