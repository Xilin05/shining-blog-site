import { navbar } from 'vuepress-theme-hope'

export const enNavbar = navbar([
  '/',
  {
    text: '前端学习专栏',
    icon: 'read',
    link: '/study/'
  },
  {
    text: '工作笔记专栏',
    icon: 'keyboard',
    link: '/work/'
    // prefix: '/work/',
    // children: [
    //   {
    //     text: '技术方案',
    //     prefix: 'proposal/',
    //     children: [
    //       {
    //         text: '线下费用模块梳理与总结',
    //         icon: 'note',
    //         link: 'offline-replay'
    //       }
    //     ]
    //   },
    //   {
    //     text: '复盘总结',
    //     prefix: 'notes/',
    //     children: [
    //       {
    //         text: '线下费用模块梳理与总结',
    //         icon: 'note',
    //         link: 'offline-replay'
    //       }
    //     ]
    //   }
    // ]
  },
  {
    text: '数据结构与算法专栏',
    icon: 'read',
    link: '/interview/'
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
