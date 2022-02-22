<template>
  <div>
    <h2>Mes trucs</h2>
    <button class="btn btn-primary" @click="loadTrucs()">Mettre à jour</button>
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Age</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="truc in trucs">
        <td>{{ truc.name }}</td>
        <td>{{ truc.age }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      socket: null,
      trucs: []
    }
  },
  mounted (){
    this.initSocket();
  },
  methods: {
    loadTrucs() {
      this.socket.send("Hi !");
    },
    initSocket() {
      this.socket = new WebSocket("ws://localhost:"+Const.SOCKET_PORT);
      this.socket.onmessage = (msg)=>{
        this.trucs = JSON.parse(msg.data);
      };
    }
  }
}
</script>