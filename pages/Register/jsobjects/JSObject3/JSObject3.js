export default {
  createUserFunction: async () => {
    // First check if username already exists
    await CheckUsernameQuery.run();
    if (CheckUsernameQuery.data.length > 0) {
      showAlert("Username already exists. Please choose another.", "error");
      return;
    }
    
    // Validate input fields
    if (
      !username.text.trim() ||
      !password.text.trim() ||
      !age || isNaN(Number(age)) || // Fixed age validation
      !email.text.trim() ||
      !address.text.trim()
    ) {
      showAlert("All fields are required and age must be a number", "error");
      return;
    }
    
    // Get current timestamp
    const timestamp = new Date();
    
    try {
      // Create the user in MongoDB users collection
      const result = await create_user.run({
        username: username.text.trim(),
        password: password.text.trim(),
        age: Number(age),
        email: email.text.trim(),
        address: address.text.trim(),
        role: "user", // Default role for new users
        created_at: timestamp,
      });
      
      // Check if creation was successful
      if (result) {
        // Store user data in app state using the existing "users" key
        storeValue("users", {
          username: username.text.trim(),
          password: password.text.trim(),
          age: Number(age),
          email: email.text.trim(),
          address: address.text.trim(),
          created_at: timestamp,
          role: "user",
        });
        showAlert("Account created successfully! Redirecting to Home", "success");
        navigateTo("Home");
      } else {
        showAlert("Failed to create account. Please try again.", "error");
      }
    } catch (error) {
      console.error("MongoDB insertion error:", error);
      showAlert("Failed to create account. Please try again.", "error");
    }
  },
};