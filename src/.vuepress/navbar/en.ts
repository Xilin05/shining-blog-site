import { navbar } from 'vuepress-theme-hope'

export const enNavbar = navbar([
  '/',
  { text: '学习相关', icon: 'discover', link: '/学习相关/' },
  {
    text: '工作相关',
    icon: 'edit',
    prefix: '/工作相关/',
    children: [
      {
        text: '笔记',
        icon: 'edit',
        prefix: 'note/',
        children: [
          {
            text: '线下费用模块梳理与总结',
            icon: 'edit',
            link: 'offlineReplay'
          }
        ]
      }
      // {
      //   text: 'Banana',
      //   icon: 'edit',
      //   prefix: 'banana/',
      //   children: [
      //     {
      //       text: 'Banana 1',
      //       icon: 'edit',
      //       link: '1'
      //     },
      //     '3'
      //   ]
      // },
      // { text: 'Cherry', icon: 'edit', link: 'cherry' },
      // 'tomato'
    ]
  },
  {
    text: '代码仓库',
    icon: 'github',
    children: [
      { text: 'Github', link: 'https://github.com/Xilin05' },
      { text: 'Gitee', link: 'https://gitee.com/ling0512' }
    ]
  }
])
