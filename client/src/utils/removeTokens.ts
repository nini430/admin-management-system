const removeTokens = (key?: 'accessToken' | 'refreshToken') => {
  if (key) {
    localStorage.removeItem(key);
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

export default removeTokens;
