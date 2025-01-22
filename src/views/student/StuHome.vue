<template>
    <div id="stuHome">
        <div class="title">心理测评列表</div>
        <a-table :columns="columns" :data="data" stripe :pagination="false" :loading="state.loading">
            <template #status="{ record }">
                <a-tag :color="record.status === 0 ? '#ffddda' : '#dbfff9'">{{ record.status === 0 ? '未完成' :
                    '已完成'
                    }}</a-tag>
            </template>
            <template #action="{ record }">
                <router-link v-if="record.status" :to="{ name: '学生查看报告' }" @click="setTestStore(record)">
                    <a-button class="checkReport">查看报告</a-button>
                </router-link>
                <router-link v-else :to="{ name: '学生进行测评' }" @click="setTestStore(record)">
                    <a-button class="goTest">开始测评</a-button>
                </router-link>
            </template>

        </a-table>

        <a-pagination :total="paginationProp.total" :current="paginationProp.current"
            :page-size="paginationProp.pageSize" @change="pageChange" />
    </div>
</template>

<script lang='ts'>
import { studentQuestionListGET } from '@/api/studentController';
import { useTestInformStore } from '@/store/testStore';
import { reactive, ref, watchEffect } from 'vue';
export default ({
    setup() {
        components: { }
        const testInformStore = useTestInformStore()
        const state = reactive({
            loading: true
        })
        const columns = [
            {
                title: '测评类型',
                dataIndex: 'questionTitle',
                filterable: {
                    filters: [{
                        text: '社会情感能力测试',
                        value: '社会情感能力测试',
                    }, {
                        text: '多元智能与霍兰德职业兴趣测评',
                        value: '多元智能与霍兰德职业兴趣测评',
                    }, {
                        text: '中小学生心理健康量表(MHT)测评',
                        value: '中小学生心理健康量表(MHT)测评',
                    }, {
                        text: '学生动态心理预警测评',
                        value: '学生动态心理预警测评',
                    },],
                    filter: (value: any, row: any) => {
                        return row.questionTitle === value[0]
                    }
                }
            },
            {
                title: '测评次数',
                dataIndex: 'cnt',
                render: ({ record }: { record: { cnt: number }; column: any; rowIndex: number }) => {
                    return record.cnt === 1 ? '第一次测评' : '第二次测评';
                },
                filterable: {
                    filters: [{
                        text: '第一次测评',
                        value: 1,
                    }, {
                        text: '第二次测评',
                        value: 2,
                    },],
                    filter: (value: any, row: any) => {
                        return row.cnt === value[0]
                    }
                }
            },
            {
                title: '测评状态',
                slotName: 'status',
                filterable: {
                    filters: [{
                        text: '未完成',
                        value: 0,
                    }, {
                        text: '已完成',
                        value: 1,
                    },],
                    filter: (value: any, row: any) => {
                        return row.status === value[0]
                    }
                }
            }, {
                title: '完成时间',
                dataIndex: 'endTime',
                render: ({ text }: { text: number | string }) => {
                    // 自定义渲染，映射状态值
                    return text ? text : '--';
                },
            }, {
                title: '操作',
                slotName: 'action',
            },
        ];
        const data = ref<API.QuestionItem[]>([]);
        /**
         * 加载数据
         */
        let current = ref(300)
        let total = ref(1)
        const paginationProp = ref({
            current: 1,
            total: 300,
            pageSize: 10

        })
        const loadData = async () => {
            const params = {
                current: paginationProp.value.current,
                pageSize: paginationProp.value.pageSize
            };
            const res = await studentQuestionListGET(params);
            state.loading = false
            paginationProp.value.total = res.data.total
            data.value = res.data?.questions || []
        };
        watchEffect(() => {
            loadData();
        });
        const pageChange = (crt: number) => {
            paginationProp.value.current = crt
        }
        const setTestStore = (record: API.QuestionItem) => {
            testInformStore.setTestInform({
                questionId: record.questionId,
                questionType: record.questionType
            } as API.TestInform)
        }
        return {
            columns,
            data,
            state,
            paginationProp,
            pageChange,
            total,
            current,
            setTestStore,
        }
    }
})
</script>

<style lang='scss' scoped>
#stuHome {
    width: 90%;
    height: 90%;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
        width: 100%;
        color: rgb(25, 25, 50);
        font-family: Urbanist;
        font-size: 18px;
        font-weight: 700;
        line-height: 22px;
        margin-left: 10px;
    }

    .arco-table {
        height: 85%;
        width: 100%;

        ::v-deep .arco-table-container {
            .arco-tag.arco-tag-custom-color {
                color: #000 !important;
                border-radius: 5px
            }
        }

        .checkReport {
            border-radius: 5px;
            box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);
            background: rgba(191, 205, 255, 0.25);
            color: rgb(0, 178, 255);
            font-family: Urbanist;
            font-size: 16px;
            font-weight: 500;
            line-height: 20px;
            text-align: center;
        }

        .goTest {
            border-radius: 5px;
            box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);
            background: rgb(0, 178, 255);
            color: rgb(255, 255, 255);
            font-family: Urbanist;
            font-size: 16px;
            font-weight: 500;
            line-height: 20px;
            text-align: center;
        }
    }

    .arco-pagination {
        justify-content: center;
    }

}
</style>