/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";

import { BASE_URL, token } from "../../config";
import General from "./GeneralSettings/General";
import EduAndExp from "./ManageEdu&Exp/Edu&Exp";
import Schedule from "./ManageSchedule/Schedule";

const Profile = ({ doctor }) => {
  const [option, setOption] = useState("general");
  const [loading, setLoading] = useState(false);

  const [doctorData, setDoctorData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    bio: "",
    gender: "",
    specialization: "",
    street: "",
    city: "",
    state: "",
    about: "",
    ticketPrice: "",
    qualifications: [],
    experiences: [],
    timeSlots: [],
    photo: null,
  });

  const [slots, setSlots] = useState([]);
  const [experienceList, setExperienceList] = useState([]);
  const [qualificationList, setQualificationList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setDoctorData({
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      bio: doctor.bio,
      gender: doctor.gender,
      specialization: doctor.specialization,
      street: doctor.street,
      city: doctor.city,
      state: doctor.state,
      about: doctor.about,
      ticketPrice: doctor.ticketPrice,
      qualifications: doctor.qualifications,
      experiences: doctor.experiences,
      timeSlots: doctor.timeSlots,
      photo: doctor.photo,
    });
    setSlots(doctor.timeSlots);
    setQualificationList(doctor.qualifications);
    setExperienceList(doctor.experiences);
  }, [doctor]);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (doctorData.password !== doctorData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const data = {
        ...doctorData,
        timeSlots: slots,
        qualifications: qualificationList,
        experiences: experienceList,
      };

      const res = await fetch(`${BASE_URL}/doctors/${doctor._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/doctors/profile/me");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="border-b border-solid border-[#0066ff34] flex items-center justify-between">
        <button
          onClick={() => setOption("general")}
          className={`${
            option === "general" && "border-b border-solid border-primaryColor"
          } w-4/12 py-2 text-[16px] leading-7 text-headingColor font-semibold`}
        >
          General Information
        </button>
        <button
          onClick={() => setOption("EduAndExp")}
          className={`${
            option === "EduAndExp" &&
            "border-b border-solid border-primaryColor"
          } w-4/12 py-2 text-[16px] leading-7 text-headingColor font-semibold`}
        >
          Education And Experience
        </button>
        <button
          onClick={() => setOption("schedule")}
          className={`${
            option === "schedule" && "border-b border-solid border-primaryColor"
          } w-4/12 py-2 text-[16px] leading-7 text-headingColor font-semibold`}
        >
          Manage Schedule
        </button>
      </div>
      <div className="mt-10">
        <form onSubmit={submitHandler}>
          <div className="mt-[15px]">
            {option === "general" && (
              <General doctor={doctorData} setDoctor={setDoctorData} />
            )}
            {option === "EduAndExp" && (
              <EduAndExp
                qualificationList={qualificationList}
                setQualificationList={setQualificationList}
                experienceList={experienceList}
                setExperienceList={setExperienceList}
              />
            )}
            {option === "schedule" && (
              <Schedule slots={slots} setSlots={setSlots} />
            )}
          </div>

          <div className="mt-7">
            <button
              disabled={loading && true}
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            >
              {loading ? (
                <HashLoader size={25} color="#ffffff" />
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
