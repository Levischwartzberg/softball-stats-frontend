type BaseProps = {
    hasRunner : boolean;
    className : string;
}

function Base(props : BaseProps) {

    return (
        <div style={props.hasRunner ? {backgroundColor : "yellow"} : {}} className={props.className}>

        </div>
    )
}

export default Base;