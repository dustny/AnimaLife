<template>
  <div>
    <div id="header">
      <h1 style="font-weight: 800">Welcome to AnimaLife</h1>
    </div>

    <img src="../../src/assets/Lions.gif" id="lion-image" alt="Singa" />

    <div id="description" class="max-width">
      <p>
The Animal Encyclopaedia with loads of facts, images, definitions!
We are dedicated to bringing you the latest information on animals from around the world. Dive into the world of animals, discover new species, and learn fascinating facts about their habitats and behaviors. Enjoy your exploration!
      </p>
    </div>
    <button class="open-button" @click="openChat">Open Chat</button>
    <div class="form-popup" v-if="chatOpen">
      <form @submit.prevent="handleMessage" class="form-container">
    <h1>Chat</h1>
    
    <div class="chat-messages-container">
      <div v-for="(message, index) in messages" :key="index" :message="msg" :class="message.sender">
        {{message.text}}
      </div>
    </div>
    
    <label for="msg"><b>Message</b></label>
    <textarea v-model="message" placeholder="Type message.." name="msg" required></textarea>

    <button type="submit" class="btn">Send</button>
    <button type="button" class="btn cancel" @click="closeChat">Close</button>
  </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useIndexStore } from "../stores/index";
export default {
  name: "HomeView",
  computed:{ 
    ...mapState(useIndexStore, ["messages"]),
  },
  data() {
    return {
      chatOpen: false,
      message: "",
    };
  },
  methods: {
    ...mapActions(useIndexStore, ["sendMessage", "reveiveMessage"]),
    openChat() {
      this.chatOpen = true;
    },
    closeChat() {
      this.chatOpen = false;
    },
    handleMessage() {
      this.reveiveMessage(this.message)
      this.sendMessage(this.message)
      this.message = "";
    },
  },
};
</script>

<style>
body {
  background-color: #000;
  color: #fff;
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 0;
  padding: 0;
}

#header {
  padding: 20px;
}

#lion-image {
  width: 800px;
  margin: 0 auto;
  display: block;
}

#description {
  padding: 100px;
  font-size: 30px;
  text-align: center;
  margin: 0 auto;
}

.open-button {
  background-color: #555;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  bottom: 23px;
  right: 28px;
  width: 280px;
}

.form-popup {
  position: fixed;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
}

.form-container {
  max-width: 300px;
  padding: 10px;
  background-color: white;
}

.form-container textarea {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
  resize: none;
  min-height: 200px;
}

.form-container textarea:focus {
  background-color: #ddd;
  outline: none;
}

.form-container .btn {
  background-color: #04aa6d;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;
  opacity: 0.8;
}

.form-container .cancel {
  background-color: red;
}

.form-container .btn:hover,
.open-button:hover {
  opacity: 1;
}

.max-width {
  max-width: 800px; 
  margin: 0 auto;
  padding: 20px;
  font-size: 30px;
  text-align: center;
}

.user {
  text-align: left;
  background-color: #2196F3;
  color: white;
  border-radius: 5px;
  margin: 5px;
  padding: 5px 10px;
}

.bot {
  text-align: right;
  background-color: #f1f1f1;
  color: #333;
  border-radius: 5px;
  margin: 5px;
  padding: 5px 10px;
}

.chat-messages-container {
  max-height: 300px; 
  overflow-y: scroll;
}
</style>