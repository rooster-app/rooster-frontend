// @packages
import { useState } from 'react';
// @scripts
import Bio from './Bio';

export default function Detail({
  img,
  value,
  placeholder,
  name,
  handleChange,
  updateDetails,
  infos,
  text,
  relationship,
  ccu_college,
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className='add_details_flex ' onClick={() => setShow(true)}>
        {value ? (
          <div
            className={`info_profile ${name === 'pronouns' ? 'pronouns' : ''}`}>
            <img
              src={`../../../icons/${img}.png`}
              className={`${
                img === 'github'
                  ? 'smaller-icon'
                  : img === 'linkedin'
                  ? 'smaller-icon'
                  : ''
              }`}
              alt=''
            />
            <span>{value}</span>
            <i className='edit_icon'></i>
          </div>
        ) : (
          <>
            <i className='rounded_plus_icon'></i>
            <span className='underline'>Add {text}</span>
          </>
        )}
      </div>
      {show && (
        <Bio
          placeholder={placeholder}
          name={name}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          detail
          setShow={setShow}
          relationship={relationship}
          ccu_college={ccu_college}
        />
      )}
    </div>
  );
}
