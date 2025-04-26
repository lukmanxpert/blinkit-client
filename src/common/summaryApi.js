export const baseUrl = "http://localhost:9000";

const summaryApi = {
  register: {
    url: "/api/user/register",
    method: "post",
  },
  login: {
    url: "/api/user/login",
    method: "post",
  },
  forgot_password: {
    url: "/api/user/forgot-password",
    method: "put"
  },
  forgot_password_otp_verification: {
    url: "/api/user/verify-forgot-password-otp",
    method: "put"
  },
  reset_password: {
    url: "/api/user/reset-password",
    method: "put"
  }
};

export default summaryApi;
