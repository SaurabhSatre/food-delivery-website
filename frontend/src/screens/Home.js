import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Crousel from '../components/Crousel'
import Loader from '../components/Loader'
import "../CSS/home.css";
import { useSelector  } from 'react-redux';

export default function Home() {

  const [foodCategoryData, setFoodCategoryData] = useState([]);
  const [foodItemsdata, setfoodItemsdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let serachText = useSelector(state => state.search);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      let responce = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/foodData`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!responce.ok) {
        const text = await responce.text();
        throw new Error(`HTTP ${responce.status}: ${text}`);
      }

      const responceData = await responce.json();

      /*responceData that is coming from the api that is array first success second Category Data
       third Items Data */
      if (!Array.isArray(responceData) || !responceData[0] || typeof responceData[0].success === 'undefined') {
        console.error('Unexpected API shape for /api/foodData:', responceData);
        throw new Error('Unexpected API response');
      }

      if (!responceData[0].success) {
        throw new Error('API reported failure');
      }

      setFoodCategoryData(Array.isArray(responceData[1]) ? responceData[1] : []);
      setfoodItemsdata(Array.isArray(responceData[2]) ? responceData[2] : []);
    } catch (err) {
      console.error('Failed to load food data', err);
      setError(err.message || 'Failed to load');
    } finally {
      setIsLoading(false);
    }
  }
 /* The useEffect hook is called in a component after the first render and every time the component
  updates */
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="navbar-container" >
        <Navbar />
      </div>

      <div className="carousel-container">
        <Crousel />
      </div>

      <div className="m-2 m-md-3 m-lg-4" style={{ background: '#f8fafc', borderRadius: '18px', padding: '2rem' }}>
        {
          isLoading ? (
            <Loader />
          ) : error ? (
            <div className="text-center text-muted">
              <div style={{marginBottom: '12px'}}>Unable to load data.</div>
              <button className="btn btn-sm btn-outline-secondary" onClick={loadData}>Retry</button>
            </div>
          ) : foodCategoryData.length > 0
            ? foodCategoryData.map((data, index) => {
              return (
                <div className='row mb-3'>
                  <div key={data._id} className='category-title fs-3 m-3'> {data.CategoryName} </div>
                  <hr />

                  {foodItemsdata.length > 0
                    ? (
                      foodItemsdata.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(serachText.toLowerCase()))
                        .map((filteredItem) => {
                          return (
                            <div key={filteredItem._id} className='card-container col-12 col-md-6 col-lg-3'>
                              <Card foodItems = {filteredItem}
                                options={filteredItem.options[0]}
                              />
                            </div>
                          )
                        })
                    )
                    :
                    <div>"No Such Data Found" </div>}

                </div>
              )
            })

            : <Loader />
        }
      </div>
      <div> <Footer /> </div>
    </>

  )
}

/* first we map the categorydata according to the product category the products who have the same 
category are arranged then for each item we use card its all details is passed to the card 
  For every items details like name ,id , img , CategoryName , options are coming from backend then send 
individually to the card
*/