import uniqid from 'uniqid';
import { createAction } from '@reduxjs/toolkit';

export const ADD_NODE= 'ADD_NODE';
export const DELETE_NODE = 'DELETE_NODE';
export const COMPLETE_NODE = 'COMPLETE_NODE';
export const FOLD_NODE = 'FOLD_NODE'
export const CHANGE_CONTENT = 'CHANGE_CONTENT';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const STYLE_NODE = 'STYLE_NODE';

export const addNode = createAction(ADD_NODE, (path, fold, complited, style) => {
    const id = uniqid();

    return {
        payload: {
            id,
            path: [...path, id],
            content: '',
            fold,
            complited,
            style,
        }
    };
});

export const deleteNode = createAction(DELETE_NODE, (path) => {
    return {
        payload: {
            path
        }
    };
});

export const completeNode = createAction(COMPLETE_NODE, (path, complited) => {
    return {
        payload: {
            path,
            complited: !complited,
        }
    };
});

export const foldNode = createAction(FOLD_NODE, (path, fold) => {
    return {
        payload: {
            path,
            fold: !fold,
        }
    };
});

export const changeContent = createAction(CHANGE_CONTENT, (path, content) => {
    return {
        payload: {
            path,
            content,
        }
    };
});

export const styleNode = createAction(STYLE_NODE, (path, style) => {
    return {
        payload: {
            path,
            style: {...style}
        }
    };
});
