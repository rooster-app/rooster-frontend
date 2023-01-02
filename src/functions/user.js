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

export const addFriend = async (id, token) => {
  try {
    //eslint-disable-next-line
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/addFriend/${id}`,
      {},

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

export const cancelRequest = async (id, token) => {
  try {
    //eslint-disable-next-line
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/cancelRequest/${id}`,
      {},

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

export const follow = async (id, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/follow/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    return 'ok';
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export const unfollow = async (id, token) => {
  try {
    //eslint-disable-next-line
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/unfollow/${id}`,
      {},

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

export const acceptRequest = async (id, token) => {
  try {
    //eslint-disable-next-line
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/acceptRequest/${id}`,
      {},

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

export const unfriend = async (id, token) => {
  try {
    //eslint-disable-next-line
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/unfriend/${id}`,
      {},

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

export const deleteRequest = async (id, token) => {
  try {
    //eslint-disable-next-line
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/deleteRequest/${id}`,
      {},

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
