export default {
  deleteAccount: async () => {
    const userId = appsmith.store.user.id;
    
    if (!userId) {
      showAlert("No user found! Please log in again.", "error");
      return;
    }

    // Confirm before deleting
    const confirmDelete = await showModal("confirmation");
    if (!confirmDelete) {
      return;
    }

    // Run delete queries
    await del_user.run();
    await del_wallet.run();
    
    // Remove stored user info
    removeValue("user");
    
    showAlert("Your account has been deleted successfully.", "success");
    
    // Redirect to login page
    navigateTo("LoginPage");
  }
}
