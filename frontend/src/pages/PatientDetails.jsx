/*import { useState } from "react";

import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";*/
import userImg from "../assets/images/akshat-img.jpg";

const PatientDetails = () => {
  /*const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);*/

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {/*loading && !error && <Loading />*/}

        {/*error && !loading && <Error errMessage={error} />*/}

        {
          /*!loading && !error && */ <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                  <img
                    src={userImg}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-[22px] leading-[30px] text-headingColor font-bold">
                  Akshat Goyal
                </h3>
                <p className="mt-5 text-textColor text-[18px] leading-6 font-medium ">
                  akshatgoyal756@gmail.com
                </p>
                {
                  /*userData.phone && */ <p className="mt-6 text-textColor text-[18px] leading-6 font-medium ">
                    9893382400
                  </p>
                }
                {
                  /*userData.bloodType && */ <p className="mt-5 text-textColor text-[18px] leading-6 font-medium">
                    Blood Type:
                    <span className="ml-2 text-headingColor text-[20px] leading-8">
                      B+
                    </span>
                  </p>
                }
                {
                  /*userData.diabetic && */ <p className="mt-5 text-textColor text-[18px] leading-6 font-medium">
                    Diabetic:
                    <span className="ml-2 text-headingColor text-[20px] leading-8">
                      No
                    </span>
                  </p>
                }
                {
                  /*userData.age && */ <p className="mt-5 text-textColor text-[18px] leading-6 font-medium">
                    Age:
                    <span className="ml-2 text-headingColor text-[20px] leading-8">
                      21
                    </span>
                  </p>
                }
                {
                  /*userData.weight && */ <p className="mt-5 text-textColor text-[18px] leading-6 font-medium">
                    Weight:
                    <span className="ml-2 text-headingColor text-[20px] leading-8">
                      60 kg
                    </span>
                  </p>
                }
              </div>
            </div>

            <div className="md:col-span-2 md:px-[30px]">
              <div className="mt-10">
                <div className="mb-5">
                  <input
                    type="text"
                    placeholder="Street or Area address"
                    name="street"
                    value="Govind Medical Stores, Jawahar Chowk"
                    className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                    aria-readonly
                    readOnly
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value="Nagod"
                    className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                    aria-readonly
                    readOnly
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    value="Madhya Pradesh"
                    className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                    aria-readonly
                    readOnly
                  />
                </div>

                <textarea
                  rows="6"
                  placeholder="Medical History..."
                  name="history"
                  value=""
                  className="mt-5 border border-solid border-[#0066ff61] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
                  aria-readonly
                  readOnly
                />
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  );
};

export default PatientDetails;
