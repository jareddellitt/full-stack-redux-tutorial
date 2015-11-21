import Server from 'socket.io';

export default function startServer(store) {
    const io = new Server().attach(8090);

    store.subscribe(() => io.emit('state', store.getState().toJS()));

    io.on('connect', (s) => {
        s.emit('state', store.getState().toJS());
        s.on('action', store.dispatch.bind(store));
    });
};
