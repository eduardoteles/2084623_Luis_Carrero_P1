<template>

  <div class="group">
    <svg viewBox="0 0 24 24" aria-hidden="true" class="search-icon">
      <g>
        <path
          d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
        </path>
      </g>
    </svg>

    <input
     id="query"
      class="input" 
      type="search" 
      placeholder="Procurar..."
      name="searchbar" 

     />

  </div>
  <table>
  <thead>
    <tr>
      <th>Nome da Equipe</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(team, index) in (result && result.total ? result.total : [])" :key="index">
      <td>{{ team.standing_team }}</td>

    </tr>
  </tbody>
</table>
</template>

<script>
export default {
  data() {
    return {
      result: null,
      searchTerm: "",
    };
  },
  created() {
    const APIkey ="3ab779c37c8ccdd7e0d7f7f07652d0417bf4ecf63b4c2dc7edf3a7de2da47a7a";
    const leagueId = 177;

    fetch(
      `https://apiv2.allsportsapi.com/football/?met=Standings&APIkey=${APIkey}&leagueId=${leagueId}`
    )
      .then((response) => response.json())
      .then((result) => {
        this.result = result.result;
      })
      .catch((error) => console.error("Error:", error));
  },
}; 
</script>

<style scoped>
.group {
  display: flex;
  line-height: 28px;
  align-items: center;
  position: absolute;
  max-width: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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