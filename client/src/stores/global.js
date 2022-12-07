import { defineStore } from "pinia";
import axios from 'axios'
import Swal from 'sweetalert2'

export const useGlobalStore = defineStore('global', {
  state: () => ({ 
    baseUrl: 'http://localhost:3000',
    isLogin: false,
    users: [],
    user: {
      id: null,
      email: '',
      password: '',
      fullName: '',
      dateOfBirth: '',
      city: '',
      imageProfile: '',
      status: '',
      star: null,
      BadgeId: null,
      Badge: null,
    },
    types: [],
    difficulties: [],
    activities: [],
    myActivities: [],
    exercises: {
      currentPage: 1,
      exercises: []
    },
    exerciseChoosen: {
      status: false,
      name: '',
      difficulty: '',
      type: ''
    },
    activityForm: {
      caption: "Hi! Let's stay fit with HackFit!",
      imageActivity: undefined,
    },
    loginForm: {
      email: '',
      password: ''
    },
    filterForm: {
      difficulty: '',
      type: '',
      name: ''
    }
   }),
  getters: {
    
  },
  actions: {
    async fetchUsers() {
      try {
        const { data } = await axios.get(this.baseUrl + '/users', {
          headers: { access_token: localStorage.access_token }
        })

        this.users = data.data
      } catch (error) {
        console.log(error);
      }
    },

    async fetchExercises() {
      try {
        const params = {}

        params.page = this.exercises.currentPage

        if(this.filterForm.difficulty) params.difficulty = this.filterForm.difficulty
        if(this.filterForm.type) params.type = this.filterForm.type
        if(this.filterForm.name) params.name = this.filterForm.name

        const { data } = await axios.get(this.baseUrl + '/exercises', {
          headers: { access_token: localStorage.access_token },
          params
        })

        this.exercises = data
      } catch (error) {
        console.log(error);
      }
    },

    async fetchActivities() {
      try {
        const { data } = await axios.get(this.baseUrl + '/activities', {
          headers: { access_token: localStorage.access_token }
        })

        this.activities = data.data
      } catch (error) {
        console.log(error);  
      }
    },

    async fetchActivitiesUser(id) {
      try {
        const { data } = await axios.get(this.baseUrl + '/activities/' + id + '/users', {
          headers: { access_token: localStorage.access_token }
        })

        this.myActivities = data.data
      } catch (error) {
        console.log(error);  
      }
    },

    async fetchUserLogin(id) {
      try {
        const { data } = await axios.get(this.baseUrl + '/users/' + id, {
          headers: { access_token: localStorage.access_token }
        })
  
        this.user.id = data.id
        this.user.email = data.email
        this.user.fullName = data.fullName
        this.user.dateOfBirth = new Date(data.dateOfBirth).toLocaleDateString('fr-CA')
        this.user.city = data.city
        this.user.imageProfile = data.imageProfile
        this.user.status = data.status
        this.user.star = data.star
        this.user.BadgeId = data.BadgeId
        this.user.Badge = data.Badge

      } catch (error) {
        console.log(error);
      }
    },

    async fetchTypes() {
      try {
        const { data } = await axios.get(this.baseUrl + '/types', {
          headers: { access_token: localStorage.access_token }
        })
  
        this.types = data.data
      } catch (error) {
        console.log(error);
      }
    },

    async fetchDifficulties() {
      try {
        const { data } = await axios.get(this.baseUrl + '/difficulties', {
          headers: { access_token: localStorage.access_token }
        })
  
        this.difficulties = data.data
      } catch (error) {
        console.log(error);
      }
    },

    checkIsLogin() {
      if(localStorage.access_token) {
        this.isLogin = true
        this.fetchUserLogin(localStorage.userId)
      }
    },

    goToProfile() {
      this.router.push(`/profile/${this.user.id}`)
    },

    async handleLogin() {
      try {
        const { data } = await axios.post(this.baseUrl + '/login', {
          email: this.loginForm.email,
          password: this.loginForm.password
        })

        localStorage.access_token = data.access_token
        localStorage.userId = data.userId
        this.isLogin = true
        this.fetchUserLogin(data.userId)

        Swal.fire({
          icon: 'success',
          title: 'Success to login!',
        })
        this.router.push('/home')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
        })
      }
    },

    async handleAddActivity() {
      try {
        const formData = new FormData();

        formData.append("imageActivity", this.activityForm.imageActivity);
        formData.append("caption", this.activityForm.caption);
        formData.append("name", this.exerciseChoosen.name);
        formData.append("UserId", this.user.id);
        formData.append("TypeId", this.exerciseChoosen.type.id);
        formData.append("DifficultyId", this.exerciseChoosen.difficulty.id);

        const { data } = await axios.post(this.baseUrl + '/activities', formData, {
          headers: { access_token: localStorage.access_token }
        })

        Swal.fire({
          icon: 'success',
          title: 'Success to post your activity!',
        })
        this.router.push('/home')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
        })
      }
    },

    async handleEditProfile(id) {
      try {
        const formData = new FormData();

        formData.append("imageProfile", this.user.imageProfile);
        formData.append("email", this.user.email);
        formData.append("fullName", this.user.fullName);
        formData.append("city", this.user.city);
        formData.append("dateOfBirth", this.user.dateOfBirth);
        formData.append("password", this.user.password);

        await axios.put(this.baseUrl + '/users/' + id, formData, {
          headers: { access_token: localStorage.access_token }
        })

        Swal.fire({
          icon: 'success',
          title: 'Your profile has been updated!',
        })
        this.router.push(`/profile/${id}`)
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
        })
      }
    }
  },
})