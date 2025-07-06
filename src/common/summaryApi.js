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
    method: "put",
  },
  forgot_password_otp_verification: {
    url: "/api/user/verify-forgot-password-otp",
    method: "put",
  },
  reset_password: {
    url: "/api/user/reset-password",
    method: "put",
  },
  refresh_token: {
    url: "/api/user/refresh-token",
    method: "post",
  },
  userDetails: {
    url: "/api/user/user-details",
    method: "get",
  },
  logOut: {
    url: "/api/user/logout",
    method: "post",
  },
  uploadAvatar: {
    url: "/api/user/upload-avatar",
    method: "put",
  },
  updateUser: {
    url: "/api/user/update-user",
    method: "put",
  },
  add_category: {
    url: "/api/category/add-category",
    method: "post",
  },
  uploadImage: {
    url: "/api/file/upload",
    method: "post",
  },
  getCategory: {
    url: "/api/category/get",
    method: "get",
  },
  updateCategory: {
    url: "/api/category/update",
    method: "put",
  },
  deleteCategory: {
    url: "/api/category/delete",
    method: "delete",
  },
  addSubCategory: {
    url: "/api/subCategory/create",
    method: "post",
  },
  getSubCategory: {
    url: "/api/subCategory/get",
    method: "post",
  },
  updateSubCategory: {
    url: "/api/subCategory/update",
    method: "put",
  },
  deleteSubCategory: {
    url: "/api/subCategory/delete",
    method: "delete",
  },
  addProduct: {
    url: "/api/product/create",
    method: "post",
  },
  getProduct: {
    url: "/api/product/get",
    method: "post"
  }
};

export default summaryApi;
