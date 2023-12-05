declare global {
  /**
   * NodeJS ProcessEnv インターフェースのグローバル宣言
   */
  namespace NodeJS {
    interface ProcessEnv {
      /** RESAS API key */
      RESAS_API_KEY: string
      /** RESAS API URL */
      NEXT_PUBLIC_RESAS_API_URL: string
    }
  }
}

export {}