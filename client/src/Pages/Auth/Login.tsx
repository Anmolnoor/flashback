import React, { FC } from "react";

interface FormData {
	email: string;
	password: string;
}

interface Props {
	FormData: FormData;
	setFormData: (data: FormData) => void;
}

const Login: FC<Props> = ({ FormData, setFormData }) => {
	return (
		<div>
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
		</div>
	);
};

export default Login;
