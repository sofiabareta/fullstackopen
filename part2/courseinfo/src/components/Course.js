import Header from "./Header"
import Content from "./Content"

const Course = ({course}) => {
    console.log(course)
    const total = course.parts.reduce((sum, part) => {return sum + part.exercises}, 0)
    return (
        <>
            <Header title={course.name} />
            {course.parts.map(part => {
                return <Content key={part.id} parts={part} />
            })}
            <p>Total of {total} exercises</p>
        </>
    )
}

export default Course