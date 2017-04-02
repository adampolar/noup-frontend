import { Store } from '../components/App'; 

export class RemoteState {

    private static socket: SocketIOClient.Socket;

    constructor(io: (uri: string, opts?: SocketIOClient.ConnectOpts) => SocketIOClient.Socket) {
        if (!RemoteState.socket) {
            RemoteState.socket = io("http://localhost:4321");
        }
        RemoteState.socket.on('lobby message', (message: string) => {
            JSON.parse(message) as any[];
        });
    }

    public setName: (name: string, cb: any) => void =
    (name, cb) => {
        RemoteState.socket.emit("admin message", JSON.stringify({
            name: name
        }),
            cb
        );
    }


}