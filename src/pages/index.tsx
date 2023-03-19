import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Card, Header, Modal } from './component';
import { City, Hotel } from '../model';
import { TabIndex } from '../model/TabIndex';

export default function Home() {
  const [stays, setStays] = useState<Hotel[]>([]);
  const [allHotels, setAllHotels] = useState<Hotel[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [filter, setFilter] = useState<City>({
    city: 'Helsinki',
    country: 'Finland',
  });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState<TabIndex>(TabIndex.LOCATION);

  useEffect(() => {
    const fetchStays = async () => {
      const staysList = await (await fetch('/api/stays')).json();
      const parsedData = JSON.parse(staysList) as Hotel[];
      const filteredData = parsedData.filter(
        (hotel) => hotel.city === filter.city
      );

      const mappedCities = parsedData.map((hotel) => {
        return { city: hotel.city, country: hotel.country };
      });

      const cities = mappedCities.filter((city, index) => {
        // remove duplicates from the array
        return mappedCities.findIndex((c) => city.city === c.city) === index;
      });

      setStays(filteredData);
      setAllHotels(parsedData);
      setCities(cities);
    };

    fetchStays();
  }, []);

  const searchHotel = () => {
    const filteredHotel = allHotels.filter((stay) => stay.city === filter.city);

    setStays(filteredHotel);
    closeModal();
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Head>
        <title>Windbnb</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/logo/triangleLogo.png" />
      </Head>
      <Header
        filterValue={filter}
        setOpenModal={setOpenModal}
        setTabIndex={setTabIndex}
      />
      <main className="container mx-auto px-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Stays in {filter.country}</h1>
          <p>{stays.length > 12 ? '12+ Stays' : stays.length + ' Stays'}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stays.map((stay, index) => (
            <Card key={index} hotel={stay} />
          ))}
        </div>
        <Modal
          defaultIndex={tabIndex}
          cities={cities}
          closeModal={closeModal}
          filter={filter}
          openModal={openModal}
          searchHotel={searchHotel}
          setFilter={setFilter}
        />
        <footer className="text-center">
          <p className="text-gray-500 text-xs">
            Created by - @rohanmaharjan247 - devChallenges.io
          </p>
        </footer>
      </main>
    </>
  );
}
