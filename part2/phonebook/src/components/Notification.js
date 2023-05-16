const Notification = ({message, error}) => {
    return (
        <h1 className={error ? "error" : "success"}>{message}</h1>
    )
}

export default Notification