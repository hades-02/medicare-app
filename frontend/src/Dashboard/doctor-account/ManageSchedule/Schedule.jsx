/* eslint-disable react/prop-types */
import Slot from "./Slot";

const Schedule = ({ slots, setSlots }) => {
  const handleSlotAdd = () => {
    setSlots([
      ...slots,
      { date: "", timePerPatient: "", startTime: "", endTime: "" },
    ]);
  };

  const handleSlotRemove = (index) => {
    const list = [...slots];
    list.splice(index, 1);
    setSlots(list);
  };

  const handleSlotChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...slots];
    list[index][name] = value;
    setSlots(list);
  };

  return (
    <>
      <h3 className="mb-3 text-[20px] leading-[30px] font-[700] text-headingColor">
        Time Slots
      </h3>
      {slots.map((slot, i) => (
        <Slot
          key={i}
          index={i}
          slot={slot}
          removeSlot={handleSlotRemove}
          inputChangeHandler={handleSlotChange}
        />
      ))}
      {slots.length < 10 && (
        <button
          onClick={handleSlotAdd}
          className="w-3/12 bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
        >
          Add Slot
        </button>
      )}
    </>
  );
};

export default Schedule;
