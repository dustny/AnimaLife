<template>
  <div class="container" style="margin-top: 150px">
    <div class="row">
      <div class="col-12 center-container">
        <div class="box-container">
          <label for="label-box" style="font-size: 50px">SEARCH ANIMALS</label>
          <form @submit.prevent="handleSearch">
            <div class="form-row align-items-center">
              <div class="col-5 mx-auto">
                <input type="text" class="form-control" required v-model="name"/>
              </div>
              <div class="col-auto">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
          <div
            class="image-container mt-4"
            style="border-radius: 10px"
          >
            <div class="content-container">
              <img
                :src="animalSearch.image"
                alt="Gambar Anda"
                class="fun-fact-image"
                v-if="animalSearch.animal"
              />
              <p class="fun-fact-text" style="font-size: 25px" v-if="animalSearch">
                <template v-if="animalSearch.animal">
                  Animal you search <span>{{ animalSearch.animal.name }}</span> weight around <span>{{ animalSearch.animal.characteristics.weight }}</span> live around <span>{{ animalSearch.animal.characteristics.location }}</span>, and the biggest threat is <span>{{ animalSearch.animal.characteristics.biggest_threat }}</span>. this animal has class <span>{{ animalSearch.animal.taxonomy.class }}</span> family of {{ animalSearch.animal.taxonomy.family }} and scientific_name of {{ animalSearch.animal.taxonomy.scientific_name }}
                </template>
                <template v-else>
                  Please type what you want to search above can be a specific animal.
                </template>
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
  name: "SearchAnimal",
  data() {
    return {
        name: '',
    }
  },
  computed: {
    ...mapState(useIndexStore, ["animalSearch"]),
  },
  methods: {
    ...mapActions(useIndexStore, ["getSearchAnimal"]),
    handleSearch(){
      this.getSearchAnimal(this.name)
    }
  },
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
