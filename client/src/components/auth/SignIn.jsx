import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authenticate, signin } from './auth-helper';

const SignIn = () => {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		email: '',
		password: '',
		error: ''
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues((prev) => ({ ...prev, [name]: value, error: '' }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await signin({
			email: values.email,
			password: values.password
		});

		if (!response || !response.success) {
			setValues((prev) => ({
				...prev,
				error: response?.message || 'Sign in failed. Please try again.'
			}));
			return;
		}

		authenticate(
			{
				token: response.token,
				data: response.data
			},
			() => navigate('/projects/list')
		);
	};

	return (
		<div className="auth-page">
			<div className="auth-card">
				<h2>Sign In</h2>
				<p>Welcome back. Please sign in to continue.</p>

				<form className="auth-form" onSubmit={handleSubmit}>
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={values.email}
						onChange={handleChange}
						required
					/>

					<input
						type="password"
						name="password"
						placeholder="Password"
						value={values.password}
						onChange={handleChange}
						required
					/>

					<button type="submit">Sign In</button>
				</form>

				{values.error && <div className="auth-error">{values.error}</div>}

				<p className="auth-footer">
					Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
				</p>
			</div>
		</div>
	);
};

export default SignIn;
