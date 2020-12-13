import './App.css';
import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero';
import Form from './Components/Form';
import Cards from './Components/Cards';
import { cards } from './card-data';

function App() {

  const [newCustomer, setNewCustomer] = useState({});
  const [availableCards, setAvailableCards] = useState([])
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const initialInputValues = {
    title: 'Mr',
    firstName: '',
    lastName: '',
    dob: {
      day: '',
      month: '',
      year: ''
    },
    employmentStatus: 'Full Time',
    income: '',
    postcode: '',
    manualAddress: {
      line_1: '',
      line_2: '',
      line_3: '',
      city: '',
      county: '',
      post_code: ''
    }
  }
  const [inputValues, setInputValues] = useState(initialInputValues);

  useEffect(() => {
    checkAvailableCards();
  }, [newCustomer])

  const resetInputValues = () => {
    setInputValues(initialInputValues);
  }

  const createNewCustomer = (customer) => {
    setNewCustomer(customer)
    setCardModalOpen(true);
  }

  //HANDLE INPUT CHANGES 
  const handleInputChange = e => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value })
  }

  const handleInputObjectChange = e => {
    const { id, name, value } = e.target;
    setInputValues({
      ...inputValues,
      [id]: {
        ...inputValues[id],
        [name]: value
      }
    })
  }

  //DESTRUCTURED CARD ARRAY
  const [student, anywhere, liquid] = cards

  const checkAvailableCards = () => {
    let newCards = [anywhere];

    if ((parseFloat(newCustomer.income)) > 16000) {
      newCards.push(liquid)
    }
    if (newCustomer.employment_status === 'Student') {
      newCards.push(student);
    }

    setAvailableCards(newCards)
  }

  return (
    <div className="App">
      <div>
        <Navbar />
        <Hero />
        <Form
          check={checkAvailableCards}
          createNewCustomer={createNewCustomer}
          inputValues={inputValues}
          handleInputChange={handleInputChange}
          handleInputObjectChange={handleInputObjectChange}
          resetInputValues={resetInputValues} />
        <Cards
          cards={availableCards}
          customer={newCustomer}
          cardModal={cardModalOpen}
          setModal={setCardModalOpen} />
      </div>
    </div>
  );
}

export default App;
