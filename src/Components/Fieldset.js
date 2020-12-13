import React from 'react';
import Error from './Error';

function Fieldset(props) {

    let { title, className, number, type, placeholder, name, id, check, maxLength, onInput, value, change, error, style } = props

    //IF NO ERROR PASSED
    error = error || '';

    // TYPE = TEXT
    if (type === 'text') {
        let textRows = [];
        id = id || []

        for (let i = 0; i < number; i++) {
            textRows.push(
                <input
                    key={i}
                    type={type}
                    placeholder={placeholder[i]}
                    id={id[i]}
                    name={name[i]}
                    value={value[i]}
                    onChange={change} />
            )
        }
        return (
            <div className="form-component">
                <h5>{title}</h5>
                <fieldset style={style} className={className}>
                    {textRows}
                    <Error error={error} />
                </fieldset>
            </div>

        )
    }

    // TYPE = RADIO
    if (type === 'radio') {
        let radioRows = [];

        for (let i = 0; i < number; i++) {
            radioRows.push(
                <li key={i}>
                    <input
                        type={type}
                        name={name}
                        checked={check === `${value[i]}`}
                        id={id[i]}
                        value={value[i]}
                        onChange={change}
                    />
                    <label htmlFor={id[i]}>{value[i]}</label>
                </li>

            )
        }
        return (
            <div className="form-component">
                <h5>{title}</h5>
                <fieldset>
                    <ul style={style} className={className}>
                        {radioRows}
                        <Error error={error} />
                    </ul>
                </fieldset>
            </div>

        )
    }

    // TYPE = NUMBER
    if (type === 'number') {
        let numberRows = [];
        maxLength = maxLength || 10000000;

        for (let i = 0; i < number; i++) {
            numberRows.push(
                <input
                    key={i}
                    type={type}
                    placeholder={placeholder[i]}
                    name={name[i]}
                    id={id[i]}
                    maxLength={maxLength[i]}
                    onInput={onInput}
                    value={value[i]}
                    onChange={change}
                />
            )
        }
        return (
            <div className="form-component">
                <h5>{title}</h5>
                <fieldset style={style} className={className}>
                    {numberRows}
                    <Error error={error} />
                </fieldset>
            </div>
        )
    }

}

export default Fieldset
