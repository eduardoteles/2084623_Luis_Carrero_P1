<template>
  <div class="container">
    <div class="group">
      <svg viewBox="0 0 24 24" aria-hidden="true" class="search-icon">
        <g>
          <path
            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
          </path>
        </g>
      </svg>

      <input id="query" class="input" type="search" placeholder="Procurar..." name="searchbar" v-model="searchTerm"
        @keypress.enter="searchTeam" />
    </div>

    <div class="card" v-if="showCard">
      <div class="bg"></div>
      <div class="blob"></div>
      <div v-if="filteredTeams.length > 0">
        <div v-for="(team, index) in filteredTeams" :key="index"
          style="display: flex; flex-direction: column; align-items: center; color: black; position: relative; z-index: 1112;">
          <img :src="team.team_logo" alt="Team Logo" style="height: 35%; width: 35%" />
          <div>Posição: {{ team.standing_place }}</div>
          <div>Temporada: {{ team.league_season }}</div>
          <div v-for="(league, index) in league" :key="index">
            <div v-if="team.league_key == league.league_key">
              <div>Liga: {{ league.league_name }}</div>
              <div>País: {{ league.country_name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else
        style="color: black; position: relative; z-index: 1112; display: flexbox; justify-content: center; align-items: center;">
        <h1>Nenhuma Equipa Encontrada</h1>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
const searchTerm = ref('');
const result = ref(null);
const league = ref(null);
const showCard = ref(false);
const filteredTeams = ref([]);
const APIkey = "3ab779c37c8ccdd7e0d7f7f07652d0417bf4ecf63b4c2dc7edf3a7de2da47a7a";
const leagueId = 177;
const searchTeam = () => {
  showCard.value = true;
  teamleague();
  fetch(`https://apiv2.allsportsapi.com/football/?met=Standings&APIkey=${APIkey}&leagueId=${leagueId}`)
    .then((response) => response.json())
    .then((data) => {
      result.value = data.result;
      filteredTeams.value = [];
      for (let i = 0; i < result.value.total.length; i++) {
        if (searchTerm.value.toLowerCase() === result.value.total[i].standing_team.toLowerCase()) {
          filteredTeams.value.push(result.value.total[i]);
        }
      }
    })
    .catch((error) => console.error("Error:", error));
};
const teamleague = () => {
  fetch(`https://apiv2.allsportsapi.com/football/?met=Leagues&APIkey=${APIkey}`)
    .then((response) => response.json())
    .then((data) => {
      league.value = data.result;
    })
    .catch((error) => console.error("Error:", error)
    );
};
</script>



<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}


table {
  color: #000;
  position: relative;
  z-index: 1112;
}

.card {
  position: relative;
  width: 200px;
  height: 250px;
  border-radius: 14px;
  z-index: 1111;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 50%;
  margin-top: 50px;
}

.bg {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 190px;
  height: 240px;
  z-index: 2;
  background: rgba(255, 255, 255, .95);
  backdrop-filter: blur(24px);
  border-radius: 10px;
  overflow: hidden;
  outline: 2px solid rgb(31, 31, 31);
}

.blob {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #03a386;
  opacity: 1;
  filter: blur(12px);
  animation: blob-bounce 5s infinite ease;
}

@keyframes blob-bounce {
  0% {
    transform: translate(-100%, -100%) translate3d(0, 0, 0);
  }

  25% {
    transform: translate(-100%, -100%) translate3d(100%, 0, 0);
  }

  50% {
    transform: translate(-100%, -100%) translate3d(100%, 100%, 0);
  }

  75% {
    transform: translate(-100%, -100%) translate3d(0, 100%, 0);
  }

  100% {
    transform: translate(-100%, -100%) translate3d(0, 0, 0);
  }
}

.group {
  display: flex;
  line-height: 28px;
  align-items: center;
  position: absolute;
  max-width: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: -120px;
}

.input {
  font-family: "Montserrat", sans-serif;
  width: 100%;
  height: 45px;
  padding-left: 2.5rem;
  box-shadow: 0 0 0 1.5px #2b2c37, 0 0 25px -17px #000;
  border: 0;
  border-radius: 12px;
  background-color: #16171d;
  outline: none;
  color: #bdbecb;
  transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1);
  cursor: text;
  z-index: 0;
}

.input::placeholder {
  color: #bdbecb;
}

.input:hover {
  box-shadow: 0 0 0 2.5px #2f303d, 0px 0px 25px -15px #000;
}

.input:active {
  transform: scale(0.95);
}

.input:focus {
  box-shadow: 0 0 0 2.5px #2f303d;
}

.search-icon {
  position: absolute;
  left: 1rem;
  fill: #bdbecb;
  width: 1rem;
  height: 1rem;
  pointer-events: none;
  z-index: 1;
}
</style>