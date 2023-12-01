/* eslint-disable react/prop-types */
const Education = ({
  index,
  education,
  removeEducation,
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
            value={education.startDate}
            max={education.endDate || maxStr}
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
            value={education.endDate}
            min={education.startDate || undefined}
            max={maxStr}
            onChange={() => inputChangeHandler(event, index)}
            className="form__input mt-2"
            required
          />
        </label>
      </div>
      <div className="mt-3 flex items-center justify-between gap-10">
        <label htmlFor="degree" className="w-6/12 form__label">
          Degree*
          <input
            type="text"
            placeholder="Degree"
            name="degree"
            value={education.degree}
            onChange={() => inputChangeHandler(event, index)}
            className="form__input mt-2"
            required
          />
        </label>
        <label htmlFor="university" className="w-6/12 form__label">
          University*
          <input
            type="text"
            placeholder="University"
            name="university"
            value={education.university}
            onChange={() => inputChangeHandler(event, index)}
            className="form__input mt-2"
            required
          />
        </label>
      </div>
      <button
        onClick={() => removeEducation(index)}
        className="mt-2 bg-red-600 px-3 text-[23px] font-[800] rounded-full text-white"
      >
        -
      </button>
    </div>
  );
};

export default Education;
