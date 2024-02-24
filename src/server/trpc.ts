import { initTRPC } from '@trpc/server';
import superjson from 'superjson'

const t = initTRPC.create({
    transformer: superjson
});

//Router defino cuales van a ser mis llamadas a las APIs
    //en este caso, getAllVideos, getOneVideo, incrementPlaycount, likeVideo
//Procedure va a ser una mutacion (se cambia algun dato como incrementPlaycount) o una consulta (query)
export const router = t.router;
export const procedure = t.procedure;