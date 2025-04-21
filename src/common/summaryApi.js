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
  }
};

export default summaryApi;
