import { hopeTheme } from 'vuepress-theme-hope'
import { enNavbar, zhNavbar } from './navbar/index.js'
import { enSidebar, zhSidebar } from './sidebar/index.js'
import type { ThemeOptions } from 'vuepress-theme-hope'

export default hopeTheme(
  {
    fullscreen: true,

    hostname: 'https://github.com/',

    author: {
      name: 'Shining Lai',
      url: 'https://blog.shining98.top'
    },

    iconAssets: 'iconfont',

    logo: '/gradient_medium.png',

    // repo: 'Xilin05/shining98_blog',

    docsDir: 'docs',

    blog: {
      medias: {
        GitHub: 'https://github.com/Xilin05',
        Gitee: 'https://gitee.com/ling0512',
        BiliBili: 'https://b23.tv/Mskp5bD'
        // Baidu: 'https://example.com',
        // BiliBili: 'https://example.com',
        // Gitlab: 'https://example.com',
        // Wechat: 'https://example.com',
        // Weibo: 'https://example.com',
        // Zhihu: 'https://example.com'
      }
    },

    locales: {
      '/': {
        // navbar
        navbar: enNavbar,

        // sidebar
        sidebar: enSidebar,

        footer:
          '<a href="https://beian.miit.gov.cn/" target="_blank" data-v-cd3c7b98="">粤ICP备2021132572号-1</a>',

        displayFooter: true,

        blog: {
          description: '[2022届][深圳]前端开发工程师',
          intro: '/intro.html'
        },

        metaLocales: {
          editLink: 'Edit this page on GitHub'
        }
      }

      /**
       * Chinese locale config
       */
      // '/zh/': {
      //   // navbar
      //   navbar: zhNavbar,

      //   // sidebar
      //   sidebar: zhSidebar,

      //   footer: '默认页脚',

      //   displayFooter: true,

      //   blog: {
      //     description: '一个前端开发者',
      //     intro: '/zh/intro.html'
      //   },

      //   // page meta
      //   metaLocales: {
      //     editLink: '在 GitHub 上编辑此页'
      //   }
      // }
    },

    encrypt: {
      config: {
        '/work/proposal/deliver-order.html': ['slyb'],
        '/work/proposal/offline-page-configurable.html': ['slyb'],
        '/work/review/offline-replay.html': ['slyb']
      }
    },

    editLink: false,
    plugins: {
      // blog: true,
      blog: {
        excerptLength: 100
      },

      // If you don’t need comment feature, you can remove following option
      // The following config is for demo ONLY, if you need comment feature, please generate and use your own config, see comment plugin documentation for details.
      // To avoid disturbing the theme developer and consuming his resources, please DO NOT use the following config directly in your production environment!!!!!
      comment: {
        /**
         * Using Giscus
         */

        // <script src="https://giscus.app/client.js"
        //   data-repo="Xilin05/shining-blog-site"
        //   data-repo-id="R_kgDOJjxYrQ"
        //   data-category="Announcements"
        //   data-category-id="DIC_kwDOJjxYrc4CZfUd"
        //   data-mapping="pathname"
        //   data-strict="0"
        //   data-reactions-enabled="1"
        //   data-emit-metadata="0"
        //   data-input-position="bottom"
        //   data-theme="preferred_color_scheme"
        //   data-lang="zh-CN"
        //   crossorigin="anonymous"
        //   async>
        // </script>
        provider: 'Giscus',
        repo: 'Xilin05/shining-blog-site',
        repoId: 'R_kgDOJjxYrQ',
        category: 'Announcements',
        categoryId: 'DIC_kwDOJjxYrc4CZfUd'
      },

      // Disable features you don’t want here
      mdEnhance: {
        align: true,
        attrs: true,
        chart: true,
        codetabs: true,
        container: true,
        demo: true,
        echarts: true,
        figure: true,
        flowchart: true,
        gfm: true,
        imgLazyload: true,
        imgSize: true,
        include: true,
        katex: true,
        mark: true,
        mermaid: true,
        playground: {
          presets: ['ts', 'vue']
        },
        presentation: {
          plugins: ['highlight', 'math', 'search', 'notes', 'zoom']
        },
        stylize: [
          {
            matcher: 'Recommended',
            replacer: ({ tag }) => {
              if (tag === 'em')
                return {
                  tag: 'Badge',
                  attrs: { type: 'tip' },
                  content: 'Recommended'
                }
            }
          }
        ],
        sub: true,
        sup: true,
        tabs: true,
        vPre: true,
        vuePlayground: true
      }

      // uncomment these if you want a PWA
      // pwa: {
      //   favicon: "/favicon.ico",
      //   cacheHTML: true,
      //   cachePic: true,
      //   appendBase: true,
      //   apple: {
      //     icon: "/assets/icon/apple-icon-152.png",
      //     statusBarColor: "black",
      //   },
      //   msTile: {
      //     image: "/assets/icon/ms-icon-144.png",
      //     color: "#ffffff",
      //   },
      //   manifest: {
      //     icons: [
      //       {
      //         src: "/assets/icon/chrome-mask-512.png",
      //         sizes: "512x512",
      //         purpose: "maskable",
      //         type: "image/png",
      //       },
      //       {
      //         src: "/assets/icon/chrome-mask-192.png",
      //         sizes: "192x192",
      //         purpose: "maskable",
      //         type: "image/png",
      //       },
      //       {
      //         src: "/assets/icon/chrome-512.png",
      //         sizes: "512x512",
      //         type: "image/png",
      //       },
      //       {
      //         src: "/assets/icon/chrome-192.png",
      //         sizes: "192x192",
      //         type: "image/png",
      //       },
      //     ],
      //     shortcuts: [
      //       {
      //         name: "Demo",
      //         short_name: "Demo",
      //         url: "/demo/",
      //         icons: [
      //           {
      //             src: "/assets/icon/guide-maskable.png",
      //             sizes: "192x192",
      //             purpose: "maskable",
      //             type: "image/png",
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // },
    }
  },
  {
    custom: true
  }
)
