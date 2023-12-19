<template>
  <div class="tabs">
    <a-tabs v-model:activeKey="activeKeyParentTab" type="card" class="tabs-custom" :next-click="onActiveParentTab()">
      <a-tab-pane :key="ListTabObj[0].key" :tab="ListTabObj[0].name">
        <TabPanel1
            :active-tab-key="ListTabObj[0].children[0].key"
            :list-childtab="ListTabObj[0].children"
            :child-collapse1="ListTabObj[0].children[0].statusCollapse"
            :child-collapse2="ListTabObj[0].children[1].statusCollapse"
            @change-tab="onActiveChildTab($event)"
            @change-status-collapse="onChangeStatusCollapse($event)"
        />
      </a-tab-pane>
      <a-tab-pane :key="ListTabObj[1].key" :tab="ListTabObj[1].name" force-render>
        <TabPanel2
            :active-tab-key="ListTabObj[1].children[0].key"
            :list-childtab="ListTabObj[1].children"
            :child-collapse3="ListTabObj[1].children[0].statusCollapse"
            :child-collapse4="ListTabObj[1].children[1].statusCollapse"
            @change-tab="onActiveChildTab($event)"
            @change-status-collapse="onChangeStatusCollapse($event)"
        />
      </a-tab-pane>
    </a-tabs>
    <div id="btnCollapse">
      <a-button
          shape="circle"
          size="small"
          :disabled="currentCollapseStatusActivate === StatusCollapse.expandAll"
          @click="onChangeGlobalCollapse(StatusCollapse.expandAll)"
      >
        <template #icon>
          <DownOutlined style="font-size: 12px" />
        </template>
      </a-button>
      <a-button
          shape="circle"
          size="small"
          style="margin-left: 7px"
          :disabled="currentCollapseStatusActivate === StatusCollapse.collapseAll"
          @click="onChangeGlobalCollapse(StatusCollapse.collapseAll)"
      >
        <template #icon>
          <UpOutlined style="font-size: 12px" />
        </template>
      </a-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";

import { ListTabObj, StatusCollapse } from "../config/config";
import { TabPanel1, TabPanel2 } from '../components/index'

//default activeKey của tab
const activeKeyParentTab = ref(ListTabObj[0].key);
const activeKeyChildTab = ref(ListTabObj[0].children[0].key);

//Trạng thái của nút đóng mở tất cả
const currentCollapseStatusActivate = ref(StatusCollapse.expandAll)

//Chức năng thay đổi trạng thái nút đóng mở tất cả
const onChangeGlobalCollapse = ( status ) => {
  const { idxChildTab, objTabChild } = getIndexTab()
  if ( idxChildTab > -1 ) {
    objTabChild.statusCollapse = status
    currentCollapseStatusActivate.value = status
  }
}

//Chức năng check nút đóng mở tất cả khi chuyển tab cha
const onActiveParentTab = () => {
  const { objTabChild } = getIndexTab('nextParentTab')

  currentCollapseStatusActivate.value = objTabChild.statusCollapse
}

//Chức năng check nút đóng mở tất cả và cập nhật activeKeyChildTab khi chuyển tab con
const onActiveChildTab = ( keyTabChild ) => {
  const { idxParentTab } = getIndexTab()
  ListTabObj[idxParentTab].children.map(tab => {
    if ( tab.key === keyTabChild ) {
      tab.inActive = true;
      currentCollapseStatusActivate.value = tab.statusCollapse
    } else {
      tab.inActive = false;
    }
  })
  activeKeyChildTab.value = keyTabChild;
}

//Chức năng thay đổi global collapse khi đóng mở các card collapse
const onChangeStatusCollapse = ( statusCollapse ) => {
  const { objTabChild } = getIndexTab()
  objTabChild.statusCollapse = statusCollapse
  currentCollapseStatusActivate.value = statusCollapse
}

//Chức năng tìm kiếm index và object tab con của ListTabObj
const getIndexTab = ( type ) => {
  let idxParentTab = ListTabObj.findIndex(item => item.key === activeKeyParentTab.value)
  let idxChildTab;

  if ( type === 'nextParentTab' ) {
    idxChildTab = ListTabObj[idxParentTab].children.findIndex(item => item.inActive)
    activeKeyChildTab.value = ListTabObj[idxParentTab].children[idxChildTab].key
  } else {
    idxChildTab = ListTabObj[idxParentTab].children.findIndex(item => item.key === activeKeyChildTab.value)
  }

  return {
    idxParentTab,
    idxChildTab,
    objTabChild: ListTabObj[idxParentTab].children[idxChildTab]
  }
}

</script>

<style lang="scss" scoped>
.tabs {
  position: relative;

  #btnCollapse {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>