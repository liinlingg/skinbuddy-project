export default {
  createUserFunction: async () => {
    // First check if username already exists
    await CheckUsernameQuery.run();
    if (CheckUsernameQuery.data.length > 0) {
      showAlert("Username already exists. Please choose another.", "error");
      return;
    }
    
    // Validate input fields
    if (!username.text.trim() || !password.text.trim() || Number(age) || !email.text.trim() || !address.text.trim()) {
      showAlert("All fields are required", "error");
      return;
    }
    
    // Create the user
    await create_user.run({
      username: username.text.trim(),
      password: password.text.trim(),
      email: email.text.trim(),
			address: address.text.trim(),
			created_at : new Date(),
      role: "user" // Default role for new users
    });
    
    // Check if creation was successful
    if (create_user.data) {
      // Store user data in app state
      storeValue("user", {
        username: username.text.trim(),
				password: password.text.trim(),
				age: Number(age),
        email: email.text.trim(),
				address: address.text.trim(),
				created_at : new Date(),
        role: "user"
      });
      
      showAlert("Account created successfully! Redirecting to Home", "success");
      navigateTo("Home");
    } else {
      showAlert("Failed to create account. Please try again.", "error");
    }
  }
}