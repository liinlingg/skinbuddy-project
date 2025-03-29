export default{
	logoutFunction() {
		removeValue("user");
		closeModal(Modal1.name);
		showAlert("Logged out successfully!", "success");
		navigateTo("LoginPage");
		return;
	}
}