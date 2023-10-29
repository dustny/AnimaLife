<template>
  <div class="login-container" style="margin-top: 150px;">
    <h2 style="color: black; font-weight:800;">REGISTER</h2>
    <form @submit.prevent="handleRegister">
      <div class="input-container mt-5">
        <label style="color: black; position: absolute; top: -30px; left: 0;" for="exampleInputPassword1" class="form-label">First Name</label>
        <input type="text" class="form-control" required v-model="inputRegister.firstName">
      </div>
      <div class="input-container mt-5">
        <label style="color: black; position: absolute; top: -30px; left: 0;" for="exampleInputPassword1" class="form-label">Last Name</label>
        <input type="text" class="form-control" required v-model="inputRegister.lastName">
      </div>
      <div class="input-container mt-5">
        <label style="color: black; position: absolute; top: -30px; left: 0;" for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required v-model="inputRegister.email">
      </div>
      <div class="input-container mt-5">
        <label style="color: black; position: absolute; top: -30px; left: 0;" for="exampleInputPassword1" class="form-label">Username</label>
        <input type="text" class="form-control" required v-model="inputRegister.username">
      </div>
      <div class="input-container mt-5">
        <label style="color: black; position: absolute; top: -30px; left: 0;" for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" required v-model="inputRegister.password">
      </div>
      <div class="input-container mt-5">
        <label style="color: black; position: absolute; top: -30px; left: 0;" for="exampleInputPassword1" class="form-label">Photo Profile</label>
        <input type="text" class="form-control" required v-model="inputRegister.photoProfile">
      </div>
      <button type="submit" class="btn btn-primary mt-4">Register</button>
    </form>
    <p class="text-center mt-4" style="color: black;">Already have account?
      <RouterLink to="/login" class="login-link" style="text-decoration:none;">Login here</RouterLink> </p>
  </div>
</template>

<script>
import {mapActions} from "pinia"
import {useIndexStore} from "../stores/index"
export default {
  name:"RegisterPage",
  data() {
    return {
      inputRegister: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        photoProfile: "",
      },
    }
  },
  methods: {
     ...mapActions(useIndexStore,["register"]),
    async handleRegister() {
      this.register(this.inputRegister)
    }
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