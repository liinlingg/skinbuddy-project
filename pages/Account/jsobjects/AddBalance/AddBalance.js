export default {
  addBalance: async () => {
    const amount = Number(Input1.text);

    if (amount <= 0 || isNaN(amount)) {
      showAlert("Please enter a valid amount!", "error");
      return;
    }

    await UpdateBalance.run();
    showAlert("Balance updated successfully!", "success");

    // Refresh the balance display
    await pullBalance.run();
    storeValue("user", {
      ...appsmith.store.user,
      balance: pullBalance.data[0].balance
    });
  }
}
