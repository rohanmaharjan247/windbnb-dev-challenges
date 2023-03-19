import { classNames } from '@/helpers/common';
import { City } from '@/pages/model';
import { faLocationDot, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Tab, Transition } from '@headlessui/react';
import React, { Dispatch, Fragment, SetStateAction, useState } from 'react';

interface ModalProps {
  openModal: boolean;
  cities: City[];
  filter: City;
  defaultIndex: number;
  closeModal: () => void;
  searchHotel: () => void;
  setFilter: Dispatch<SetStateAction<City>>;
}

const Modal = ({
  openModal,
  cities,
  filter,
  defaultIndex,
  closeModal,
  searchHotel,
  setFilter,
}: ModalProps) => {
  let [adults, setAdults] = useState<number>(0);
  let [children, setChildren] = useState<number>(0);
  const [total, setTotal] = useState<number>(adults + children);

  const onAdultDecrement = () => {
    if (adults <= 0) {
      return;
    }
    adults -= 1;
    setAdults(adults);
    onSetTotal();
  };
  const onAdultIncrement = () => {
    adults += 1;
    setAdults(adults);
    onSetTotal();
  };
  const onChildrenDecrement = () => {
    if (children <= 0) {
      return;
    }
    children -= 1;
    setChildren(children);
    onSetTotal();
  };
  const onChildrenIncrement = () => {
    children += 1;
    setChildren(children);
    onSetTotal();
  };

  const onSetTotal = () => {
    setTotal(adults + children);
  };

  return (
    <Transition appear show={openModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed top-0 w-full overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="modal-panel">
                <Tab.Group defaultIndex={defaultIndex}>
                  <Tab.List className="tab-list">
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected && 'border rounded-xl pl-2',
                          'flex-1 py-2 text-left'
                        )
                      }
                    >
                      <h3 className="text-xxs font-bold uppercase">Location</h3>
                      <p className="text-sm">Helsinki, Finland</p>
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected && 'border rounded-xl pl-2',
                          'flex-1 p-2 text-left border-t md:border-x border-slate-100'
                        )
                      }
                    >
                      <h3 className="text-xxs font-bold uppercase">Guests</h3>
                      <p
                        className={classNames(
                          'text-sm',
                          total === 0 && 'text-slate-300'
                        )}
                      >
                        {total === 0 ? 'Add guest' : `${total} guests`}
                      </p>
                    </Tab>
                    <button
                      className="hidden bg-primary text-white -mx-4 px-4 rounded-r-xl md:inline-block"
                      onClick={searchHotel}
                    >
                      <span>
                        <FontAwesomeIcon icon={faSearch} />
                      </span>
                      Search
                    </button>
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel>
                      {cities?.map((city, index) => (
                        <button
                          type="button"
                          key={index}
                          className={classNames(
                            'block p-4 my-4',
                            filter.city === city.city
                              ? 'bg-primary text-white rounded-md'
                              : ''
                          )}
                          onClick={() => setFilter(city)}
                        >
                          <span className="mr-4">
                            <FontAwesomeIcon icon={faLocationDot} />
                          </span>
                          {city.city}, {city.country}
                        </button>
                      ))}
                    </Tab.Panel>
                    <Tab.Panel>
                      <div className="flex flex-col items-center py-8">
                        <h3 className="font-bold text-sm">Adults</h3>
                        <p className="text-neutral-gray text-xs mb-4">
                          Ages 13 or Above
                        </p>
                        <div className="flex gap-4">
                          <button
                            className="border px-2 rounded-md border-neutral-gray"
                            onClick={onAdultDecrement}
                          >
                            -
                          </button>
                          <p>{adults}</p>
                          <button
                            className="border px-2 rounded-md border-neutral-gray"
                            onClick={onAdultIncrement}
                          >
                            +
                          </button>
                        </div>
                        <h3 className="font-bold text-sm mt-4">Children</h3>
                        <p className="text-neutral-gray text-xs mb-4">
                          Ages 2-12
                        </p>
                        <div className="flex gap-4">
                          <button
                            className="border px-2 rounded-md border-neutral-gray"
                            onClick={onChildrenDecrement}
                          >
                            -
                          </button>
                          <p>{children}</p>
                          <button
                            className="border px-2 rounded-md border-neutral-gray"
                            onClick={onChildrenIncrement}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
                <div className="flex justify-center md:hidden">
                  <button
                    className="bg-primary text-white -mx-4 px-4 rounded-lg py-4"
                    onClick={searchHotel}
                  >
                    <span className="mr-4">
                      <FontAwesomeIcon icon={faSearch} />
                    </span>
                    Search
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
