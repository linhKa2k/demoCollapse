<template>
  <a-collapse class="custom-collapse" v-model:activeKey="activeKey" :bordered="false" :expand-icon-position="'end'"
              @change="onChangePanel($event)">
    <template #expandIcon="{ isActive }">
      <DownOutlined :rotate="isActive ? 0 : 180" />
    </template>
    <a-collapse-panel :key="1" header="This is panel header 1" class="custome-collapse-panel">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dignissimos eligendi ipsa ipsam molestias
        nulla optio quod. A asperiores, assumenda at eius ex modi nemo nisi perspiciatis quisquam reiciendis saepe.
      </p>
    </a-collapse-panel>
    <a-collapse-panel :key="2" header="This is panel header 2" class="custome-collapse-panel">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid ea quam. Asperiores at commodi dolore et
        fuga itaque iure, magnam nulla perferendis quasi repudiandae, sunt suscipit tempore unde voluptate.
      </p>
    </a-collapse-panel>
    <a-collapse-panel :key="3" header="This is panel header 3" class="custome-collapse-panel">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi autem, distinctio dolorum eligendi
        fugit, id, iusto molestiae officia repellendus reprehenderit soluta! Accusamus ad culpa cumque distinctio qui
        tenetur, unde.
      </p>
    </a-collapse-panel>
    <a-collapse-panel :key="4" header="This is panel header 4" class="custome-collapse-panel">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi autem, distinctio dolorum eligendi
        fugit, id, iusto molestiae officia repellendus reprehenderit soluta! Accusamus ad culpa cumque distinctio qui
        tenetur, unde.
      </p>
    </a-collapse-panel>
  </a-collapse>
</template>

<script setup>
import { ref, defineProps, watch, defineEmits } from "vue";
import { DownOutlined } from '@ant-design/icons-vue';

import { StatusCollapse } from "../../../config/config";

const props = defineProps({ statusCollapse: String })
const emit = defineEmits([ 'changeStatusCollapse' ])

const defaultActiveKey = [ 1, 2, 3, 4 ]
const activeKey = ref(defaultActiveKey)

watch(props, () => {
  switch ( props.statusCollapse ) {
    case StatusCollapse.collapseAll:
      activeKey.value = [];
      break;
    case StatusCollapse.expandAll:
      activeKey.value = defaultActiveKey;
      break;
    default:
      break;
  }
})

const onChangePanel = ( arrActivation ) => {
  if ( arrActivation.length === defaultActiveKey.length ) {
    emit('changeStatusCollapse', StatusCollapse.expandAll)
  } else if ( arrActivation.length === 0 ) {
    emit('changeStatusCollapse', StatusCollapse.collapseAll)
  } else {
    emit('changeStatusCollapse', StatusCollapse.activeBoth)
  }
}
</script>

<style lang="scss" scoped>
.custom-collapse {
  background: #fff;

  :deep(.custome-collapse-panel) {
    background: #fafafa;
    border-radius: 4px;
    margin-bottom: 24px;
    border: 1px solid #f3f3f3;
    box-shadow: 0 3px 3px #f3f3f3;
  }
}
</style>