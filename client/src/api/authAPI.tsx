import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  const req = {
    method: "POST",
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(userInfo)
  }
  console.log('requesting', req)
  const res = await fetch("/auth/login", req)
  const data = await res.json();
  console.log('login returns', data)
  return data;
}



export { login };
