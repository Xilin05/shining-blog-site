import { sidebar } from 'vuepress-theme-hope'

export const enSidebar = sidebar({
  '/': [
    '',
    // {
    //   icon: 'discover',
    //   text: 'Test',
    //   prefix: 'testDir/',
    //   link: 'testDir/',
    //   children: 'structure'
    // },
    // {
    //   text: 'Articles',
    //   icon: 'note',
    //   prefix: 'posts/',
    //   children: 'structure'
    // },
    {
      text: '前端学习专栏',
      icon: 'creative',
      prefix: 'study/',
      // link: 'study/',
      children: 'structure'
    },
    {
      text: '工作笔记专栏',
      icon: 'creative',
      prefix: 'work/',
      // link: 'work/',
      children: 'structure'
    },
    {
      text: '数据结构与算法',
      icon: 'creative',
      prefix: 'interview/',
      // link: 'work/',
      children: 'structure'
    }
    // 'intro',
    // 'slides'
  ]
})
