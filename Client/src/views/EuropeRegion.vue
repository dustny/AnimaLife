<template>
  <div class="container" style="margin-top: 150px">
    <div class="row">
      <div class="col-12 center-container">
        <div class="box-container">
          <label for="label-box" style="font-size:50px">EUROPE ANIMALS</label>
          <div class="image-container mt-4" style="border-radius: 10px" v-for="animalEurope in animalEuropes" :key="animalEurope.id">
            <div class="content-container">
              <img :src="animalEurope.imageUrl" alt="Gambar Anda" class="fun-fact-image" />
              <p class="fun-fact-text" style="font-size:25px">
                {{animalEurope.description}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useIndexStore } from "../stores/index";
export default {
  name: "FunFactView",
  computed: {
    ...mapState(useIndexStore, ["animalEuropes"]),
  },
  methods: {
    ...mapActions(useIndexStore, ["getAllDataAnimal"]),
  },
  created(){
    this.getAllDataAnimal()
  }
};
</script>

<style>
.center-container {
  text-align: center;
  padding: 20px;
}
.image-container {
  background-color: white;
  padding: 20px;
  position: relative;
}

.content-container {
  display: flex;
  align-items: center;
}

.fun-fact-box {
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px;
}
.fun-fact-text {
  color: black;
  max-height: 150px;
  margin-left: 200px;
  overflow: hidden;
  white-space: pre-line;
  word-wrap: break-word;
}

.fun-fact-image {
  width: 500px;
  height: 300px;
  object-fit: contain;
}
</style>
