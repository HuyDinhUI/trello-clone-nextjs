
const FieldError = ({message}: {message: string}) => {
    return (
        <>
            <span className="text-red-500 text-sm">{message}</span>
        </>
    )
}

export default FieldError