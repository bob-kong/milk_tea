import React from 'react'

const Searchbar = (props) => {
  return (
    <div className="m-2">
        <input 
            type={props.type} 
            className={props.className}  
            id="floatingInput" 
            placeholder={props.placeholder}
            onChange={props.onChange}
        />
    </div>
  )
}

export default Searchbar