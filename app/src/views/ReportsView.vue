<template>
  <main class="card">
    <h1>Reports History</h1>
    <div class="list-cards">
      <div class="card" v-for="(item, index) in pagedResults.data" :key="index">
        <h2>{{ item.sensor }} | {{ item.detail }}</h2>
        <hr>
        <table>
          <tr>
            <td>Device</td>
            <td>{{ item.device }}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{{ item.description }}</td>
          </tr>
        </table>
        <div class="right-holder">
          <span>
            {{ item.created_at }}
          </span>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="paginator">
        <button class="bold" @click="move(-1)" :disabled="pagination.page == 1">&lt;</button>
        <button v-for="index in pagedResults.totalPages" :key="index" @click="setPage(index)"
          :class="{ 'active': index == pagination.page }">
          {{ index }}
        </button>
        <button class="bold" @click="move(1)" :disabled="pagination.page == pagedResults.totalPages">&gt;</button>
      </div>
    </div>
  </main>
</template>

<script>
import {useRoute} from 'vue-router'

export default {
  data() {
    return {
      route: useRoute(),
      pagedResults: {
        totalPages: 0,
        totalItems: 0,
        data: [],
      },
      pagination: {
        page: 1,
        size: 4,
      },
    };
  },
  created() {
    this.getPage();
    this.subscriber();
  },
  computed: {
    fetching() { return this.route.path.includes('/reports'); },
  },
  methods: {
    async subscriber() {
      setTimeout(() => {
        this.getPage();
        if (this.fetching) this.subscriber();
      }, 5000);
    },
    setPage(page) {
      this.pagination.page = page;
      this.getPage();
    },
    getPage() {
      this.axios.get('/reports', {
        params: this.pagination
      }).then(({ data }) => {
        this.pagedResults = data;
      });
    },
    move(direction) {
      this.pagination.page += direction;
      this.getPage();
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
    font-size: 2.4vmin;
    font-weight: 500;
    margin: 0;
    color: #444;
  }

  h1 {
    padding-bottom: 0.7vmin !important;
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

  hr {
    background-color: #EFEFEF;
    height: 0.2vmin;
    border: none;
    outline: none;
    margin: 0.4vmin 0.2vmin;
  }

  .right-holder {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    color: gray;
    margin-top: -0.7vmin;
  }

  .right {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-top: 1.4vmin;
    padding-bottom: 0.6vmin;

    button {
      background-color: rgb(255, 255, 255);
      border: none;
      border-radius: 0.2vmin;
      color: #AAA;
      padding: 0.5vmin;
      width: 3.2vmin;
      font-size: 2vmin;
      transition: 0.5s;
      cursor: pointer;

      &.active {
        color: white;
        background-color: rgb(29, 192, 122);
      }

      &:not(.active):not(:disabled):hover {
        color: #CCC;
        background-color: rgb(199, 245, 225);
      }

      &.bold {
        font-weight: 600 !important;
        color: #CCC;
      }
    }
  }
}

tr :nth-child(1) {
  padding-right: 1vmin;
  font-weight: 600;
  text-transform: capitalize;
}

.paginator {
  display: flex;
  border: 1px rgba(0, 0, 0, 0.01) solid;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.01), 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 0.7vmin;
  overflow: hidden;
  margin-bottom: 0.7vmin;
}
</style>
