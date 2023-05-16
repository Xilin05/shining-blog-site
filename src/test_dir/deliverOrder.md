---
date: 2023-05-09
category:
  - 前端
tag:
  - 技术方案
  - ERP系统
  - ERP
---

# **需求分析**

## **送货单模块**

本模块属于发货计划模块的一个子模块，是整个计划管理模块的其中一个环节，具体业务流程可参考产品需求文档：[2023.04.17-送货单需求](https://alidocs.dingtalk.com/i/nodes/YQBnd5ExVE0D0L59ix56BPp2WyeZqMmz)

## **操作日志模块**

本模块需求于【0220 -  迭代需求】版本提出，主要用于方便查看用户在本系统中的操作记录，因多种原因故延至本期开发，具体需求可查看[《2023.02.20-日志需求》](https://alidocs.dingtalk.com/i/nodes/em7AML0b9lBV2YX1XllRWnNyqOD6vwro)

---

# **模块分析**

## **送货单模块**

- **页面**

本模块共有 6 个页面，分别是：送货单列表，创建送货单，编辑申请信息，编辑送货信息，编辑到货信息，送货单详情。

其中，创建送货单、编辑申请信息/送货信息/到货信息页面共性较大，可以考虑用同一个页面组件，但是需要不同的标识来初始化页面判断是哪种场景，以便控制页面某部分控件、组件的显示或隐藏，并且初始化传给后端的参数以及数据结构。

- **弹窗**

本模块中需要开发的弹窗组件：选择物流单弹窗、上传文件弹窗、文件预览弹窗、选择送货产品弹窗。

其中，上传文件与文件预览弹窗组件往期有，可以直接复用，但是需要根据后端需要的数据结构调整各个字段。

## **操作日志模块**

- **页面**

操作日志模块比较简单，只有一个页面，字段也不多。

- **弹窗**

页面需要根据操作记录内容的多少，判断是否需要单独一个弹窗展示内容。

---

# **结构设计**

## **送货单模块**

- **目录结构设计**

```
  deliver
  ├─ components
  ├─ create
  │ ├─ hooks
  │ │ ├─ useAction.ts
  │ │ ├─ useConfig.ts
  │ │ ├─ useData.ts
  │ │ └─ useMod.ts
  │ └─ index.vue
  ├─ detail
  │ ├─ hooks
  │ │ ├─ useAction.ts
  │ │ ├─ useConfig.ts
  │ │ ├─ useData.ts
  │ │ └─ useMod.ts
  │ └─ index.vue
  └─ list
  ├─ hooks
  │ ├─ useAction.ts
  │ ├─ useConfig.ts
  │ ├─ useData.ts
  │ └─ useMod.ts
  └─ index.vue
```

- **主页面代码结构**

```vue
<template>
  <div class="page-deliver-list h-full overflow-auto bg-white">
    <table-page
      ref="refDeliverTable"
      :form="form"
      :searchs="getSearchBars()"
      :search-begin-fields="getSearchFields"
      :search-api="getDeliverListAPI"
      :batchBtns="getBatchBtns()"
      :handleBatch="batchActions"
      :disabled-batch-obj="disabledBatchBtn"
      :columns="getColumns()"
      :tabs="getTableTabs()"
      :tabs-num="getShortcutTabs()"
      :cashTab="true"
      :after-data="getDealedData"
      :tableEvent="{ 'selection-change': handleSelectionChange }"
      list-alias="deliver_list"
      class="define-table-container"
    ></table-page>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref, Ref } from 'vue'
import { ElMessage, ElPopover, ElTag } from 'element-plus'

import TablePage from '@/components/models/TablePage/index.vue'
import RelatedTable from '../components/RelatedTable.vue'

import { getShippingListAPI } from './hooks/useApi'
import useConfig from './hooks/useConfig'
import useData from './hooks/useData'
import useAction from './hooks/useAction'

const { refDeliverTable, form, selectionList, feedBack } = useData()
const {
  batchActions,
  rowActions,
  disabledBatchBtn,
  handleSelectionChange,
  getDealedData,
  viewProduct
} = useAction({
  refShippingTable,
  selectionList,
  form
})

const {
  getSearchBars,
  getTableTabs,
  getShortcutTabs,
  getSearchFields,
  getBatchBtns,
  getColumns
} = useConfig({
  form,
  rowActions
})
</script>

<style lang="scss" scoped></style>
```

## **操作日志模块**

- **目录结构设计**

```
  operationLog
  ├─ index.vue
  ├─ useApi.ts
  └─ useConfig.ts
```

- **主页面代码结构**

```vue
<template>
  <div class="page-operation-log-list h-full overflow-auto bg-white">
    <table-page
      ref="refOperationLog"
      :immediateReuest="false"
      :searchs="configData.searchs"
      :search-api="() => {}"
      :list-alias="'quote_list'"
      :columns="configData.columns"
    ></table-page>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref, Ref } from 'vue'
import { ElMessage, ElPopover, ElTag } from 'element-plus'

import TablePage from '@/components/models/TablePage/index.vue'
</script>

<style lang="scss" scoped></style>
```

---

# **业务与代码逻辑**

## **送货单模块**

1.  ### 列表

列表页面比较复杂，  分别有：搜索栏、tabs 切换、表头按钮、刷新按钮、列表行展开、列表行操作按钮、文件列表展示、文本悬浮框、sku 展示产品详情

- 搜索栏：useConfig.ts 文件中编写一个 getSearchBar 函数返回配置结构并传入 table-page 组件；

- tabs 切换：useConfig.ts 文件中编写一个 getTabs 函数返回配置结构并传入 table-page 组件；

- 表头按钮：useConfig.ts 文件中编写一个 getBatchbtns 函数返回配置结构并传入 table-page 组件；

只有申请中 tab 才有表头按钮

- 列表行展开：useConfig.ts 中配置列显示时，配置多一行"type: expand"来使用表格的展开功能，具体的展开信息需要在页面组件中根据列的 prop 配对进行显示；

- 列表行操作：useConfig.ts 文件中编写一个 getColumns 函数的同时，返回 moreConfig 配置结构并传入 table-page 组件；

包含的操作：查看详情、编辑申请信息、编辑到货信息、送货确认、上传 POD、作废送货单

重点：需要根据不同的 tab 展示不同的按钮

申请中：详情，编辑(申请信息、送货信息)，作废

送货中：详情，编辑送货信息

已到货：详情，编辑到货信息，

已作废：详情

在 moreConfig 中根据后端返回的 status 进行判断显示

- 文件列表展示：当某行记录存在文件附件时，需要在列中配置插槽来显示文件列表以及基础信息，并需要一个按钮来打开文件列表弹窗，供用户查看文件相关信息以及进行下载操作；

- 文本悬浮框：当某个单元格内容过多无法一次性显示完毕时，需要鼠标移动到该位置后有悬浮弹窗显示详情；

- sku 展示产品详情：上一期开发中我在公共组件中已经配置完毕，可以在配置列信息的时候调用一下即可使用该功能；

```js
  {
    prop: 'product_info',
    label: '品名/SKU',
    width: 170,
    viewProduct: (row: Record<string, any>) => row?.product_list?.[0]?.product_id,
    type: 'ellipsis',
    format: (row: Record<string, any>) => [row?.product_list?.[0]?.name || '-', row?.product_list?.[0]?.sku || '-']
  }
```

2.  ### 创建送货单

从列表页面点击创建送货申请，选择某一个物流单中，或者某一个物流单中的多个产品，确定后跳转至创建申请。

重点：点击创建送货单需要调用后端接口获取可创建送货单的数据，然后选择某一个物流单进行创建送货申请，注意入口有多个，物流单也可以进入。

只能选择一条物流单或某条物流单下面的产品，选择产品时不可跨物流单。

产品中   绑定 MSKU  为店铺的 MSKU，附件列表可以对文件进行移除。

产品可以移除，也可以上传附件。

数据联动：表头选择目的地，店铺等信息后，在产品表格中也要进行展示，但是不予编辑。

表格校验：

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/XJ9LnWvPvkEWlvDe/img/0dc14814-f487-4c82-b104-15b91a23e5be.png)

目前送货单仅允许选择其中一条物流单进行创建，创建页面中不允许选择其他物流单，需要取消后才能重新选择。

3.  ### 编辑送货申请/送货信息/到货信息

跳转本页面时，需要路由传递参数：单号 id 以及选择的模式 mode，以便进入本页面时进行判断组件、控件显示与隐藏。

送货申请：存在表头联动输入控件，存在申请信息备注

送货信息/到货信息：存在文件上传，多板块不同的备注信息

4.  ### 送货单详情

静态页面：使用 page-detail 组件  +  插槽显示即可，具体可参考往期代码进行配置。

数据展示：调用后端详情接口，传入送货单 id，获取详情数据后根据字段进行对应的展示。

弹窗展示：送货单详情可能存在附件，需要对文件进行展示。

## **操作日志模块**

1. ### 列表

搜索栏、刷新按钮、文本悬浮框、日志操作详情

- 搜索栏：useConfig.ts 文件中编写一个 getSearchBar 函数返回配置结构并传入 table-page 组件；

- 详情：当操作详情单元格内容过多时，需要展示详情按钮，用户点击后弹窗展示操作详情。

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/XJ9LnWvPvkEWlvDe/img/b21f2e64-8d27-45e9-a48b-c20a6382a15f.png?x-oss-process=image/crop,x_129,y_52,w_784,h_474)
