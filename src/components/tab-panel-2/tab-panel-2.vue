<template>
  <a-tabs v-model:activeKey="activeKey" type="card" centered @change="onChangeTabChild()">
    <a-tab-pane :key="listChildtab[0].key" :tab="listChildtab[0].name">
      <child-component3
          :status-collapse="props.childCollapse3"
          @change-status-collapse="onListenChangePanel($event)"
      />
    </a-tab-pane>
    <a-tab-pane :key="listChildtab[1].key" :tab="listChildtab[1].name" force-render>
      <child-component4
          :status-collapse="props.childCollapse4"
          @change-status-collapse="onListenChangePanel($event)"
      />
    </a-tab-pane>
  </a-tabs>
</template>

<script setup>
import { defineProps, ref, defineEmits } from "vue";
import { ChildComponent3, ChildComponent4 } from './child-component/index'

const props = defineProps({
  childCollapse3: String,
  childCollapse4: String,
  activeTabKey: Number,
  listChildtab: Array
})

const emit = defineEmits([ 'changeTab', 'changeStatusCollapse' ])
const activeKey = ref(props.activeTabKey)

const onChangeTabChild = () => {
  emit('changeTab', activeKey.value)
}

const onListenChangePanel = ( statusCollapse ) => {
  emit('changeStatusCollapse', statusCollapse)
}

</script>

<style scoped>

</style>