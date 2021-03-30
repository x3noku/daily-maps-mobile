import { Socket } from 'socket.io-client';

export default abstract class SocketWrapper {

    protected readonly socket: Socket;

    protected constructor(socket: Socket) {
        this.socket = socket;
    }

    protected abstract linkHandlersWithSocket: () => void;
}
