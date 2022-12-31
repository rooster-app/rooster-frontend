// @packages
import { useRef } from 'react';
// @scripts
import Detail from './Detail';
import useOnClickOutside from '../../helpers/clickOutside';

export default function EditDetails({
  details,
  handleChange,
  updateDetails,
  infos,
  setVisible,
}) {
  const modal = useRef(null);
  useOnClickOutside(modal, () => setVisible(false));

  return (
    <div className='blur'>
      <div className='postBox infosBox' ref={modal}>
        <div className='box_header'>
          <div className='small_circle' onClick={() => setVisible(false)}>
            <i className='exit_icon'></i>
          </div>
          <span>Edit Details</span>
        </div>
        <div className='details_wrapper scrollbar'>
          <div className='details_col'>
            <span>Customize Your Intro</span>
            <span>Details you select will be public</span>
          </div>
          <div className='details_header'>Other Name</div>
          <Detail
            value={details?.otherName}
            img='studies'
            placeholder='Add other name'
            name='otherName'
            text='other Name'
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className='details_header'>Work</div>
          <Detail
            value={details?.job}
            img='job'
            placeholder='Add job title'
            name='job'
            text='a job'
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <Detail
            value={details?.workplace}
            img='job'
            placeholder='Add a workplace'
            name='workplace'
            text='workplace'
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className='details_header'>Education</div>
          <Detail
            value={details?.college}
            img='studies'
            placeholder='Add a college'
            name='college'
            text='college'
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            ccu_college
          />
          <Detail
            value={details?.highSchool}
            img='studies'
            placeholder='Add a high school'
            name='highSchool'
            text='a high school'
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className='details_header'>Current City</div>
          <Detail
            value={details?.currentCity}
            img='home'
            placeholder='Add a current city'
            name='currentCity'
            text='a current city'
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className='details_header'>Hometown</div>
          <Detail
            value={details?.hometown}
            img='home'
            placeholder='Add hometown'
            name='hometown'
            text='hometown'
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className='details_header'>Relationship</div>
          <Detail
            value={details?.relationship}
            img='relationship'
            placeholder='Add relationship'
            name='relationship'
            text='relationship'
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            relationship
          />
          <div className='details_header'>GitHub</div>
          <Detail
            value={details?.github}
            img='github'
            placeholder='Add instagram'
            name='github'
            text='github'
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className='details_header'>Instagram</div>
          <Detail
            value={details?.instagram}
            img='instagram'
            placeholder='Add instagram'
            name='instagram'
            text='instagram'
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className='details_header'>Linkedin</div>
          <Detail
            value={details?.instagram}
            img='linkedin'
            placeholder='Add instagram'
            name='linkedin'
            text='linkedin'
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
        </div>
      </div>
    </div>
  );
}
