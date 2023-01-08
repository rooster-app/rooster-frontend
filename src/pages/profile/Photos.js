export default function Photos({ photos }) {
  return (
    <div className='profile_card'>
      <div className='profile_card_header'>Recent Photos</div>
      <div className='profile_card_grid'>
        {photos?.length > 0 &&
          photos.slice(0, 9).map((imgUrl, index) => (
            <div className='profile_photo_card' key={index}>
              <img src={imgUrl} alt='' />
            </div>
          ))}
      </div>
    </div>
  );
}
