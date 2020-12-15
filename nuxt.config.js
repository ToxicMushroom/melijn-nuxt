import theme from '@nuxt/content-theme-docs'
require('events').EventEmitter.prototype._maxListeners = 70;
require('events').defaultMaxListeners = 70;

export default {
  mode: 'universal',
  server: {
    port: process.env.PORT, // default: 3000
    host: process.env.BIND_ADDRESS // default: localhost
  },
  theme: theme({
    docs: {
      primaryColor: '#A1B4ED'
    },
    loading: {
      color: '#A1B4ED'
    }
  }),
  router: {
    prefetchLinks: false
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#A1B4ED' },
      { name: 'msapplication-TileColor', content: '#A1B4ED' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'keywords', content: 'melijn,meljin,melina,melijnbot,meljinbot,melijn bot,meljin bot,toxicmushroom' }
    ],
    link: [{
      rel: 'icon',
      type: 'image/png',
      sizes: '100x100',
      href: '/fabicon.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '200x200',
      href: '/fabicon-200x.png'
    }]
  },
  render: {
    csp: {
      hashAlgorithm: 'sha256',
      policies: {
        'script-src': [
          "'self'",
          "'unsafe-eval'",
          "'unsafe-inline'",
          "https://www.gstatic.com/",
          "https://www.google.com/recaptcha/api.js"
        ],
        'trusted-types': [
          'default'
        ],
        'frame-ancestors': [
          'https://top.gg/',
          'https://discord.boats',
          'https://botsfordiscord.com'
        ],
        'report-uri': [
          'https://melijn.com'
        ]
      }
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#A1B4ED'
  },
  /*
   ** Global CSS
   */
  css: [
    '@static/css/reset.css',
    '@static/css/scrollbar.css',
    '@static/css/variables.css',
    {
      src: '@static/css/main.scss',
      lang: 'scss'
    }
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/style-resources'
  ],
  sitemap: {
    hostname: 'https://melijn.com',
    gzip: true,
    exclude: [
      '/dashboard/**',
      '/dashboard',
      '/login',
      '/logout',
      '/callback',
      '/invite',
      '/recaptcha'
    ],
    routes: async () => {
      const { $content } = require('@nuxt/content')

      const guides = await $content('guides').fetch()
      const articles = await $content('articles').fetch()

      // Setup an empty array we will push to.
      const routes = []

      // Add an entry for the item including lastmod and priorty
      articles.forEach(w =>
        routes.push({
          url: w.path,
          priority: 0.8,
          lastmod: w.updatedAt
        })
      )

      guides.forEach(p =>
        routes.push({
          url: p.path,
          priority: 0.8,
          lastmod: p.updatedAt
        })
      )

      // return all routes
      return routes
    }
  },
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
    'cookie-universal-nuxt',
    ['nuxt-buefy', { css: false, materialDesignIcons: false }],
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/free-regular-svg-icons',
          icons: ['faMoneyBillAlt']
        },
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: [
            'faPlusSquare',
            'faTimes',
            'faAngleDown',
            'faQuestionCircle',
            'faMusic',
            'faHammer',
            'faShieldAlt',
            'faUserTag',
            'faWrench',
            'faInfo',
            'faImages',
            'faToriiGate',
            'faPaw',
            'faLink',
            'faCog',
            'faSignOutAlt',
            'faArrowLeft',
            'faClipboardList',
            'faDoorOpen',
            'faCalendarDay',
            'faDice',
            'faStar',
            'faChartBar',
            'faBorderAll'
          ]
        },
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: [
            'faPatreon',
            'faGithub',
            'faTwitter',
            'faDiscord'
          ]
        }
      ]
    }],
    '@nuxtjs/proxy',
    '@nuxtjs/sitemap'
  ],
  generate: {
    async routes () {
      const content = await require('@nuxt/content')
      const articles = await content
        .$content('articles')
        .only(['path'])
        .fetch()
      const guides = await content
        .$content('guides')
        .only(['path'])
        .fetch()
      return [].concat(
        articles.map(article => article.patch),
        guides.map(guide => guide.patch)
      )
    },
    fallback: true
  },
  proxy: {
    '/api': {
      target: process.env.BACKEND_BASE_URL,
      pathRewrite: {
        '^/api': '/commands'
      }
    },  
    '/statsApi': {
      target: process.env.BACKEND_BASE_URL,
      pathRewrite: {
        '^/statsApi': '/publicStats'
      }
    },
    '/cookie/encrypt/code': {
      target: process.env.BACKEND_BASE_URL
    },
    '/cookie/decrypt/user': {
      target: process.env.BACKEND_BASE_URL
    },
    '/cookie/decrypt/user/settings': {
      target: process.env.BACKEND_BASE_URL
    },
    '/getsettings/logging': {
      target: process.env.BACKEND_BASE_URL
    },
    '/setsettings/logging': {
      target: process.env.BACKEND_BASE_URL
    },   
    '/getsettings/starboard': {
      target: process.env.BACKEND_BASE_URL
    },
    '/setsettings/starboard': {
      target: process.env.BACKEND_BASE_URL
    },
    '/cookie/decrypt/guilds': {
      target: process.env.BACKEND_BASE_URL
    },
    '/cookie/decrypt/verifyguilds': {
      target: process.env.BACKEND_BASE_URL
    },
    '/verifyguild': {
      target: process.env.BACKEND_BASE_URL
    },
    '/cookie/decrypt/guild': {
      target: process.env.BACKEND_BASE_URL
    },
    '/postsettings/general': {
      target: process.env.BACKEND_BASE_URL
    },
    '/postsettings/user': {
      target: process.env.BACKEND_BASE_URL
    }
  },
  content: {
    apiPrefix: '_content',
    liveEdit: false,
    markdown: {
      remarkPlugins: (plugins) => {
        const denyList = ['remark-autolink-headings']
        return plugins.filter(plugin => !denyList.includes(plugin))
      },
      prism: {
        theme: false
      }
    }
  },
  publicRuntimeConfig: {
    discordAPI: process.env.DISCORD_API,
    baseURL: process.env.BASE_URL
  },

  // Style resource module
  // https://github.com/nuxt-community/style-resources-module
  styleResources: {
    // your settings here
    scss: [
      '@/static/css/variables.scss'
    ]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL,
    proxyHeaders: true
  },
  /*
   ** Build configuration
   */

  build: {
    /*
     ** You can extend webpack config here
     */

    // extend (config, ctx) {
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/,
    //       options: {
    //         fix: true
    //       }
    //     })
    //   }
    // },
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    }
  }
}
