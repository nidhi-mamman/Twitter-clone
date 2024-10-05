import axios from "axios";
import { USER_API_END_POINT } from "../utils/contact.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOtherUsers } from "../redux/userSlice.js";

const useOtherUsers = (id) => {
    console.log("login user id")
    console.log(id)
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                console.log("try loop chal raha hai")
                const res = await axios.get(`${USER_API_END_POINT}/otheruser/${id}`, {
                    withCredentials: true,
                });
                dispatch(getOtherUsers(res.data.otherUsers));
            } catch (error) {
                console.error("Error fetching other users:", error);
            }
        };

        fetchOtherUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, dispatch]);
};

export default useOtherUsers;
