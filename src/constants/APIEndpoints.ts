export const PRODUCTION_API_ENDPOINTS = {
  SEND_MAIL: "/mail/send",
  SEND_MAIL_VERIFICATION: "/mail/verification",
  VERIFY_CODE: "/mail/verify",
  GET_APPLICATION_LIST: "/api/application/list",
  GET_APPLICATION_DETAIL: "/api/application/detail",
  POST_APPLICATION_CREATE: "/api/application/create",
  POST_APPLICATION_UPDATE: "/api/application/update",
  POST_APPLICATION_DELETE: "/api/application/delete",
  LOGIN: "/auth/login",
} as const;
