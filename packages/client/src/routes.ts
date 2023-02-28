import { pagesRoutes } from '@internal/pagesRoutes'
import type { RouteRecordRaw } from 'vue-router'
import { Vuepress } from './components/Vuepress.js'

/**
 * Create routes for vue-router
 */
export const createRoutes = (): RouteRecordRaw[] =>
  pagesRoutes.reduce(
    (result, [name, path, meta, redirects]) => {
      result.push(
        {
          name,
          path,
          component: Vuepress,
          meta,
        },
        ...redirects.map((item) =>
          item === ':s'
            ? {
                path: path.replace(/.html$/, ''),
                redirect: path,
              }
            : item === ':d'
            ? {
                path: path + 'index.html',
                redirect: path,
              }
            : {
                path: item,
                redirect: path,
              }
        )
      )
      return result
    },
    [
      {
        name: '404',
        path: '/:catchAll(.*)',
        component: Vuepress,
      },
    ] as RouteRecordRaw[]
  )
