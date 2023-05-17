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
      text: '学习相关',
      icon: 'creative',
      // link: 'study/',
      prefix: 'study/',
      children: 'structure'
    },
    {
      text: '工作相关',
      icon: 'creative',
      prefix: 'work/',
      // link: 'work/',
      children: 'structure'
    }
    // 'intro',
    // 'slides'
  ]
})
