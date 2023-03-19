import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { City } from '@/model';
import { TabIndex } from '@/model/TabIndex';

interface HeaderProps {
  filterValue: City;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setTabIndex: Dispatch<SetStateAction<TabIndex>>;
}

const Header = ({ filterValue, setOpenModal, setTabIndex }: HeaderProps) => {
  const onTabOpen = (tabIndex: TabIndex) => {
    setTabIndex(tabIndex);
    setOpenModal(true);
  };

  return (
    <div className="container mx-auto mb-8 px-6">
      <nav className="flex flex-col justify-between px-8 py-6 md:flex-row">
        <div className="logo mb-6 md:mb-0">
          <Image src="/logo/logo.svg" alt="logo" width={100} height={150} />
        </div>
        <div className="flex justify-between header-card">
          <button
            type="button"
            className="header-title"
            onClick={() => onTabOpen(TabIndex.LOCATION)}
          >
            {filterValue.city}, {filterValue.country}
          </button>
          <div className="divider"></div>
          <button
            className="text-gray-400"
            onClick={() => onTabOpen(TabIndex.GUESTS)}
          >
            Add Guests
          </button>
          <div className="divider"></div>
          <button type="button" onClick={() => onTabOpen(TabIndex.LOCATION)}>
            <FontAwesomeIcon icon={faSearch} className="text-primary" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
