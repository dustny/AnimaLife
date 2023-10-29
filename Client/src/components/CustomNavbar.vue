<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark"
    style="background-color: black"
  >
    <a class="navbar-brand" href="#" style="position: relative">
      <img src="../assets/FrogIcon.jpg" height="70" width="150" alt="Logo" />
    </a>
    <a class="navbar-brand" href="#">
      <img
        src="../assets/Logo.png"
        height="70"
        width="150"
        alt="Logo"
        style="position: absolute; top: 10px; left: 90px; z-index: 1"
      />
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link" style="margin-right: 10px"
            >HOME</router-link
          >
        </li>
        <li class="nav-item region">
          <a class="nav-link" href="#">REGION</a>
          <ul class="submenu">
            <li><RouterLink to="/africa">AFRICA</RouterLink></li>
            <li><RouterLink to="/america">AMERICA</RouterLink></li>
            <li><RouterLink to="/antartica">ANTARCTICA</RouterLink></li>
            <li><RouterLink to="/australia">AUSTRALIA</RouterLink></li>
            <li><RouterLink to="/asia">ASIA</RouterLink></li>
            <li><RouterLink to="/europe">EUROPE</RouterLink></li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link to="/fun" class="nav-link" style="margin-right: 10px"
            >FUN FACTS</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/search" class="nav-link" style="margin-right: 10px"
            >SEARCH</router-link
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link nav-item-contact"
            href="#"
            style="margin-right: 10px"
            >CONTACT US</a
          >
        </li>
      </ul>
    </div>
    <div class="navbar-nav ml-auto">
      <router-link
        v-if="!isLogin"
        to="/login"
        class="btn btn-primary"
        style="margin-right: 10px"
        >Login</router-link
      >
      <router-link
        v-if="isLogin"
        to="/update"
        class="btn btn-success"
        style="margin-right: 10px"
        >Update Profile</router-link
      >
      <button
      v-if="isLogin"
        class="btn btn-warning"
        style="margin-right: 10px"
        @click="logout"
      >
        Logout
      </button>
      <router-link
        to="/subscribe"
        class="btn btn-danger"
        style="margin-right: 10px"
        >Subscribe</router-link
      >
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useIndexStore } from "../stores/index";
export default {
  name: "CustomNavbar",
  methods: {
    ...mapActions(useIndexStore, ["logout"]),
  },
  computed: {
    ...mapState(useIndexStore, ["access_token"]),
    isLogin() {
      return this.access_token ? true : false;
    },
  },
};
</script>

<style>
.nav-item-contact::before {
  content: "AnimaLife@gmail.com 02165423584";
  position: absolute;
  top: 60px;
  width: 200px;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid #000;
  border-radius: 5px;
  display: none;
  white-space: normal;
  font-size: 14px;
  z-index: 1;
  text-align: left;
}
.nav-item:hover,
.nav-item:active,
.nav-item:focus {
  font-weight: bold;
  color: black;
  border-bottom: 2px solid black;
}
.nav-item-contact:hover::before,
.nav-item-contact:focus::before {
  display: block;
  opacity: 1;
}

.navbar {
  font-size: 25px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: 600;
}

.submenu {
  display: none;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid #ccc;
  border-radius: 25px;
}

.submenu a {
  text-decoration: none;
  color: #000;
}

.region:hover .submenu {
  display: block;
}
</style>