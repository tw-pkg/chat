import Chat from '../models/chat.js'
import dayjs from 'dayjs';

export async function getRecord(offset = 0) {
    const record = await Chat.findAll({
        attributes: ['summoner', 'text', 'time'],
        order: [
            ['createdAt', 'DESC']
        ],
        offset: offset,
        limit: 100
    });

    return record.reverse();
}

export async function registerListeners(io, socket) {
    socket.on('new-message', async (data) => {
        const { summoner, text } = data;

        const time = dayjs()
            .format('YYYY.MM.DD A hh:mm')
            .replace('AM', '오전')
            .replace('PM', '오후')
            .toString();

        const chat = {
            ...data,
            time
        }
        io.emit('new-message', chat);

        await Chat.create({
            summoner: summoner,
            text: text,
            time: time,
        })
    });

    // socket.on('before-message', async (page) => {
    //     if (page) {
    //         const offset = page * 100;
    //         const record = await getRecord(offset);

    //         socket.emit('before-message', {
    //             messages: record,
    //             isLast: record.length < 100 ? true : false,
    //         });
    //     }
    // })
}