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
