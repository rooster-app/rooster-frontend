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

export const addFriend = async (profileId, userToken) => {
  try {
    //eslint-disable-next-line
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/addFriend/${profileId}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return 'ok';
  } catch (error) {
    return error.response.data.message;
  }
};

export const defaultFriend = async (userToken) => {
  try {
    //eslint-disable-next-line
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/defaultFriend`,
      {},

      {
        headers: {
          Authorization: `Bearer ${userToken}`,
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
    // eslint-disable-next-line
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/follow/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

export const search = async (searchTerm, token) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/search/${searchTerm}`,
      {},

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

export const addToSearchHistory = async (searchUser, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/addToSearchHistory`,
      { searchUser },

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

export const getSearchHistory = async (token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/getSearchHistory`,

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

export const removeFromSearch = async (searchUser, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/removeFromSearch`,
      { searchUser },

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

export const getFriendsPageInfos = async (token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/getFriendsPageInfos`,

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

