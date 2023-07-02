import React from 'react';
import classes from './Paginator.module.css'


type UserTypeComponent = {
    onPageChanged: (pageNumber: number) => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
}


 export  const Pagination = (props: UserTypeComponent) => {
    let pagesCount: number = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                {pages.map((p, index) => <span key={p + index}
                                               onClick={() => props.onPageChanged(p)}
                                               className={(p === props.currentPage) ? classes.selectedPage : ''}>{p}</span>)}
            </div>
        </div>)

}
