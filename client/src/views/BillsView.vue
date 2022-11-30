<template>
  <div class="wrapper">
    <div class="header">
      <h1>{{ gruopName }}</h1>
    </div>

    <div class="data">
      <div class="addBill">
        <n-form
          ref="formRef"
          inline
          :label-width="80"
          :model="formValue"
          :size="size"
        >
          <n-form-item path="bill.amount">
            <n-input v-model:value="formValue.amount" placeholder="Suma" />
          </n-form-item>
          <n-form-item path="bill.description">
            <n-input
              v-model:value="formValue.description"
              placeholder="Aprašymas"
            />
          </n-form-item>
          <n-form-item>
            <n-button @click="addBill"> Pridėti sąskaitą </n-button>
          </n-form-item>
        </n-form>
      </div>

      <n-data-table
        :columns="columns"
        :data="bills"
        :pagination="pagination"
        :bordered="false"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { NButton } from "naive-ui";

const columns = [
  {
    title: "Nr. ",
    key: "id",
  },
  {
    title: "Aprašymas",
    key: "description",
  },
  {
    title: "Suma",
    key: "amount",
  },
];



export default {
  methods: {
    getData() {
      axios({
        method: "get",
        url: `bills/${this.$route.params.id}`,
        headers: {
          AUTHORIZATION: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
        this.bills = response.data;
      });
    },
    getGroupName() {
      axios({
        method: "get",
        url: `group/${this.$route.params.id}`,
        headers: {
          AUTHORIZATION:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QGFiYy5jb20iLCJpYXQiOjE2Njk2NTI0ODV9.3UjXwDVLq8tpju7rco3zgoPXCkGdDcDhZDLBliBUsT4",
        },
      }).then((response) => {
        this.gruopName = response.data[0].name;
        this.gruopID = response.data[0].id;
        console.log(this.gruopID); //cia mato ID, kitur nebemato.
      });
    },
    addBill(){
      console.log(this.groupID, this.formValue.amount, this.formValue.description);
      axios({
        method: 'post',
        url: '/bills',
        data: {
          groupId: this.groupID,
          amount: this.formValue.amount,
          description: this.formValue.description
        },
        headers: {
        AUTHORIZATION:
          `Bearer ${localStorage.getItem('token')}`,
      },
      })
      .then( this.formValue = '')
    }
  },
  data() {
    return {
      bills: [],
      gruopName: "",
      groupID: "",
      columns,
      value: '',
      formValue: {
       amount: '',
       description: ''
      },
    };
  },
  async mounted() {
    this.getData();
    this.getGroupName();
  },
};
</script>
