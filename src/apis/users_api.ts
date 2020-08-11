import axios from "axios";

const localhost = "http://localhost:4000";

export const newUserApi = async (params: {
  user: { username: string; password: string; password_confirmation: string };
}) => {
  const response = await axios.post(`${localhost}/api/v1/users/new`, params);

  if (response.status !== 200) {
    throw new Error("エラーが発生しました");
  }
  if (response.data.failer) {
    throw new Error(response.data.failer);
  }
};
