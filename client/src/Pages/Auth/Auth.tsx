import React, { FC, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
//  css imports
import "./auth.css";

const Auth: FC = () => {
	const [singIn, setSingIn] = useState(true);
	const [FormData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: ""
	});
	return (
		<div className='auth--container'>
			<div className='auth--form'>
				<div className='auth--title'>
					<FaSignInAlt className='auth--icon' size='40' />
					<h1>{singIn ? "Sing in" : "Sing up"}</h1>
				</div>
				<form>
					<div className='auth--form-group'>
						{singIn ? null : (
							<>
								<div className='auth-input'>
									<label htmlFor='firstname'>First name</label>
									<input
										type='text'
										id='firstname'
										value={FormData.firstName}
										onChange={(e) => setFormData({ ...FormData, firstName: e.target.value })}
									/>
								</div>
								<div className='auth-input'>
									<label htmlFor='lastname'>Last name</label>
									<input
										type='text'
										id='lastname'
										value={FormData.lastName}
										onChange={(e) => setFormData({ ...FormData, lastName: e.target.value })}
									/>
								</div>
							</>
						)}
						<div className='auth-input'>
							<label htmlFor='email'>Email</label>
							<input
								type='email'
								id='email'
								value={FormData.email}
								onChange={(e) => setFormData({ ...FormData, email: e.target.value })}
							/>
						</div>
						<div className='auth-input'>
							<label htmlFor='password'>Password</label>
							<input
								type='password'
								id='password'
								value={FormData.password}
								onChange={(e) => setFormData({ ...FormData, password: e.target.value })}
							/>
						</div>
						{singIn ? null : (
							<div className='auth-input'>
								<label htmlFor='repassword'>Repeat Password</label>
								<input
									type='password'
									id='repassword'
									value={FormData.confirmPassword}
									onChange={(e) => setFormData({ ...FormData, confirmPassword: e.target.value })}
								/>
							</div>
						)}

						<div
							className='auth-submit'
							onClick={(e) => {
								e.preventDefault();
								console.log(FormData);
							}}>
							<p>{singIn ? "Sing in" : "Sing up"}</p>
						</div>
					</div>
				</form>
				<div className='auth--signin--signup'>
					<div onClick={() => setSingIn(!singIn)}>
						{singIn ? "Don't Have Account Yet!!!" : "Already Have Account!!! "}
					</div>
				</div>
			</div>
		</div>
	);
	// }
};

export default Auth;
