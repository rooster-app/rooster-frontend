// @packages
import { DotLoader } from 'react-spinners';
import { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/header';
// @scripts
import { friendspage } from '../../functions/reducers';
import { getFriendsPageInfos } from '../../functions/user';
import Card from './Card';
import './style.css';

export default function Friends() {
  const { user } = useSelector((state) => ({ ...state }));
  const { type } = useParams();

  // eslint-disable-next-line
  const [{ loading, error, data }, dispatch] = useReducer(friendspage, {
    loading: false,
    data: {},
    error: '',
  });

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const getData = async () => {
    dispatch({ type: 'FRIENDS_REQUEST' });
    const data = await getFriendsPageInfos(user?.token);
    if (data?.success === true) {
      dispatch({ type: 'FRIENDS_SUCCESS', payload: data?.data });
    } else {
      dispatch({ type: 'FRIENDS_ERROR', payload: data?.data });
    }
  };

  return (
    <>
      <Header page='friends' />
      <div className='friends'>
        <div className='friends_left'>
          <div className='friends_left_header'>
            <h3>CCU Friends</h3>
            <div className='header_icon'>
              {/* <img src={user?.picture} alt='' /> */}
              {/* <i className="settings_filled_icon"></i> */}
              <i className='m_group_icon'></i>
            </div>
          </div>
          <div className='friends_left_wrap'>
            <Link
              to='/friends'
              className={`mmenu_item hover3 ${
                type === undefined && 'active_friends'
              }`}>
              <div className='small_circle'>
                <i className='friends_home_icon '></i>
              </div>
              <span>Home</span>
              <div className='rArrow'>
                <i className='right_icon'></i>
              </div>
            </Link>
            <Link
              to='/friends/requests'
              className={`mmenu_item hover3 ${
                type === 'requests' && 'active_friends'
              }`}>
              <div className='small_circle'>
                <i className='friends_requests_icon'></i>
              </div>
              <span>Friend Requests</span>
              <div className='rArrow'>
                <i className='right_icon'></i>
              </div>
            </Link>
            <Link
              to='/friends/sent'
              className={`mmenu_item hover3 ${
                type === 'sent' && 'active_friends'
              }`}>
              <div className='small_circle'>
                <i className='friends_requests_icon'></i>
              </div>
              <span>Sent Requests</span>
              <div className='rArrow'>
                <i className='right_icon'></i>
              </div>
            </Link>
            <Link
              to='/friends/suggestions'
              className={`mmenu_item hover3 ${
                type === 'suggestions' && 'active_friends'
              }`}>
              <div className='small_circle'>
                <i className='friends_suggestions_icon'></i>
              </div>
              <span>Suggestions</span>
              <div className='rArrow'>
                <i className='right_icon'></i>
              </div>
            </Link>
            <Link
              to='/friends/all'
              className={`mmenu_item hover3 ${
                type === 'all' && 'active_friends'
              }`}>
              <div className='small_circle'>
                <i className='all_friends_icon'></i>
              </div>
              <span>All Friends</span>
              <div className='rArrow'>
                <i className='right_icon'></i>
              </div>
            </Link>
          </div>
        </div>
        <div className='friends_right'>
          {(type === undefined || type === 'requests') && (
            <div className='friends_right_wrap'>
              <div className='friends_left_header'>
                <h3>Friend Requests</h3>
                {type === undefined && (
                  <Link to='/friends/requests' className='see_link hover3'>
                    See all
                  </Link>
                )}
              </div>
              {type === undefined && (
                <div className='flex_wrap'>
                  {loading && (
                    <DotLoader color='#0cb1c7' loading={loading} size={30} />
                  )}
                  {data?.requests &&
                    data?.requests
                      .slice(0, 6)
                      .map((userr, i) => (
                        <Card
                          userr={userr}
                          key={i}
                          type='request'
                          getData={getData}
                        />
                      ))}
                </div>
              )}
              {type === 'requests' && (
                <div className='flex_wrap'>
                  {data?.requests &&
                    data?.requests.map((userr, i) => (
                      <Card
                        userr={userr}
                        key={i}
                        type='request'
                        getData={getData}
                      />
                    ))}
                </div>
              )}
            </div>
          )}
          {(type === undefined || type === 'sent') && (
            <div className='friends_right_wrap'>
              <div className='friends_left_header'>
                <h3>Sent Requests</h3>
                {type === undefined && (
                  <Link to='/friends/sent' className='see_link hover3'>
                    See all
                  </Link>
                )}
              </div>
              {type === undefined && (
                <div className='flex_wrap'>
                  {data?.sentRequests &&
                    data?.sentRequests
                      .slice(0, 6)
                      .map((userr, i) => (
                        <Card
                          userr={userr}
                          key={i}
                          type='sent'
                          getData={getData}
                        />
                      ))}
                </div>
              )}
              {type === 'sent' && (
                <div className='flex_wrap'>
                  {data?.sentRequests &&
                    data?.sentRequests.map((userr, i) => (
                      <Card
                        userr={userr}
                        key={i}
                        type='sent'
                        getData={getData}
                      />
                    ))}
                </div>
              )}
            </div>
          )}
          {(type === undefined || type === 'suggestions') && (
            <div className='friends_right_wrap'>
              <div className='friends_left_header'>
                <h3>Friend Suggestions</h3>
                {type === undefined && (
                  <Link to='/friends/suggestions' className='see_link hover3'>
                    See all
                  </Link>
                )}
              </div>
              {type === undefined && (
                <div className='flex_wrap'>
                  {data?.suggestions &&
                    data?.suggestions
                      .slice(0, 6)
                      .map((userr, i) => (
                        <Card
                          userr={userr}
                          key={i}
                          type='suggestion'
                          getData={getData}
                        />
                      ))}
                </div>
              )}
              {type === 'suggestions' && (
                <div className='flex_wrap'>
                  {loading && (
                    <DotLoader color='#0cb1c7' loading={loading} size={30} />
                  )}
                  {data?.suggestions &&
                    data?.suggestions.map((userr, i) => (
                      <Card
                        userr={userr}
                        key={i}
                        type='suggestion'
                        getData={getData}
                      />
                    ))}
                </div>
              )}
            </div>
          )}
          {(type === undefined || type === 'all') && (
            <div className='friends_right_wrap'>
              <div className='friends_left_header'>
                <h3>CCU Friends</h3>
                {type === undefined && (
                  <Link to='/friends/all' className='see_link hover3'>
                    See all
                  </Link>
                )}
              </div>
              {type === undefined && (
                <div className='flex_wrap'>
                  {data?.friends &&
                    data?.friends
                      .slice(0, 10)
                      .map((userr) => (
                        <Card
                          userr={userr}
                          key={userr._id}
                          type='friends'
                          getData={getData}
                        />
                      ))}
                </div>
              )}
              {type === 'all' && (
                <div className='flex_wrap'>
                  {loading && (
                    <DotLoader color='#0cb1c7' loading={loading} size={30} />
                  )}
                  {data?.friends &&
                    data?.friends
                      .slice(0, 800)
                      .map((userr) => (
                        <Card
                          userr={userr}
                          key={userr._id}
                          type='friends'
                          getData={getData}
                        />
                      ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
