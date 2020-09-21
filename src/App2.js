import React, { useState } from 'react';
import Node from './Components/Node';
import { Map } from 'immutable';

import { useNodeState } from './store/hooks';
import { useDispatch } from 'react-redux';
import { addNode } from './store/actions';
import './App.css';
import { phrases } from './phrases';

export default function App2() {
    const store = useNodeState();
    const dispatch = useDispatch();

    const [hideComplited, setHideComplited] = useState(false)
    const [random, setRandom] = useState(0);
    const [search, setSearch] = useState(null);

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    return (
      <div className="App">
        <div className="App-header">
          <div className='header_burger'>
          </div>
          <h1>Твой список дел</h1>
        </div>
        <div className='App-button' onClick={() => {
          dispatch(addNode([], false, false, {}, false))
          const randomInt = getRandomInt(phrases.length)
          setRandom(randomInt)
        }}>
          Добавить задачу
        </div>
       { Map(store).size !== 0 && 
        <>
          <div class="ios-toggle-text">
            {hideComplited ? 'Показать выполненные' : 'Скрыть выполненные'}
          </div>
          <div class="ios-toggle">
            <input
              id="ios-toggle"
              className='checkbox'
              onChange={() => {
                setHideComplited(!hideComplited);
              }}
              type='checkbox'
              checked={hideComplited}
            />
            <label for="ios-toggle" />
          </div>
        </>
        }
        { Map(store).size !== 0 && 
        <>
          <input
            className='App-input'
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type='input'
          />
          <div class='App-input-icon'>
            <img width='20' height='20' src='search.svg' alt="Лупа"/>
          </div>
        </>
        }
        {
          Map(store).size === 0 ?
          <div className='Empty-list'>
            <div className='Empty-list_img'>
              <img width='300' src='bunny_sad.svg' alt="Озадаченный мультяшный кролик"/>
            </div>
            <div className='Empty-list_str'>Твой список дел пуст, начни заполнять его!</div>
          </div> 
          : <div className="paper">
              <div className='Full-list'>
                {store.map((node, key) => (
                <ul>
                    <Node
                      key={key}
                      path={[key]}
                      search={search}
                      hideComplited={hideComplited}
                      />
                  </ul>
                  )
                ).valueSeq().toArray()
                }
              </div>
              <div className='Full-list_img'>
                <p className='speech'>{phrases[random]}</p>
                <img width='300' src='bunny_funny.svg' alt="Радостный мультяшный кролик"/>
              </div>
            </div>
        }
      </div>
    )
  }
