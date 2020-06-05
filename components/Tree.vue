<template>
  <ul class="tree-list">
    <node-tree :node="treeData" :level="0" />
  </ul>
</template>

<script>
import NodeTree from '@/components/NodeTree'

export default {
  components: {
    NodeTree
  },
  props: {
    treeData: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
.tree-list ul {
  padding-left: 16px;
  margin: 6px 0;
}
</style>
