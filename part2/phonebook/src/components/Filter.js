const Filter = (props) => {
    return (
        <>
            <span>filter shown with </span>
            <input 
                value={props.value}
                onChange={props.handleNewSearch}
            />
        </>
    )
}

export default Filter