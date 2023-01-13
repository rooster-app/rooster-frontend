export default function Bio({
  detail,
  handleChange,
  infos,
  max,
  name,
  placeholder,
  relationship,
  setShow,
  setShowBio,
  updateDetails,
  ccu_college,
}) {
  return (
    <div className='add_bio_wrap'>
      {relationship ? (
        <select
          className='select_rel'
          name={name}
          value={infos?.relationship}
          onChange={handleChange}>
          <option value=''>-- Select Relationship --</option>
          <option value='Single'>Single</option>
          <option value='In a relationship'>In a relationship</option>
          <option value='Married'>Married</option>
          <option value='Divorced'>Divorced</option>
          <option value=''>None</option>
        </select>
      ) : ccu_college ? (
        <select
          className='select_rel'
          name={name}
          value={infos?.college}
          onChange={handleChange}>
          <option value=''>--- Select CCU College ---</option>
          <option value='Wall College of Business'>
            Wall College of Business
          </option>
          <option value='The Spadoni College of Education and Social Sciences'>
            Spadoni College of Education and Social Sciences
          </option>
          <option value='Edwards College of Humanities and Fine Arts'>
            Edwards College of Humanities and Fine Arts
          </option>
          <option value='Gupta College of Science'>
            Gupta College of Science
          </option>
          <option value='HTC Honors College'>HTC Honors College</option>
          <option value='Conway Medical Center College of Health and Human Performance'>
            Conway Medical College of Health and Human Performance
          </option>
        </select>
      ) : (
        <textarea
          placeholder={placeholder}
          name={name}
          value={infos?.[name]}
          maxLength={detail ? 28 : 100}
          className='textarea_blue details_input'
          onChange={handleChange}></textarea>
      )}
      {!detail && <div className='remaining'>{max} characters remaining</div>}
      <div className='flex'>
        <div className='flex flex_left'>
          <i className='public_icon'></i>Public
        </div>
        <div className='flex flex_right'>
          <button
            className='gray_bttn'
            onClick={() => (!detail ? setShowBio(false) : setShow(false))}>
            Cancel
          </button>
          <button
            className='teal_bttn'
            onClick={() => {
              updateDetails();
              setShow(false);
            }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
