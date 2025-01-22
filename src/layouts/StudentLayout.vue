<template>
    <div id="studentLayout" style="min-height: 100vh;width:100vw;height:100vh;">
        <div class="header">
            <router-link to="/student">{{ route.path === '/student' ? "首页" : "< 返回首页" }}</router-link>
                    <router-link to="/visualReport">可视化看板（演示用</router-link>

                    <a-dropdown @select="handleLogout" :popup-max-height="false">
                        <a-button>{{ currentTime + " " + loginUser.name }}<icon-down /></a-button>
                        <template #content>
                            <a-doption>退出登录</a-doption>
                        </template>
                    </a-dropdown>
        </div>
        <div class="content" :style="{ height: viewportHeight - 60 + 'px' }">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang='ts'>
import { useLoginUserStore } from '@/store/userStore';
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from "vue-router";


export default defineComponent({
    setup() {
        const loginUserStore = useLoginUserStore();
        const loginUser = loginUserStore.loginUser
        const router = useRouter();
        const route = useRoute()
        const handleLogout = () => {
            router.push('/')
        }

        let currentTime = ref<string>("")

        // 获取当前时间
        let timeNow = new Date();
        // 获取当前小时
        let hours = timeNow.getHours();
        // 判断当前时间段
        if (hours >= 0 && hours <= 10) {
            currentTime.value = `早上好!`;
        } else if (hours > 10 && hours <= 14) {
            currentTime.value = `中午好!`;
        } else if (hours > 14 && hours <= 18) {
            currentTime.value = `下午好!`;
        } else if (hours > 18 && hours <= 24) {
            currentTime.value = `晚上好!`;
        }

        var viewportHeight = document.documentElement.clientHeight || document.body.clientHeight;
        return { route, router, loginUser, handleLogout, currentTime, viewportHeight }
    }
})
</script>

<style lang='scss' scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html,
body {
    height: 100%;
    margin: 0;
}

#studentLayout {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;

    .header {
        height: 60px;
        width: 100vw;
        box-sizing: border-box;
        padding: 10px 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
        /* 确保导航栏高度固定 */

        a {
            color: rgb(0, 178, 255);
            font-family: Urbanist;
            font-size: 18px;
            font-weight: 700;
            letter-spacing: 0%;
            text-align: center;
            text-decoration: none;
        }
    }

    .content {
        width: 100%;
        background-color: #f7f7f7;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>