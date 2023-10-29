<template>
  <div class="login-container" style="margin-top: 150px">
    <h2 style="color: black; font-weight: 800">LOGIN</h2>
    <form @submit.prevent="handleLogin" action="">
      <div class="input-container mt-5">
        <label
          style="color: black; position: absolute; top: -30px; left: 0"
          for="exampleInputEmail1"
          class="form-label"
          >Email address</label
        >
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          required
          v-model="inputLogin.email"
        />
      </div>
      <div class="input-container mt-5">
        <label
          style="color: black; position: absolute; top: -30px; left: 0"
          for="exampleInputPassword1"
          class="form-label"
          >Password</label
        >
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          required
          v-model="inputLogin.password"
        />
      </div>
      <button type="submit" class="btn btn-primary mt-4">Login</button>
    </form>
    <p class="text-center mt-4" style="color: black">
      Don't have account yet?
      <RouterLink to="/register" class="login-link" style="text-decoration: none">Register here</RouterLink >
      
    </p>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useIndexStore } from "../stores/index";
export default {
  name: "loginPage",
  data() {
    return {
      inputLogin: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(useIndexStore,["login"]),
    async handleLogin() {
      this.login(this.inputLogin)
    },
  },
};
</script>

<style>
.login-container {
  display: flex;
  background-color: #f5f5f5;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: 0 auto;
  height: 35m;
  overflow-y: auto;
}

.form-group {
  margin: 10px 0;
}

.input-container {
  position: relative;
  margin: 10px 0;
}
</style>