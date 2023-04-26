import React, { useState } from 'react'
import "./register.css"
export const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission
  };

  return (
    <div className="container">
      <div className="form">
      <form  onSubmit={handleSubmit}>
        <h2>Create account</h2>
        <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
        </div>
        <div>
        <label htmlFor="name">Name</label>
        <input
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          />
        </div>
        <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        <button type="submit">Create account</button>
        <p>Already have an account?{" "}<a href="#" className="link">Sign in</a></p>
      </form>
      </div>
    </div>
  );
}