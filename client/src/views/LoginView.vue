<template>
  <div class="page-wrapper">
    <div class="promo">
      <h1>Login to coolest website in local area</h1>
    </div>
    <div class="form">
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item path="email" label="Email">
          <n-input v-model:value="model.email" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="password" label="Password">
          <n-input
            v-model:value="model.password"
            type="password"
            @input="handlePasswordInput"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button round type="primary" @click="handleValidateButtonClick">
                Validate
              </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useMessage } from "naive-ui";
import axios from "axios";
import {useRouter } from "vue-router"

export default defineComponent({

  setup() {
    const router = useRouter()
    const formRef = ref(null);
    const rPasswordFormItemRef = ref(null);
    const message = useMessage();
    const modelRef = ref({
      name: null,
      email: null,
      password: null,
      reenteredPassword: null,
    });
    function validatePasswordStartWith(rule, value) {
      return (
        !!modelRef.value.password &&
        modelRef.value.password.startsWith(value) &&
        modelRef.value.password.length >= value.length
      );
    }
    function validatePasswordSame(rule, value) {
      return value === modelRef.value.password;
    }
    const rules = {
      name: [
        {
          required: true,
          message: "Name is required",
          trigger: ["input", "blur"],
        },
      ],
      email: [
        {
          required: true,
          message: "Email is required",
          trigger: ["input", "blur"],
        },
      ],
      password: [
        {
          required: true,
          message: "Password is required",
          trigger: ["input", "blur"],
        },
      ],
      reenteredPassword: [
        {
          required: true,
          message: "Please confirm password",
          trigger: ["input", "blur"],
        },
        {
          validator: validatePasswordStartWith,
          message: "Password is not same as re-entered password!",
          trigger: "input",
        },
        {
          validator: validatePasswordSame,
          message: "Password is not same as re-entered password!",
          trigger: ["blur", "password-input"],
        },
      ],
    };
    return {
      formRef,
      rPasswordFormItemRef,
      model: modelRef,
      rules,
      handlePasswordInput() {
        if (modelRef.value.reenteredPassword) {
          rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
        }
      },
      handleValidateButtonClick(e) {
        e.preventDefault();
        formRef.value?.validate(async (errors) => {
          if (errors) {
            console.log(errors);
            message.error("Please fill in required fields");
          } else if (!errors) {
            console.log(modelRef.value.email);
            try {
              await axios({
                method: "post",
                proxy: false,
                url: "/auth/login",
                data: {
                  email: modelRef.value.email,
                  password: modelRef.value.password,
                },
              }).then((response) => {
                if(response.data.message === 'User is authenticated'){
                localStorage.setItem( 'token', response.data.token);
                router.push({ name: 'home'})}});

            } catch (error) {
              console.log(error);
              message.error(error.response.data);
            }
          }
        });
      },
    };
  },
});
</script>

<style>
.promo {
  margin-top: 200px;
  display: flex;
  justify-content: center;
}
form {
  justify-content: center;
  margin-top: 4rem;
  width: 400px;
}
</style>
