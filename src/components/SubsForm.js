import React from 'react'

const SubsForm = props =>  {
    const { handleSubmit, handleChange, subs } = props;
    return (
        <div className="ui form">
            <form onSubmit={handleSubmit}>                
            <label>
                Company:
                </label>
                <div className="menu">
                <select>
                    {subs.map(sub =>                             
                        <option value={sub.company}>{sub.company}</option>
                        )}
                </select>
                <input name="sub" type="submit" value="Submit" placeholder="Company Name"
                onChange={handleChange}/>
                </div>
                <div className="ui field">
                <label>
                    Start Date:
                    <input name="Start Date" type="date"
                    onChange={handleChange}/>
                </label>   
                <label>
                    End Date:
                    <input name="End Date" type="date"
                    onChange={handleChange}/>
                </label>              
                </div>
                <input name="submit" value="Add New Subscription" type="submit" className="ui basic purple button" />
            </form>
        </div>
    )
}

export default SubsForm