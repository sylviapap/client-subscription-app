import React from 'react'

const SubsForm = props =>  {
    const { handleSubmit, handleChange, subs, fields } = props;
    return (
        <div className="ui form">
        <form onSubmit={handleSubmit} >
        <div className="ui field">
            <label>Company:</label>
            <select 
            className="ui selection dropdown"
            name="sub_id"
            value={fields.sub_id}
            onChange={handleChange} >
                <option>Select a Company</option>
                {subs.map(sub =>                             
                    <option
                    value={sub.id}
                    key={sub.id}
                    >
                        {sub.company}
                    </option>
                    )}
            </select>
        </div>
        <div className="ui field">
            <label>Start Date:</label>   
                <input 
                name="start_date"
                type="date"
                value={fields.start_date}
                onChange={handleChange}/>
        </div>
        <div className="ui field">
            <label>End Date:</label>
                <input 
                name="end_date" 
                type="date"
                value={fields.end_date}
                onChange={handleChange}/>
        </div>
            <button 
                type="submit" 
                className="ui teal button">
                Add Subscription to Your List
            </button>
        </form>
        </div>
    )
}

export default SubsForm