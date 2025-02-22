<template>
    <div class="top">
        <span class="teacherName">{{ loginUser.name?.slice(0, 1) + "老师，您好" }}</span>
        <a-input-search v-model="state.searchValue"
            :style="{ width: '320px', boxShadow: '0px 6px 8px 0px rgba(0, 0, 0, 0.1)', background: '#fff', borderRadius: '10px' }"
            placeholder="请输入搜索关键词" @change="loadData" />
    </div>

    <div id="teaEvaluateManage">
        <div class="title">心理测评列表</div>
        <a-table :columns="columns" :data="data" stripe :pagination="false" :loading="state.loading"
            :bordered="{ cell: true }">
            <template #status="{ record }">
                <a-tag :color="record.status === 0 ? '#ffddda' : '#dbfff9'">{{
                    record.status === 0 ? '未完成' : '已完成'
                    }}</a-tag>
            </template>
            <template #action="{ record }">
                <router-link v-if="record.status === 1" :to="{ name: '普通老师查看报告', params: { check: 'check' } }"
                    @click="setTestStore(record)">
                    <a-button class="checkReport">查看报告</a-button>
                </router-link>
            </template>

        </a-table>

        <a-pagination :total="paginationProp.total" :current="paginationProp.current"
            :page-size="paginationProp.pageSize" @change="pageChange" />
    </div>

</template>

<script lang='ts'>
import {
    teaQuestionListGET
} from "@/api/teacherController";
import { useTestInformStore } from "@/store/testStore";
import { useLoginUserStore } from "@/store/userStore";
import { reactive, ref, watchEffect } from "vue";
export default {
    setup() {
        const testInformStore = useTestInformStore();

        const loginUserStore = useLoginUserStore();
        const loginUser = loginUserStore.loginUser;
        const columns = [
            {
                title: "姓名",
                dataIndex: "name",
            },
            {
                title: "班级",
                dataIndex: "classesName"
            },
            {
                title: "测评类型",
                dataIndex: "questionTitle",
                filterable: {
                    filters: [
                        {
                            text: "社会情感能力测评",
                            value: "社会情感能力测评",
                        },
                        {
                            text: "多元智能与霍兰德职业兴趣测评",
                            value: "多元智能与霍兰德职业兴趣测评",
                        },
                        {
                            text: "中小学生心理健康量表(MHT)测评",
                            value: "中小学生心理健康量表(MHT)测评",
                        },
                        {
                            text: "学生动态心理预警测评",
                            value: "学生动态心理预警测评",
                        },
                    ],
                    filter: (value: any, row: any) => {
                        return row.questionTitle === value[0];
                    },
                },
            },
            {
                title: "学号",
                dataIndex: "number",
            },
            {
                title: "测评次数",
                dataIndex: "cnt",
                render: ({
                    record,
                }: {
                    record: { cnt: number };
                    column: any;
                    rowIndex: number;
                }) => {
                    return record.cnt === 1 ? "第一次测评" : "第二次测评";
                },
                filterable: {
                    filters: [
                        {
                            text: "第一次测评",
                            value: 1,
                        },
                        {
                            text: "第二次测评",
                            value: 2,
                        },
                    ],
                    filter: (value: any, row: any) => {
                        return row.cnt === value[0];
                    },
                },
            },
            {
                title: "测评状态",
                slotName: "status",
                filterable: {
                    filters: [
                        {
                            text: "未完成",
                            value: 0,
                        },
                        {
                            text: "已完成",
                            value: 1,
                        }
                    ],
                    filter: (value: any, row: any) => {
                        return row.status === value[0];
                    },
                },
            },
            {
                title: "测评完成时间",
                dataIndex: "finishTime",
                render: (data: { record: { finishTime: string } }) => {
                    // 自定义渲染，映射状态值
                    let finishTime = data.record.finishTime
                    if (finishTime) {
                        finishTime = finishTime.slice(0, 19).replace(/T/g, " ")
                    }
                    return finishTime ? finishTime : "--";
                },
            },
            {
                title: "操作",
                slotName: "action",
            },
        ];
        const state = reactive({
            loading: true,
            searchValue: ""
        });
        const paginationProp = ref({
            current: 1,
            total: 10,
            pageSize: 9,
        });
        const data = ref<API.PsyQuestionItem[]>([]);

        const loadData = async () => {
            const params = {
                current: paginationProp.value.current,
                pageSize: paginationProp.value.pageSize,
                searchValue: state.searchValue
            };
            const res = await teaQuestionListGET(params);
            state.loading = false;
            if (res.data) {
                paginationProp.value.total = res.data.total;
                data.value = res.data?.questions || [];
            }
        };
        watchEffect(() => {
            loadData();
        });
        const pageChange = (crt: number) => {
            paginationProp.value.current = crt;
        };
        const setTestStore = (record: API.PsyQuestionItem) => {
            testInformStore.setTestInform({
                questionId: record.questionId,
                studentId: record.studentId,
                questionType: record.questionType,
                studentName: record.name
            } as API.TestInform);
        };



        return {
            paginationProp,
            pageChange,
            setTestStore,
            columns,
            data,
            state,
            loginUser,
            loadData,
        };
    },
};
</script>

<style lang='scss' scoped>
.top {
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin-bottom: 8px;

    .teacherName {
        color: rgba(25, 25, 50, 0.7);
        font-family: Urbanist;
        font-size: 16px;
        margin: 5px 0;
        font-weight: 400;
        line-height: 22px;
    }

    .onlineTest {
        border-radius: 5px;
        color: #fff;
        box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);
        background: rgb(0, 178, 255);
        padding: 8px;
        cursor: pointer;

        img,
        span {
            vertical-align: middle;
        }
    }
}

#teaEvaluateManage {
    width: 90%;
    height: 90%;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

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
                border-radius: 5px;
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

        .endTest {
            border-radius: 5px;
            box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);
            background: rgba(255, 85, 72, 0.7);
            color: rgb(255, 255, 255);
            font-family: Urbanist;
            font-size: 16px;
            font-weight: 500;
            line-height: 20px;
            text-align: center;
        }

        .startTest {
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

    ::v-deep .arco-table-container {

        .arco-table-cell {
            justify-content: center;
        }

        .arco-table-td-content {
            text-align: center;
        }
    }
}

.setOnlineDetail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .type {
        margin: 15px 0;
        display: flex;
        width: 90%;
        justify-content: left;

        .typeItem {
            margin-right: 10px;
        }
    }

    .people {
        margin: 15px 0;
        display: flex;
        width: 90%;
        justify-content: left;
    }

    .time {
        margin: 15px 0;
        width: 90%;
    }
}
</style>