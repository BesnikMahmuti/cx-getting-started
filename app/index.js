import { startAppLoop } from 'cx/ui';
import { Store } from 'cx/data';
import { HtmlElement } from 'cx/widgets';
import Todo from './todo';

require('./index.scss');
const store = new Store();

var hello = <cx>
    <p>Hello, Cx</p>
</cx>;

var stop;
if (module.hot) {
    // accept itself
    module.hot.accept();

    // remember data on dispose
    module.hot.dispose(function (data) {
        data.state = store.getData();
        if (stop)
            stop();
    });

    // apply data on hot replace
    if (module.hot.data)
        store.load(module.hot.data);
}
stop = startAppLoop(document.getElementById('app'), store, Todo);