import { getDirname, path } from '@vuepress/utils'
import { defineUserConfig } from 'vuepress'
import { searchProPlugin } from 'vuepress-plugin-search-pro'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import theme from './theme.js'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'Shining Lai',
  plugins: [
    registerComponentsPlugin({
      // 配置项
      components: {
        HomePage: path.resolve(__dirname, './components/home-page.vue')
      }
    }),
    searchProPlugin({
      hotReload: true,
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
      customFields: [
        {
          getter: (page: any) => page?.frontmatter?.category,
          formatter: '分类：$content'
        },
        {
          getter: (page: any) => page?.frontmatter?.tag,
          formatter: '标签：$content'
        }
      ]
    })
  ],

  theme,

  shouldPrefetch: false,

  alias: {
    // 你可以在这里将别名定向到自己的组件
    // 比如这里我们将主题的主页组件改为用户 .vuepress/components 下的 HomePage.vue
    '@theme-hope/components/HomePage': path.resolve(
      __dirname,
      './components/home-page.vue'
    ),

    '@theme-hope/modules/blog/components/BlogHero': path.resolve(
      __dirname,
      './components/blog-hero.vue'
    )
  }
})
