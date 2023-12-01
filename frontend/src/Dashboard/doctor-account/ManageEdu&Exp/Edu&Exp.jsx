/* eslint-disable react/prop-types */
import Education from "./Education";
import Experience from "./Experience";

const EduAndExp = ({
  qualificationList,
  setQualificationList,
  experienceList,
  setExperienceList,
}) => {
  const handleQualificationAdd = () => {
    setQualificationList([
      ...qualificationList,
      { startDate: "", endDate: "", degree: "", university: "" },
    ]);
  };

  const handleExperienceAdd = () => {
    setExperienceList([
      ...experienceList,
      { startDate: "", endDate: "", position: "", hospital: "" },
    ]);
  };

  const handleQualificationRemove = (index) => {
    const list = [...qualificationList];
    list.splice(index, 1);
    setQualificationList(list);
  };

  const handleExperienceRemove = (index) => {
    const list = [...experienceList];
    list.splice(index, 1);
    setExperienceList(list);
  };

  const handleQualificationChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...qualificationList];
    list[index][name] = value;
    setQualificationList(list);
  };

  const handleExperienceChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...experienceList];
    list[index][name] = value;
    setExperienceList(list);
  };

  return (
    <>
      <h3 className="mb-3 text-[20px] leading-[30px] font-[700] text-headingColor">
        Qualifications
      </h3>
      {qualificationList.map((qualification, i) => (
        <Education
          key={i}
          index={i}
          education={qualification}
          removeEducation={handleQualificationRemove}
          inputChangeHandler={handleQualificationChange}
        />
      ))}
      {qualificationList.length < 4 && (
        <button
          onClick={handleQualificationAdd}
          className="w-3/12 bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
        >
          Add Qualification
        </button>
      )}

      <h3 className="mt-8 mb-3 text-[20px] leading-[30px] font-[700] text-headingColor">
        Experiences
      </h3>
      {experienceList.map((experience, i) => (
        <Experience
          key={i}
          index={i}
          experience={experience}
          removeExperience={handleExperienceRemove}
          inputChangeHandler={handleExperienceChange}
        />
      ))}
      {experienceList.length < 6 && (
        <button
          onClick={handleExperienceAdd}
          className="w-3/12 bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
        >
          Add Experience
        </button>
      )}
    </>
  );
};

export default EduAndExp;
