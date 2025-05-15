import { useState, useEffect, useCallback } from "react";

interface UserType {
  id: string;
  name: string;
  email: string;
  token?: string;
}

export const useAuthFetch = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user session
  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/me", {
        credentials: "include", // Ensures cookies/session tokens are sent
      });

      if (!response.ok) throw new Error("Failed to fetch user");

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Auth Fetch Error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch user on initial mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, setUser, loading };
};
