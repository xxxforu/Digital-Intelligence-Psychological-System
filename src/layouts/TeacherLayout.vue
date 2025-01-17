<template>
    <div>
        <a-layout style="min-height: 100vh;width:100vw;">
            <a-layout>
                <a-layout-sider theme="light">
                    <p>xxx,欢迎回来！</p>
                    <router-link to="/psychologist/">测评管理</router-link>
                    <router-link to="/psychologist/dataBoard">数据看板</router-link>
                    <router-link to="/psychologist/reportView">查看报告</router-link>
                    <p>退出登录</p>
                </a-layout-sider>
                <a-layout-content>
                    <router-view />
                </a-layout-content>
            </a-layout>
            <!-- <a-layout-footer>Footer</a-layout-footer> -->
        </a-layout>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        // const loginUserStore = useLoginUserStore();
        // const loginUser = ref<API.LoginUserVO>(loginUserStore.loginUser)
        components: { }
        return {}
    }
})
</script>

<style lang='scss' scoped></style>
