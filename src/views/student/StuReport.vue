<template>
    <div>查看报告</div>
</template>

<script lang='ts'>
import { useTestInformStore } from '@/store/testStore';
export default ({
    setup() {
        const testInformStore = useTestInformStore()
        const testInform = testInformStore.testInform
        return {}
    }
})
</script>

<style lang='scss' scoped></style>