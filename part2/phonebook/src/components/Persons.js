import PersonsService from '../services/persons'

const Persons = ({id, name, number}) => {
    const buttonHandle = id => {
        if (window.confirm(`Are you sure to delete person ${id}?`)) {
            window.open(PersonsService.remove(id), "");
        }
    }
    return (
        <>
            <li>
                <span>{name} {number}</span>
                <button onClick={() => buttonHandle(id)}>delete</button>
            </li>
        </>
    )
}

export default Persons