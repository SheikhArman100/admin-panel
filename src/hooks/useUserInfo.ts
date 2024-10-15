"use client"
import { axiosPublic } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";


const useUserInfo = () => {

  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await axiosPublic.get("/user/check", {
        withCredentials: true,
      });

      return response.data;
  
    },
  });
};

export default useUserInfo