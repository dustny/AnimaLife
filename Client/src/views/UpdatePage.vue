<template>
  <div class="login-container" style="margin-top: 150px">
    <h2 style="color: black; font-weight: 800">UPDATE PROFILE</h2>
    <form @submit.prevent="handleUpdate">
      <div class="input-container mt-5">
        <label
          style="color: black; position: absolute; top: -30px; left: 0"
          for="exampleInputPassword1"
          class="form-label"
          >First Name</label
        >
        <input
          type="text"
          class="form-control"
          required
          v-model="inputUpdate.firstName"
        />
      </div>
      <div class="input-container mt-5">
        <label
          style="color: black; position: absolute; top: -30px; left: 0"
          for="exampleInputPassword1"
          class="form-label"
          >Last Name</label
        >
        <input
          type="text"
          class="form-control"
          required
          v-model="inputUpdate.lastName"
        />
      </div>
      <div class="input-container mt-5">
        <label
          style="color: black; position: absolute; top: -30px; left: 0"
          for="exampleInputPassword1"
          class="form-label"
          >Username</label
        >
        <input
          type="text"
          class="form-control"
          required
          v-model="inputUpdate.username"
        />
      </div>
      <div class="input-container mt-5">
        <label
          style="color: black; position: absolute; top: -30px; left: 0"
          for="exampleInputPassword1"
          class="form-label"
          >Photo Profile</label
        >
        <input
          type="text"
          class="form-control"
          required
          v-model="inputUpdate.photoProfile"
        />
      </div>
      <button type="submit" class="btn btn-primary mt-4">Update Data</button>
    </form>
  </div>
</template>

<script>
import {mapActions} from "pinia"
import {useIndexStore} from "../stores/index"
export default {
  name: "UpdatePage",
  data() {
    return {
      inputUpdate: {
        firstName: "",
        lastName: "",
        username: "",
        photoProfile: "",
      },
    };
  },
  methods: {
    ...mapActions(useIndexStore,["updateProfile"]),
    async handleUpdate() {
      this.updateProfile(this.inputUpdate);
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