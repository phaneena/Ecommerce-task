"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useDispatch } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config"; // assuming `db` is exported from your firebase config


export default function SignupPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
  
    if (password !== confirm) {
      return setError("Passwords do not match");
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
      });
  
      router.push("/"); // redirect to home
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Create Account</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input
          className="border p-2 w-full mb-4"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
