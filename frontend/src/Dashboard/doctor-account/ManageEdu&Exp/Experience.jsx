/* eslint-disable react/prop-types */
const Experience = ({
  index,
  experience,
  removeExperience,
  inputChangeHandler,
}) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const maxStr = [year, month, day].join("-");

  return (
    <div className="mt-5 mb-5">
      <div className="mt-4 flex items-center justify-between gap-10">
        <label htmlFor="startDate" className="w-6/12 form__label">
          Starting Date*
          <input
            type="date"
            placeholder=""
            name="startDate"
            value={experience.startDate}
            max={experience.endDate || maxStr}
            onChange={() => inputChangeHandler(event, index)}
            className="form__input mt-2"
            required
          />
        </label>
        <label htmlFor="endDate" className="w-6/12 form__label">
          Ending Date*
          <input
            type="date"
            placeholder=""
            name="endDate"
            value={experience.endDate}
            min={experience.startDate || undefined}
            max={maxStr}
            onChange={() => inputChangeHandler(event, index)}
            className="form__input mt-2"
            required
          />
        </label>
      </div>
      <div className="mt-3 flex items-center justify-between gap-10">
        <label htmlFor="position" className="w-6/12 form__label">
          Position*
          <input
            type="text"
            placeholder="Position"
            name="position"
            value={experience.position}
            onChange={() => inputChangeHandler(event, index)}
            className="form__input mt-2"
            required
          />
        </label>
        <label htmlFor="hospital" className="w-6/12 form__label">
          Hospital*
          <input
            type="text"
            placeholder="Hospital"
            name="hospital"
            value={experience.hospital}
            onChange={() => inputChangeHandler(event, index)}
            className="form__input mt-2"
            required
          />
        </label>
      </div>
      <button
        onClick={() => removeExperience(index)}
        className="mt-2 bg-red-600 px-3 text-[23px] font-[800] rounded-full text-white"
      >
        -
      </button>
    </div>
  );
};

export default Experience;
