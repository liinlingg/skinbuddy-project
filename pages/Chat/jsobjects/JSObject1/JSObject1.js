export default {

	chatHistory: [{role: "CHATBOT", message: "How can I help you today?"}],

	async sendMessage(){
		const newMessage = { role: "USER", message: Input1.text };
		this.chatHistory.push(newMessage); 
		const reply = await addMessage.run();
		this.chatHistory.push({role:"CHATBOT", message: reply.response});
		resetWidget('Input1')
		return this.chatHistory;
	}
	
}