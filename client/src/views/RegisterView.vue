<template>
<div class="promo">

  <h1>Register to coolest website in local area</h1>
</div>
  
  <n-form ref="formRef" :model="model" :rules="rules">
    <n-form-item path="name" label="Name">
      <n-input v-model:value="model.name" @keydown.enter.prevent />
    </n-form-item>
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
    <n-form-item
      ref="rPasswordFormItemRef"
      first
      path="reenteredPassword"
      label="Re-enter Password"
    >
      <n-input
        v-model:value="model.reenteredPassword"
        :disabled="!model.password"
        type="password"
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
</template>

<script>
import { defineComponent, ref } from "vue";
import { useMessage } from "naive-ui";
import axios from "axios";

export default defineComponent({
  setup() {
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
                url: "/auth/register",
                data: {
                  fullName: modelRef.value.name,
                  email: modelRef.value.email,
                  password: modelRef.value.password,
                },
              }).then( response => {
                console.log(response);
              });
            } catch (error) {
              console.log(error);
              message.error(error.response.data)
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
  display:flex;
  justify-content: center;
}
</style>