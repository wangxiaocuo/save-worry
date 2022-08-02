import { defineConfig } from 'dumi'

const repo = 'save-worry'

export default defineConfig({
  title: repo,
  favicon: '/logo.png',
  logo: '/logo.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  // Because of using GitHub Pages
  base: `/${repo}/`,
  publicPath: `/${repo}/`,
  locales: [['zh-CN', '中文']],
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/wangxiaocuo/save-worry'
    }
  ]
  // more config: https://d.umijs.org/config
})
