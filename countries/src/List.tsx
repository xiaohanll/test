import React, { useEffect, useState } from 'react';
import './List.css'

interface DataItem {
  // 其他字段...
  country: string,
  value: number
}

function List(){

  const [currentCountry, setCurrentCountry] = useState({
    country: '',
    value: 0
  })

  const [userData, setUserData] = useState([{
    location: {
      country: '',
      city:'',
      state: ''
    },
    name: {
      title: "",
      first: "",
      last: ""
    },
    gender: "",
    registered: {
      date: ''
    }
  }]);

  const [countryList, setCountryList] = useState<DataItem[]>([{
    country: '',
    value: 0
  }]);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await fetch("https://randomuser.me/api/?results=100");
    const fetchedData = await response.json();
    console.log(fetchedData)
    setUserData(fetchedData?.results);
    const countryList = countUsersByCountry(fetchedData?.results);
    console.log(countryList)
    let objArray = Object.keys(countryList).map(key => {
      return {
        country: key,
        value: countryList[key],
      };
    });
    objArray.sort((a, b) => b.value - a.value);
    console.log(objArray)
    setCountryList(objArray);
  };

  const countUsersByCountry = (users: any) => {
    return users.reduce((countMap: Record<string, number>, user: any) => {
      countMap[user.location.country] = (countMap[user.location.country] || 0) + 1;
      return countMap;
    }, {} as Record<string, number>)
  }

  const handleClick = (e: any) => {
    console.log(e)
    setCurrentCountry(e)
  }

  return (
    <>
      <div>列表</div>
        <ul>
          {
            countryList.map((item) => (
              <li className='ul-li-country' onClick={() => handleClick(item)}>
                {item.country}
                {
                  currentCountry.country ==item.country ? (
                  <ul>
                    {
                      userData.map(subitem => (
                        subitem.location.country == item.country ? (
                          <li>
                            <div>
                              {subitem.name.title} {subitem.name.first} {subitem.name.last} {subitem.gender} {subitem.location.city} {subitem.location.state} {subitem.registered.date}
                            </div>
                          </li>
                        ) : (
                          null
                        )
                      ))
                    }
                  </ul>
                  ) : null
                }
              </li>
            ))}
        </ul>

    </>
  );
}

export default List;
