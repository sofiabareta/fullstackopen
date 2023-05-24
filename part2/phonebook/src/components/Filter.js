const Filter = (props) => {
    return (
        <>
            <input 
                value={props.value}
                onChange={props.handleNewSearch}
            />
        </>
    )
}

export default Filter