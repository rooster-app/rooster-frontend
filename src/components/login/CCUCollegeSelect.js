// @packages
import { useMediaQuery } from 'react-responsive';

const CCUcollege = ({ collegeError, handleRegisterChange }) => {
  // 9000px temp-bug-fix
  const view3 = useMediaQuery({
    query: '(min-width: 9000px)',
  });

  return (
    <div
      className='ccu_container'
      style={{ marginBottom: `${collegeError && !view3 ? '60px' : '0'}` }}>
      <select
        className='ccu_select'
        name='ccu_college'
        onChange={handleRegisterChange}>
        <option value=''>-- select CCU college --</option>
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
      {collegeError && (
        <div
          className={
            !view3 ? 'input_error' : 'input_error input_error_select_large'
          }>
          <div
            className={
              !view3 ? 'error_arrow_bottom' : 'error_arrow_left'
            }></div>
          {collegeError}
        </div>
      )}
    </div>
  );
};

export default CCUcollege;
