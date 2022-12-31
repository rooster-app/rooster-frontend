// @packages
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// @scripts
import './style.css';
import '../../styles/icons/icons.css';
import Bio from './Bio';
import EditDetails from './EditDetails';

export default function Intro({ detailss, visitor, setOthername }) {
  const { user } = useSelector((state) => ({ ...state }));

  const [details, setDetails] = useState();
  const [visible, setVisible] = useState(false);
  const [showBio, setShowBio] = useState(false);

  useEffect(() => {
    setDetails(detailss);
    setInfos(detailss);
  }, [detailss]);

  const initial_data = {
    bio: details?.bio ? details.bio : '',
    otherName: details?.otherName ? details.otherName : '',
    job: details?.job ? details.job : '',
    workplace: details?.workplace ? details.workplace : '',
    highSchool: details?.highSchool ? details.highSchool : '',
    college: details?.college ? details.college : user.ccu_college,
    currentCity: details?.currentCity ? details.currentCity : '',
    hometown: details?.hometown ? details.hometown : '',
    relationship: details?.relationship ? details.relationship : '',
    instagram: details?.instagram ? details.instagram : '',
  };
  const [infos, setInfos] = useState(initial_data);
  const [max, setMax] = useState(infos?.bio ? 100 - infos?.bio.length : 100);

  const updateDetails = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/updateDetails`,
        {
          infos,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setShowBio(false);
      setDetails(data);
      setOthername(data.otherName);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfos({ ...infos, [name]: value });
    setMax(100 - e.target.value.length);
  };

  return (
    <div className='profile_card'>
      <div className='profile_card_header'>Intro</div>
      {details?.bio && !showBio && (
        <div className='info_col'>
          <span className='info_text'>{details?.bio}</span>
          {!visitor && (
            <button
              className='teal_bttn hover2'
              onClick={() => setShowBio(true)}>
              Edit Bio
            </button>
          )}
        </div>
      )}
      {!details?.bio && !showBio && !visitor && (
        <button
          className='teal_bttn hover1 w100'
          onClick={() => setShowBio(true)}>
          Add Bio
        </button>
      )}
      {showBio && (
        <Bio
          handleChange={handleChange}
          infos={infos}
          max={max}
          name='bio'
          placeholder='Add Bio'
          setShowBio={setShowBio}
          updateDetails={updateDetails}
        />
      )}
      {details?.job && details?.workplace ? (
        <div className='info_profile'>
          <img src='../../../icons/job.png' alt='' />
          {details?.job} at {details?.workplace}
        </div>
      ) : details?.job && !details?.workplace ? (
        <div className='info_profile'>
          <img src='../../../icons/job.png' alt='' />
          Works as {details?.job}
        </div>
      ) : (
        details?.workplace &&
        !details?.job && (
          <div className='info_profile'>
            <img src='../../../icons/job.png' alt='' />
            Works at {details?.workplace}
          </div>
        )
      )}
      {user?.ccu_college && (
        <div className='info_profile'>
          <img src='../../../icons/studies.png' alt='' />
          Studies at{' '}
          {`${details?.college ? details.college : user.ccu_college}`}
        </div>
      )}
      {details?.highSchool && (
        <div className='info_profile'>
          <img src='../../../icons/studies.png' alt='' />
          Went to high school at {details?.highSchool}
        </div>
      )}
      {details?.currentCity && (
        <div className='info_profile'>
          <img src='../../../icons/home.png' alt='' />
          Lives in {details?.currentCity}
        </div>
      )}
      {details?.relationship && (
        <div className='info_profile'>
          <img src='../../../icons/relationship.png' alt='' />
          {details?.relationship}
        </div>
      )}
      {details?.hometown && (
        <div className='info_profile'>
          <img src='../../../icons/home.png' alt='' />
          From {details?.hometown}
        </div>
      )}
      {details?.github && (
        <div className='info_profile'>
          <img
            src='../../../icons/github.png'
            alt=''
            style={{ width: '22px' }}
          />
          {/*eslint-disable-next-line*/}
          <a href={`https://www.github.com/${details?.github}`} target='_blank'>
            {details?.github}
          </a>
        </div>
      )}
      {details?.linkedin && (
        <div className='info_profile'>
          <img
            src='../../../icons/linkedin.png'
            alt=''
            style={{ width: '23px' }}
          />
          {/*eslint-disable-next-line*/}
          <a
            href={`https://www.linkedin.com/in/${details?.linkedin}`}
            target='_blank'>
            {details?.linkedin}
          </a>
        </div>
      )}
      {details?.instagram && (
        <div className='info_profile'>
          <img src='../../../icons/instagram.png' alt='' />
          {/*eslint-disable-next-line*/}
          <a
            href={`https://www.instagram.com/${details?.instagram}`}
            target='_blank'>
            {details?.instagram}
          </a>
        </div>
      )}
      {!visitor && (
        <button
          className='teal_bttn hover2 w100'
          onClick={() => setVisible(true)}>
          Edit Details
        </button>
      )}
      {visible && !visitor && (
        <EditDetails
          details={details}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          setVisible={setVisible}
          user={user}
        />
      )}

      {/* {!visitor && (
        <button className='gray_bttn hover1 w100'>Add Hobbies</button>
      )}
      {!visitor && (
        <button className='gray_bttn hover1 w100'>Add Featured</button>
      )} */}
    </div>
  );
}
