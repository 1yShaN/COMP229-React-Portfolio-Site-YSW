import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from './auth-helper';

const SignUp = () => {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		name: '',
		email: '',
		role: 'User',
		password: '',
		confirmPassword: '',
		error: '',
		success: ''
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues((prev) => ({
			...prev,
			[name]: value,
			error: '',
			success: ''
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (values.password !== values.confirmPassword) {
			setValues((prev) => ({
				...prev,
				error: 'Passwords do not match.'
			}));
			return;
		}

		const response = await signup({
			name: values.name,
			email: values.email,
			role: values.role,
			password: values.password
		});

		if (!response || !response.success) {
			setValues((prev) => ({
				...prev,
				error: response?.message || 'Sign up failed. Please try again.'
			}));
			return;
		}

		setValues({
			name: '',
			email: '',
			role: 'User',
			password: '',
			confirmPassword: '',
			error: '',
			success: 'Account created successfully. You can now sign in.'
		});

		setTimeout(() => {
			navigate('/signin');
		}, 800);
	};

	return (
		<div className="auth-page">
			<div className="auth-card">
				<h2>Sign Up</h2>
				<p>Create your account to access protected actions.</p>

				<form className="auth-form" onSubmit={handleSubmit}>
					<input
						type="text"
						name="name"
						placeholder="Full Name"
						value={values.name}
						onChange={handleChange}
						required
					/>

					<input
						type="email"
						name="email"
						placeholder="Email"
						value={values.email}
						onChange={handleChange}
						required
					/>

					<select name="role" value={values.role} onChange={handleChange}>
						<option value="User">User</option>
						<option value="Admin">Admin</option>
					</select>

					<input
						type="password"
						name="password"
						placeholder="Password"
						value={values.password}
						onChange={handleChange}
						required
					/>

					<input
						type="password"
						name="confirmPassword"
						placeholder="Confirm Password"
						value={values.confirmPassword}
						onChange={handleChange}
						required
					/>

					<button type="submit">Sign Up</button>
				</form>

				{values.error && <div className="auth-error">{values.error}</div>}
				{values.success && <div className="auth-success">{values.success}</div>}

				<p className="auth-footer">
					Already have an account? <Link to="/signin">Sign In</Link>
				</p>
			</div>
		</div>
	);
};

export default SignUp;
