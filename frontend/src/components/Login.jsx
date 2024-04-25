/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({handleLogin }) {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/users/login`, { username, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      Navigate("/");
      handleLogin() // Redirect to the app dashboard
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="app flex justify-center items-center h-screen">
  <Card color="transparent" shadow={false}>
    <Typography variant="h4" color="blue-gray">
      Sign In
    </Typography>
    <Typography color="gray" className="mt-1 font-normal">
      Welcome back! Enter your details to login.
    </Typography>
    <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
      {error && <Typography color="red" className="text-sm mb-2">{error}</Typography>}
      <div className="mb-1 flex flex-col gap-6">
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Your Username
        </Typography>
        <Input
          size="lg"
          placeholder="username"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Password
        </Typography>
        <Input
          type="password"
          size="lg"
          placeholder="********"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Checkbox
        label={
          <Typography
            variant="small"
            color="gray"
            className="flex items-center font-normal"
          >
            Remember me
          </Typography>
        }
        containerProps={{ className: "-ml-2.5" }}
      />
      <Button type="submit" className="mt-6" fullWidth>
        Sign In
      </Button>
      
    </form>
  </Card>
</div>

  );
}
export default Login