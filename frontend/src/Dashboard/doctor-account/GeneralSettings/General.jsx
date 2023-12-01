/* eslint-disable react/prop-types */
import { useState } from "react";

import uploadImageToCloudinary from "../../../utils/uploadCloudinary";

const General = ({ doctor, setDoctor }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    const data = await uploadImageToCloudinary(file);

    setSelectedFile(data.url);
    setDoctor({ ...doctor, photo: data.url });
  };

  return (
    <>
      <div className="mb-5">
        <label htmlFor="name" className="form__label">
          Name*
        </label>
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={doctor.name}
          onChange={handleInputChange}
          className="form__input mt-2"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="form__label">
          Email*
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={doctor.email}
          className="form__input mt-2"
          aria-readonly
          readOnly
        />
      </div>
      <div className="mb-5">
        <label htmlFor="phone" className="form__label">
          Phone
        </label>
        <input
          type="tel"
          pattern="[0-9]{10}"
          title="Must be of 10 digits"
          placeholder="Phone Number"
          name="phone"
          value={doctor.phone}
          onChange={handleInputChange}
          className="form__input mt-2"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="street" className="form__label">
          Street*
        </label>
        <input
          type="text"
          placeholder="Street or Area address"
          name="street"
          value={doctor.street}
          onChange={handleInputChange}
          className="form__input mt-2"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="city" className="form__label">
          City*
        </label>
        <input
          type="text"
          placeholder="City"
          name="city"
          value={doctor.city}
          onChange={handleInputChange}
          className="form__input mt-2"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="state" className="form__label">
          State*
        </label>
        <input
          type="text"
          placeholder="State"
          name="state"
          value={doctor.state}
          onChange={handleInputChange}
          className="form__input mt-2"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="bio" className="form__label">
          Bio*
        </label>
        <input
          type="text"
          placeholder="Bio"
          name="bloodType"
          value={doctor.bloodType}
          onChange={handleInputChange}
          className="form__input mt-2"
          required
        />
      </div>
      <div className="mb-5 flex items-center justify-between gap-10">
        <label className="w-4/12 form__label">
          Gender*
          <select
            name="gender"
            value={doctor.gender}
            onChange={handleInputChange}
            className="form__input mt-2"
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label className="w-4/12 form__label">
          Specialization*
          <select
            name="specialization"
            value={doctor.specialization}
            onChange={handleInputChange}
            className="form__input mt-2"
            required
          >
            <option value="">Select</option>
            <option value="General Physician">General Physician</option>
            <option value="Surgeon">Surgeon</option>
          </select>
        </label>
        <label htmlFor="ticketPrice" className="w-4/12 form__label">
          Ticket Price*
          <input
            type="number"
            placeholder="Ticket Price"
            name="ticketPrice"
            min="50"
            value={doctor.ticketPrice}
            onChange={handleInputChange}
            className="form__input mt-2"
            required
          />
        </label>
      </div>

      <label htmlFor="about" className="form__label">
        About*
      </label>
      <textarea
        rows="5"
        placeholder="About you..."
        name="about"
        value={doctor.about}
        onChange={handleInputChange}
        className="form__input mt-2"
        required
      ></textarea>

      <div className="mb-5 mt-5">
        <label htmlFor="password" className="form__label">
          New Password
        </label>
        <input
          type="password"
          placeholder="New Password"
          name="password"
          value={doctor.password}
          onChange={handleInputChange}
          className="form__input mt-2"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="confirmPassword" className="form__label">
          Confirm New Password
        </label>
        <input
          type="password"
          placeholder="Confirm New Password"
          name="confirmPassword"
          value={doctor.confirmPassword}
          onChange={handleInputChange}
          className="form__input mt-2"
        />
      </div>

      <div className="mb-5 mt-7 flex items-center gap-3">
        {doctor.photo && (
          <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
            <img src={doctor.photo} alt="" className="w-full rounded-full" />
          </figure>
        )}

        <div className="relative w-[130px] h-[50px]">
          <input
            type="file"
            name="photo"
            id="customFile"
            onChange={handleFileInputChange}
            accept=" .jpg, .png"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />

          <label
            htmlFor="customFile"
            className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
          >
            {selectedFile ? selectedFile.name : "Upload Photo"}
          </label>
        </div>
      </div>
    </>
  );
};

export default General;
