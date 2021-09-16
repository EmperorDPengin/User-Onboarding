import React from 'react';

export default function FormData(props){
    const {
        values,
        change,
        submit,
        disabled,
        errors,
    } = props;

    const onSubmit = evt => {
        evt.preventDefault();
        submit();
    }

    const onChange = evt => {
        const {name, value, checked, type} = evt.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse);
    }

    return (
        <form className="form container" onSubmit={onSubmit}>
            <div className='form-group submit'>

                <div className='errors'>
                    <div>{errors.username}</div>
                    <div>{errors.email}</div>
                    <div>{errors.role}</div>
                    <div>{errors.civil}</div>
                </div>

                <div className='form-group inputs'>
                    <label>----------Name----------</label>
                    <input 
                        type ='text'
                        name='name'
                        value={values.name}
                        onChange={onChange}
                    />
                    <label>----------Email----------</label>
                    <input 
                        type ='email'
                        name='email'
                        value={values.email}
                        onChange={onChange}
                    />
                    <label>----------Password----------</label>
                    <input 
                        type ='password'
                        name='password'
                        value={values.password}
                        onChange={onChange}
                    />
                    <label>I Accept the Terms of Service
                        <input 
                            type ='checkbox'
                            name='tos'
                            value={values.tos}
                            onChange={onChange}
                        />
                    </label>
                </div>

                <button disabled={disabled}>Sign Up</button>
            </div>
        </form>
    )
}