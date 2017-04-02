import * as io from 'socket.io-client';

import { RemoteState } from './RemoteState';

export const getRemoteState: () => RemoteState =
    () => {
        return new RemoteState(io);
    }