import React, { FC, useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Store/store";
//  components imports
import Login from "./Login";
import Register from "./Register";
import Loader from "../../components/Loader/Loader";
// import actions from reduxtoolkit
import { loginUser, registerUser } from "../../Features/auth";

//  css imports
import "./auth.css";

const Auth: FC = () => {
	const dispatch = useDispatch();
	const [singInB, setSingIn] = useState(true);
	const navigate = useNavigate();
	// const [isAuth, setIsAuth] = useState(false);
	const authState = useSelector((state: RootState) => state.auth.isAuthenticated);
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
		if (authState) {
			navigate("/");
		}
	}, [authState]);

	console.log(authState);
	const stateloading = useSelector((state: RootState) => state.auth.loading);

	return (
		<div className='auth--container'>
			{stateloading ? (
				<div className='test'>
					<div className='Loader--Auth'>
						<Loader />
					</div>
				</div>
			) : (
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
			)}
		</div>
	);
	// }
};

export default Auth;
