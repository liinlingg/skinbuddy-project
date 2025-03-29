export default {
	loginFunction: async () => {
		await Login.run();

		if (Login.data.length > 0) {
			const dbPassword = Login.data[0].password;
			const inputPassword = password.text.trim();

			if (dbPassword != inputPassword) {
				showAlert("Incorrect email or password", "error");
				return;
			}
			
			storeValue("user", {
				username: Login.data[0].username,
				email: Login.data[0].email,
				id: Login.data[0]._id,
				balance: Login.data[0].balance,
			});
			
			showAlert("Login Success! Redirecting to Home", "success");
			navigateTo("Home");
		} else {
			showAlert("Incorrect email or password", "error");
		}
	}
}
