export const baseUrl = "http://localhost:9000";

const summaryApi = {
  register: {
    url: "/api/user/register",
    method: "post",
  },
  login: {
    url: "/api/user/login",
    method: "post"
  }
};

export default summaryApi;
