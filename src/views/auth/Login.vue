<template>
  <form id="login-form" @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <div class="buttons">
      <button v-if="!isPending" type="submit" form="login-form">Log in</button>
      <button v-if="!isPending" @click="demoSubmit">Demo</button>
      <button class="demos" v-if="isPending" disabled>Loading</button>
    </div>
  </form>
</template>

<script>
// using @ means start at the project src root
import useLogin from "@/composables/useLogin";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { error, login, isPending } = useLogin();
    const email = ref("");
    const password = ref("");
    const displayName = ref("");
    const router = useRouter();
    const demoUser = ["demo@user.com", "demodemo"];

// , displayName.value
    const handleSubmit = async () => {
      const res = await login(email.value, password.value);
      if (error.value) {
        console.log(error.value);
      } else {
        router.push({ name: "Home" });
      }
    };
    const demoSubmit = async () => {
      const res = await login(demoUser[0], demoUser[1]);
      if (error.value) {
        console.log(error.value);
      } else {
        router.push({ name: "Home" });
      }
    };
    return {
      email,
      password,
      displayName,
      handleSubmit,
      demoSubmit,
      error,
      isPending,
    };
  },
};
</script>