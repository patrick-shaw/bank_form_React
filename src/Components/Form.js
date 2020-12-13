import React, { useEffect, useState } from 'react';
import Fieldset from './Fieldset';

const addressSelectStyle = {
    display: 'block',
    margin: '27px 0 10px',
    width: '100%',
    padding: '12px 5px',
    borderRadius: '5px',
    cursor: 'pointer'
}


function Form({ createNewCustomer, inputValues, handleInputChange, handleInputObjectChange, resetInputValues }) {

    const { title,
        firstName,
        lastName,
        dob,
        employmentStatus,
        income,
        postcode,
        manualAddress } = inputValues;

    const [address, setAddress] = useState('');
    const [addressOptions, setAddressOptions] = useState([]);
    const [showAddressForm, setShowAddressForm] = useState(false);

    const initialErrorState = {
        nameError: '',
        dobError: '',
        incomeError: '',
        postcodeError: '',
        addressError: ''
    }

    const [errors, setErrors] = useState(initialErrorState);

    const { nameError, dobError, incomeError, postcodeError, addressError } = errors;

    useEffect(() => {
        getAddress(postcode);
    }, [postcode])

    //TWO DIGIT DATE/MONTH
    const dayMonthDigits = num => {
        return (num < 10 && num.length === 1 ? '0' : '') + num;
    }

    //CALCULATE AGE FROM BIRTHDAY
    const calculateAge = birthday => {
        const ageDifMs = Date.now() - birthday.getTime();
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    // SET MAX NUMBERS WITH type="number"
    const maxNumbers = (e) => {
        if (e.target.value.length > e.target.maxLength) {
            e.target.value = e.target.value.slice(0, e.target.maxLength)
        }
    }

    // GET ADDRESS LIST FROM POSTCODE API
    const getAddress = async (postcode) => {
        if (postcodeRegex.test(postcode)) {
            const API_KEY = 'J2yiJ6nG10OCqsfLfrot_Q29462'
            const res = await fetch(`https://api.getAddress.io/find/${postcode}?api-key=${API_KEY}`);
            const data = await res.json();
            setAddressOptions(data.addresses);
        }
    }

    // VALIDATION REGEX
    const nameRegex = /^[a-z ,.'-]+$/i;
    const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    const postcodeRegex = /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/i;

    // VALIDATE INPUT FIELDS
    const handleValidation = () => {
        let isFormValid = true;
        setErrors(initialErrorState);

        //name
        if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            setErrors(errors => ({ ...errors, nameError: "Only letters, apostrophes, and spaces allowed" }))
            isFormValid = false;
        }
        if (firstName === "" || lastName === "") {
            setErrors(errors => ({ ...errors, nameError: "This field is required" }))
            isFormValid = false;
        }

        //dob 
        const { day, month, year } = dob;
        const birthday = new Date(year, month - 1, day);

        if (!(dateRegex.test(`${dayMonthDigits(day)}/${dayMonthDigits(month)}/${year}`))) {
            setErrors(errors => ({ ...errors, dobError: "Somethings wrong with this date" }))
            isFormValid = false;
        }
        if (calculateAge(birthday) < 18) {
            setErrors(errors => ({ ...errors, dobError: "Must be at least 18" }))
            isFormValid = false;
        }
        if (day === "" || month === "" || year === "") {
            setErrors(errors => ({ ...errors, dobError: "This field is required" }))
            isFormValid = false;
        }

        //income
        if (income > 10000000) {
            setErrors(errors => ({ ...errors, incomeError: "Annual income can not be over £10000000" }))
            isFormValid = false;
        }
        if (income === "") {
            setErrors(errors => ({ ...errors, incomeError: "This field is required" }))
            isFormValid = false;
        }

        //address
        if (showAddressForm) {
            const { line_1, city, county, post_code } = manualAddress;

            if (!postcodeRegex.test(post_code)) {
                setErrors(errors => ({ ...errors, addressError: "Please enter a correct postcode" }))
                isFormValid = false;
            }
            if (!nameRegex.test(city) || !nameRegex.test(county)) {
                setErrors(errors => ({ ...errors, addressError: "Please check address fields" }))
                isFormValid = false;
            }
            if (line_1 === "" || city === '' || county === '' || post_code === '') {
                setErrors(errors => ({ ...errors, addressError: "Please fill in required fields" }))
                isFormValid = false;
            }
        } else {
            //postcode
            if (postcode === "") {
                setErrors(errors => ({ ...errors, postcodeError: "This field is required" }))
                isFormValid = false;
            }
        }
        return isFormValid;
    }

    // SUBMIT BUTTON CLICK
    const submitForm = e => {
        e.preventDefault();

        if (showAddressForm) {
            const addressString = Object.values(manualAddress).map(line => ' ' + line).filter(el => el !== '').toString();
            setAddress(addressString);
        }

        if (handleValidation()) {
            const newCustomer = {
                full_name: `${title} ${firstName} ${lastName}`,
                first_name: `${firstName}`,
                dob: dob.day + dob.month + dob.year,
                employment_status: employmentStatus,
                income: income,
                address: address
            }
            createNewCustomer(newCustomer);
            resetInputValues();
        }
    }

    return (
        <form className="form">

            <h2>Information</h2>

            {/* CUSTOM FIELDSET COMPONENT */}
            <Fieldset
                className="title-field radio-fields"
                title="Title"
                number="5"
                type="radio"
                name="title"
                check={title}
                id={['mr', 'mrs', 'ms', 'miss', 'dr']}
                value={['Mr', 'Mrs', 'Ms', 'Miss', 'Dr']}
                change={handleInputChange} />

            <Fieldset
                className="two-col-input space"
                title="Name"
                number="2"
                type="text"
                placeholder={['First name', 'Last name']}
                name={['firstName', 'lastName']}
                value={[firstName, lastName]}
                change={handleInputChange}
                error={nameError} />

            <Fieldset
                className="dob-field"
                title="Date of birth"
                number="3"
                type="number"
                placeholder={['DD', 'MM', 'YYYY']}
                name={['day', 'month', 'year']}
                id={['dob', 'dob', 'dob']}
                maxLength={['2', '2', '4']}
                onInput={maxNumbers}
                value={[dob.day, dob.month, dob.year]}
                change={handleInputObjectChange}
                error={dobError} />

            <Fieldset
                className="two-col-input radio-fields"
                title="Employment Status"
                number="7"
                type="radio"
                name="employmentStatus"
                check={employmentStatus}
                id={['fullTime', 'partTime', 'selfEmployed', 'homemaker', 'unemployed', 'retired', 'student']}
                value={['Full Time', 'Part Time', 'Self Employed', 'Homemaker', 'Unemployed', 'Retired', 'Student']}
                change={handleInputChange} />

            <Fieldset
                title="What is your annual income before tax?"
                number="1"
                type="number"
                placeholder={['Annual Income']}
                name={['income']}
                id={['income']}
                value={[income]}
                change={handleInputChange}
                error={incomeError} />

            <div className="address_search" style={showAddressForm ? { display: 'none' } : { display: 'block' }}>
                <Fieldset
                    title="Address"
                    style={{ marginBottom: '10px' }}
                    number="1"
                    type="text"
                    placeholder={["Postcode (Search)"]}
                    id={['postcode']}
                    name={['postcode']}
                    value={[postcode]}
                    change={handleInputChange}
                    error={postcodeError} />

                <select style={addressOptions.length === 0 ? { display: 'none' } : addressSelectStyle} onChange={e => setAddress(`${e.target.value}, ${postcode}`)}>
                    <option key="-1">Choose an address</option>
                    {addressOptions.map((address, i) => {
                        const newAddress = address.split(',').filter(el => el !== ' ').toString(); //REMOVE EMPTY SPACES FROM ADDRESSES
                        return <option key={i}>{newAddress}</option>
                    })}
                </select>
            </div>

            <div className="address_search" style={showAddressForm ? { display: 'block' } : { display: 'none' }}>
                <Fieldset
                    className="two-col-input"
                    style={{ marginBottom: '10px' }}
                    title="Address"
                    number="6"
                    type="text"
                    placeholder={[
                        'Address Line 1', 'Address Line 2 (optional)', 'Address Line 3 (optional)', 'City', 'County', 'Postcode'
                    ]}
                    name={[
                        'line_1', 'line_2', 'line_3', 'city', 'county', 'post_code'
                    ]}
                    id={[
                        'manualAddress', 'manualAddress', 'manualAddress', 'manualAddress', 'manualAddress', 'manualAddress'
                    ]}
                    value={[
                        manualAddress.line_1, manualAddress.line_2, manualAddress.line_3, manualAddress.city, manualAddress.county, manualAddress.post_code
                    ]}
                    change={handleInputObjectChange}
                    error={addressError}
                />
            </div>

            <p style={{ paddingBottom: '30px', color: '#211f8b', fontWeight: 'bold', cursor: 'pointer', textAlign: 'right' }} onClick={() => setShowAddressForm(!showAddressForm)}>{showAddressForm ? "Search by postcode" : "Enter address manually"}</p>

            <div className="button-container">
                <button type="submit" onClick={submitForm}>Submit</button>
            </div>
        </form>
    )
}

export default Form
