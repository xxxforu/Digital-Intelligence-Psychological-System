<template>
  <div class="top">
    <span class="teacherName">{{ loginUser.name?.slice(0, 1) + "老师，您好" }}</span>
    <div class="onlineTest" @click="visible = true">
      <span>上线测评</span>
      <img src="../../assets/image/export.png" alt="export">
    </div>
  </div>

  <div id="psyEvaluateManage">
    <div class="title">心理测评列表</div>
    <a-table :columns="columns" :data="data" stripe :pagination="false" :loading="state.loading"
      :bordered="{ cell: true }">
      <template #status="{ record }">
        <a-tag :color="record.status === 0 ? 'rgba(25, 25, 50, 0.3)' : record.status === 1 ? '#ffddda' : '#dbfff9'">{{
          record.status === 0 ? '未开始' : record.status === 1 ? '测评中' : '已完成'
        }}</a-tag>
      </template>
      <template #action="{ record }">
        <router-link v-if="record.status === 2" :to="{ name: '心理教师查看报告', params: { check: 'check' } }"
          @click="setTestStore(record)">
          <a-button class="checkReport">查看报告</a-button>
        </router-link>
        <a-button v-else-if="record.status === 1" class="endTest" @click="endTest(record)">结束测评</a-button>
        <a-button v-else-if="record.status === 0" class="startTest" @click="startTest(record)">开始测评</a-button>
        <!-- </router-link> -->
      </template>

    </a-table>

    <a-pagination :total="paginationProp.total" :current="paginationProp.current" :page-size="paginationProp.pageSize"
      @change="pageChange" />
  </div>
  <!-- 上线测试弹窗 -->
  <a-modal v-model:visible="visible" @cancel="visible = false" :on-before-ok="handleOnline" unmountOnClose width="50%"
    ok-text="上线" @close="closeModal">
    <template #title>
      测评上线
    </template>
    <div class="setOnlineDetail">
      <div class="type">
        <div class="typeItem">
          <label for="typeSelect">测评名称：</label>
          <a-select id="typeSelect" @change="loadLevel2Data" :style="{ width: '260px', borderRadius: '5px' }"
            v-model="onlineProps.questionType">
            <a-option :value="0" label="社会情感能力测评">社会情感能力测评</a-option>
            <a-option :value="1" label="多元智能与霍兰德职业兴趣测评">多元智能与霍兰德职业兴趣测评</a-option>
            <a-option :value="2" label="中小学生心理健康量表(MHT)测评">中小学生心理健康量表(MHT)测评</a-option>
            <a-option :value="3" label="学生动态心理预警测评">学生动态心理预警测评</a-option>
          </a-select>
        </div>

        <div class="typeItem">
          <label for="cntSelect">测评次数：</label>
          <a-select id="cntSelect" @change="loadLevel2Data" :style="{ width: '130px', borderRadius: '5px' }"
            v-model="onlineProps.cnt">
            <a-option :value="1">第一次</a-option>
            <a-option :value="2">第二次</a-option>
          </a-select>
        </div>

      </div>
      <div class="people">
        <label for="peopleCascader">参与测评范围：</label>
        <a-cascader id="peopleCascader" :options="gradeList" v-model="onlineProps.gradeList"
          :style="{ width: '230px', borderRadius: '5px', margin: '0 10px', }" placeholder="选择年级" multiple
          @change="handleLevel1Change" :max-tag-count="2" />
        <a-cascader :options="classList" :style="{ width: '230px', borderRadius: '5px', margin: '0 10px' }"
          placeholder="选择班级" v-model="onlineProps.classesIds" multiple :max-tag-count="2" />
      </div>
      <div class="time">
        <label for="timePicker">上线时间：</label>
        <a-range-picker id="timePicker" @change="onChange" style="width: 254px;" />
      </div>
    </div>
  </a-modal>
</template>

<script lang='ts'>
import {
  psyClassListGET,
  psyEndTestPOST,
  psyGradeListGET,
  psyQuestionListGET,
  psyStartTestPOST,
  teacherOnlinePOST,
} from "@/api/teacherController";
import { useTestInformStore } from "@/store/testStore";
import { useLoginUserStore } from "@/store/userStore";
import { Message } from "@arco-design/web-vue";
import { debounce } from "lodash";
import { onMounted, reactive, ref, watchEffect } from "vue";
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
              text: "已完成",
              value: 2,
            },
          ],
          filter: (value: any, row: any) => {
            return row.status === value[0];
          },
        },
      },
      {
        title: "测评开始时间",
        dataIndex: "startTime",
        render: (data: { record: { startTime: string } }) => {
          // 自定义渲染，映射状态值
          let startTime = data.record.startTime
          return startTime ? startTime : "--";
        },
      },
      {
        title: "测评结束时间",
        dataIndex: "endTime",
        render: (data: { record: { endTime: string } }) => {
          // 自定义渲染，映射状态值
          let endTime = data.record.endTime
          return endTime ? endTime : "--";
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
    onMounted(() => {
      psyGradeListGET().then(res => {
        gradeList.value = convertList(res.data) || [];
      })
    })
    const state = reactive({
      loading: true,
    });
    const paginationProp = ref({
      current: 1,
      total: 10,
      pageSize: 9,
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
      const res: API.BasicResponse = await psyQuestionListGET(params);
      state.loading = false;
      if (res.data) {
        paginationProp.value.total = res.data.total;
        data.value = res.data?.questions || [];
      } else Message.error(res.msg || "获取列表失败")
    };
    watchEffect(() => {
      loadData();
    });
    const pageChange = (crt: number) => {
      paginationProp.value.current = crt;
    };
    const setTestStore = (record: API.PsyQuestionItem) => {
      testInformStore.setTestInform({
        questionType: record.questionType,
        cnt: record.cnt,
        gradeId: record.gradeId,
        classedId: record.classesId,
        term: record.term
      } as API.TestInform);
    };
    //结束测评
    const endTest = async (record: API.PsyQuestionItem) => {
      const res: API.BasicResponse = await psyEndTestPOST({
        id: record.questionId
      })
      if (res.code === 0) {
        Message.success("成功结束测评")
        await loadData()
      } else {
        Message.error(res.msg || "结束测评失败")
      }
    }
    //开始测评
    const startTest = async (record: API.PsyQuestionItem) => {
      const res: API.BasicResponse = await psyStartTestPOST({
        id: record.questionId
      })
      if (res.code === 0) {
        Message.success("成功开始测评")
        await loadData()
      } else {
        Message.error(res.msg || "开始测评失败")
      }
    }

    // 上线弹窗
    const visible = ref(false);
    const onlineProps = ref<API.OnlineProps>({
      gradeIds: [],
      classesIds: [],
      questionType: 0,
      cnt: 1,
      startTime: "",
      endTime: "",
    });

    // 模拟加载二级数据的函数
    const loadLevel2Data = async (
      selectedValues: []
    ): Promise<ConvertedItem[]> => {

      try {
        const res = await psyClassListGET({
          gradeIds: onlineProps.value.gradeIds,
          questionType: onlineProps.value.questionType,
          cnt: onlineProps.value.cnt,
        });
        return convertList(res.data); // 转换数据格式
      } catch (error) {
        return [];
      }
    };

    let haveAll: boolean = false
    // 使用防抖包装加载函数
    const debouncedLoadLevel2Data = debounce(
      async (selectedValues: []) => {
        try {
          const data = await loadLevel2Data(selectedValues); // 加载并转换数据
          if (data.length > 5) {
            haveAll = true
            classList.value = [{
              label: "全部班级",
              value: -1
            }, ...data];
          } else { classList.value = data, haveAll = false }

        } catch (error) {
        }
      },
      500
    );


    // 获取所有班级的 ID
    const getAllClassIds = () => {
      const allClassIds = <Array<number>>[];

      classList.value.forEach((classItem) => {
        if (classItem.value != -1)
          allClassIds.push(classItem.value);

      });
      return allClassIds;
    };

    // 处理一级选择框的变化
    const handleLevel1Change = async (values: []) => {
      onlineProps.value.gradeIds = values


      onlineProps.value.classesIds = []
      if (
        JSON.stringify(values) !==
        JSON.stringify(gradeList.value.map((opt) => opt.value))
      ) {
        await debouncedLoadLevel2Data(values);
      }
    };
    const checkIntegrity = () => {
      if (onlineProps.value.classesIds.length === 0) { Message.error("请选择班级！"); return false }
      else if (!onlineProps.value.startTime || !onlineProps.value.endTime) {
        Message.error("请选择上线时间！"); return false
      }
      return true
    }

    const handleOnline = async () => {
      //先校验数据完整性
      if (checkIntegrity()) {
        if (onlineProps.value.classesIds.includes(-1)) {
          onlineProps.value.classesIds = getAllClassIds()
        }
        const res: API.BasicResponse = await teacherOnlinePOST(onlineProps.value);
        if (res.code === 0) {
          Message.success("上线成功！");
          await loadData();
          return true;
        } else {
          Message.error(res.msg || "发生错误");
          return false;
        }
      }
      return false
    };
    const onChange = (dateString: string) => {
      onlineProps.value.startTime = dateString[0];
      onlineProps.value.endTime = dateString[1];
    };
    const closeModal = () => {
      onlineProps.value.classesIds = []
    }
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
      loadLevel2Data,
      onChange,
      gradeList,
      classList,
      closeModal,
      endTest,
      startTest,
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

      .arco-table-cell {
        justify-content: center;
      }

      .arco-table-td-content {
        text-align: center;
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