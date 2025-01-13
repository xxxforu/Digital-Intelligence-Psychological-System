<template>
    <div>
        <a-layout style="height: 400px;">
            <a-layout>
                <a-layout-sider theme="light">
                    <p>loginUser.userName</p>
                    <GlobalHeader />
                    <p>退出登录</p>
                </a-layout-sider>
                <a-layout-content>
                    <router-view />
                </a-layout-content>
            </a-layout>
            <a-layout-footer>Footer</a-layout-footer>
        </a-layout>
    </div>
</template>
<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
import { useLoginUserStore } from '@/store/userStore';
import { ref } from 'vue';
const loginUserStore = useLoginUserStore();
const loginUser = ref<API.LoginUserVO>(loginUserStore.loginUser)
</script>


<style scoped></style>