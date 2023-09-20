---
date: 2022-08-03
category:
  - 工作
  - 分享
  - ERP系统
tag:
  - 入职分享
  - 知识分享
  - ERP系统
  - 系统分析

sticky: 2
isOriginal: true
PageView: true
---

<!-- [入职分享][ERP系统]订单模块浅析 -->

# **订单模块浅析**

关于公司自研ERP系统中订单模块的简单分析。
<!-- more -->

## **1. 设计背景**

### 1.1 模块地位

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在 ERP 的主流程中，一套订单管理系统或子系统为企业的知名度、时间效率、降低人为错误的风险，提高数据精度等方面起了非常大的作用。

### 1.2 业务痛点

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;公司的跨境电商业务，目前海外采用了三个 erp 系统，分别是：船长 BI，领星，易仓，国内是聚水潭；

- **船长：**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目的：主要用于看实时的多个亚马逊店铺的销售额

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;问题点：数据不准确，促销数据，优惠券等没有踢出掉，只能宏观上把握所有店铺的数据

- **领星：**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目的：订单，广告，售后；供应链端：采购计划，采购，物流/仓库；

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;问题点：数据延迟一天，数据也不准确，其他项目因为数据不准确，没有被启用起来，因此整个运营的数据目前仍然是我们的运营自己统计的，费时费力。

- **易仓：**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目的：管理独立站，ebay，沃尔玛平台的订单

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;问题点：订单及广告等管理比较粗糙，基本还得靠运营自己统计，比较费时费力

- **聚水潭：**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目的：国内电商的供应链管理

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;问题点：只有财务与物流对账环节比较麻烦，其他项目都能满足需求

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;基于以上当前 erp 系统无法完全满足我们自己的需求，因此我们自己内部开发系统来满足内部需求。

## **2. 模块价值与关系分析**

### 2.1 模块价值

- **自动化效率**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订单管理系统以自动化方式运行，自动化订单处理系统可节省人工成本、降低发票和订单数据中出现人为错误的风险，并为公司腾出运营优化时间，专注于增长和客户满意度。同时提高了数据安全性，因为不需要手动干预。

- **24/7  全天候访问**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;企业可以从任何目的地在线访问订单管理系统，这意味着可以随时远程处理订单。这导致更好的数据控制、更好的客户服务和更有效的订单处理。

- **专注于增长**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;从订单到现金，系统的自动化从单一平台快速创建标准化流程，腾出公司时间来收集和分析数据，以便利用 BI 看板进一步发展并解决任何问题。

- **库存管理**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订单管理系统的实时功能通过实时分发有关已售、退货或换货的数据，有利于库存管理。

- **集中视图**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;集中式订单管理系统的易用性使公司能够从单一角度了解复杂的电子商务履行生态系统，并防止因库存不足、发票不正确或无法预见的运输错误等常见故障而导致订单错误、客户不满意或收入损失。

- **多角度/维度分析**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通过多角度、多维度分析订单数据，分析业务形态，分析业务增长激点，在一定程度上协助公司做好下一步规划，提高决策的效率和质量。

- **实时信息**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;由于订单管理系统的实时数据显示，公司能够对可能出现的任何问题做出更快的反应，而不是冒着客户对错误或延迟不满意的风险。它还确保产品和支付数据是最新的，让公司更深入地了解他们当前的业务状态。

### 2.2 模块关系分析

#### 2.2.1 ERP 系统各子模块划分

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[请至钉钉文档查看「流程图」](https://alidocs.dingtalk.com/i/nodes/lDZEN6or0dp8Z3jgj9lbWaPYQK91xzy3?iframeQuery=anchorId%253DX02l6uyt27pgkopo719od4)

（1）对外系统：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;所有给企业外部用户使用的系统都在这一层，目前主要是亚马逊平台。该平台作为与客户接触的最前线，是公司实现商业模式的桥头堡，也是订单的来源。

（2）管理中后台：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;由多个不同的模块共同构成 ERP 的中后台管理系统，例如管理公司所有产品的产品模块，管理所有公司所有店铺的店铺模块，对所有订单进行、人员等进行统计的统计模块，公司所有店铺、产品相关的订单集中进行集中统计的订单模块等。

#### 2.2.2 订单模块上下游关系

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[请至钉钉文档查看「流程图」](https://alidocs.dingtalk.com/i/nodes/lDZEN6or0dp8Z3jgj9lbWaPYQK91xzy3?iframeQuery=anchorId%253DX02l6uzzi3dxufaah1ypkt)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[请至钉钉文档查看「流程图」](https://alidocs.dingtalk.com/i/nodes/lDZEN6or0dp8Z3jgj9lbWaPYQK91xzy3?iframeQuery=anchorId%253DX02l6v09479ui2tdbreyk)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;由此可见，订单模块对上接收来自亚马逊的店铺订单信息，将之转化为 ERP 系统订单，同时管理并跟踪订单信息和数据，承载了公司整个交易线的重要订单管理环节。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对下则衔接产品模块、统计模块、listing 模块、广告模块、店铺模块等，对整个电商平台起着承上启下的作用。

## **3. 模块流程与技术实现**

### 3.1 模块业务内容

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订单从产生到完成的过程中，由于多种原因可能产生不同类型的订单，以及货件、库存变动带来的仓储数据变更，我们需要不同类型的列表功能来分别展示不同的数据，方便相关人员进行统计、分析、管理。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目前主要列表内容如下：

    订单列表，退货列表，换货列表，移除列表，移除货件，流水列表，异常列表

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据平台订单，通过拉取后展示当前订单相关信息的汇总列表，管理员通过系统为店铺授权后，用户可以在本系统查看授权店铺在亚马逊平台产生的订单。

- 退货、换货列表：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;产品支持退换货，因此会有当有客户进行退换申请时，就会有对应的订单出现，我们的系统也需要将该类型订单记录，并且因为退换货会涉及到库存，记录此类订单能够为以后库存做前置工作，订单模块需要“退换货列表”，数据都来源于亚马逊 API 下载的退换货报告信息；

- 移除列表：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因亚马逊平台出现移除订单，需要将该类型订单记录，且涉及到库存记录情况，为以后库存做前置工作，因此新增移除列表需求，列表的数据来源于亚马逊 API 进行的下载的移除报告信息；

- 移除货件：

因亚马逊平台出现移除订单，而相同移除订单中，不一定是一次性进行移除完毕，有可能是多次移除，产生了移除货件信息，需要将该类型货件记录，且涉及到库存记录情况，为以后库存做前置工作；

- 流水列表：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为了检验拉单是否存在漏拉单或者拉单数据不准确，需要导入亚马逊后台的时间范围报告，因此需要流水汇总的列表。

- 异常列表：

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为了检验拉单是否存在漏拉单或者拉单数据不准确，因此需要导入亚马逊后台的时间范围报告，与订单数据进行校验。当出现异常数据时，则提示异常信息。数据来源于订单与报告进行核对产生异常的数据信息。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ERP 系统订单数据的获取与更细流程如下：

- [《订单拉单流程图》](https://docs.dingtalk.com/api/doc/transit?spaceId=5358792513&dentryId=53110210456&queryString=utm_source%3Ddingdoc_doc%26utm_medium%3Ddingdoc_doc_plugin_card)

- [《订单更新信息流程》](https://docs.dingtalk.com/api/doc/transit?spaceId=5358792513&dentryId=53167299000&queryString=utm_source%3Ddingdoc_doc%26utm_medium%3Ddingdoc_doc_plugin_card)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;还有存在数据分析，订单相关分析，以及形成决策建议。此部分才是订单背后最终/也是最重要的业务内容。

### 3.2 订单流程简析

- **订单正向/逆向流程：**

[请至钉钉文档查看「流程图」](https://alidocs.dingtalk.com/i/nodes/lDZEN6or0dp8Z3jgj9lbWaPYQK91xzy3?iframeQuery=anchorId%253DX02l6w5edd5qi8vd16pyy)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;亚马逊平台的订单流程可抽象为 5 大步骤：

    订单提交  ->  订单支付  ->  订单形成  ->  订单配送  ->  订单完成

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;其后，又会因为可能产出现退货退款而产生逆向流程，最终不管是正向还是逆向流程，都会产生订单数据，而只要有订单数据，我们就需要通过授权来拉取这些订单，并对数据实施分析、统计、展示等行为。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;基于以上内容与流程分析，并结合实际需求，我们的订单列表期望的主要结构便有大概的设想：需要内容展示、数据统计、数据管理，考虑内容较多时，为方便快速查找，还需要搜索功能等。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最终，真正设计出来的结构如：[请至钉钉文档查看附件《订单列表结构图&说明》](https://alidocs.dingtalk.com/i/nodes/lDZEN6or0dp8Z3jgj9lbWaPYQK91xzy3?iframeQuery=anchorId%253DX02l6x89r8vf1s1pswhltv)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;其他的列表根据列表类型的不同，展示不同的数据，进行不同的操作，但总体结构相同，都由：**搜索栏，操作按钮，列表，分页**为基本结构来组成。

### 3.3 模块技术实现

#### 3.3.1 后端

- 技术栈：golang + mysql
- 开发模式：前后端分离
- 主要内容：
  - 所有订单数据进行分类，数据对比，数据计算，数据统计等；
  - 最终返回经过一定的逻辑处理后的数据给前端以展示；
  - 功能提测，代码 review；
- 开发流程：
  - 梳理业务需求，确定接口定义
  - 编写接口文档，定义数据结构
  - 合并代码分支，前后两端沟通
  - sql 设计评审，开发环境先行
  - 模块服务开发，接口路由注册
  - 代码合并评审，前端联调测试

#### 3.3.2 前端

- 技术栈：Vue3.2 + Axios + Vuex + ElementPlus + Vue-Router@4.x
- 开发模式：前后端分离，MVVM
- 主要内容：
  - 结合原型设计、UI 设计以及产品需求，对相应界面及功能进行开发；
  - 根据后端提供的接口，进行数据联调；
  - 功能提测，代码 review；
- 开发流程：
  - 分析原型与 UI，熟悉业务流程
  - 规划开发计划，约定开发规范
  - 设计组件划分，创建模块目录
  - 着手编写代码，优先注册路由
  - 开发通用组件，细化组件逻辑
  - 合并模块代码，整体功能测试

## **4. 总结**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对于企业订单系统的搭建，并不是要做的大而全、也不是要小而精。而需要结合市场、公司、业务的实际情况来最终制定系统设计方案和产品迭代计划。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最终，和公司整体发展相互协调，相辅相成。
