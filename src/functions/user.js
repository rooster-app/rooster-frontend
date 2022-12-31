// @packages
import axios from 'axios';

export const updateProfilePicture = async (url, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/updateProfilePicture`,
      {
        url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const updateCover = async (url, token) => {
  try {
    // eslint-disable-next-line
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/updateCover`,
      {
        url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return 'ok';
  } catch (error) {
    return error.response.data.message;
  }
};
