// src/hooks/useIdleTimer.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useIdleTimer = (logoutTime = 60000) => {
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // Perform logout
        localStorage.removeItem("authToken"); // Adjust according to your authentication logic
        navigate("/login"); // Navigate to login page
      }, logoutTime);
    };

    // Set up event listeners to detect user activity
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Start the timer when the component mounts
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [logoutTime, navigate]);
};

export default useIdleTimer;
