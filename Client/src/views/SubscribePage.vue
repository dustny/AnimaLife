<template>
  <div class="login-container" style="margin-top: 150px;">
    <h2 style="color: black; font-weight:800;">SUBSCRIBE</h2>
    <div class="card-container">
      <div class="card">
        <h3>Free Plan</h3>
        <h5 class="mt-3">Visitor</h5>
        <p class="mt-4">Limited Access, Cannot use to search spesific animal</p>
      </div>
      <div class="card">
        <h3>Yearly Plan</h3>
        <h5 class="mt-3">Premium</h5>
        <p class="mt-4"> Rp 50.000 per year. Access search Animal Content.</p>
        <button class="btn btn-danger" @click.prevent="handleSubscribe">Subscribe</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useIndexStore } from "../stores/index";
export default {
  data() {
    return {
    }
  },
  methods: {
    ...mapActions(useIndexStore, ["subscribe"]),
    handleSubscribe(){
      this.subscribe()
    }
  },
};
</script>

<style>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-container {
  display: flex;
  justify-content: space-between;
  gap: 20px; /* Menambahkan jarak di antara card */
}

.card {
  flex: 1; /* Membuat card mengambil lebar yang sama */
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.btn {
  margin-top: 10px;
}
</style>