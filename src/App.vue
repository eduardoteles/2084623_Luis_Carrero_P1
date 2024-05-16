<template>
  <nav class="navbar">
    
    <router-link class="nav-link" to="/"><img src="./assets/GLASHS.png" alt="Logo"> </router-link>
    <router-link v-if="isLoggedIn" class="nav-link" to="/futebol">Tabela Classificação </router-link>
    <router-link v-if="isLoggedIn"  class="nav-link" to="/Search">Pesquisa Equipa</router-link>
    <router-link v-if="!isLoggedIn" class="nav-link" to="/Sign-in">Login </router-link>
    <router-link v-if="!isLoggedIn" class="nav-link" to="/Register">Registar</router-link>
    <div>
      <button class="Btn" @click="handleSignOut" v-if="isLoggedIn">
        <div class="sign">
          <svg viewBox="0 0 512 512">
            <path
              d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z">
            </path>
          </svg>
        </div>
        <div class="text">Logout</div>
      </button>
    </div>
    <DarkMode />
  </nav>
  <router-view />
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import DarkMode from './components/DarkMode.vue';

const router = useRouter();
const isLoggedIn = ref(false);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};


</script>

<style>
/* botão de logout */
.Btn {
  --black: #000000;
  --ch-black: #141414;
  --eer-black: #1b1b1b;
  --night-rider: #2e2e2e;
  --white: #ffffff;
  --af-white: #f3f3f3;
  --ch-white: #e1e1e1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: .3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: var(--night-rider);
  font-size: 14px;
}

.sign {
  width: 100%;
  transition-duration: .3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign svg {
  width: 14px;
}

.sign svg path {
  fill: var(--af-white);
}

.text {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: var(--af-white);
  font-size: 1.0em;
  font-weight: 600;
  transition-duration: .3s;
}

.Btn:hover {
  width: 125px;
  border-radius: 5px;
  transition-duration: .3s;
}

.Btn:hover .sign {
  width: 30%;
  transition-duration: .3s;
  padding-left: 20px;
}

.Btn:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: .3s;
  padding-right: 10px;
}

.Btn:active {
  transform: translate(2px, 2px);
}

html.dark {
  color-scheme: dark;

  .nav-link {
    color: #fff;
  }

  .Btn {
    --black: #ffffff;
    --ch-black: #e1e1e1;
    --eer-black: #f3f3f3;
    --night-rider: #ffffff;
    --white: #ffffff;
    --af-white: #000000;
    --ch-white: #ffffff;
  }

  body {
    background-color: #333;
  }

  .navbar {
    background-color: #121212
  }
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.navbar {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.nav-link {
  margin-right: 10px;
  text-decoration: none;
  color: #000000;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #3a3a3a;
}

.nav-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

img {
  width: 150px;
  height: 30px;
  background-color: #ffffff;
}

</style>
