<template>
  <div class="top">
    <span class="teacherName">{{ loginUser.name?.slice(0, 1) + "老师，您好" }}</span>
    <div
      class="onlineTest"
      @click="visible = true"
    >
      <span>上线测评</span>
      <img
        src="../../assets/image/export.png"
        alt="export"
      >
    </div>
  </div>

  <div id="psyEvaluateManage">
    <div class="title">心理测评列表</div>
    <a-table
      :columns="columns"
      :data="data"
      stripe
      :pagination="false"
      :loading="state.loading"
    >
      <template #status="{ record }">
        <a-tag :color="record.status === 0 ? '#191932' : record.status === 1 ? '#ffddda' : '#dbfff9'">{{
                    record.status === 0 ? '未完成' :
                        '已完成'
                }}</a-tag>
      </template>
      <template #action="{ record }">
        <router-link
          v-if="record.status === 2"
          :to="{ name: '学生查看报告' }"
          @click="setTestStore(record)"
        >
          <a-button class="checkReport">查看报告</a-button>
        </router-link>
        <!-- <router-link :to="{ name: '学生进行测评' }" @click="setTestStore(record)"> -->
        <a-button
          v-else-if="record.status === 1"
          class="endTest"
        >结束测评</a-button>
        <!-- </router-link> -->
      </template>

    </a-table>

    <a-pagination
      :total="paginationProp.total"
      :current="paginationProp.current"
      :page-size="paginationProp.pageSize"
      @change="pageChange"
    />
  </div>
  <!-- 上线测试弹窗 -->
  <a-modal
    v-model:visible="visible"
    @cancel="visible = false"
    :on-before-ok="handleOnline"
    unmountOnClose
    width="50%"
    ok-text="上线"
  >
    <template #title>
      测试上线
    </template>
    <div class="setOnlineDetail">
      <div class="type">
        <div class="typeItem">
          <label for="typeSelect">测试名称：</label>
          <a-select
            id="typeSelect"
            :style="{ width: '260px', borderRadius: '5px' }"
            v-model="onlineProps.questionType"
          >
            <a-option
              :value="0"
              label="社会情感能力数据可视化大屏"
            >社会情感能力测试</a-option>
            <a-option
              :value="1"
              label="多元智能数据可视化大屏"
            >多元智能与霍兰德职业兴趣测评</a-option>
            <a-option
              :value="2"
              label="中小学生心理健康量表(MHT)数据可视化大屏"
            >中小学生心理健康量表(MHT)测评</a-option>
            <a-option
              :value="3"
              label="学生动态心理预警数据可视化大屏"
            >学生动态心理预警测评</a-option>
          </a-select>
        </div>

        <div class="typeItem">
          <label for="cntSelect">测评次数：</label>
          <a-select
            id="cntSelect"
            :style="{ width: '130px', borderRadius: '5px' }"
            v-model="onlineProps.cnt"
          >
            <a-option :value="1">第一次</a-option>
            <a-option :value="2">第二次</a-option>
          </a-select>
        </div>

      </div>
      <div class="people">
        <label for="peopleCascader">参与测评人数：</label>
        <a-cascader
          id="peopleCascader"
          :options="gradeList"
          :style="{ width: '200px', borderRadius: '5px' ,margin:'0 10px',}"
          placeholder="Select level 1..."
          multiple
          @change="handleLevel1Change"
          :max-tag-count="2"
        />
        <a-cascader
          :options="classList"
          :style="{ width: '200px', borderRadius: '5px' ,margin:'0 10px'}"
          placeholder="Select level 2..."
          v-model="onlineProps.classesIds"
          multiple
          :max-tag-count="2"
        />
      </div>
      <div class="time">
        <label for="timePicker">上线时间：</label>
        <a-range-picker
          id="timePicker"
          @change="onChange"
          style="width: 254px;"
        />
      </div>
    </div>
  </a-modal>
</template>

<script lang='ts'>
import {
  psyQuestionListGET,
  psyGradeListGET,
  psyClassListGET,
  teacherOnlinePOST,
} from "@/api/teacherController";
import { useTestInformStore } from "@/store/testStore";
import { useLoginUserStore } from "@/store/userStore";
import { debounce } from "lodash";
import { reactive, ref, watchEffect } from "vue";
import { Message } from "@arco-design/web-vue";
export default {
  setup() {
    components: {
    }
    const testInformStore = useTestInformStore();
    const loginUserStore = useLoginUserStore();
    const loginUser = loginUserStore.loginUser;
    const columns = [
      {
        title: "测评类型",
        dataIndex: "questionTitle",
        filterable: {
          filters: [
            {
              text: "社会情感能力测试",
              value: "社会情感能力测试",
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
              text: "未开始",
              value: 0,
            },
            {
              text: "测评中",
              value: 1,
            },
            {
              text: "已结束",
              value: 2,
            },
          ],
          filter: (value: any, row: any) => {
            return row.status === value[0];
          },
        },
      },
      {
        title: "测评结束时间",
        dataIndex: "endTime",
        render: ({ text }: { text: number | string }) => {
          // 自定义渲染，映射状态值
          return text ? text : "--";
        },
      },
      {
        title: "参与年级/班级",
        dataIndex: "includeClassesStr",
        render: (data: {
          record: { includeClassesStr: string };
          column: Object;
          index: number;
        }) => {
          try {
            // 解析字符串为数组
            const classes = JSON.parse(data.record.includeClassesStr);
            console.log(classes);

            // 检查是否是数组并连接成字符串
            return Array.isArray(classes) ? classes.join("、") : "--";
          } catch (error) {
            // 如果解析失败，返回默认值
            return "--";
          }
        },
        ellipsis: true,
        tooltip: { position: "top" },
        width: 300,
      },
      {
        title: "操作",
        slotName: "action",
      },
    ];
    const state = reactive({
      loading: true,
    });
    const paginationProp = ref({
      current: 1,
      total: 300,
      pageSize: 8,
    });
    const data = ref<API.PsyQuestionItem[]>([]);
    const gradeList = ref<Array<ConvertedItem>>([]);
    const classList = ref<Array<ConvertedItem>>([]);
    type ConvertedItem = {
      label: string;
      value: number;
    };
    function convertList(
      List: Array<API.GradeListItem> | Array<API.ClassListItem>
    ): ConvertedItem[] {
      return List.map((item) => {
        if ("gradeId" in item && "gradeName" in item) {
          // 如果是 GradeListItem
          return {
            value: item.gradeId,
            label: item.gradeName,
          };
        } else if ("classesId" in item && "classesName" in item) {
          // 如果是 ClassListItem
          return {
            value: item.classesId,
            label: item.classesName,
          };
        }
        throw new Error("Invalid item type in the list");
      });
    }

    const loadData = async () => {
      const params = {
        current: paginationProp.value.current,
        pageSize: paginationProp.value.pageSize,
      };
      const res = await psyQuestionListGET(params);
      state.loading = false;
      if (res.data) {
        paginationProp.value.total = res.data.total;
        data.value = res.data?.questions || [];
      }
      const res1 = await psyGradeListGET();
      gradeList.value = convertList(res1.data) || [];
    };
    watchEffect(() => {
      loadData();
    });
    const pageChange = (crt: number) => {
      paginationProp.value.current = crt;
    };
    const setTestStore = (record: API.StueQuestionItem) => {
      testInformStore.setTestInform({
        questionId: record.questionId,
      } as API.TestInform);
    };

    // 上线弹窗
    const visible = ref(false);
    const onlineProps = ref<API.OnlineProps>({
      classesIds: [],
      questionType: 0,
      cnt: 1,
      startTime: "",
      endTime: "",
    });

    // 模拟加载二级数据的函数
    const loadLevel2Data = async (
      selectedValues: string[]
    ): Promise<ConvertedItem[]> => {
      console.log(selectedValues);

      try {
        const res = await psyClassListGET({
          gradeIds: selectedValues,
          questionType: onlineProps.value.questionType,
          cnt: onlineProps.value.cnt,
          term: "202420251",
        });
        return convertList(res.data); // 转换数据格式
      } catch (error) {
        console.error("Error loading level 2 data:", error);
        return [];
      }
    };

    // 使用防抖包装加载函数
    const debouncedLoadLevel2Data = debounce(
      async (selectedValues: string[]) => {
        try {
          const data = await loadLevel2Data(selectedValues); // 加载并转换数据
          classList.value = data; // 更新响应式数据
        } catch (error) {
          console.error("Error in debouncedLoadLevel2Data:", error);
        }
      },
      500
    );

    // 处理一级选择框的变化
    const handleLevel1Change = async (values: string[]) => {
      if (
        JSON.stringify(values) !==
        JSON.stringify(gradeList.value.map((opt) => opt.value))
      ) {
        await debouncedLoadLevel2Data(values);
        console.log("Level 2 options updated");
      }
    };

    const handleOnline = async () => {
      console.log(onlineProps.value);
      const res: API.BasicResponse = await teacherOnlinePOST(onlineProps.value);
      if (res.code === 0) {
        Message.success("上线成功！");
        return true;
      } else {
        Message.error(res.msg || "发生错误");
        return false;
      }
    };
    const onChange = (dateString: string) => {
      onlineProps.value.startTime = dateString[0];
      onlineProps.value.endTime = dateString[1];
    };

    return {
      paginationProp,
      pageChange,
      setTestStore,
      columns,
      data,
      state,
      loginUser,
      visible,
      handleOnline,
      onlineProps,
      handleLevel1Change,
      onChange,
      gradeList,
      classList,
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

    img,
    span {
      vertical-align: middle;
    }
  }
}

#psyEvaluateManage {
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
  }

  .arco-pagination {
    justify-content: center;
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
    .typeItem{
        margin-right: 10px ;
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