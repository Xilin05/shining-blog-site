---
date: 2023-08-28
category:
  - 技术
  - 前端
tag:
  - 奇技淫巧
  - 知识笔记
  - ERP系统
  - 表单控件
  - 前端交互

excerptLength: 500
---

# **表单控件：input的输入交互**

在ERP开发过程中，输入框的交互是极为常见的需求，在这里记录本人常用的交互方案。
<!-- more -->

## 一、 前言
&emsp;&emsp;在ERP系统的开发过程中，经常提出需要限制输入、输入交互的需求，在之前的文档中也提过该需求类似的开发技巧，但是由于仅简单带过，且不涉及表格统计，因此在这里专门阐述input输入限制与交互与表格统计相结合等相关的需求开发技巧。

&emsp;&emsp;尤其在创建、编辑相关的页面中，只要设计数量、金额等相关字段的输入、编辑，很大概率都会碰到诸如：限制八位整数、两位小数，仅限正整数，0-6位整数，不得为0，不得超过某个数等相关的需求，同时，如果在表格中进行此类编辑，很大可能还涉及到数据的统计。

&emsp;&emsp;此类需求不难实现，难的是要考虑如何在实现需求的基础上最大限度地保证用户体验。

## 二、 思考与尝试

**常用控件与api：**

*   **Input 输入框**

| **名称** | **说明**                                    |
| -------- | ------------------------------------------- |
| oninput  | 当控件被输入时触发                          |
| onblur   | 当控件失去焦点时触发                        |
| change   | 当控件的值发生变动且失去焦点时触发          |
| focus    | 当控件获取焦点时触发                        |
| clear    | 在点击由 clearable 属性生成的清空按钮时触发 |

*   **Select 选择器**

| **名称** | **说明**                                    |
| -------- | ------------------------------------------- |
| blur     | 当控件失去焦点时触发                        |
| change   | 当控件的值发生变动时触发                    |
| focus    | 当控件获取焦点时触发                        |
| clear    | 在点击由 clearable 属性生成的清空按钮时触发 |

### 1. 初步方案

&emsp;&emsp;最简单、快速的方法，是监听控件绑定的值，当该值发生变动时触发监听，并在监听函数内完成响应的交互逻辑与动作。

```vue
<template>
  <div class="page-form-component-test">
    <el-input v-model="formParam.input" placeholder="请输入" clearable />
    <el-select v-model="formParam.select" clearable placeholder="请选择">
      <el-option v-for="item in 10" :key="item" :label="item + 1" :value="item + 1" />
    </el-select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ElInput, ElSelect, ElOption, ElMessage } from 'element-plus'

const formParam = ref({
  input: '',
  select: ''
})

watch(
  () => formParam.value.input,
  (newVal, oldVal) => {
    // 在监听内部实现交互逻辑
  }
)

watch(
  () => formParam.value.select,
  (newVal, oldVal) => {
    // 在监听内部实现交互逻辑
  }
)
</script>
```

&emsp;&emsp;这样虽说是实现了需求，但是如果每次都需要用户花时间去阅读警告信息，再手动修改不符合要求的内容，有时候页面交互逻辑多、限制多的时候，可能会导致每输入一次就提醒一次，对一些用户来说太多的警告信息，并且不断地手动修改会烦不胜烦。

### 2. 方案优化

针对以上优化点，当用户的输入不符合要求时，对于一些可以确定的值，由代码给用户自动填充，并且使用节流函数，将警告信息的频率进行控制。

这时候，虽然警告信息少了，代码也自动填充了，但是从代码层面来说太多的监听对性能不太友好，只有几个交互的时候还没什么问题，但是当监听的数据源多，并且数据量大的时候，是一定会造成较大性能消耗的，因此，需要再思考优化的方向：

*   浅层监听，只监听对数组的修改，不监听数组元素的修改；

*   **不使用watch，自己在修改的源头处理**；

当我们使用Input输入框的时候，其有原生的api可以参考使用：oninput，onblur，change。

由于其是原生的api，性能方面可以不必担心，并且是在数据源头进行处理，不再对数据进行劫持，并且可以灵活控制，即时控制，即时响应。可以通过一些简单的例子进行尝试：

```vue
<template>
  <div class="page-form-component-test">
    <el-input v-model="formParam.input" placeholder="请输入" clearable :oninput="onInput" :onblur="onBlur"  />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElInput } from 'element-plus'

const formParam = ref({
  input: ''
})

const onInput = (e) => {
  // 限制输入八位整数两位小数
  e.target.value =
    e.target.value
      .replace(/\D*(\d*)(\.?)(\d{0,3})\d*/, '$1$2$3')
      .replace(/^0+(\d)/, '$1')
      .replace(/^\./, '0.')
      .replace(/^\D*(\d{0,8}(?:\.\d{0,2})?).*$/g, '$1')
      .match(/^\d*(\.?\d{0,2})/g)[0] || ''
}

const onBlur = (e) => {
  // 失焦时做数据交互
  if (e.target.value.substr(e.target.value.length - 1, 1) == '.') {
    e.target.value = e.target.value.slice(0, -1)
  }
}
</script>
```

以上代码通过结合正则匹配，字符替换，运行后在input输入值可以看到效果为：

*   仅能输入数字，非数字被替换为空字符串；
*   首数字输入0，不能再输入0，输入其他数字则去掉0；
*   仅能输入一个小数点；
*   小数点前只能输入8位，小数点后只能输入2位；

通过以上的代码控制，可以完美限制用户输入，不必再等到用户输入完成后再进行校验，也降低了提交数据时校验出错的可能性。

同时，使用onblur方法，当输入框失去焦点后判断输入的值是否以小数点结尾，若是则清除小数点。

如果需要加信息提示，可以直接在onInput中加入，当e.target.value达到某个条件时，进行信息提示即可，当然还是要做好提示的节流或防抖，因为oninput是每输入一次就校验一次。

## 三、 总结

通过本方案实现的输入限制、检验业务需求，体会到了思考方式转变的重要性，也说明了正则匹配的重要性。

很多开发过程碰到问题、解决问题后尽量多思考有没有更好的解决方案，而不是浅尝辄止，停留于粗糙的实现，这对于个人的提升很重要，很多冷门的api用起来也可以十分高效并且较好的解决问题，需要的是多查阅资料，多尝试，多转换思考角度，获取就能学习到不一样的东西。