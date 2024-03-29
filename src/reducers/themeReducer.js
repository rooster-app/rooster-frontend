// @scripts
import Cookies from 'js-cookie';

export function themeReducer(
  state = Cookies.get('darkTheme')
    ? JSON.parse(Cookies.get('darkTheme'))
    : true,

  action
) {
  switch (action.type) {
    case 'DARK':
      return true;

    case 'LIGHT':
      return false;

    default:
      return state;
  }
}
