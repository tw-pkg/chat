import Chat from '../models/chat.js'
import dayjs from 'dayjs';

export async function getRecord(offset = 0) {
    const record = await Chat.findAll({
        attributes: ['summoner', 'message', 'time'],
        order: [
            ['createdAt', 'DESC']
        ],
        offset: offset,
        limit: 100
    });

    return record.reverse();
}

export async function registerListeners (io, socket) {
    socket.on('new-message', async (data) => {
        const { summoner, message } = data;

        const time = dayjs()
        .format('MM/DD ddd hh:mm:ss A')
        .replace('오전', 'AM')
        .replace('오후', 'PM')
        .toString();

        const chat = {
            ...data,
            time
        }
        io.emit('new-message', chat);

        await Chat.create({
            summoner: summoner,
            message: message,
            time: time,
        })
    });

    socket.on('before-message', async (page) => {
        if (page) {
            const offset = page * 100;
            const record = await getRecord(offset);

            socket.emit('before-message', {
                messages: record,
                isLast: record.length < 100 ? true : false,
            });
        }
    })
}