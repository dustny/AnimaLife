import axios from 'axios'
import { defineStore } from 'pinia'

const baseUrl = "https://iproject.ryanharianto.xyz"
export const useIndexStore = defineStore('index',{
  state: () => ({
    access_token : localStorage.access_token,
    animalSearch: [],
    funFacts: [],
    animalAsias: [],
    animalAfricas: [],
    animalAmericas: [],
    animalAntarticas: [],
    animalEuropes: [],
    animalAustralias: [],
    messages: []
  }),
  actions: {
    async login(inputLogin) {
      try {
        const {data} = await axios({
          method: "post",
          url: baseUrl + "/login",
          data: inputLogin,
        })
        localStorage.access_token = data.access_token
        this.access_token = data.access_token
        setTimeout(
          async function () {
             await Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Login Success",
              showConfirmButton: false,
              timer: 1500,
            });
          },500);
          this.router.push({name: "home"})
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message,
        })
        console.error(error);
      }
    },
    
    logout() {
      localStorage.clear()
      this.access_token = null
      this.router.push({name:"login"})
    },

    async register(inputRegister) {
      console.log(inputRegister)
      try {
        const {data} = await axios({
          method: "post",
          url: baseUrl + "/register",
          data: inputRegister
        })
        setTimeout(
          async function () {
            await Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Register Success",
              showConfirmButton: false,
              timer: 1500,
            });
          },500);
          console.log(data)
          this.router.push({name: "login"})
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
        console.error(error);
      }
    },

    async fetchFact() {
      try {
        const {data} = await axios({
          method: "get",
          url: baseUrl + "/fact",
          headers: {
            access_token: this.access_token
          }
        })
        this.funFacts = data
        console.log(data)
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
        console.log(error)
      }
    },
    
    async updateProfile(update) {
      console.log(update)
      try {
        const response = await axios({
          method: "put",
          url: baseUrl + `/profile`,
          headers: {
            access_token: this.access_token
          },
          data: update
        })
        setTimeout(
          async function () {
            await Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Update Success",
              showConfirmButton: false,
              timer: 1500,
            });
          },500);
        this.router.push({name: "home"})
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
        console.log(error)
      }
    },

    async getAllDataAnimal() {
      try {
        const {data} = await axios({
          method: "get",
          url: baseUrl + "/data",
          headers: {
            access_token: this.access_token
          }
        })
        this.animalAfricas =  data.africaAnimal
        this.animalAmericas = data.americaAnimal
        this.animalAsias = data.asiaAnimal
        this.animalAustralias = data.australiaAnimal
        this.animalAntarticas = data.antarticaAnimal
        this.animalEuropes = data.europeAnimal
      } catch (error) {
        console.log(error)
      }
    },

    async getSearchAnimal(name) {
      try {
        const {data} = await axios({
          method: "get",
          url: baseUrl + "/search",
          params: {
            name: name,
          },
          headers: {
            access_token: this.access_token
          },
        })
        this.animalSearch = data
      } catch (error) {
        console.error(error);
      }
    },

    async changePaymentStatus(){
      try {
        const {data} = await axios({
          url: baseUrl + '/subscription',
          method: "patch",
          headers: {
            access_token: localStorage.access_token
          }
        }) 
      } catch (error) {
        console.log(error)
      }
    },

    async subscribe(){
      try {
        const {data} = await axios({
          url: baseUrl + "/generate_midtrans_token",
          method: "post",
          headers: {
            access_token: localStorage.access_token
          }
        })
        const cb = this.changePaymentStatus
        window.snap.pay(data.token, {
          onSuccess: function(result){
            cb()
          },
        })
      } catch (error) {
        console.log(error)
      }
    },

    async sendMessage(message){
      this.messages.push({
        text: message,
        sender: 'user'
      })
    },

    async reveiveMessage(message) {
      try {
        const {data} = await axios({
          url: baseUrl + "/bot",
          method: "post",
          data: message,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.messages.push({
          text: data,
          sender: 'bot'
        })
      } catch (error) {
        console.log(error)
      }

    }
  },
  getters: {

  },
})
