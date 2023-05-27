import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

const jwtVerify = (token: string, secret: string) => {
  try {
    jwt.verify(token, secret);
    return {
      error: null,
      userId: (jwtDecode(token) as any)?.id || null,
    };
  } catch (err: any) {
    return {
      error: err.name,
      userId: null,
    };
  }
};

export default jwtVerify;
