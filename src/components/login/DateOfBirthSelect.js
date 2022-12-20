// @packages
import { useMediaQuery } from 'react-responsive';

export default function DateOfBirthSelect({
  birth_day,
  birth_month,
  birth_year,
  days,
  months,
  years,
  handleRegisterChange,
  dateError,
}) {
  // 9000px temp-bug-fix
  const view3 = useMediaQuery({
    query: '(min-width: 9000px)',
  });

  return (
    <div
      className='reg_grid'
      style={{ marginBottom: `${dateError && !view3 ? '60px' : '0'}` }}>
      <select name='birth_month' value={birth_month} onChange={handleRegisterChange}>
        {months.map((month, i) => (
          <option value={month} key={i}>
            {month}
          </option>
        ))}
      </select>
      <select name='birth_day' value={birth_day} onChange={handleRegisterChange}>
        {days.map((day, i) => (
          <option value={day} key={i}>
            {day}
          </option>
        ))}
      </select>
      <select name='birth_year' value={birth_year} onChange={handleRegisterChange}>
        {years.map((year, i) => (
          <option value={year} key={i}>
            {year}
          </option>
        ))}
      </select>
      {dateError && (
        <div
          className={
            !view3 ? 'input_error' : 'input_error input_error_select_large'
          }>
          <div
            className={
              !view3 ? 'error_arrow_bottom' : 'error_arrow_left'
            }></div>
          {dateError}
        </div>
      )}
    </div>
  );
}
