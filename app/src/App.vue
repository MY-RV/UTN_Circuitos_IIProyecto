<template>
  <header>
    <!-- <div> Casita</div> -->

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/configuration">Configuration</RouterLink>
        <RouterLink to="/reports">Reports</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";

export default {
  components: [RouterLink, RouterView],
};
</script>

<style scoped lang="scss">
header {
  line-height: 1.5;
  height: 6vmin;
  width: 100%;
  display: flex;
  padding: 1vmin 1vmin;
  background-color: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.12);

  &>div {
    display: flex;
    width: max-content;
  }

  &+* {
    height: calc(100vh - 6vmin);
  }
}


.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 1.6vmin !important;
  text-align: center;


  & a {
    display: inline-block;
    padding: 0 1rem;
    font-size: 1.6vmin !important;
    border-left: 0.15vmin solid var(--color-border);

    &.router-link-exact-active {
      color: var(--color-text);
    }

    &.router-link-exact-active:hover {
      background-color: transparent;
    }

    &:first-of-type {
      border: 0;
    }
  }

}
</style> 
