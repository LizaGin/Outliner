import { createReducer } from '@reduxjs/toolkit';
import { Map } from 'immutable';

import { ADD_NODE, COMPLETE_NODE, CHANGE_CONTENT, FOLD_NODE, DELETE_NODE, STYLE_NODE } from './actions';

export default createReducer(Map(), {
    [ADD_NODE]: (state, action) => {
        const { path, ...payload } = action.payload;

        return state.setIn(path, Map({ ...payload, _path : path }));
    },
    [DELETE_NODE]: (state, action) => {
        const { path } = action.payload;

        return state.removeIn([...path]);
    },
    [COMPLETE_NODE]: (state, action) => {
        const { path } = action.payload;
        const { complited } = state.getIn(path).toJS();

        const stack = [path];

        let newState = state;

        while (stack.length) {
            const nodePath = stack.pop();

            newState = newState.updateIn([...nodePath, 'complited'], nodeComplited => 
            nodeComplited = complited === nodeComplited ? !nodeComplited :nodeComplited);

            const {
                id: _id,
                content: _content,
                fold: _fold,
                complited: _complited,
                style: _style,
                _path: path,
                ...childrens
            } = state.getIn(nodePath).toJS();

            for (const key of Object.keys(childrens)) {
                stack.push([...nodePath, key]);
            }
        }

        return newState;
    },
    [CHANGE_CONTENT]: (state, action) => {
        const { path, content } = action.payload;

        return state.updateIn([...path, 'content'], el => el = content);
    },
    [STYLE_NODE]: (state, action) => {
        const { path, style } = action.payload;

        return state.updateIn([...path, 'style'], el => el = style);
    },
    [FOLD_NODE]: (state, action) => {
        const { path } = action.payload;

        return state.updateIn([...path, 'fold'], nodeFold => nodeFold = !nodeFold);
    },
});
