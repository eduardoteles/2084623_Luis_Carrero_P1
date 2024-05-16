<template>
  <div class="about" style="display: flex; justify-content: center">
    <table v-if="result">
      <thead>
        <tr>
          <th></th>
          <th style="padding: 10px">Equipa</th>
          <th style="padding: 10px">Posição</th>
          <th style="padding: 10px">Vitorias</th>
          <th style="padding: 10px">Empates</th>
          <th style="padding: 10px">Derrotas</th>
          <th style="padding: 10px">Pontos</th>
          <th style="padding: 10px">Formação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(team, index) in result.total" :key="index">
          <td>
            <img :src="team.team_logo" alt="Team Logo" style="height: 35%; width: 35%" />
          </td>
          <td>{{ team.standing_team }}</td>
          <td>{{ team.standing_place }}</td>
          <td>{{ team.standing_W }}</td>
          <td>{{ team.standing_D }}</td>
          <td>{{ team.standing_L }}</td>
          <td>{{ team.standing_PTS }}</td>
          <td>
            <input type="checkbox" @click="fetchPlayerData(team.team_key)" id="showModal" v-model="showModal">
            <label for="showModal"></label>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showModal" class="modal">
      <div class="modal-content" v-if="teamData && teamData.length > 0" v-for="team in teamData" :key="team.team_key">
        <span @click="showModal = false" class="close">&times;</span>
        <div v-if="team.players && team.players.length > 0">
          <p> {{ team.team_name }}</p>
          <img :src="team.team_logo" alt="Team Logo" height="100">
        </div>
        <table v-if="team.players && team.players.length > 0">
          <thead>
            <tr>
              <th style="padding: 10px">Nome</th>
              <th style="padding: 10px">Idade</th>
              <th style="padding: 10px">Partidas Jogadas</th>
              <th style="padding: 10px">Golos</th>
              <th style="padding: 10px">Cartões Amarelos</th>
              <th style="padding: 10px">Cartões Vermelhos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="player in team.players" :key="player.player_key">
              <td>{{ player.player_name }}</td>
              <td>{{ player.player_age }}</td>
              <td>{{ player.player_match_played }}</td>
              <td>{{ player.player_goals }}</td>
              <td>{{ player.player_yellow_cards }}</td>
              <td>{{ player.player_red_cards }}</td>
              <td>
                <img v-if="player.player_image" :src="player.player_image" alt="Player Image" height="50">
                <span v-else>No Image</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else>
          Não há jogadores disponíveis.
        </div>
      </div>
      <div v-else>
        Não há dados disponíveis.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: null,
      showModal: false,
      teamData: null,
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
  methods: {
    fetchPlayerData(teamId) {
      const APIkey = "3ab779c37c8ccdd7e0d7f7f07652d0417bf4ecf63b4c2dc7edf3a7de2da47a7a";
      const url = `https://apiv2.allsportsapi.com/football/?met=Teams&APIkey=${APIkey}&teamId=${teamId}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.teamData = data.result;
          this.showModal = true;
        })
        .catch((error) => console.error("Error:", error));
    },
  },
};
</script>

<style>
html.dark{
  color-scheme: dark;
  .about{
    background-color: #333;
    color: #fff;
  }
  .modal-content{
    background-color: #333;
    color: #fff;
  }
}
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  display: flex;
  justify-content: center;

}

.close {
  color: #aaa;
  font-size: 50px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>