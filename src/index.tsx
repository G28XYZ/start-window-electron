import React from 'react';
import { createRoot } from 'react-dom/client';
import { StartButton, StartWindow } from './app';

import './app/styles.css'

const root = createRoot(document.querySelector('#root'));

if(windowType === 'start') root.render(<StartButton />);
if(windowType === 'start_window') root.render(<StartWindow />);