import { useState } from "react";


const CounterButton = (props)=>{
    const [small, setSmall] = useState(0);
    const [medium, setMedium] = useState(0);
    const [large, setLarge] = useState(0);

    function add(size){
        if(size == "S" && small == 15){
            setSmall(15);
        }else if(size == "S"){
            setSmall(small + 1);
        };
        if(size == "M" && medium == 15){
            setMedium(15);
        }else if(size == "M"){
            setMedium(medium + 1);
        };
        if(size == "L" && large == 15){
            setLarge(15);
        }else if(size == "L"){
            setLarge(large + 1);
        };
    }
    function minus(size){
        if(size == "S" && small == 0){
            setSmall(0);
        }else if(size == "S"){
            setSmall(small -1);
        };
        if(size == "M" && medium == 0){
            setMedium(0);
        }else if(size == "M"){
            setMedium(medium -1);
        };
        if(size == "L" && large == 0){
            setLarge(0);
        }else if(size == "L"){
            setLarge(large -1);
        };
    }

    return(
        <div>
            <div className="countbutton">
                Small size (20x30 cm). 10$     
                <button onClick={()=>{minus("S"); props.handleRemove("S")}}>-</button>
                    {small}
                <button onClick={()=>{add("S"); props.handleAdd(props.item, "S", 10)}}>+</button>
            </div>
            <div className="countbutton">
                Medium size (40x50 cm). 15$
                <button onClick={()=>{minus("M"); ; props.handleRemove("M")}}>-</button>
                    {medium}
                <button onClick={()=>{add("M"); props.handleAdd(props.item, "M", 15)}}>+</button>
            </div>
            <div className="countbutton">
                Large size (60x90 cm). 20$
                <button onClick={()=>{minus("L")}}>-</button>
                    {large}
                <button onClick={()=>{add("L"); props.handleAdd(props.item, "L", 20)}}>+</button>
            </div>
        </div>

    )
}

export default CounterButton;