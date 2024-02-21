import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  // const [photo, setPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const registerUser = (event) => {
    event.preventDefault();
    // const userFormData = new FormData();
    // userFormData.append("userName", userName);
    // userFormData.append("email", email);
    // userFormData.append("password", password);
    // userFormData.append("bio", bio);

    // if (photo) userFormData.append("photo", photo);
    if (!userName || !email || !password)
      setErrorMessage("All fields must be defined");

    if (password !== confirmPassword)
      setErrorMessage("Password confirmation does not match");

    fetch("http://localhost:9999/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, email, password, bio }),
    })
      .then((res) => res.json())
      .then(({ success, result, message }) => {
        if (!success) setErrorMessage(message || "Registration failed");
        console.log(result);
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setBio("");
        setErrorMessage("");
        navigate("/verify-email/" + result._id);
      });
  };

  return (
    <section className="loginPage">
      <div className="welcome">
        <p>please</p>
        <h1>Register</h1>
      </div>
      <div className="formPart">
        <form>
          <input
            type="text"
            placeholder="user name"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            type="password"
            placeholder="confirm Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <input
            type="text"
            placeholder="Bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />
          {/* <input
            type="file"
            onChange={(event) => setPhoto(event.target.files[0])}
          /> */}
        </form>
        <div className="buttonPart">
          <button type="button" onClick={registerUser}>
            Register
          </button>
        </div>
      </div>
    </section>
  );
};

export default Register;
