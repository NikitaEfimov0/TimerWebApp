import "../PeriodComponent/PeriodComponent.css"
import React, { Component }  from 'react';
export default function PeriodComponent(props:{children: {value: string, text: string}}){




    return <div className={"period-container"}>

        <div className={"time-text"}>
            {props.children.value}
        </div>

        <div className={"description-text"}>
            {props.children.text}
        </div>


    </div>


}
