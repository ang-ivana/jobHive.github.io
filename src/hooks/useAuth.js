import { useState, useEffect } from "react";
export function useAuth() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) setUser(storedUser);
  }, []);
  const getUsersData = () => {
    const data = JSON.parse(localStorage.getItem("users"));
    if (!data || !data.users) {
      return { users: [] };
    }
    return data;
  }

  const login = (email, password) => {
    const data = getUsersData();
    const found = data.users.find(
      (u) => u.email === email && u.password === password);
    if (!found) return false;
    setUser(found);
    localStorage.setItem("currentUser", JSON.stringify(found));
    return true;
  };

  const signup = (newUser) => {
    const data = getUsersData();
    const exists = data.users.find((u) => u.email === newUser.email);
    if (exists) return false;
    const userWithJobs = {
      ...newUser,
      appliedJobs: []
    };
    const updated = {
      users: [...data.users, userWithJobs]
    };
    localStorage.setItem("users", JSON.stringify(updated));
    localStorage.setItem("currentUser", JSON.stringify(userWithJobs));
    setUser(userWithJobs);
    return true;

  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser")
  };
  const applyToJob = (job) => {
    if (!user) return false;
    const data = getUsersData();
    const updatedUsers = data.users.map((u) => {
      if (u.email === user.email) {
        if (u.appliedJobs.some(j => j.id === job.id)) {
          alert("Already applied!");
          return u;
        }
        return {
          ...u,
          appliedJobs: [
            ...u.appliedJobs,
            {
              ...job,
              appliedAt: new Date().toISOString()
            }
          ]
        };
      }
      return u;
    });
    const updateData = { users: updatedUsers };
    localStorage.setItem("users", JSON.stringify(updateData));
    const updatedUser = updatedUsers.find((u) => u.email === user.email);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    return true;

  };
  return { user, login, signup, logout, applyToJob };

}