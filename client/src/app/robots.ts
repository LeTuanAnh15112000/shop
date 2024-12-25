import type { MetadataRoute } from 'next'
import envConfig from '../../config'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/me/', // không cho truy cập vào trang me
    },
    sitemap: `${envConfig.NEXT_PUBLIC_URL}/sitemap.xml`,
  }
}

// Chức năng: Nói với với search engine những url nào được truy cập và những url không được truy cập