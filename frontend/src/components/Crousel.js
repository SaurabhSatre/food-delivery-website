import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Form } from 'react-bootstrap';
import "../CSS/crousel.css";
import { useSelector, useDispatch } from 'react-redux';
import { OnChange } from '../slices/searchSlice';
import biryani from '../Images/biryani.jpeg';
import pizza from '../Images/pizza.jpeg';
import momos from '../Images/momos.jpeg';
import burger from '../Images/burger.jpeg';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  let searchText = useSelector(state => state.search);
  let dispatch = useDispatch();

  const handleSelect = (selectedIndex) => setIndex(selectedIndex);
  const handleSearchChange = (event) => dispatch(OnChange({ serachText: event.target.value }));

  const imagesArray = [biryani, pizza, momos, burger];

  return (
    <div className='carousel-container'>

      {/* Carousel images */}
      <Carousel 
        activeIndex={index}
        onSelect={handleSelect}
        interval={3000}   // auto slide every 3 seconds
        pause="hover"
        controls={true}
        indicators={false}
        fade   // smooth crossfade instead of sliding
        className="w-100 h-100"
        style={{ borderRadius: '0 0 30px 30px', height: '100%' }}
      >
        {imagesArray.map((imgSrc, idx) => (
          <Carousel.Item key={idx}>
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
              <img 
                className="carousel-image"
                src={imgSrc}
                alt={`slide ${idx + 1}`}
              />
              <div className="carousel-gradient"></div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Search Bar */}
      <div className='carousel-search-box'>
        <Form className='w-100 search-form'>
          <Form.Control 
            type='search'
            placeholder='🔍 Search your favorite food...'
            className='search-input'
            aria-label='Search'
            onChange={handleSearchChange}
            value={searchText}
          />
        </Form>
      </div>

      {/* Custom Indicators */}
      <div className="carousel-custom-indicators">
        {imagesArray.map((_, idx) => (
          <button
            key={idx}
            className={`carousel-dot${idx === index ? ' active' : ''}`}
            onClick={() => setIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ControlledCarousel;
