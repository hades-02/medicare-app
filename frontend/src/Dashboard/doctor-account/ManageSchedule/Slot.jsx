/* eslint-disable react/prop-types */
const Slot = ({ index, slot, removeSlot, inputChangeHandler }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const minStr = [year, month, day].join("-");

  return (
    <div className="mt-5 mb-5">
      <div className="mt-3 flex items-center justify-between gap-10">
        <label htmlFor="date" className="w-6/12 form__label">
          Date*
          <input
            type="date"
            placeholder="Date"
            name="date"
            value={slot.date}
            min={minStr}
            onChange={() => inputChangeHandler(event, index)}
            className="form__input mt-2"
            required
          />
        </label>
        <label htmlFor="timePerPatient" className="w-6/12 form__label">
          Time Per Patient (in minutes)*
          <input
            type="number"
            min="10"
            max="120"
            placeholder="Time for each patient"
            name="timePerPatient"
            value={slot.timePerPatient}
            onChange={() => inputChangeHandler(event, index)}
            className="form__input mt-2"
            required
          />
        </label>
      </div>
      <div className="mt-4 flex items-center justify-between gap-10">
        <label htmlFor="startTime" className="w-6/12 form__label">
          Starting Time*
          <input
            type="time"
            placeholder=""
            name="startTime"
            value={slot.startTime}
            max={slot.endTime || undefined}
            onChange={() => inputChangeHandler(event, index)}
            className="form__input mt-2"
            required
          />
        </label>
        <label htmlFor="endTime" className="w-6/12 form__label">
          Ending Time*
          <input
            type="time"
            placeholder=""
            name="endTime"
            value={slot.endTime}
            min={slot.startTime || undefined}
            onChange={() => inputChangeHandler(event, index)}
            className="form__input mt-2"
            required
          />
        </label>
      </div>
      <button
        onClick={() => removeSlot(index)}
        className="mt-2 bg-red-600 px-3 text-[23px] font-[800] rounded-full text-white"
      >
        -
      </button>
    </div>
  );
};

export default Slot;
