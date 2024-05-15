import Chat from '../models/chat.js'
import dayjs from 'dayjs';

const ONE_PAGE_MAX_LIMIT = 100;

export async function getRecord(offset = 0) {
    const record = await Chat.findAll({
        attributes: ['summoner', 'text', 'time'],
        order: [
            ['createdAt', 'DESC']
        ],
        offset: offset,
        limit: ONE_PAGE_MAX_LIMIT
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

    socket.on('before-messages', async (data) => {
        const { page } = data;

        if (page) {
            const offset = page * ONE_PAGE_MAX_LIMIT;
            const record = await getRecord(offset);

            socket.emit('before-messages', {
                messages: record,
                isLast: record.length < ONE_PAGE_MAX_LIMIT ? true : false,
            });
        }
    })
}