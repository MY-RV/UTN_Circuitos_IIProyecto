
<template>
  <main>
    <div class="card">
      <h1 style="margin-bottom: 1vmin;">General Info</h1>
      <div class="gap">
        <div class="card">
          <p>
            The project is based on giving an example of a smart house in the security focused area, using some
            technologies
            related to internet of things and web development.
            <br>
            <br>
            The prototipe have the abilities of register and send mails for some of the possible alert notifications.
            Using
            a three layers for logic.
          </p>
        </div>
        <div class="card">
          <!-- <h1>Team Members</h1> -->
          <ul>
            <li>Minor Yorseth Retana Vásquez.</li>
            <li>Fredman Bolivar Alfaro.</li>
            <li>Randy José Salas Porras.</li>
            <li>Nicole Vanessa Sánchez Campos.</li>
          </ul>
          <br>
        </div>
      </div>
    </div>
    <div class="left">
      <div class="card">
        <h1>Project Technologies</h1>
        <div>
          <div class="logos">
            <div>
              <img src="../assets/images/arduino.png" alt="Arduino" title="Arduino">
              <span>Arduino</span>
            </div>
            <div>
              <img src="../assets/images/node2.png" alt="EspressJS" title="EspressJS">
              <span>Espress</span>
            </div>
            <div>
              <img src="../assets/images/vue.png" alt="VueJS" title="VueJS">
              <span>VueJS</span>
            </div>
            <div>
              <img src="../assets/images/mailtrap.png" alt="Mailtrap" title="Mailtrap">
              <span>Mailtrap</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card2">
        <h1>
          Latest Activity
        </h1>
        <div class="list-cards">
          <div v-for="(activity, index) in latestActivity" :key="index" class="card">
            <div class="header">
              {{ activity.device }}
            </div>
            <div>
              <b>Detail:</b> {{ activity.detail }}
            </div>
            <div>
              <b>Description:</b> {{ activity.description }}
            </div>
            <div class="footer">
              {{ activity.created_at }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      latestActivity: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.axios.get('/reports', {
        params: {
          page: 1,
          size: 3
        },
      }).then(({ data }) => {
        this.latestActivity = data.data;
      })
    },
  },
}
</script>

<style scoped lang="scss">
main {
  max-width: 1000px;
  margin: auto;
  height: 70vmin;
  margin-top: 4vmin;

  display: flex;
  justify-content: center;
  gap: 2vmin;

  .gap {
    display: flex;
    flex-direction: column;
    gap: 2vmin;
  }

  p,
  li {
    font-size: 1.8vmin;
    text-align: justify;
  }

  p {
    margin-top: 0.4vmin;
  }

  div {
    width: 100%;

    &.left {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 2vmin;

      &>:nth-child(1) {
        height: 30%;

        .logos {
          width: 100%;
          display: flex;

          &>div {
            width: 100%;
            margin-top: 1.4vmin;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
              width: 70%;
              filter: drop-shadow(0px 0px 2px #4448);
            }

            span {
              position: absolute;
              font-size: 2.8vmin;
              font-weight: 600;
              bottom: 0vmin;
              text-align: center;
              color: #0000;
              filter: drop-shadow(0px 0px 2px #FFF);
            }

          }

        }
      }

      &>:nth-child(2) {
        height: 70%;
        display: flex;
        flex-direction: column;
      }
    }
  }

  .card2 h1 {
    font-size: 2.8vmin;
    font-weight: 500;
    margin: 0;
    color: #444;
  }

  .list-cards {

    &>div {
      width: 100%;
      border: 0.2vmin solid #DDD;
      background-color: white;
      padding: 1.4vmin;
      border-radius: 0.4vmin;

      b {
        font-weight: 500;
      }

      .header {
        font-weight: 700;
        font-size: 1.6vmin;
      }

      .footer {
        font-size: 1.4vmin;
        color: #BBB;
        font-weight: 400;
        width: 100%;
        text-align: right;
      }
    }
  }

}
</style>