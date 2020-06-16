export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: process.env.npm_package_description || ''
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/svg',
      sizes: '200x200',
      href: '/fabicon.svg'
    }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#cedb9d'
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
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['faPlusSquare', 'faAngleDown', 'faQuestionCircle']
        },
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['faPatreon']
        }
      ]
    }],
    '@nuxtjs/proxy'
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:8080/',
      pathRewrite: {
        '^/api': '/fullCommands'
      }
    }
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
  axios: {},
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
