import axios from "axios";

const origin = "http://localhost:4000";

export const newUserApi = async (params: {
  user: { username: string; password: string; password_confirmation: string };
}) => {
  let response = await axios.post(`${origin}/api/v1/users`, params, {
    withCredentials: true,
  });

  if (response.status !== 200) {
    throw new Error("エラーが発生しました");
  }

  if (response.data.error) {
    throw new Error(response.data.error);
  }

  if (response.data.logged_in) {
    return response.data;
  }
};
