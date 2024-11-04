import { toast } from "react-hot-toast";

export interface RegisterFormData {
  user_name: string;
  phone_number: string;
  email: string;
}

export async function registerUser(data: RegisterFormData) {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: data.user_name,
        phone_number: data.phone_number,
        email: data.email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      // throw new Error(errorData.message || "Registration failed");
      toast.error(errorData.message || "Registration failed")
      return null
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}
