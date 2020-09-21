import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Map } from 'immutable';

import { addNode, changeContent, completeNode, deleteNode, foldNode } from '../store/actions';
import { useNodeState } from '../store/hooks';
import  StyleMenu  from './StyleMenu'
import './Node.css';

function Node({
  path,
  search,
  hideComplited
 }) {
  const {complited, content, fold, id, _path, style, ...childrens} = useNodeState(path).toJS();

  const dispatch = useDispatch();
  const [display, setDisplay] = useState(false);

  function setClassName(complited){
    let className = 'node'

    if(complited) {
      className = 'node complited'
    } 
    if(search !== '' && content.startsWith(search)) {
      className = className.concat(' search')
    }

    return className;
  }
  return (
    <div className={complited && hideComplited ? 'Node hide' : 'Node'}>
      <ul>
        <div className='flex-container'>
          <div
          className='icon fold'
          onClick={() => dispatch(foldNode(path, fold))}
          style={{
            display: Map(childrens).size > 0 ? 'block' : 'none',
          }}
          >
            {
              fold ? 
              <img width='20' src='unfold.svg' alt="Плюс"/> : 
              <img width='20' src='fold.svg' alt="Минус"/>
            }
          </div>
          <div
            className='icon'
            onClick={() => dispatch(deleteNode(path))}
          >
            <img width='30' src='delete.svg' alt="Крестик"/>
          </div>
          <div
            className='icon'
            onClick={() => setDisplay(!display)}
          >
            <img width='25' src='edit.svg' alt="Карандаш"/>
          </div>
          <StyleMenu
            display={display}
            path={path}
            setState={setDisplay}
            style={style}
          >
          </StyleMenu>
          <input
            checked={complited}
            className='checkbox'
            onChange={() => {
              dispatch(completeNode(path, complited));
            }}
            type='checkbox'
          />
          <textarea
            className={setClassName(complited)}
            onChange={(event) => {
              dispatch(changeContent(path, event.target.value))
            }}
            placeholder='Начни писать свою задачу здесь'
            style={style}
            type='text'
            value={content}
          />
          <div onClick={() => dispatch(addNode(path, fold, complited, {}, true))}>➘</div>
        </div>
        {Map(childrens).map((node, key, i) => (
          <li className={fold ? 'childrens_fold' : 'childrens'}>
            <Node
              hideComplited={hideComplited}
              key={key}
              path={[...path, node.id]}
              search={search}
            />
          </li>
        )).valueSeq().toArray()}
      </ul>
    </div>
  );
}

export default (Node);