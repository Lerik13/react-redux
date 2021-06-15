import React from 'react';
import {render} from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import App from './App';
import { rootReducer } from './redux/rootReducer';
import { forbiddenWordsMiddleware } from './redux/middleware';
import { sagaWatcher } from './redux/sagas';
//import * as serviceWorker from './serviceWorker';

const saga = createSagaMiddleware()

const store = createStore(rootReducer, compose(
	applyMiddleware(
		thunk, forbiddenWordsMiddleware, saga
	),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

saga.run(sagaWatcher)

const app = (
	<Provider store={store}>
		<App />
	</Provider>
)

render(
	app,
	document.getElementById('root')
);

//serviceWorker.unregister();
