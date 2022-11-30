<template>
  <div class="wrapper">
    <div class="header">
      <h1>Grupių sąrašas</h1>
    </div>

    <div class="data">
      <n-data-table
        :columns="columns"
        :data="groups"
        :pagination="pagination"
        :bordered="false"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { defineComponent, h } from "vue";
import { NButton } from "naive-ui";
import { useRouter } from "vue-router";

const createColumns = (router) => {
  return [
    {
      title: "Nr. ",
      key: "id",
    },
    {
      title: "Grupės pavadinimas",
      key: "name",
    },
    {
      key: "actions",
      render(row) {
        return h(
          NButton,
          {
            size: "small",
            onClick: () =>
              {router.push({ name: "bills", params: { id: row.id } }),
            console.log(row.id);},
          },
          { default: () => "Peržiūrėti sąskaitas" }
        );
      },
    },
  ];
};

export default defineComponent({
  setup() {
    const router = useRouter();
    return {
      columns: createColumns(router),
    };
  },

  data() {
    return {
      groups: [],
    };
  },
  async mounted() {
    await axios({
      method: "get",
      url: "/groups",
      headers: {
        AUTHORIZATION:
          `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((response) => (this.groups = response.data))
    .then(console.log(this.groups)
    );
  },
});
</script>

<style>
.wrapper {
  width: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  margin-top: 3rem;
}

.data {
  margin-top: 4rem;
}
</style>
