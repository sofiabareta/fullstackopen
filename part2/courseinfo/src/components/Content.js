import Part from "./Parts"

const Content = ({parts}) => {
    console.log(parts)
    return (
        <ul>
            <Part name={parts.name} exercises={parts.exercises}/>
        </ul>
    )
}

export default Content