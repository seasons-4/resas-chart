declare global {
  /**
   * NodeJS ProcessEnv インターフェースのグローバル宣言
   */
  namespace NodeJS {
    interface ProcessEnv {
      /** RESAS API key */
      NEXT_PUBLIC_RESAS_API_KEY: string
      /** RESAS API URL */
      NEXT_PUBLIC_RESAS_API_URL: string
      /** サイトのベースURL */
      NEXT_PUBLIC_SITE_BASE_URL: string
    }
  }
}

export {}
