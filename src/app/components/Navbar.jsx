"use client";

import { useState } from "react";
import {
  FiShoppingCart,
  FiHeart,
  FiSearch,
} from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { setCurrentUser } from "@/app/redux/features/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const currentUser = useSelector((state) => state.users.currentUser);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", search);
    // Optionally navigate: router.push(`/search?query=${search}`);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(setCurrentUser(null));
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleOrderList = () => {
    router.push("/orders"); // Adjust the path as needed
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-600">ShopZone</h1>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FiSearch className="text-gray-500 text-2xl ml-10" />
        </button>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center bg-gray-100 rounded px-2"
        >
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent p-2 outline-none w-48 text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        {/* Icons */}
        <div className="flex items-center gap-4 text-gray-600 text-xl">
          <button title="Wishlist">
            <FiHeart className="text-black" />
          </button>

          <button title="Cart">
            <FiShoppingCart className="text-black" />
          </button>

          {/* Profile Dropdown */}
          <div className="group relative">
            <CgProfile className="text-3xl cursor-pointer" />
            <div className="group-hover:block hidden absolute right-0 pt-4 z-50">
              <div className="flex flex-col gap-2 w-32 py-3 px-5 bg-slate-100 text-gray-600 rounded shadow-lg">
                {!currentUser && (
                  <Link href="/auth/login" className="hover:text-black">
                    Login
                  </Link>
                )}
                {currentUser && (
                  <>
                    <button
                      onClick={handleOrderList}
                      className="text-left hover:text-black"
                    >
                      Orders
                    </button>
                    <button
                      onClick={handleLogout}
                      className="text-left hover:text-black"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
            {currentUser && (
              <div className="text-sm text-center">
                {currentUser.firstname}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-center bg-white border-t p-4 space-y-4">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-gray-100 rounded px-2 w-full"
          >
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent p-2 outline-none w-full text-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
      )}
    </nav>
  );
}
