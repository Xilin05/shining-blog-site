import { navbar } from 'vuepress-theme-hope'

export const enNavbar = navbar([
  '/',
  {
    text: '学习相关',
    icon: 'read',
    prefix: '/study/',
    children: [
      {
        text: '分享',
        prefix: 'sharing/',
        children: [
          {
            text: '前端架构浅析',
            link: 'frontArchitecture'
          }
        ]
      }
    ]
  },
  {
    text: '工作相关',
    icon: 'keyboard',
    prefix: '/work/',
    children: [
      {
        text: '笔记',
        prefix: 'notes/',
        children: [
          {
            text: '线下费用模块梳理与总结',
            icon: 'note',
            link: 'offlineReplay'
          }
        ]
      }
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
