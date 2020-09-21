import { useSelector } from 'react-redux';

export function useNodeState(path = []) {
    return useSelector(state =>
        path.length ?
        state.getIn(path) :
        state
    );
}
