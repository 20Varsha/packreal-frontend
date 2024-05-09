import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";
let token = JSON.parse(localStorage.getItem("authUser"));
if (token && token.accessToken) {
  let accessToken=token.accessToken
  axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
}

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);

/**
 * Sets the default authorization
  @param {} token
 */
const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
};

const setUrl = () => {
  axios.defaults.baseURL = "https://app.packreal.planetmedia.dev/api"
  console.log(axios.defaults.baseURL);
}
class APIClient {
  get = async (url) => {
    const baseURL = axios.defaults.baseURL || "https://app.packreal.planetmedia.dev/api";
    const authToken = token && token.accessToken ? "Bearer " + token.accessToken : "";
    try {
      const response = await axios.get(`${baseURL}${url}`, {
        headers: {
          Authorization: authToken ? `${authToken}` : null
        }
      });
      return response;
    } catch (error) {
      console.log("error",error);
      throw error;
    }
  };

  create = async (url, data) => {
    const baseURL = axios.defaults.baseURL || "https://app.packreal.planetmedia.dev/api";
    const authToken = token && token.accessToken ? "Bearer " + token.accessToken : "";
    try {
      const response = await axios.post(`${baseURL}${url}`, data, {
        headers: {
          Authorization: authToken ? `${authToken}` : null
        }
      });
      return response;
    } catch (error) {
      console.error(`Error retrieving data from ${baseURL}${url}:`, error);
      throw error;
    }
  };

  update = async (url, data) => {
    const baseURL = axios.defaults.baseURL || "https://app.packreal.planetmedia.dev/api";
    const authToken = token && token.accessToken ? "Bearer " + token.accessToken : "";
    try {
      const response = await axios.patch(`${baseURL}${url}`, data, {
        headers: {
          Authorization: authToken ? `${authToken}` : null
        }
      });
      return response;
    } catch (error) {
      console.error(`Error retrieving data from ${baseURL}${url}:`, error);
      throw error;
    }
  };

  delete = async (url) => {
    const baseURL = axios.defaults.baseURL || "https://app.packreal.planetmedia.dev/api";
    const authToken = token && token.accessToken ? "Bearer " + token.accessToken : "";
    try {
      const response = await axios.delete(`${baseURL}${url}`, {
        headers: {
          Authorization: authToken ? `${authToken}` : null
        }
      });
      return response;
    } catch (error) {
      console.error(`Error retrieving data from ${baseURL}${url}:`, error);
      throw error;
    }
  }

  signup = async (url, data) => {
    const baseURL = axios.defaults.baseURL || "https://app.packreal.planetmedia.dev/api";
    const authToken = token && token.accessToken ? "Bearer " + token.accessToken : "";
    try {
      const response = await axios.post(`${baseURL}${url}`, data, {
        headers: {
        }
      });
      return response;
    } catch (error) {
      console.error(`Error retrieving data from ${baseURL}${url}:`, error);
      throw error;
    }
  };

  logout = async (url,token) => {
    const baseURL = axios.defaults.baseURL || "https://app.packreal.planetmedia.dev/api";
    const authToken = token && token.refreshToken ? "Bearer " + token.refreshToken  : "";
    try {
      const response = await axios.post(`${baseURL}${url}`, null, {
        headers: {
          Authorization: authToken ? `${authToken}` : null
        }
      });
      return response;
    } catch (error) {
      console.error(`Error retrieving data from ${baseURL}${url}:`, error);
      throw error;
    }
  };
}

const getLoggedinUser = () => {
  const user = localStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, setAuthorization, getLoggedinUser };
