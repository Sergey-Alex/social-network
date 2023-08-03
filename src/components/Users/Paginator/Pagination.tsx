import React, {useState} from 'react';
import classes from './Paginator.module.css'


type UserTypeComponent = {
    onPageChanged: (pageNumber: number) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
    portionSize: number
}


export const Pagination = ({portionSize = 10, ...props}: UserTypeComponent) => {
    let pagesCount: number = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState<number>(1)
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return (
        <div className={classes.mainPagint}>
            {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>}
            <div>
                {pages.filter(p => p >= leftPortionNumber && p<=rightPortionPageNumber).map(p=>{
                    return <span key={p}
                                 className={ p === props.currentPage ? classes.selectedPage : ''}
                                onClick={e => props.onPageChanged(p)}
                    >{p}</span>
                })}
            </div>
            {portionCount > portionNumber && <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}
        </div>)

}
