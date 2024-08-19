document.getElementById("send-button").addEventListener("click", sendMessage);

// 初期メッセージを送信する
window.addEventListener("load", () => {
    const initialMessage = "こんにちは！\n何かご用でしょうか？以下の項目から選んでください。";
    const initialMessage2 = "⑴ クイズ\n⑵ ";
    addMessageToChatBox(initialMessage, "bot");
    addMessageToChatBox(initialMessage2, "bot");
});

function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    addMessageToChatBox(userInput, "user");
    document.getElementById("user-input").value = "";

    setTimeout(() => {
        const botResponse = getBotResponse(userInput);
        addMessageToChatBox(botResponse, "bot");
    }, 500);
}

function addMessageToChatBox(message, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container", sender);

    const messageElement = document.createElement("div");
    // 改行を <br> タグに変換する
    messageElement.innerHTML = message.replace(/\n/g, "<br>");
    messageElement.classList.add("message");

    const imgElement = document.createElement("img");
    imgElement.src = sender === "user" ? "user-icon.png" : "bot-icon.png";
    imgElement.alt = sender === "user" ? "User Icon" : "Bot Icon";

    if (sender === "user") {
        messageContainer.appendChild(messageElement);
        messageContainer.appendChild(imgElement);
    } else {
        messageContainer.appendChild(imgElement);
        messageContainer.appendChild(messageElement);
    }

    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(input) {
    const responses = {
        "こんにちは": "こんにちは！",
        "お元気ですか？": "元気です！あなたは？",
        "お名前は？": "私はチャットボットです。",
        "さようなら": "さようなら！またお話しましょう。"
    };
    return responses[input] || "すみません、よくわかりません。";
}
