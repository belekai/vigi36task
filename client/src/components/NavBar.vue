<template>
  <header>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/groups">Groups</RouterLink>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style>
header {
  position: fixed;
  top: 0;
  left: 0;
  padding: 1rem;
  display: flex;
  gap: 1rem;
}
</style>
