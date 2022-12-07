<script>
import { mapActions } from "pinia";
import { useGlobalStore } from "@/stores/global.js";

export default {
  data() {
    return {
      responseFb: {},
    };
  },
  components: {},
  methods: {
    statusChangeCallback(response) {
      console.log("statusChangeCallback");
      console.log(response);
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
      if (response.status === "connected") {
        // Logged into your app and Facebook.
        console.log("responsenya yey", response);
        // testAPI();
      } else {
        // The person is not logged into your app or we are unable to tell.
        // document.getElementById("status").innerHTML =
        //   "Please log " + "into this app.";
        console.log("Please log in");
      }
    },

    checkLoginStatus() {
      function initFbSdk() {
        return new Promise((resolve) => {
          window.fbAsyncInit = function () {
            window.FB.init({
              appId: "717039646224402",
              cookie: true,
              xfbml: true,
              version: "v15.0",
            });

            // FB.AppEvents.logPageView();
            resolve();
          };
        });
      }

      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");

      function getFbSdk() {
        return new Promise(async (resolve) => {
          if (window.FB) {
            console.log("if");
            resolve(window.FB);
          } else {
            console.log("else");
            const init = await initFbSdk();
            console.log("iniit", init);
            resolve(window.FB);
          }
        });
      }

      getFbSdk()
        .then((res) => {
          console.log("res", res);
          this.responseFb = res;
          this.responseFb.getLoginStatus((response) => {
            if (response.status === "connected") {
              console.log("connecteeed");
              console.log("responsenya", response);
              var uid = response.authResponse.userID;
              var accessToken = response.authResponse.accessToken;
              console.log("uid", uid);
              console.log("acces", accessToken);
            } else if (response.status === "not_authorized") {
              console.log("you are logged in fb, continue with it?");
              console.log("response auth", response);
            } else {
              console.log("elsenya");
            }
          });
        })
        .catch((err) => {
          console.log("err", err);
        });

      // res.login(function (response) {
      //   if (response.authResponse) {
      //     console.log("Welcome!  Fetching your information.... ");
      //     FB.api("/me", function (response) {
      //       console.log(response);
      //       console.log("Good to see you, " + response.name + ".");
      //     });
      //   } else {
      //     console.log("User cancelled login or did not fully authorize.");
      //   }
      // });
    },

    handleLogin() {
      console.log("masuk handle login");
      if (this.responseFb.getLoginStatus) {
        this.responseFb.getLoginStatus(function (response) {
          console.log("responseeee", response);
          this.statusChangeCallback(response);
        });
      }
    },
  },
  created() {
    console.log("mulai 3");
  },
};
</script>

<template>
  <div class="flex mx-auto"></div>
  <!-- Navbar -->
  <div class="sticky top-0 bg-white z-20">
    <header aria-label="Site Header" class="container mx-auto">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex-1 md:flex md:items-center md:gap-12">
            <a class="block text-teal-600" href="/">
              <span class="sr-only">Home</span>
              <svg
                class="h-8"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>

          <div class="md:flex md:items-center md:gap-12">
            <nav aria-label="Site Nav" class="hidden md:block">
              <ul class="flex items-center gap-6 text-sm">
                <li>
                  <a
                    class="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    Home
                  </a>
                </li>

                <li>
                  <a
                    class="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    Profile
                  </a>
                </li>
              </ul>
            </nav>

            <fb:login-button
              scope="public_profile,email"
              :onlogin="this.checkLoginStatus()"
              @click.prevent="handleLogin"
            >
            </fb:login-button>

            <div class="flex items-center gap-4">
              <div class="sm:flex sm:gap-4">
                <div class="hidden sm:flex">
                  <a
                    class="rounded-md flex border-2 border-[#3b5998] bg-[#3b5998] px-5 py-2.5 text-sm font-medium text-white shadow"
                    href="/"
                  >
                    <svg
                      class="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"
                      />
                    </svg>
                    Sign in with Facebook
                  </a>
                </div>

                <div class="hidden sm:flex">
                  <a
                    class="rounded-md flex bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                    href="/"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="mr-2"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"
                      ></path>
                    </svg>
                    Sign in with Google
                  </a>
                </div>

                <div class="hidden sm:flex">
                  <a
                    class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                    href="/"
                  >
                    Logout
                  </a>
                </div>
              </div>

              <div class="block md:hidden">
                <button
                  class="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
