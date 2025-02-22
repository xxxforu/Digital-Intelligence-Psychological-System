<template>
    <div id="teacherLayout">
        <a-layout style="min-height: 100vh;width:100vw;height:100vh;">
            <a-layout>
                <a-layout-sider theme="light">
                    <p id="title">数智心理平台</p>
                    <router-link v-if="loginUser.role === ACCESS_ENUM.PSYCHOLOGIST" to="/psychologist">
                        <div class="routerItem"
                            :class="{ active: route.path === '/psychologist' || route.path === '/teacher' }">
                            <img v-if="route.path === '/psychologist' || route.path === '/teacher'"
                                src="../assets/image/manageActive.png" alt="manage">
                            <img v-else src="../assets/image/manage.png" alt="manage">
                            <p>测评管理</p>
                        </div>
                    </router-link>
                    <router-link v-if="loginUser.role === ACCESS_ENUM.PSYCHOLOGIST" to="/psychologist/dataBoard">
                        <div class="routerItem" :class="{ active: route.path.includes('dataBoard') }">
                            <img v-if="route.path.includes('dataBoard')" src="../assets/image/dataBoardActive.png"
                                alt="dataBoard">
                            <img v-else src="../assets/image/dataBoard.png" alt="dataBoard">
                            <p>数据看板</p>
                        </div>
                    </router-link>
                    <router-link v-if="loginUser.role === ACCESS_ENUM.PSYCHOLOGIST" to="/psychologist/reportView">
                        <div class="routerItem" :class="{ active: route.path.includes('reportView') }">

                            <img v-if="route.path.includes('reportView')" src="../assets/image/reportActive.png"
                                alt="report">
                            <img v-else src="../assets/image/report.png" alt="reportActive">

                            <p>查看报告</p>
                        </div>
                    </router-link>


                    <router-link v-if="loginUser.role === ACCESS_ENUM.TEACHER" to="/teacher">
                        <div class="routerItem"
                            :class="{ active: route.path === '/psychologist' || route.path === '/teacher' }">
                            <img v-if="route.path === '/psychologist' || route.path === '/teacher'"
                                src="../assets/image/manageActive.png" alt="manage">
                            <img v-else src="../assets/image/manage.png" alt="manage">
                            <p>测评管理</p>
                        </div>
                    </router-link>
                    <router-link v-if="loginUser.role === ACCESS_ENUM.TEACHER" to="/teacher/dataBoard">
                        <div class="routerItem" :class="{ active: route.path.includes('dataBoard') }">
                            <img v-if="route.path.includes('dataBoard')" src="../assets/image/dataBoardActive.png"
                                alt="dataBoard">
                            <img v-else src="../assets/image/dataBoard.png" alt="dataBoard">
                            <p>数据看板</p>
                        </div>
                    </router-link>
                    <div class="routerItem logOut" @click="handleLogout">
                        <img src="../assets/image/logOut.png" alt="logOut">
                        <p>退出登录</p>
                    </div>

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
import ACCESS_ENUM from '@/access/accessEnum';
import { logoutPOST } from '@/api/appController';
import { useLoginUserStore } from '@/store/userStore';
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
    setup() {
        const router = useRouter();
        const route = useRoute();
        const loginUserStore = useLoginUserStore();
        const loginUser = ref<API.LoginUserVO>(loginUserStore.loginUser)

        const handleLogout = () => {
            router.push('/')
            logoutPOST()
        }
        components: { }
        return { loginUser, ACCESS_ENUM, handleLogout, route }
    }
})
</script>

<style lang='scss' scoped>
#teacherLayout {
    #title {
        color: rgb(0, 178, 255);
        font-family: Urbanist;
        font-size: 24px;
        font-weight: 700;
        line-height: 29px;
        text-align: left;
        margin-left: 10px;
    }

    a {
        color: rgb(25, 25, 50);
        font-family: Urbanist;
        font-size: 18px;
        font-weight: 500;
        line-height: 22px;
        letter-spacing: 0%;
        text-align: center;
        text-decoration: none;
    }

    .active {
        background: rgba(191, 205, 255, 0.25);
        color: #00B2FF;
    }

    .routerItem {
        display: flex;
        align-items: center;
        padding: 0 15px;

        img {
            margin-right: 10px;
        }

    }

    .logOut {
        cursor: pointer;
        bottom: 5%;
        position: absolute;
    }

    ::v-deep .arco-layout-content {
        background: #f7f7f7;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
}
</style>
