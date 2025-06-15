import React from 'react';
import { createRoot } from 'react-dom/client';
import { StartButton } from './app';
import { StartWindow } from './app/start-window';

import './app/styles.css'

const root = createRoot(document.querySelector('#root'));

if(location.pathname === '/') root.render(<StartButton />);
if(location.pathname === '/start_window') root.render(<StartWindow />);