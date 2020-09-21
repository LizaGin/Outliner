import React from 'react';
import { useDispatch } from 'react-redux';
import { cn } from '@bem-react/classname'

import { styleNode } from '../store/actions';
import './StyleMenu.css';

function StyleMenu({
  display,
  path,
  setState,
  style,
 }) {

  const dispatch = useDispatch();
  const circle = cn('circle')
  const text = cn('text');

  function createCircle(colorName, color) {
    return (
      <li 
        className={text({color: colorName})}
        onClick={() => dispatch(styleNode(path, {...style, color: color}))}
      >
        <div className={circle({color: colorName})}></div>
      </li>
    )
  }

  function createFontSize(sizeName, size) {
    return (
      <li
        className={text({size: sizeName})}
        onClick={() => dispatch(styleNode(path, {...style, fontSize: size}))}
      >
        {sizeName}
      </li>
    )
  }

  return (
    display &&
    <div className='style-menu'>
        <div className="style-menu_header">
          Добавь красок!
        </div>
        <div className='style-menu_icon' onClick={() => setState(false)}>
          <img width='20' src='delete.svg' alt='delete'/>
        </div>
        <div className='style-list'>
          <ul className='style-group'>
            {createCircle('black', '#000')}
            {createCircle('red', '#e08458')}
            {createCircle('purple', 'purple')}
            {createCircle('green', '#2d6166')}
            {createCircle('blue', '#4eb5f1')}
          </ul>
          <ul className='style-group'>
            <li
              className={text({style: 'none'})}
              onClick={() => dispatch(styleNode(path, {...style, fontWeight: '500', fontStyle: 'normal'}))}
            >
              <img width='20' src='stop-sign.svg' alt='none'/>
            </li>
            <li
              className={text({style: 'bold'})}
              onClick={() => dispatch(styleNode(path, {...style, fontWeight: 'bold'}))}
            >
              Жирный
            </li>
            <li
              className={text({style: 'italic'})}
              onClick={() => dispatch(styleNode(path, {...style, fontStyle: 'italic'}))}
            >
              Курсив
            </li>
          </ul>
          <ul className='style-group'>
            {createFontSize('xs', '12px')}
            {createFontSize('s', '14px')}
            {createFontSize('m', '16px')}
            {createFontSize('l', '18px')}
            {createFontSize('xl', '20px')}
          </ul>
        </div>
    </div>
  );
}

export default (StyleMenu);