import { useContext, useState } from "react";

import { authContext } from "../../context/AuthContext";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import UpcomingAppointments from "./UpcomingAppointments";
import CompletedAppointments from "./CompletedAppointments";
import Overview from "./Overview";
import Profile from "./Profile";

const Dashboard = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("currBookings");

  const {
    data: doctorData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/doctors/profile/me`);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}

        {error && !loading && <Error errMessage={error} />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="shadow-panelShadow h-[540px] pb-[50px] px-[30px] rounded-md">
              <div>
                <button
                  onClick={() => setTab("overview")}
                  className={`${
                    tab === "overview"
                      ? "bg-[#dee4f8] text-primaryColor"
                      : "bg-white text-textColor"
                  } w-full mt-8 p-3 text-[16px] font-[600] leading-7 rounded-md`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setTab("currBookings")}
                  className={`${
                    tab === "currBookings"
                      ? "bg-[#dee4f8] text-primaryColor"
                      : "bg-white text-textColor"
                  } w-full mt-4 p-3 text-[16px] font-[600] leading-7 rounded-md`}
                >
                  Upcoming Appointments
                </button>
                <button
                  onClick={() => setTab("compBookings")}
                  className={`${
                    tab === "compBookings"
                      ? "bg-[#dee4f8] text-primaryColor"
                      : "bg-white text-textColor"
                  } w-full mt-4 p-3 text-[16px] font-[600] leading-7 rounded-md`}
                >
                  Completed Appointments
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab === "settings"
                      ? "bg-[#dee4f8] text-primaryColor"
                      : "bg-white text-textColor"
                  } w-full mt-4 p-3 text-[16px] font-[600] leading-7 rounded-md`}
                >
                  Profile Settings
                </button>
              </div>

              <div className="mt-[50px] md:mt-[100px]">
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
                >
                  Logout
                </button>
                <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                  Delete account
                </button>
              </div>
            </div>

            <div className="md:col-span-2 md:px-[30px]">
              {tab === "overview" && <Overview doctor={doctorData} />}
              {tab === "currBookings" && <UpcomingAppointments />}
              {tab === "settings" && <Profile doctor={doctorData} />}
              {tab === "compBookings" && <CompletedAppointments />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
