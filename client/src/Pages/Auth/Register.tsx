import React, { FC } from "react";

interface FormData {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface Props {
	FormDataS: FormData;
	setFormDataS: (data: FormData) => void;
}

const Register: FC<Props> = ({ FormDataS, setFormDataS }) => {
	return (
		<div>
			<div className='auth-input'>
				<label htmlFor='firstname'>First name</label>
				<input
					type='text'
					id='firstname'
					value={FormDataS.firstname}
					onChange={(e) => setFormDataS({ ...FormDataS, firstname: e.target.value })}
				/>
			</div>
			<div className='auth-input'>
				<label htmlFor='lastname'>Last name</label>
				<input
					type='text'
					id='lastname'
					value={FormDataS.lastname}
					onChange={(e) => setFormDataS({ ...FormDataS, lastname: e.target.value })}
				/>
			</div>

			<div className='auth-input'>
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					id='email'
					value={FormDataS.email}
					onChange={(e) => setFormDataS({ ...FormDataS, email: e.target.value })}
				/>
			</div>
			<div className='auth-input'>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					id='password'
					value={FormDataS.password}
					onChange={(e) => setFormDataS({ ...FormDataS, password: e.target.value })}
				/>
			</div>

			<div className='auth-input'>
				<label htmlFor='repassword'>Repeat Password</label>
				<input
					type='password'
					id='repassword'
					value={FormDataS.confirmPassword}
					onChange={(e) => setFormDataS({ ...FormDataS, confirmPassword: e.target.value })}
				/>
			</div>
		</div>
	);
};

export default Register;
