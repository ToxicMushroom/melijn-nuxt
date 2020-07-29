export default {
  mode: 'universal',
  server: {
    port: 3000, // default: 3000
    host: 'localhost' // default: localhost
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
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [{
      rel: 'icon',
      type: 'image/png',
      sizes: '100x100',
      href: '/fabicon.png'
    }]
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
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
    'cookie-universal-nuxt',
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
            'faArrowLeft'
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
    '@nuxtjs/proxy'
  ],
  generate: {
    async routes () {
      const content = await require('@nuxt/content')
      const articles = content
        .$content('articles')
        .only(['path'])
        .feth()
      const guides = content
        .$content('guides')
        .only(['path'])
        .feth()
      return [].concat(
        articles.map(article => article.patch),
        guides.map(guide => guide.patch)
      )
    },
    fallback: true
  },
  proxy: {
    '/api': {
      target: 'http://localhost:2607',
      pathRewrite: {
        '^/api': '/commands'
      }
    },
    '/cookie/encrypt/code': {
      target: 'http://localhost:2607'
    },
    '/cookie/decrypt/user': {
      target: 'http://localhost:2607'
    },
    '/cookie/decrypt/guilds': {
      target: 'http://localhost:2607'
    },
    '/cookie/decrypt/guild': {
      target: 'http://localhost:2607'
    }
  },
  content: {
    apiPrefix: '_content',
    markdown: {
      remarkPlugins: [],
      remarkExternalLinks: [],
      rehypePlugins: [],
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
    baseURL: process.env.BASE_URL
  },
  /*
   ** Build configuration
   */

  build: {
    /*
     ** You can extend webpack config here
     */

    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    },
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    }
  }
}
