import { DateTime } from "luxon";

export interface Post {
    id : string,
    title : string,
    createdAt : string,
    markDown : string,
    htmlValue : string
}
export interface ITimeLineItem extends Omit<Post,'createdAt'> {
    createdAt : DateTime,
}

export const today : Post = {
    id : '1',
    title : 'Today',
    createdAt : DateTime.now().toISO(),
    markDown : '',
    htmlValue : ''
}
export const thisWeek : Post = {
    id : '2',
    title : 'This Week',
    createdAt : DateTime.now().minus({days:5}).toISO(),
    markDown : '',
    htmlValue : ''
}
export const thisMonth : Post = {
    id : '3',
    title : 'This Month',
    createdAt : DateTime.now().minus({weeks:5}).toISO(),
    markDown : '',
    htmlValue : ''
}