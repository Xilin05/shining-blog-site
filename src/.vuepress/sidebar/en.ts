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
      link: '学习相关/',
      prefix: '学习相关/',
      children: 'structure'
    },
    {
      text: '工作相关',
      icon: 'creative',
      prefix: '工作相关/',
      link: '工作相关/',
      children: 'structure'
    }
    // 'intro',
    // 'slides'
  ]
})
