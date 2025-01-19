<template>
    <div id="studentLayout" style="min-height: 100vh;width:100vw;height:100vh;">
        <div class="header">
            <router-link to="/student" v-if="route.path === '/student'">首页</router-link>
            <router-link to="/student" v-else>返回首页</router-link>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { useRoute } from "vue-router";


export default defineComponent({
    setup() {
        const route = useRoute();
        components: { }
        return { route }
    }
})
</script>

<style lang='scss' scoped>
#studentLayout {
    .header {
        height: 60px;
        width: 100vw;
        box-sizing: border-box;
        padding: 0 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;

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
        height: 100%;
        width: 100%;
        background-color: #f7f7f7;
    }
}
</style>