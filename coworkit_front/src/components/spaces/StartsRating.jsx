import React from 'react'
import "../../css/spaces/startsRating.css"

export default function StartsRating({register}) {
    return (

    <div className="rating">

    <input ref ={register()} type="radio" name="score" id="star5" value={10}/>
    <label htmlFor="star5"/>
    <input ref ={register()} type="radio" name="score" id="star4" value={8}/>
    <label htmlFor="star4"/>
    <input ref ={register()} type="radio" name="score" id="star3" value={6}/>
    <label htmlFor="star3"/>
    <input ref ={register()} type="radio" name="score" id="star2" value={4}/>
    <label htmlFor="star2"/>
    <input ref ={register()} type="radio" name="score" id="star1" value={2}/>
    <label htmlFor="star1"/>
 </div>
 

    )
}
