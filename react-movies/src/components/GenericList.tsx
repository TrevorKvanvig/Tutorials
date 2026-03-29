import Loading from "./Loading"

interface GenericListProps<T> {
    list: T[] | undefined
    children: React.ReactNode
    loadingUI?: React.ReactNode
    emptyUI?: React.ReactNode
}

export default function GenericList<T>({ list, 
    loadingUI, 
    emptyUI, 
    children 
}: GenericListProps<T>) {
    
    if(!list) {
        return loadingUI ? loadingUI : <Loading/>
    } 

    if (list.length === 0) {
        return emptyUI ? emptyUI: "There are no elements in list"
    }

    return children
    
}