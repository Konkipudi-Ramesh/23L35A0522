import axios from "axios";

export const Log = async (stack, level, pkg, message) => {
  try {
    const body = {
      stack,      
      level,     
      package: pkg, 
      message,   
    };

    const res = await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      body
    );

    console.log("Log sent:", res.data);
  } catch (err) {
    console.error("Log failed:", err.message);
  }
};