/**
 * RESAS API エラーのレスポンスを表す型
 */
export type ResasErrorResponse =
  | '400'
  | {
      statusCode: '403'
      message: 'Forbidden.'
      description: ''
    }
  | {
      statusCode: '404'
      message: "404. That's an error."
      description: 'The requested URL /404 was not found on this server.'
    }
  | '404'
  | {
      message: null
    }

/**
 * RESAS API 正常時のレスポンスボディを表す型
 */
type ResasResponseBody<T> = {
  message: null
  result: T
}

/**
 * RESAS API レスポンスを表す型
 */
export type ResasResponse<T> = ResasResponseBody<T> | ResasErrorResponse
