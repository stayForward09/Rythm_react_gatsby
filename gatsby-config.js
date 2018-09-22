module.exports = {
  siteMetadata: {
    title: 'Rhythmic Excellence',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`postcss-preset-env`)({
            stage: 0,
            browsers: 'last 2 versions',
            features: {
              'nesting-rules': true,
              'color-mod-function': { unresolved: 'warn' },
            },
            importFrom: ['src/reset.css', 'src/colors.css'],
            // exportTo: ['src/layout-reset.css'],
          }),
        ],
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages/team`,
        name: 'team',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages/news`,
        name: 'news',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages/disciplines`,
        name: 'disciplines',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages/home`,
        name: 'home',
      },
    },
    'gatsby-transformer-remark',
    'gatsby-remark-relative-images',
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
};
