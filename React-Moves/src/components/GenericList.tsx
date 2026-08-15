import Loading from "./Loading";

export default function GenericList<T> (props: GenericListProps<T>) {
    if(!props.list) {
        return props.loadingUI? props.loadingUI : <Loading/>
    } else if (props.list.length === 0) {
        return props.emptyUI? props.emptyUI : "Default Empty From Generic List .jsx"
    } else {
        return props.children
    }
}

interface GenericListProps<T> {
    list?: T[]
    children: React.ReactNode;
    loadingUI?: React.ReactNode;
    emptyUI?: React.ReactNode;
}