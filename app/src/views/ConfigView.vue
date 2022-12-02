<template>
  <main class="card">
    <h1>Sensors Configuration</h1>
    <div class="list-cards">
      <div class="card" v-for="([key, value], index) in sensors" :key="index">
        <h2>Sensor ({{ key }})</h2>
        <table>
          <tr>
            <td>Name</td>
            <td>
              <input v-model="value.name">
            </td>
          </tr>
          <tr>
            <td>Type</td>
            <td>
              <select v-model="value.type">
                <option v-for="(type, index) in sensorTypes" :key="index" :value="type">
                  {{ type }}
                </option>
              </select>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="right">
      <button @click="save()">Save Changes</button>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      sensors: [],
      sensorTypes: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.axios.get('/sensors').then(({ data }) => {
        this.sensors = Object.entries(data);
      });
      this.axios.get('/sensor-types').then(({ data }) => {
        this.sensorTypes = Object.keys(data);
      });
    },
    save() {
      const body = this.sensors.reduce((response, [key, value]) => {
        response[key] = value;
        return response;
      }, {});
      this.axios.put('/sensors', body).then(({ data }) => {
        this.sensors = Object.entries(data);
      });
    },
  },
}
</script>

<style scoped lang="scss">
main {
  max-width: 1000px;
  margin: auto;
  height: max-content;
  margin-top: 4vmin;

  .list-cards {
    gap: 1.4vmin;
    margin-top: 0.8vmin;
  }

  .card h2 {
    font-size: 2vmin;
    font-weight: 500;
    margin: 0;
    color: #444;
  }

  &.card:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.12);
  }

  select,
  option {
    text-transform: capitalize;
  }

  td {
    font-size: 1.8vmin;
  }

  select,
  input {
    padding: 0.4vmin;
    margin-left: 0.4vmin;
    border: 0.15vmin solid #CCC;
    border-radius: 0.4vmin;
    min-width: 100%;
  }

  .right {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-top: 1.4vmin;
    padding-bottom: 0.6vmin;

    button {
      background-color: rgb(29, 192, 122);
      border: none;
      border-radius: 0.4vmin;
      color: white;
      padding: 1vmin 1.4vmin;
      font-size: 2vmin;
      font-weight: 500;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.12);
      transition: 0.5s;
      cursor: pointer;
    }

    button:hover {
      background-color: rgb(29, 136, 90);
    }
  }

}
</style>
