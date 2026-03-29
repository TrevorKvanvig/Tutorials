interface ButtonProps {
    children?: React.ReactNode
}

export default function Button(props: ButtonProps) {
    if (props.children) {
        return (
            <button type='button' className="btn btn-primary">{props.children}</button>
        )
    } else {
        return <button type='button' className="btn btn-primary">button</button>
    }
}


