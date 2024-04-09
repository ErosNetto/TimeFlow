import { api, requestConfig } from "../utils/config";

// Register an user
const register = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(`${api}/companies/register`, config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res._id) {
      localStorage.setItem("company", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const authServiceCompany = {
  register,
};

export default authServiceCompany;
